import org.apache.spark.sql.{Row, SparkSession}
import org.apache.spark.sql.types.{DoubleType, IntegerType, StringType, StructField, StructType}
import org.apache.spark.{SparkConf, SparkContext}

object VeggieMeal {
  def main(args: Array[String]): Unit = {
    val befortTime = System.currentTimeMillis();
    val conf = new SparkConf().setMaster("local").setAppName("VeggieMeal")
    val sc = new SparkContext(conf)
    val inputRdd = sc.textFile(args(0) )
    val schema = new StructType()
      .add(StructField("date", StringType, true))
      .add(StructField("large", StringType, true))
      .add(StructField("middle", StringType, true))
      .add(StructField("small", StringType, true))
      .add(StructField("isIncome", StringType, true))
      .add(StructField("isKg", DoubleType, true))
      .add(StructField("price", DoubleType, true))
    val spark = SparkSession
      .builder()
      .appName("Spark Session")
      .config("spark.some.config.option", "some-value")
      .getOrCreate()
    val setRdd = inputRdd.map(line => line.split(","))
    val sizeRdd = setRdd.filter(a=> a.size == 7).filter(b=> b(5).trim.equals("0")).map(x => Row("20"+x(0).trim.replaceAll("[^0-9]", ""), x(1).trim, x(2).trim, x(3).trim, if(x(4).trim.equals("0")) "income" else "korea", x(5).trim.toDouble, x(6).trim.toDouble))
    val sizeNRdd = setRdd.filter(a => a.size != 7 && a.size != 6).filter(b=> b(b.size-2).trim.equals("0")).map(x => Row("20"+x(0).trim.replaceAll("[^0-9]", ""), x(1).trim, x(2).trim, x(x.size-4).trim, if(x(x.size-3).trim.equals("0")) "income" else "korea", x(x.size -2).trim.toDouble, x(x.size - 1).trim.toDouble))
    val unRdd = sizeRdd.union(sizeNRdd)
    val df = spark.createDataFrame(unRdd, schema)
    df.createOrReplaceTempView("table")
    val v1 = spark.sql("SELECT date, large, middle, small, isIncome,avg(price) as avgPrice FROM table GROUP BY date, large, middle, small, isIncome")
    v1.createOrReplaceTempView("table2")
    val v2 = spark.sql("select table.date, table.large, table.middle, table.small, table.isIncome, table.price, table2.avgPrice from table left join table2 where table.date = table2.date and table.large = table2.large and table.middle = table2.middle and table.small = table2.small and table.isIncome = table2.isIncome")
    v2.createOrReplaceTempView("table3")
    val v3 = spark.sql("select * from table3 where avgPrice* 1.5 > price and avgPrice *0.5 < price")
    v3.createOrReplaceTempView("table4")
    val v4 = spark.sql("select date, large, middle, small, isIncome, max(price) as maxPrice, min(price) as minPrice, avgPrice from table4 group by date, large, middle, small, isIncome, avgPrice" )
    val df2 = v4.toDF()
    //df2.show()
    df2.write.csv(args(1))
    val afterTime = System.currentTimeMillis();
    val difTime = afterTime - befortTime;
    println("-----------------------------------------------------------------------------------")
    println("run Time : " + difTime+"ms")
    println("-----------------------------------------------------------------------------------")
//    v1.createOrReplaceTempView("table2")
//    val v2 = spark.sql("SELECT table.date, table.large, table.middle, table2.small, table2.isIncome, table2.maxPrice, table2.minPrice, table2.avgPrice FROM table2 JOIN table ON table.small = table2.small AND table.isIncome = table2.isIncome")
//    //v2.show()
//    v2.createOrReplaceTempView("table3")
//    val v3 = spark.sql("SELECT DISTINCT date, large, middle, small, isIncome, maxPrice, minPrice, avgPrice FROM table3")
//    //v3.show(1000, true)
//    val df2 = v3.toDF()
//    df2.show()
  }
}
