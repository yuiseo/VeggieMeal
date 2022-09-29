package com.veggiemeal.api.controller;

import com.veggiemeal.api.domain.dto.recipe.RecipeDto;
import com.veggiemeal.api.service.recipe.RecipeService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/")
    public ResponseEntity<List<RecipeDto>> getRecipeByCategory(@RequestParam("category") String category){
        List<RecipeDto> recipeDtoList = recipeService.getRecipeByVeg(category);
        return ResponseEntity.status(HttpStatus.OK).body(recipeDtoList);
    }
}
