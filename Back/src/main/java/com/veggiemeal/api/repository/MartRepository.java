package com.veggiemeal.api.repository;

import com.veggiemeal.api.domain.entity.Ingredient;
import com.veggiemeal.api.domain.entity.Mart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MartRepository extends JpaRepository<Mart, Long> {

    List<Mart> findAllByIngredientAndMart(Ingredient ingredient, int mart);

}
