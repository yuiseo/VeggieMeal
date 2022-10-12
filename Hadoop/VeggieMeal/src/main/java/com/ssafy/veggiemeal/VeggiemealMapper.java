package com.ssafy.veggiemeal;

import java.io.IOException;
import java.util.Arrays;

import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

public class VeggiemealMapper extends Mapper<LongWritable, Text, Text, DoubleWritable> {
    static Logger logger = Logger.getLogger(VeggiemealMapper.class);
    int iCaseTotal = 0;

    public void map(LongWritable ikey, Text ivalue, Mapper.Context context) throws IOException, InterruptedException {
        logger.info("ikey : " + ikey + ", ivalue : " + ivalue);
        PropertyConfigurator.configure("log4j.properties");
        String line = ivalue.toString();
        String DealData[] = line.split(", ");

        String dateStr = DealData[0].trim();
        String categoryStr = DealData[1].trim();
        String middleClassStr = DealData[2].trim();
        String nameStr = DealData[3].trim();
        int isIncome = Integer.parseInt(DealData[4].trim());
        int isKg = Integer.parseInt(DealData[5].trim());
        Double price = Double.parseDouble(DealData[6].trim());

        // if category or middleClass or name has ',', relpace ',' to '-'
        if(categoryStr.contains(",")) {
            categoryStr = categoryStr.replaceAll(",", "-");
        }
        if(middleClassStr.contains(",")) {
            middleClassStr = middleClassStr.replaceAll(",", "-");
        }
        if(nameStr.contains(",")) {
            nameStr = nameStr.replaceAll(",", "-");
        }

        // make keyStr
        String keyStr = dateStr + "," + categoryStr + "," + middleClassStr + "," + nameStr;

        // isIncome = 1 : Korea, isIncome = 0 : Income
        if(isIncome == 0) {
            keyStr += ",income,";
        } else {
            keyStr += ",korea,";
        }

        // 0922 : ignore per piece case
        // isKg = 1 : per piece, isKg = 0 : per 100g
        if(isKg == 1) {
            // keyStr += ",perPiece";
            return;
        } else {
            Text key = new Text(keyStr);
            context.write(key, new DoubleWritable(price));
        }
    }
    public static boolean isNumberic(String strNum) {
        if(strNum == null) {
            return false;
        }
        try {
            double d = Double.parseDouble(strNum);
        }catch(NumberFormatException nfe) {
            return false;
        }
        return true;
    }
}
