package com.veggiemeal.dealcrawler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class SchedulerController {

    @Scheduled(cron = "0 1 0 * * *")
//    @Scheduled(cron="0 0 0 ? * TUES-SAT")
    public void scheduler() {
        Runnable runnable = null;
        for (int i = 0; i < 20; i++) {
            runnable = new MultiCrawler(i * 500, i);
            Thread t = new Thread(runnable);
            t.start();
        }
    }
}


