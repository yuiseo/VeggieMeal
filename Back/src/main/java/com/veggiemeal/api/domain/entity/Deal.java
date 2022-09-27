package com.veggiemeal.api.domain.entity;

import com.veggiemeal.api.domain.dto.deal.DealDto;
import com.veggiemeal.api.utils.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
@Table(name = "Deal")
public class Deal {
    @Id
    @Column(name = "deal_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long dealId;

    @Column(name = "deal_date")
    private String dealDate;

    private String large;

    private String medium;

    private String small;

    private String origin;

    private Float price;

    public static Deal of(DealDto dealDto){
        Deal dealEntity = ModelMapperUtils.getModelMapper().map(dealDto, Deal.class);
        return dealEntity;
    }
}
