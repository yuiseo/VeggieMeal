package com.veggiemeal.api.service.news;

import com.veggiemeal.api.domain.dto.news.NewsDto;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
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
        String clientId = "Hh3qqr5TTlXSCWJascdp"; //애플리케이션 클라이언트 아이디 - 깃 public 업로드 시, private 하게 만들기
        String clientSecret = "Q738IDA3U7"; //애플리케이션 클라이언트 시크릿 - 깃 public 업로드 시, private 하게 만들기

        String text;
        try {
            text = URLEncoder.encode("물가", "UTF-8"); /** URL 만 encoding된 것 - body는 encoding 되지 X */
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

    /** 커넥션을 통해 정상적으로 News API 가 호출되었는지를 확인한다. */
    @Override
    public void get(String apiUrl, Map<String, String> requestHeaders) {
        HttpURLConnection con = connect(apiUrl);
        try {
            con.setRequestMethod("GET");
            for(Map.Entry<String, String> header : requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 호출
                readBody(con.getInputStream());
            } else { // 오류 발생
                readBody(con.getErrorStream());
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

    /** html 파일에서 body를 추출하여 필요 뉴스 데이터를 업데이트 합니다. */
    @Override
    public void readBody(InputStream body) throws UnsupportedEncodingException {
        /** Body는 Encoding 되지 않았기 때문에 UTF-8로 Encoding 필요 - Encoding 해주지 않을 시, 객체에 다른 인코딩의 String이 들어간다. */
        InputStreamReader streamReader = new InputStreamReader(body, "UTF-8");

        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            String line;
            NewsDto newsDto = new NewsDto();
            while ((line = lineReader.readLine()) != null) {
                String splitLine[];
                if(line.contains("title")) {
                    newsDto = new NewsDto(); // 새로운 뉴스마다 새로운 객체를 생성해주어 알맞은 값을 설정한다.
                    splitLine = line.split("\"");
                    newsDto.setTitle(splitLine[3].replaceAll("<[^>]*>", " ")); // html tag 없애기
                } else if(line.contains("originallink")) {
                    splitLine = line.split("\"");
                    newsDto.setLink(splitLine[3].replaceAll("<[^>]*>", " "));
                } else if(line.contains("pubDate")) {
                    splitLine = line.split("\"");
                    newsDto.setPubDate(splitLine[3].replaceAll("<[^>]*>", " "));
                    newsItems.add(newsDto);
                } else if(line.contains("description")) {
                    splitLine = line.split("\"");
                    newsDto.setDescription(splitLine[3].replaceAll("<[^>]*>", " "));
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는 데 실패했습니다.", e);
        }
    }

}

