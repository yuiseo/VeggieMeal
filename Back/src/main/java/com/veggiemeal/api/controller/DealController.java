package com.veggiemeal.api.controller;

import com.veggiemeal.api.domain.dto.deal.DealDto;
import com.veggiemeal.api.service.deal.DealService;
import io.swagger.annotations.ApiOperation;
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
@CrossOrigin(origins = "*")
public class DealController {
    private final DealService dealService;

    @Autowired
    public DealController(DealService dealService){
        this.dealService = dealService;
    }

    @ApiOperation(value = "부류(large) 반환", response = List.class)
    @GetMapping("/large")
    public ResponseEntity<List<String>> getLarge(){
        List<String> largeList = dealService.getLarge();
        return ResponseEntity.status(HttpStatus.OK).body(largeList);
    }

    @ApiOperation(value = "부류(large)를 입력받아 품종(medium)을 반환", response = List.class)
    @GetMapping("/medium")
    public ResponseEntity<List<String>> getMedium(@RequestParam("large") String large){
        List<String> mediumList = dealService.getMedium(large);
        return ResponseEntity.status(HttpStatus.OK).body(mediumList);
    }

    @ApiOperation(value = "부류(large), 품종(medium)을 입력받아 품목(small)을 반환", response = List.class)
    @GetMapping("/small")
    public ResponseEntity<List<String>> getSmall(@RequestParam("large") String large, @RequestParam("medium") String medium){
        List<String> smallList = dealService.getSmall(large, medium);
        return ResponseEntity.status(HttpStatus.OK).body(smallList);
    }

    @ApiOperation(value = "부류(large), 품종(medium), 품목(small)을 입력받아 원산지(origin)을 반환", response = List.class)
    @GetMapping("/origin")
    public ResponseEntity<List<String>> getOrigin(@RequestParam("large") String large, @RequestParam("medium") String medium, @RequestParam("small") String small){
        List<String> originList = dealService.getOrigin(large, medium, small);
        return ResponseEntity.status(HttpStatus.OK).body(originList);
    }

    @ApiOperation(value = "부류(large), 품종(medium), 품목(small), 원산지(origin)를 입력받아 현재 날짜 기준으로 7일 분량의 경매 데이터를 반환", response = List.class)
    @GetMapping("/")
    public ResponseEntity<List<DealDto>> getDeal(@RequestParam("large") String large, @RequestParam("medium") String medium, @RequestParam("small") String small, @RequestParam("origin") String origin){
        List<DealDto> dealDtoList = dealService.getDeal(large, medium, small, origin);
        return ResponseEntity.status(HttpStatus.OK).body(dealDtoList);
    }

}
