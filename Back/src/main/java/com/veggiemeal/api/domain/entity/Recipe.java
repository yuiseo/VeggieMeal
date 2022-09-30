package com.veggiemeal.api.domain.entity;

import com.veggiemeal.api.domain.dto.recipe.RecipeDto;
import com.veggiemeal.api.utils.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
@Table(name = "Recipe")
public class Recipe {
    @Id
    @Column(name = "recipe_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int recipeId;

    private String name;

    private String description;

    private String time;

    private String cal;

    private String quantity;

    private String img;

    public static Recipe of(RecipeDto recipeDto){
        Recipe recipeEntity = ModelMapperUtils.getModelMapper().map(recipeDto, Recipe.class);
        return recipeEntity;
    }
}
