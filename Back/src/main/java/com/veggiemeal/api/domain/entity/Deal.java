package com.veggiemeal.api.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
public class Deal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long deal_id;
    @Column(name = "deal_date")
    private String dealDate;
    private String large;
    private String medium;
    private String small;
    private String origin;
    private Float price;
}
