package com.veggiemeal.api.controller;

import com.veggiemeal.api.domain.dto.news.NewsDto;
import com.veggiemeal.api.service.news.NewsService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path= "/news")
@CrossOrigin(origins = "*")
public class NewsController {

    private final NewsService newsService;

    @ApiOperation(value = "물가 관련 뉴스 데이터를 반환합니다.", response = List.class)
    @GetMapping
    public ResponseEntity<List<NewsDto>> getNaverNews() {
        List<NewsDto> newsList = newsService.getNaverNews();
        return ResponseEntity.status(200).body(newsList);
    }

}

