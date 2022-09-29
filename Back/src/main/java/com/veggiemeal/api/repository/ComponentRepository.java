package com.veggiemeal.api.repository;

import com.veggiemeal.api.domain.entity.Component;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComponentRepository extends JpaRepository<Component, Integer> {
    List<Component> findAllByRecipeId(int recipeId);
}
