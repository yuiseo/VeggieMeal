package com.veggiemeal.api.service.mart;

import java.util.List;

public interface IngredientService {

    List<String> getLargeList();

    List<String> getMediumList(String large);

    List<String> getNameList(String medium);

}
