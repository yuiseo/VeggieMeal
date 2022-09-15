import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;

public class eMartCrawling {
    static final String baseUrl = "https://shopping.naver.com/market/emart/category?menu=";

    public static void main(String[] args) {
        String menuNum = "20001576";

        Connection conn = Jsoup.connect(baseUrl+menuNum);

        try {
            Document document = conn.get();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
