package com.veggiemeal.api.domain.dto.recipe;

import com.veggiemeal.api.domain.entity.Component;
import com.veggiemeal.api.utils.ModelMapperUtils;
import lombok.*;

@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComponentDto {
    private int id;
    private int recipeId;
    private String name;
    private String capacity;

    public static ComponentDto of(Component componentEntity){
        ComponentDto componentDto = ModelMapperUtils.getModelMapper().map(componentEntity, ComponentDto.class);
        return componentDto;
    }
}
