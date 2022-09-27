package com.veggiemeal.kafkaproducer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.util.concurrent.ListenableFutureCallback;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
//@CrossOrigin(origins = "*", allowedHeaders = "*") // Any domain can send data to this producer
public class ProducerController {

    private final Logger logger = LoggerFactory.getLogger(ProducerController.class);

    private final KafkaTemplate<String, String> kafkaTemplate;

    private SimpleDateFormat simpleDateFormat;
    private Date now;
    // Gson makes a role to change JSON object into String format. When VO object is activated, it would be also activated
//    private Gson gson;
    // When VO object is necessary, it would be activated
//    private UserEventVO userEventVO;
//    private String jsonLog;

    public ProducerController(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @GetMapping("/kafka/deal")
    public void getDeal (@RequestParam(value= "deal") String dealData) { // dealData is used as Value
        simpleDateFormat = new SimpleDateFormat("yyyyMMdd"); // Date is used as Key
        now = new Date(System.currentTimeMillis() - 24 * 60 * 60 * 1000);

//        gson = new Gson();
//        userEventVO = new UserEventVO(simpleDateFormat.format(now), userAgent, dealData);
//        jsonLog = gson.toJson(userEventVO);

        kafkaTemplate.send("deal", simpleDateFormat.format(now), dealData).addCallback(new ListenableFutureCallback<SendResult<String, String>>() {

            @Override
            public void onSuccess(SendResult<String, String> result) {
                logger.info(result.toString());
            }

            @Override
            public void onFailure(Throwable ex) {
                logger.error(ex.getMessage(), ex);
            }
        });
    }

    @GetMapping("/kafka/mart")
    public void getMart (@RequestParam(value= "deal") String martData) {
        simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        now = new Date();

        kafkaTemplate.send("mart.log", simpleDateFormat.format(now), martData).addCallback(new ListenableFutureCallback<SendResult<String, String>>() {

            @Override
            public void onSuccess(SendResult<String, String> result) {
                logger.info(result.toString());
            }

            @Override
            public void onFailure(Throwable ex) {
                logger.error(ex.getMessage(), ex);
            }
        });
    }
}
