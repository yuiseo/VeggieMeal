package com.veggiemeal.api.domain.entity;

import com.veggiemeal.api.domain.dto.recipe.ComponentDto;
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
@Table(name = "Component")
public class Component {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "recipe_id")
    private int recipeId;

    private String name;

    private String capacity;

    public static Component of(ComponentDto componentDto){
        Component componentEntity = ModelMapperUtils.getModelMapper().map(componentDto, Component.class);
        return componentEntity;
    }
}
