package com.veggiemeal.api.domain.dto.news;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsDto {

    private String title;
    private String link;
    private String pubDate;
    private String description;

}

