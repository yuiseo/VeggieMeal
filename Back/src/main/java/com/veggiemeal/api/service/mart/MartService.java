package com.veggiemeal.api.service.mart;

import com.veggiemeal.api.domain.dto.mart.MartDto;
import com.veggiemeal.api.domain.entity.Ingredient;

import java.util.List;

public interface MartService {

    List<MartDto> getMartList(Long ingredientId, int mart);

}
