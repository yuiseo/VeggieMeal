package com.veggiemeal.api.controller;

import com.veggiemeal.api.service.mart.IngredientService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ingredient")
@RequiredArgsConstructor
public class IngredientController {

    private final IngredientService ingredientService;

    /*
     * 대분류(large) 반환
     */
    @ApiOperation(value = "대분류(large) 반환", response = List.class)
    @GetMapping("/large")
    public ResponseEntity<List<String>> getLarge() {
        List<String> largeList = ingredientService.getLargeList();
        return ResponseEntity.status(HttpStatus.OK).body(largeList);
    }

    /*
     * 대분류(large)를 입력받아 중분류(medium)을 반환
     */
    @ApiOperation(value = "대분류(large)를 입력받아 중분류(medium)을 반환", response = List.class)
    @GetMapping("/medium")
    public ResponseEntity<List<String>> getMedium(@RequestParam("large") String large) {
        List<String> mediumList = ingredientService.getMediumList(large);
        return ResponseEntity.status(HttpStatus.OK).body(mediumList);
    }

    /*
     * 중분류(medium)를 입력받아 재료명(name)을 반환
     */
    @ApiOperation(value = "중분류(medium)를 입력받아 재료명(name)을 반환", response = List.class)
    @GetMapping("/name")
    public ResponseEntity<List<String>> getName(@RequestParam("medium") String medium) {
        List<String> nameList = ingredientService.getNameList(medium);
        return ResponseEntity.status(HttpStatus.OK).body(nameList);
    }

    /*
     * 재료명(keyword)을 입력받아 그 재료가 전체 재료 목록에 있으면 1, 없으면 0 반환
     */
    @ApiOperation(value = "재료명(keyword)을 입력받아 그 재료가 전체 재료 목록에 있으면 1, 없으면 0 반환", response = Integer.class)
    @GetMapping
    public ResponseEntity<Integer> searchName(@RequestParam("keyword") String keyword) {
        int result = ingredientService.searchName(keyword);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}
