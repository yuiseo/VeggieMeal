package com.veggiemeal.api.repository;

import com.veggiemeal.api.domain.entity.Process;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcessRepository extends JpaRepository<Process, Integer> {

    @Query(value = "SELECT * FROM process p WHERE p.recipe_id = 1", nativeQuery = true)
    List<Process> findAllByRecipeId(int recipeId);
}
