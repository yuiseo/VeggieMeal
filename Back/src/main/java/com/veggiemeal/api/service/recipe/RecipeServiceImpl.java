package com.veggiemeal.api.service.recipe;

import com.veggiemeal.api.domain.dto.recipe.ComponentDto;
import com.veggiemeal.api.domain.dto.recipe.ProcessDto;
import com.veggiemeal.api.domain.dto.recipe.RecipeDto;
import com.veggiemeal.api.domain.entity.*;
import com.veggiemeal.api.domain.entity.Process;
import com.veggiemeal.api.repository.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final TypeRepository typeRepository;
    private final ComponentRepository componentRepository;
    private final ProcessRepository processRepository;
    private final IngredientRepository ingredientRepository;

    public RecipeServiceImpl(RecipeRepository recipeRepository, TypeRepository typeRepository, ComponentRepository componentRepository, ProcessRepository processRepository, IngredientRepository ingredientRepository){
        this.recipeRepository = recipeRepository;
        this.typeRepository = typeRepository;
        this.componentRepository = componentRepository;
        this.processRepository = processRepository;
        this.ingredientRepository = ingredientRepository;
    }


    @Override
    public List<RecipeDto> getRecipeByVeg(String category) {
        List<Recipe> recipeEntityList = recipeRepository.findAll();
        
        // RecipeID 값을 통해 정렬
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
        // 채식 단계에 대한 EntityList
        List<Type> typeEntityList = typeRepository.findAll();
        // 채식 단계에 맞는 레시피 엔티티를 추가할 List
        List<Recipe> returnList = new ArrayList<>();

        // 전체 레시피에 대한 채식 단계 List를 돌면서 입력된 caterory 문자열에 해당되는 값이 1인 레시피를 returnList에 추가
        for(Type type : typeEntityList){
            // validation 값이 true가 되면 현재 Type에 해당되는 레시피가 입력된 category에 적합하다는 의미
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
                // List의 index는 실제 DB에 저장되어있는 레시피 ID보다 1이 크다
                returnList.add(recipeEntityList.get(type.getTypeId() - 1));
            }
        }

        // returnList 섞기
        Collections.shuffle(returnList);

        // EntityList를 DtoList로 변환하여 반환
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
        // 전체 레시피 Entity List
        List<Recipe> recipeEntityList = recipeRepository.findAll();
        // 반환할 레시피 Dto List
        List<RecipeDto> recipeDtoList = new ArrayList<>();
        // 레시피에 포함된 전체 재료 정보 Entity List
        List<Component> componentList = componentRepository.findAll();

        // 정제된 전체 재료 정보 EntityList
        List<Ingredient> ingredientList = ingredientRepository.findAll();
        // ingredientList를 돌면서 ref 값이 존재하는 데이터를 찾는다.
        for(Ingredient ingredientEntity : ingredientList){
            if(ingredientEntity.getRef() != null && ingredientEntity.getRef() > 0){
                // ref 값이 존재하면 componentList를 돌면서 해당 재료의 이름을 ref 값에 해당하는 이름으로 치환한다.
                for(Component component : componentList){
                    if(component.getName().equals(ingredientEntity.getName())){
                        component.setName(ingredientList.get((int) (ingredientEntity.getRef() - 1)).getName());
                    }
                }
            }
        }

        /*
         * 전체 레시피 Entity List를 돌면서 해당 레시피 ID를 가진 재료 Entity만을 DB에서 추출할 수 있지만,
         * 500개의 레시피 Entity List를 돌면서 매번 select문을 수행하니 동작이 느려서 미리 전체 재료 Entity List를 추출하고
         * 반복문을 통해 검사하는 방법을 사용
         */
        // 전체 레시피 Entity List를 돌면서 선택된 재료들(ingredient)가 모두 포함된 레시피를 찾아 recipeDtoList에 추가
        for(Recipe recipeEntity : recipeEntityList){
            int count = 0;
            // 전체 재료 정보 Entity List를 돌면서 레시피 ID가 같고, 선택된 재료들 중 현재 재료 Entity의 이름이 포함되어있는 경우 count++
            for(Component component : componentList){
                if(component.getRecipeId() == recipeEntity.getRecipeId() && ingredient.contains(component.getName())){
                    count++;
                }
                // count 값이 ingredient의 크기와 같아지면 선택된 재료들이 모두 포함되었음을 의미
                if(count == ingredient.size()){
                    // 반환할 DtoList에 현재 RecipeEntity를 Dto로 변환하여 추가
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
        List<ComponentDto> componentDtoList = componentEntityList.stream().map(entity -> ComponentDto.of(entity)).collect(Collectors.toList());

        for(ComponentDto componentDto : componentDtoList){
            Optional<Ingredient> ingredientEntity = ingredientRepository.findIngredientByName(componentDto.getName());
            if(ingredientEntity.isPresent()){
                componentDto.setIngredientId(ingredientEntity.get().getIngredientId());
            }
        }

        return componentDtoList;
    }

    @Override
    public List<ProcessDto> getProcessByRecipeId(int recipeId) {
        List<Process> processEntityList = processRepository.findAllByRecipeId(recipeId);
        return processEntityList.stream().map(entity -> ProcessDto.of(entity)).collect(Collectors.toList());
    }
}
