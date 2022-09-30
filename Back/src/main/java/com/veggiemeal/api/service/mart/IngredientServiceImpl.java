package com.veggiemeal.api.service.mart;

import com.veggiemeal.api.domain.entity.Ingredient;
import com.veggiemeal.api.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IngredientServiceImpl implements IngredientService {

    private final IngredientRepository ingredientRepository;

    @Override
    public List<String> getLargeList() {
        List<String> largeList = ingredientRepository.findLarge();
        return largeList;
    }

    @Override
    public List<String> getMediumList(String large) {
        List<String> mediumList = ingredientRepository.findMedium(large);
        return mediumList;
    }

    @Override
    public List<String> getNameList(String medium) {
        List<String> nameList = ingredientRepository.findName(medium);
        return nameList;
    }

    @Override
    public int searchName(String name) {
        Optional<Ingredient> ingredient = ingredientRepository.findIngredientByName(name);

        if (ingredient.isPresent()) return 1;
        else return 0;
    }
}
