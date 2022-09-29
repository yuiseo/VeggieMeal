package com.veggiemeal.api.service.recipe;

import com.veggiemeal.api.domain.dto.recipe.ComponentDto;
import com.veggiemeal.api.domain.dto.recipe.RecipeDto;
import com.veggiemeal.api.domain.entity.Component;
import com.veggiemeal.api.domain.entity.Recipe;
import com.veggiemeal.api.domain.entity.Type;
import com.veggiemeal.api.repository.ComponentRepository;
import com.veggiemeal.api.repository.RecipeRepository;
import com.veggiemeal.api.repository.TypeRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final TypeRepository typeRepository;
    private final ComponentRepository componentRepository;

    public RecipeServiceImpl(RecipeRepository recipeRepository, TypeRepository typeRepository, ComponentRepository componentRepository){
        this.recipeRepository = recipeRepository;
        this.typeRepository = typeRepository;
        this.componentRepository = componentRepository;
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

    @Override
    public RecipeDto getRecipeById(int recipeId) {
        Recipe recipeEntity = recipeRepository.getReferenceById(recipeId);
        RecipeDto recipeDto = RecipeDto.of(recipeEntity);
        return recipeDto;
    }

    @Override
    public List<RecipeDto> getRecipeByIngredient(List<String> ingredient) {
        List<Recipe> recipeEntityList = recipeRepository.findAll();
        List<RecipeDto> recipeDtoList = new ArrayList<>();
        List<Component> componentList = componentRepository.findAll();
        for(Recipe recipeEntity : recipeEntityList){
            int count = 0;
            for(Component component : componentList){
                if(component.getRecipeId() == recipeEntity.getRecipeId() && ingredient.contains(component.getName())){
                    count++;
                }
                if(count == ingredient.size()){
                    recipeDtoList.add(RecipeDto.of(recipeEntity));
                    break;
                }
            }
        }

        return recipeDtoList;
    }

    @Override
    public List<ComponentDto> getIngredientByRecipeId(int recipeId) {
        List<Component> componentEntityList = componentRepository.findAllByRecipeId(recipeId);
        return componentEntityList.stream().map(entity -> ComponentDto.of(entity)).collect(Collectors.toList());
    }

}
