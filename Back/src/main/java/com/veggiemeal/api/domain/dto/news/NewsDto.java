package com.veggiemeal.api.domain.dto.news;

import lombok.*;
import org.apache.tomcat.util.buf.Utf8Encoder;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsDto {

    private byte[] title;
    private byte[] link;
    private byte[] pubDate;
    private byte[] description;

}

