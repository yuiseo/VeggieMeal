package com.veggiemeal.api.service.mart;

import com.veggiemeal.api.domain.dto.mart.MartDto;
import com.veggiemeal.api.domain.entity.Ingredient;
import com.veggiemeal.api.domain.entity.Mart;
import com.veggiemeal.api.repository.IngredientRepository;
import com.veggiemeal.api.repository.MartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MartServiceImpl implements MartService {

    private final MartRepository martRepository;
    private final IngredientRepository ingredientRepository;

    @Override
    public List<MartDto> getMartList(Long ingredientId, int mart) {
        Optional<Ingredient> ingredient = ingredientRepository.findById(ingredientId);
        List<MartDto> martDtoList = null;
        List<Mart> martEntityList = null;

        if (ingredient.isPresent()) {
            if (ingredient.get().getRef() == null) {
                martEntityList = martRepository.findAllByIngredientAndMartAndItemNameIsNotNull(ingredient.get(), mart);
            }
            else {
                ingredient = ingredientRepository.findById(ingredient.get().getRef());
                martEntityList = martRepository.findAllByIngredientAndMartAndItemNameIsNotNull(ingredient.get(), mart);
            }
            martDtoList = martEntityList.stream().map(entity -> MartDto.of(entity)).collect(Collectors.toList());
        }

        return martDtoList;
    }
}
