package com.veggiemeal.api.service.recipe;


import com.veggiemeal.api.domain.dto.recipe.RecipeDto;
import com.veggiemeal.api.domain.entity.Component;

import java.util.List;

public interface RecipeService {
    List<RecipeDto> getRecipeByVeg(String category);

    RecipeDto getRecipeById(int recipeId);

    List<RecipeDto> getRecipeByIngredient(List<String> ingredient);

}
