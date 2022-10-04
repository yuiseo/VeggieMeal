package com.veggiemeal.api.service.news;

import com.veggiemeal.api.domain.dto.news.NewsDto;
import lombok.extern.log4j.Log4j2;
import org.jsoup.Jsoup;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log4j2
@Service
public class NewsServiceImpl implements NewsService {

    List<NewsDto> newsItems;

    @Override
    public List<NewsDto> getNaverNews() {
        String clientId = "Hh3qqr5TTlXSCWJascdp"; //애플리케이션 클라이언트 아이디
        String clientSecret = "Q738IDA3U7"; //애플리케이션 클라이언트 시크릿


        String text;
        try {
            text = URLEncoder.encode("물가", "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("검색어 인코딩 실패", e);
        }


        String apiURL = "https://openapi.naver.com/v1/search/news?query=" + text;    // JSON 결과

        Map<String, String> requestHeaders = new HashMap<>();
        newsItems = new ArrayList<>();
        requestHeaders.put("X-Naver-Client-Id", clientId);
        requestHeaders.put("X-Naver-Client-Secret", clientSecret);
        get(apiURL, requestHeaders);
        return newsItems;
    }

    @Override
    public String get(String apiUrl, Map<String, String> requestHeaders) {
        HttpURLConnection con = connect(apiUrl);
        try {
            con.setRequestMethod("GET");
            for(Map.Entry<String, String> header : requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 호출
                return readBody(con.getInputStream());
            } else { // 오류 발생
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }

    @Override
    public HttpURLConnection connect(String apiUrl) {
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection)url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }

    @Override
    public String readBody(InputStream body) {
        InputStreamReader streamReader = new InputStreamReader(body);

        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder sb = new StringBuilder();
            String line;
            NewsDto newsDto = new NewsDto();
            while ((line = lineReader.readLine()) != null) {
                String splitLine[];
                if(line.contains("title")) {
                    splitLine = line.split("\"");
                    newsDto.setTitle(splitLine[3].getBytes(StandardCharsets.UTF_8).toString());
                } else if(line.contains("originallink")) {
                    splitLine = line.split("\"");
                    newsDto.setLink(splitLine[3].getBytes(StandardCharsets.UTF_8).toString());
                } else if(line.contains("pubDate")) {
                    splitLine = line.split("\"");
                    newsDto.setPubDate(splitLine[3].getBytes(StandardCharsets.UTF_8).toString());
                    newsItems.add(newsDto);
                    System.out.println(newsItems.toString());
                } else if(line.contains("description")) {
                    splitLine = line.split("\"");
                    newsDto.setDescription(splitLine[3].getBytes(StandardCharsets.UTF_8).toString());
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는 데 실패했습니다.", e);
        }
        return null;
    }

    public boolean isMap(String line) {
        return line.contains(":");
    }


}

