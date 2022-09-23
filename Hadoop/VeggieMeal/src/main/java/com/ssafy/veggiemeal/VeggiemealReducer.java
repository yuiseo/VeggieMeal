package com.ssafy.veggiemeal;

import java.io.IOException;

import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.log4j.Logger;

public class VeggiemealReducer extends Reducer<Text, DoubleWritable, Text, DoubleWritable> {
    static Logger logger = Logger.getLogger(VeggiemealReducer.class);
    public void reduce(Text _key, Iterable<DoubleWritable> values, Context context) throws IOException, InterruptedException {
        double sum = 0;
        double count = 0;
        // process values
        for (DoubleWritable val : values) {
            sum += val.get();
            count++;
        }
        context.write(_key, new DoubleWritable(sum / count));
    }
}