package com.veggiemeal.api.repository;

import com.veggiemeal.api.domain.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    @Query(value = "SELECT DISTINCT i.large FROM ingredient i WHERE i.large IS NOT NULL", nativeQuery = true)
    List<String> findLarge();

    @Query(value = "SELECT DISTINCT i.medium FROM ingredient i WHERE i.large = :large", nativeQuery = true)
    List<String> findMedium(String large);

    @Query(value = "SELECT DISTINCT i.name FROM ingredient i WHERE i.medium = :medium", nativeQuery = true)
    List<String> findName(String medium);

    Optional<Ingredient> findIngredientByName(String name);

    Optional<Ingredient> findIngredientByIngredientId(Long ref);

    List<Ingredient> findIngredientByMedium(String medium);
}
