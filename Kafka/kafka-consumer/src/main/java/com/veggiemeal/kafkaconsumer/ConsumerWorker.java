package com.veggiemeal.kafkaconsumer;

import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.errors.WakeupException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.time.Duration;
import java.time.LocalDateTime;
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

    // 버퍼의 크기 - 버퍼에 20개의 데이터가 차면 flush 한다.
    private final static int FLUSH_RECORD_COUNT = 20; // buffer의 크기
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

    private void save(int partitionNo) {
        if(bufferString.get(partitionNo).size() > 0) {
            try{
                // 파일이름 및 HDFS 저장
                String fileName = "../data/";
//                Configuration configuration = new Configuration();
//                configuration.set("fs.defaultFS", "hdfs://172.31.32.75:22"); // 하둡 HDFS 주소
//                FileSystem hdfsFileSystem = FileSystem.get(configuration);
//                FSDataOutputStream fileOutputStream = hdfsFileSystem.create(new Path(fileName));
                File Folder = new File(fileName);

                if(!Folder.exists()) {
                    try{
                        Folder.mkdir();
                    } catch(Exception e) {
                        e.getStackTrace();
                    }
                }
                fileName += "deal" + partitionNo + "-" + currentFileOffset.get(partitionNo) + ".log";
                DataOutputStream fileOutputStream = new DataOutputStream(new FileOutputStream(fileName));
                fileOutputStream.writeBytes(StringUtils.join(bufferString.get(partitionNo), "\n"));
                fileOutputStream.close();

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
