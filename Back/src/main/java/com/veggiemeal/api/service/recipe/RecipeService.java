package com.veggiemeal.api.service.recipe;


import com.veggiemeal.api.domain.dto.recipe.ComponentDto;
import com.veggiemeal.api.domain.dto.recipe.RecipeDto;

import java.util.List;

public interface RecipeService {
    List<RecipeDto> getRecipeByVeg(String category);

    RecipeDto getRecipeById(int recipeId);

    List<RecipeDto> getRecipeByIngredient(List<String> ingredient);

    List<ComponentDto> getIngredientByRecipeId(int recipeId);
}
