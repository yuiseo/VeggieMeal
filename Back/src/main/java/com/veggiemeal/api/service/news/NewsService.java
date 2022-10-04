package com.veggiemeal.api.service.news;

import com.veggiemeal.api.domain.dto.news.NewsDto;

import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.util.List;
import java.util.Map;

public interface NewsService {

    List<NewsDto> getNaverNews();

    String get(String apiUrl, Map<String, String> requestHeader);

    HttpURLConnection connect(String apiUrl);

    String readBody(InputStream body) throws UnsupportedEncodingException;


}

