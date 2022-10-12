import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.*;
import org.apache.spark.sql.types.DataType;
import org.apache.spark.sql.types.DataTypes;
import org.apache.spark.sql.types.StringType;
import org.apache.spark.sql.types.StructType;
import scala.Tuple2;

import java.sql.Struct;
import java.util.Arrays;

public class Test {
    private static void test(String input, String output){
//        SparkConf conf = new SparkConf().setMaster("local").setAppName("WordCounter");
//        JavaSparkContext sc = new JavaSparkContext(conf);
//        JavaRDD<String> inputFile = sc.textFile(input);
//        JavaRDD<String> t1 = inputFile.map(s -> s.split(",")[0]);
//        JavaRDD<String> t2 = inputFile.map(s -> s.split(",")[1]);
//        JavaRDD<String> t3 = inputFile.map(s -> s.split(",")[2]);
//        JavaRDD<String> t4 = inputFile.map(s -> s.split(",")[3]);
//        JavaRDD<String> t5 = inputFile.map(s -> s.split(",")[4]);
//        JavaRDD<String> t6 = inputFile.map(s -> s.split(",")[5]);
//        JavaRDD<String> t7 = inputFile.map(s -> s.split(",")[6]);
//        t2.foreach(c -> System.out.println(c));
//        sc.close();
        StructType schema = new StructType()
                .add("date", DataTypes.StringType, true)
                .add("large", DataTypes.StringType, true)
                .add("middle", DataTypes.StringType, true)
                .add("small", DataTypes.StringType, true)
                .add("isIncome", DataTypes.StringType, true)
                .add("isKg", DataTypes.StringType, true)
                .add("price", DataTypes.StringType, true);
        SparkSession spark = SparkSession.builder().master("local").appName("spark").config("spark.some.config.option", "some-vaule").getOrCreate();
        Dataset<Row> df = spark.read().csv(input).schema(StructType s);
        df.show();
    }

    public static void main(String[] args) throws Exception{
        test(args[0], args[1]);
    }
}
