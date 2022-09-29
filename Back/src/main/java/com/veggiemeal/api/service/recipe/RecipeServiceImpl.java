package com.veggiemeal.api.service.recipe;

import com.veggiemeal.api.domain.dto.recipe.RecipeDto;
import com.veggiemeal.api.domain.entity.Recipe;
import com.veggiemeal.api.domain.entity.Type;
import com.veggiemeal.api.repository.RecipeRepository;
import com.veggiemeal.api.repository.TypeRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final TypeRepository typeRepository;

    public RecipeServiceImpl(RecipeRepository recipeRepository, TypeRepository typeRepository){
        this.recipeRepository = recipeRepository;
        this.typeRepository = typeRepository;
    }


    @Override
    public List<RecipeDto> getRecipeByVeg(String category) {
        List<Recipe> recipeEntityList = recipeRepository.findAll();
        Collections.sort(recipeEntityList, new Comparator<Recipe>() {
            @Override
            public int compare(Recipe o1, Recipe o2) {
                if(o1.getRecipeId() < o2.getRecipeId()){
                    return -1;
                } else {
                    return 1;
                }

            }
        });
        List<Type> typeEntityList = typeRepository.findAll();
        List<Recipe> returnList = new ArrayList<>();

        for(Type type : typeEntityList){
            boolean validation = false;
            switch (category){
                case "vegan":
                    if(type.getVegan() == 1){
                        validation = true;
                    }
                    break;
                case "lacto":
                    if(type.getLacto() == 1){
                        validation = true;
                    }
                    break;
                case "ovo":
                    if(type.getOvo() == 1){
                        validation = true;
                    }
                    break;
                case "lac_ovo":
                    if(type.getLac_ovo() == 1){
                        validation = true;
                    }
                    break;
                case "pesca":
                    if(type.getPesca() == 1){
                        validation = true;
                    }
                    break;
                case "pollo":
                    if(type.getPollo() == 1){
                        validation = true;
                    }
                    break;
                case "flexi":
                    if(type.getFlexi() == 1){
                        validation = true;
                    }
                    break;
            }
            if(validation){
                returnList.add(recipeEntityList.get(type.getTypeId() - 1));
            }
        }

        return returnList.stream().map(entity -> RecipeDto.of(entity)).collect(Collectors.toList());
    }
}
