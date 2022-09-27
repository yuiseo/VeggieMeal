package com.veggiemeal.api.repository;

import com.veggiemeal.api.domain.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DealRepository extends JpaRepository<Deal, Long> {

}
