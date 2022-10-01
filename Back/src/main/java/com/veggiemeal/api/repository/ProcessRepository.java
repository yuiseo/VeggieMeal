package com.veggiemeal.api.repository;

import com.veggiemeal.api.domain.entity.Process;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcessRepository extends JpaRepository<Process, Integer> {

    List<Process> findAllByRecipeId(int recipeId);
}
