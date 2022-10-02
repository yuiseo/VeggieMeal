package com.veggiemeal.api.domain.dto.mart;

import com.veggiemeal.api.domain.entity.Ingredient;
import com.veggiemeal.api.utils.ModelMapperUtils;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class IngredientDto {

    private long ingredientId;
    private String large;
    private String medium;
    private String name;
    private long ref;

    public static IngredientDto of(Ingredient ingredientEntity) {
        IngredientDto ingredientDto = ModelMapperUtils.getModelMapper().map(ingredientEntity, IngredientDto.class);

        return ingredientDto;
    }

}
