package com.veggiemeal.api.domain.entity;

import com.veggiemeal.api.domain.dto.mart.IngredientDto;
import com.veggiemeal.api.utils.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Ingredient")
public class Ingredient {
    @Id
    @Column(name = "ingredient_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ingredientId;

    private String large;

    private String medium;

    private String name;

    private Long ref;

    @OneToMany(mappedBy = "ingredient")
    List<Mart> mart = new ArrayList<>();

    public static Ingredient of(IngredientDto ingredientDto) {
        Ingredient ingredientEntity = ModelMapperUtils.getModelMapper().map(ingredientDto, Ingredient.class);

        return ingredientEntity;
    }

}
