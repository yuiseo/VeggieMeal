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

    @GetMapping("/")
    public ResponseEntity<List<DealDto>> getDeal(@RequestParam("large") String large, @RequestParam("medium") String medium, @RequestParam("small") String small, @RequestParam("origin") String origin){
        System.out.println("a");
        List<DealDto> dealDtoList = dealService.getDeal(large, medium, small, origin);
        System.out.println(dealDtoList.toArray().toString());
        return ResponseEntity.status(HttpStatus.OK).body(dealDtoList);
    }

}
