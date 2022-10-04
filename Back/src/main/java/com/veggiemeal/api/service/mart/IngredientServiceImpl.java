package com.veggiemeal.api.service.mart;

import com.veggiemeal.api.domain.entity.Ingredient;
import com.veggiemeal.api.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        List<String> nameList = new ArrayList<>();
        List<Ingredient> ingredientList = ingredientRepository.findIngredientByMedium(medium);
        // ref 값이 존재하는 ingredient는 제외하고 반환(이름이 애매한 것들 제외)
        for(Ingredient ingredient: ingredientList){
            if(ingredient.getRef() == null){
                nameList.add(ingredient.getName());
            }
        }
        return nameList;
    }

    @Override
    public int searchName(String name) {
        Optional<Ingredient> ingredient = ingredientRepository.findIngredientByName(name);

        if (ingredient.isPresent()) return 1;
        else return 0;
    }
}
