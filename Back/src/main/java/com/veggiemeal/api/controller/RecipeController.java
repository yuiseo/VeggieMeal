package com.veggiemeal.api.controller;

import com.veggiemeal.api.domain.dto.recipe.RecipeDto;
import com.veggiemeal.api.domain.entity.Component;
import com.veggiemeal.api.service.recipe.RecipeService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

/*
 * 레시피 API
 */
@RestController
@RequestMapping("/recipe")
public class RecipeController {

    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService){
        this.recipeService = recipeService;
    }

    @ApiOperation(value = "채식 카테고리를 입력받아 일치하는 레시피 데이터를 반환", response = List.class)
    @GetMapping("/category")
    public ResponseEntity<List<RecipeDto>> getRecipeByCategory(@RequestParam("category") String category){
        List<RecipeDto> recipeDtoList = recipeService.getRecipeByVeg(category);
        return ResponseEntity.status(HttpStatus.OK).body(recipeDtoList);
    }

    @ApiOperation(value = "레시피ID를 입력받아 일치하는 레시피 데이터를 반환", response = RecipeDto.class)
    @GetMapping("/id")
    public ResponseEntity<RecipeDto> getRecipeById(@RequestParam("recipeId") int recipeId){
        RecipeDto recipeDto = recipeService.getRecipeById(recipeId);
        return ResponseEntity.status(HttpStatus.OK).body(recipeDto);
    }

    @ApiOperation(value = "재료배열을 입력받아 포함되어있는 레시피 데이터를 반환", response = List.class)
    @GetMapping("/ingredient")
    public ResponseEntity<List<RecipeDto>> getRecipeByIngredient(@RequestParam("ingredient") List<String> ingredient){
        System.out.println(ingredient.toString());
        List<RecipeDto> recipeDtoList = recipeService.getRecipeByIngredient(ingredient);
        return ResponseEntity.status(HttpStatus.OK).body(recipeDtoList);
    }

}
