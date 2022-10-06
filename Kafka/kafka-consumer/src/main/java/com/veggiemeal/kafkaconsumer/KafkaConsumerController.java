package com.veggiemeal.kafkaconsumer;


import org.apache.kafka.clients.CommonClientConfigs;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.config.SaslConfigs;
import org.apache.kafka.common.config.SslConfigs;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Controller
public class KafkaConsumerController {

    private final static Logger logger = LoggerFactory.getLogger(KafkaConsumerController.class);

    private final static String TOPIC_NAME = "deal";
    private final static String BOOTSTRAP_SERVERS = "pkc-e82om.ap-northeast-2.aws.confluent.cloud:9092";
    private final static String SECURITY_PROTOCOL = "SASL_SSL";
    private final static String JAAS_CONFIG = "org.apache.kafka.common." +
            "security.plain.PlainLoginModule   required username='RCLUHOQMPNRJEOZB'   " +
            "password='URjf+tnBRG3YmjxS79PcCkQeIuLAexwwr4Toi1KnE7I4/afnYISZKnyBJsTmbpQc';";
    private final static String SSL_ENDPOINT = "https";
    private final static String SASL_MECHANISM = "PLAIN";
    private final static String GROUP_ID = "consumer-save-veggiemeal-";
    private final static int CONSUMER_COUNT = 6; // Partition 개수와 연동될 쓰레드 개수 (1 Partition : 1 Consumer Thread)
    private final static List<ConsumerWorker> workers = new ArrayList<>();

    @Scheduled(cron = "00 01 00 * * *")
    private void work() {
        // 런타임 도중 셧다운 훅이 발생했을 때, 각 컨슈머를 운영하는 쓰레드에 종료를 알린다.
        Runtime.getRuntime().addShutdownHook(new ShutdownThread());

        // 컨슈머의 설정관련 사항
        Properties configs = new Properties();
        configs.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS);
        configs.put(ConsumerConfig.GROUP_ID_CONFIG, GROUP_ID);
        configs.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        configs.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        configs.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());

        configs.put(CommonClientConfigs.SECURITY_PROTOCOL_CONFIG, SECURITY_PROTOCOL);
        configs.put(SaslConfigs.SASL_JAAS_CONFIG, JAAS_CONFIG);
        configs.put(SaslConfigs.SASL_MECHANISM, SASL_MECHANISM);
        configs.put(SslConfigs.SSL_ENDPOINT_IDENTIFICATION_ALGORITHM_CONFIG, SSL_ENDPOINT);

        // 컨슈머 쓰레드를 쓰레드 풀로 관리한다. 미리 만들어놓으면 연결을 한 번만 설정하면 되므로 오버헤드가 적어진다
        ExecutorService executorService = Executors.newCachedThreadPool();
        for(int i = 0; i < CONSUMER_COUNT; i++) {
            // 접근하고자 하는 토픽의 Key와 Value를 어떻게 읽어올지, 몇 번의 쓰레드를 사용할지에 관한 것을 설정한다.
            workers.add(new ConsumerWorker(configs, TOPIC_NAME, i));
        }

        // 설정된 쓰레드를 쓰레드 풀에 등록하면 쓰레드 풀에서 자원이 관리된다.
        workers.forEach(executorService::execute);
    }

    /**
     * 안전한 컨슈머의 종료를 위한 클래스
     * - 셧다운 훅이 발생했을 때 각 컨슈머 쓰레드에 종료를 알린다.
     */
    private class ShutdownThread extends Thread {
        public void run() {
            logger.info("Shutdown Hook");
            workers.forEach(ConsumerWorker::stopAndWakeUp);
        }
    }
}

