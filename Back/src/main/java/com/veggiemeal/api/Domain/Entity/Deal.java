package com.veggiemeal.api.Domain.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
public class Deal {
    @Id
    private long id;
}
