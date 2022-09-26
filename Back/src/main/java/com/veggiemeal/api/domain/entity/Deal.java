package com.veggiemeal.api.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Deal {
    @Id
    private long id;
}
