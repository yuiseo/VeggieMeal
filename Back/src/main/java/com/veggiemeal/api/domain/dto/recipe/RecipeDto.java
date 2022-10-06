package com.veggiemeal.api.domain.dto.recipe;

import com.veggiemeal.api.domain.entity.Recipe;
import com.veggiemeal.api.utils.ModelMapperUtils;
import lombok.*;

@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class  RecipeDto {
    private int recipeId;
    private String name;
    private String description;
    private String time;
    private String cal;
    private String quantity;
    private String img;

    public static RecipeDto of(Recipe recipeEntity){
        RecipeDto recipeDto = ModelMapperUtils.getModelMapper().map(recipeEntity, RecipeDto.class);
        return recipeDto;
    }
}
