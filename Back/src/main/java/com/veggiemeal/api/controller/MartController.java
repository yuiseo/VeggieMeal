package com.veggiemeal.api.controller;

import com.veggiemeal.api.domain.dto.mart.MartDto;
import com.veggiemeal.api.service.mart.MartService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MartController {

    private final MartService martService;

    /*
     * 재료 아이디(ingredientId)와 마트 종류(mart, 0:이마트몰 1:홈플러스)을 입력하면 마트 정보를 반환
    */
    @ApiOperation(value = "재료 아이디(ingredientId)와 마트 종류(mart, 0: 이마트몰 1: 홈플러스)을 입력하면 마트 정보를 반환", response = List.class)
    @GetMapping
    public ResponseEntity<List<MartDto>> getMart(@RequestParam("ingredientId") Long ingredientId, @RequestParam("mart") int mart) {
        List<MartDto> martList = martService.getMartList(ingredientId, mart);
        return ResponseEntity.status(HttpStatus.OK).body(martList);
    }
}
