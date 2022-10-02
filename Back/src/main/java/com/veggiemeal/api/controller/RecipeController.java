package com.veggiemeal.api.controller;

import com.veggiemeal.api.domain.dto.recipe.ProcessDto;
import com.veggiemeal.api.domain.dto.recipe.RecipeDto;
import com.veggiemeal.api.service.recipe.RecipeService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
 * 레시피 API
 */
@RestController
@RequestMapping("/recipe")
@CrossOrigin(origins = "*")
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

    @ApiOperation(value = "레시피ID를 입력받아 일치하는 레시피 데이터 및 재료, 과정 데이터를 반환", response = Map.class)
    @GetMapping("/id")
    public ResponseEntity<Map<String, Object>> getRecipeById(@RequestParam("recipeId") int recipeId){
        Map<String, Object> result = new HashMap<>();
        result.put("recipe", recipeService.getRecipeById(recipeId));
        result.put("ingredient", recipeService.getIngredientByRecipeId(recipeId));
        result.put("process", recipeService.getProcessByRecipeId(recipeId));
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "재료배열을 입력받아 포함되어있는 레시피 데이터를 반환", response = List.class)
    @GetMapping("/ingredient")
    public ResponseEntity<List<RecipeDto>> getRecipeByIngredient(@RequestParam("ingredient") List<String> ingredient){
        System.out.println(ingredient.toString());
        List<RecipeDto> recipeDtoList = recipeService.getRecipeByIngredient(ingredient);
        return ResponseEntity.status(HttpStatus.OK).body(recipeDtoList);
    }

    @ApiOperation(value = "레시피 아이디를 입력받아 레시피 요리 순서, 설명 반환", response = List.class)
    @GetMapping("/process")
    public ResponseEntity<List<ProcessDto>> getProcessByRecipe(@RequestParam("recipeId") int recipeId){
        List<ProcessDto> processDtoList = recipeService.getProcessByRecipeId(recipeId);
        return ResponseEntity.status(HttpStatus.OK).body(processDtoList);
    }
}
