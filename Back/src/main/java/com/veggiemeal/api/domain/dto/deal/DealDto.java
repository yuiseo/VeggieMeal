package com.veggiemeal.api.domain.dto.deal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DealDto {
    private long deal_id;
    private String dealDate;
    private String large;
    private String medium;
    private String small;
    private String origin;
    private Float price;
}
