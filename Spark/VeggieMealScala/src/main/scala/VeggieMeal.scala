import org.apache.spark.sql.{Row, SparkSession}
import org.apache.spark.sql.types.{DoubleType, IntegerType, StringType, StructField, StructType}
import org.apache.spark.{SparkConf, SparkContext}

object VeggieMeal {
  def main(args: Array[String]): Unit = {
    val conf = new SparkConf().setMaster("local").setAppName("VeggieMeal")
    val sc = new SparkContext(conf)
    val inputRdd = sc.textFile(args(0))
    val schema = new StructType()
      .add(StructField("date", StringType, true))
      .add(StructField("large", StringType, true))
      .add(StructField("middle", StringType, true))
      .add(StructField("small", StringType, true))
      .add(StructField("isIncome", StringType, true))
      .add(StructField("isKg", IntegerType, true))
      .add(StructField("price", DoubleType, true))

    val setRdd = inputRdd.map(line => line.split(",")).map(x => Row(x(0).trim, x(1).trim, x(2).trim, x(3).trim, if(x(4).trim.equals("0")) "income" else "korea", x(5).trim.toInt, x(6).trim.toDouble))
    val spark = SparkSession
      .builder()
      .appName("Spark Session")
      .config("spark.some.config.option", "some-value")
      .getOrCreate()

    val df = spark.createDataFrame(setRdd, schema)
    df.createOrReplaceTempView("table")
    val v1 = spark.sql("SELECT small, isIncome, max(price) as maxPrice, min(price) as minPrice, avg(price) as avgPrice  FROM table WHERE isKg=1 GROUP BY small, isIncome")
    //v1.show()
    v1.createOrReplaceTempView("table2")
    val v2 = spark.sql("SELECT table.date, table.large, table.middle, table2.small, table2.isIncome, table2.maxPrice, table2.minPrice, table2.avgPrice FROM table2 JOIN table ON table.small = table2.small AND table.isIncome = table2.isIncome WHERE isKg=1")
    //v2.show()
    v2.createOrReplaceTempView("table3")
    val v3 = spark.sql("SELECT DISTINCT date, large, middle, small, isIncome, maxPrice, minPrice, avgPrice FROM table3")
    //v3.show(1000, true)
    val df2 = v3.toDF()
    df2.write.csv(args(1))
  }
}
