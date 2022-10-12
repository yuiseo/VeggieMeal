package com.veggiemeal.kafkaconsumer;

import lombok.NoArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.errors.WakeupException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedWriter;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * ConsumerWorker에는 각 쓰레드(파티션과 1:1 매칭이된)가 동작하는 방식이 정의되어 있다.
 */
@NoArgsConstructor
public class ConsumerWorker implements Runnable {

    private final Logger logger = LoggerFactory.getLogger(ConsumerWorker.class);

    // Key: Partiton no., Value: Partition values
    private static Map<Integer, List<String>> bufferString = new ConcurrentHashMap<>();

    // Key: Partiton no., Value: offset - 현재 읽고 있는 파티션 번호와 오프셋
    private static Map<Integer, Long> currentFileOffset = new ConcurrentHashMap<>();

    // 버퍼의 크기 - 버퍼에 10000개의 데이터가 차면 flush 한다.
    private final static int FLUSH_RECORD_COUNT = 10000; // buffer의 크기
    private Properties prop; // Consumer와 Partition을 매칭할 떄의 설정사항
    private String topic; // 읽고자 하는 토픽 이름
    private String threadName; // 쓰레드의 이름
    private KafkaConsumer<String, String> consumer; // key: Kafka log key(date), value: Kafka log value(String)

    public ConsumerWorker(Properties prop, String topic, int number) {
        this.prop = prop;
        this.topic = topic;
        this.threadName = "consumer-thread-" + number;
    }

    @Override
    public void run() {
        Thread.currentThread().setName(threadName); // 현재 동작하는 쓰레드의 이름 설정
        consumer = new KafkaConsumer<>(prop); // 카프카의 파티션과 컨슈머와 1대 1 매칭
        consumer.subscribe(Arrays.asList(topic));

        try {
            while(true) {
                ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(50)); // 0.5 초마다 하나씩 poll 한다.

                for(ConsumerRecord<String, String> record : records) { // ConsumerRecords implements Iterable
                    addHdfsFileBuffer(record); // HDFS에 버퍼의 크기만큼 각각의 레코드를 저장시킨다.
                }
            }
        } catch(WakeupException e) { // 정해진 Duration 동안 데이터 읽어오는 것을 실패하면 실행하던 consumer를 안전하게 종료시킨다.
            logger.warn("Wakeup consumer"); // 안전한 종료를 위해 WakeupException을 받아 종료
        } catch(Exception e) {
            logger.error(e.getMessage(), e);
        } finally {
            consumer.close();
        }
    }

    /**
     * Hdfs에 파일을 저장할 때 2 가지 방식이 존재한다 - append, flush (후자 선택)
     */
    private void addHdfsFileBuffer(ConsumerRecord<String, String> record) {

        List<String> buffer = bufferString.getOrDefault(record.partition(), new ArrayList<>());
        buffer.add(record.value());
        bufferString.put(record.partition(), buffer);

        if(buffer.size() == 1) {
            currentFileOffset.put(record.partition(), record.offset());
        }

        // consumer에 할당된 파티션 정보를 얻어 파티션마다 할당된 버퍼의 크기가 다 채워졌을 때 파일을 저장(flush)한다.
        saveBufferToHdfsFile(consumer.assignment());
    }

    private void saveBufferToHdfsFile(Set<TopicPartition> partitions) {
        partitions.forEach(p -> checkFlushCount(p.partition()));
    }

    private void checkFlushCount(int partitionNo) {
        if(bufferString.get(partitionNo) != null) {
            if(bufferString.get(partitionNo).size() > FLUSH_RECORD_COUNT - 1) {
                save(partitionNo);
            }
        }
    }

    /**
     * HDFS 클러스터 접근권한이 되지않아, 파일 주석처리
     * 로컬 서버에 저장
     */

    private void save(int partitionNo) {
        if(bufferString.get(partitionNo).size() > 0) {
            try{
                // 파일이름 및 HDFS 저장 - 매일 수집되는 날짜를 기준으로 폴더 생성되고 저장됨
                Date today = new Date(System.currentTimeMillis() - 24 * 60 * 60 * 1000);

                // 날짜 포매팅
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

                String fileName = "../" + dateFormat.format(today);

/*                Configuration configuration = new Configuration();
                configuration.set("fs.defaultFS", "hdfs://localhost:9000"); // 하둡 HDFS 주소
                FileSystem hdfsFileSystem = FileSystem.get(configuration);
                FSDataOutputStream fileOutputStream = hdfsFileSystem.create(new Path(fileName)); */

                File Folder = new File(fileName);

                if(!Folder.exists()) {
                    try{
                        Folder.mkdir();
                    } catch(Exception e) {
                        e.getStackTrace();
                    }
                }
                fileName += "/" +dateFormat.format(today) + "-" + partitionNo + "-" + currentFileOffset.get(partitionNo) + ".csv";
                Path path = Paths.get(fileName);
                BufferedWriter writer = Files.newBufferedWriter(path, StandardCharsets.UTF_8);

                // 불필요한 문자 제거하기 위해 버퍼에 저장된 개별 값 검사
                for(String str : bufferString.get(partitionNo)) {
                    writer.append(str.substring(2));
                }
                writer.close();

                bufferString.put(partitionNo, new ArrayList<>());
            } catch(Exception e) {
                logger.error(e.getMessage(), e);
            }
        }
    }

    private void saveRemainBufferToHdfsFile() {
        bufferString.forEach((partitionNo, v) -> this.save(partitionNo));
    }

    // 버퍼 안 남아있는 내용을 저장한다.
    public void stopAndWakeUp() {
        logger.info("stopAndWakeup");
        consumer.wakeup();
        saveRemainBufferToHdfsFile();
    }
}
