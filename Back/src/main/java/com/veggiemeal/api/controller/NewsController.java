package com.veggiemeal.api.controller;

import com.veggiemeal.api.domain.dto.news.NewsDto;
import com.veggiemeal.api.service.news.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/news")
@CrossOrigin(origins = "*")
public class NewsController {

    private final NewsService newsService;

    @GetMapping
    public ResponseEntity<List<NewsDto>> getNaverNews() {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Content-Type", "application/xml; charset=utf-8");
        return ResponseEntity.status(200).body(newsService.getNaverNews());
    }

}

