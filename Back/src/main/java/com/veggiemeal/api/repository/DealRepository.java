package com.veggiemeal.api.repository;

import com.veggiemeal.api.domain.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DealRepository extends JpaRepository<Deal, Long> {

    List<Deal> findByLargeAndMediumAndSmallAndOrigin(String large, String medium, String small, String origin);
}
