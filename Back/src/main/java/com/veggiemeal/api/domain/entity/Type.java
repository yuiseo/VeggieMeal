package com.veggiemeal.api.domain.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
@Table(name = "Type")
public class Type {
    @Id
    @Column(name = "type_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int typeId;

    private int vegan;

    private int lacto;

    private int ovo;

    private int lac_ovo;

    private int pesca;

    private int pollo;

    private int flexi;
}
