package com.veggiemeal.api.service.mart;

import com.veggiemeal.api.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
