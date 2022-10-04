package com.veggiemeal.api.domain.dto.news;

import lombok.*;
import org.apache.tomcat.util.buf.Utf8Encoder;

@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsDto {

    private String title;
    private String link;
    private String pubDate;
    private String description;

}

