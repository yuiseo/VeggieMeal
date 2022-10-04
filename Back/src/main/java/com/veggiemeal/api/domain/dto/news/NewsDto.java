package com.veggiemeal.api.domain.dto.news;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsDto {

    private String title;
    private String link;
    private String pubDate;
    private String description;

}

