package com.veggiemeal.api.domain.entity;

import com.veggiemeal.api.domain.dto.recipe.ProcessDto;
import com.veggiemeal.api.domain.dto.recipe.RecipeDto;
import com.veggiemeal.api.utils.ModelMapperUtils;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Process")
public class Process {

    @Id
    @Column(name = "process_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int processId;

    @Column(name = "recipe_id")
    private int recipeId;
    private int no;
    private String description;

    public static Process of(ProcessDto processDto){
        Process processEntity = ModelMapperUtils.getModelMapper().map(processDto, Process.class);
        return processEntity;
    }
}
