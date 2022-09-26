import org.apache.hadoop.security.SaslOutputStream;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import scala.Tuple2;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;

public class WordCount {
    private static void wordCount(String input, String output){
        SparkConf conf = new SparkConf().setMaster("local").setAppName("WordCounter");
        JavaSparkContext sc = new JavaSparkContext(conf);
        JavaRDD<String> inputFile = sc.textFile(input);
        JavaRDD<String> wordsFromFile = inputFile.flatMap(c -> Arrays.asList(c.split(" ")).iterator());
        JavaPairRDD countData = wordsFromFile.mapToPair(t -> new Tuple2<>(t, 1)).reduceByKey((x,y) -> (int)x + (int)y);
        System.out.println(countData.count());
        countData.saveAsTextFile(output);
    }
    public static void main(String[] args) throws Exception{
        wordCount(args[0], args[1]);
    }
}
