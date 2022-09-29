package com.veggiemeal.api.domain.entity;

import com.veggiemeal.api.domain.dto.mart.MartDto;
import com.veggiemeal.api.utils.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Mart")
public class Mart {
    @Id
    @Column(name = "mart_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long martId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingredientId")
    private Ingredient ingredient;

    @Column(name = "ingredient_name")
    private String ingreName;

    @Column(name = "item_no")
    private int itemNo;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_price")
    private String itemPrice;

    @Column(name = "item_url")
    private String itemUrl;

    private int mart;

    public static Mart of(MartDto martDto) {
        Mart martEntity = ModelMapperUtils.getModelMapper().map(martDto, Mart.class);

        return martEntity;
    }
    
}
