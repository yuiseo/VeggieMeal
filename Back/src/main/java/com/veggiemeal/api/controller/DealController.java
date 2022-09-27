package com.veggiemeal.api.controller;

import com.veggiemeal.api.domain.dto.deal.DealDto;
import com.veggiemeal.api.service.deal.DealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
* 물가분석 API
 */
@RestController
@RequestMapping("/deal")
public class DealController {
    private final DealService dealService;

    @Autowired
    public DealController(DealService dealService){
        this.dealService = dealService;
    }

    /*
    * 부류(large) 반환
     */
    @GetMapping("/large")
    public ResponseEntity<List<String>> getLarge(){
        List<String> largeList = dealService.getLarge();
        return ResponseEntity.status(HttpStatus.OK).body(largeList);
    }

    /*
     * 부류(large)를 입력받아 품종(medium)을 반환
     */
    @GetMapping("/medium")
    public ResponseEntity<List<String>> getMedium(@RequestParam("large") String large){
        List<String> mediumList = dealService.getMedium(large);
        return ResponseEntity.status(HttpStatus.OK).body(mediumList);
    }

    /*
     * 부류(large), 품종(medium)을 입력받아 품목(small)을 반환
     */
    @GetMapping("/small")
    public ResponseEntity<List<String>> getSmall(@RequestParam("large") String large, @RequestParam("medium") String medium){
        List<String> smallList = dealService.getSmall(large, medium);
        return ResponseEntity.status(HttpStatus.OK).body(smallList);
    }

    @GetMapping("/")
    public ResponseEntity<List<DealDto>> getDeal(@RequestParam("large") String large, @RequestParam("medium") String medium, @RequestParam("small") String small, @RequestParam("origin") String origin){
        List<DealDto> dealDtoList = dealService.getDeal(large, medium, small, origin);
        return ResponseEntity.status(HttpStatus.OK).body(dealDtoList);
    }

}
