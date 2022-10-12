package com.veggiemeal.api.domain.dto.deal;

import com.veggiemeal.api.domain.entity.Deal;
import com.veggiemeal.api.utils.ModelMapperUtils;
import lombok.*;

@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DealDto {
    private long dealId;
    private String dealDate;
    private String large;
    private String medium;
    private String small;
    private String origin;
    private Float price;
    private Float max;
    private Float min;

    public static DealDto of(Deal dealEntity){
        DealDto dealDto = ModelMapperUtils.getModelMapper().map(dealEntity, DealDto.class);
        return dealDto;
    }
}
