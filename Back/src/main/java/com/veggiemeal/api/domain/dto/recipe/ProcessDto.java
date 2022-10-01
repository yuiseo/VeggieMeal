package com.veggiemeal.api.domain.dto.recipe;

import com.veggiemeal.api.domain.entity.Process;
import com.veggiemeal.api.utils.ModelMapperUtils;
import lombok.*;

@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProcessDto {

    private int recipeId;
    private int no; // 요리 순서
    private String description;

    public static ProcessDto of(Process processEntity){
        ProcessDto processDto = ModelMapperUtils.getModelMapper().map(processEntity, ProcessDto.class);
        return processDto;
    }

}
