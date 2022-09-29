package com.veggiemeal.api.domain.dto.mart;

import com.veggiemeal.api.domain.entity.Mart;
import com.veggiemeal.api.utils.ModelMapperUtils;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MartDto {

    private long martId;
    private long ingredientId;
    private String ingredientName;
    private int itemNo;
    private String itemName;
    private String itemPrice;
    private String itemUrl;
    private int mart;

    public static MartDto of(Mart martEntity) {
        MartDto martDto = ModelMapperUtils.getModelMapper().map(martEntity, MartDto.class);

        return martDto;
    }


}
