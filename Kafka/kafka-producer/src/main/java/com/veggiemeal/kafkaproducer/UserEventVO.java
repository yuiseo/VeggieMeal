package com.veggiemeal.kafkaproducer;

public class UserEventVO {

    private String timestamp;
    private String userAgent;
    private String dealData;
    public UserEventVO(String timestamp, String userAgent, String dealData) {
        this.timestamp = timestamp;
        this.userAgent = userAgent;
        this.dealData = dealData;
    }
}
