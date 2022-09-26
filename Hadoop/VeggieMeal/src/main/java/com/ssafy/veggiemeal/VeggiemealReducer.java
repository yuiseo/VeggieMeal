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
        double max = Integer.MIN_VALUE;
        double min = Integer.MAX_VALUE;
        // process values
        for (DoubleWritable val : values) {
            sum += val.get();
            count++;
            max = Math.max(max, val.get());
            min = Math.min(min, val.get());
        }
        String keyStr = _key.toString();
        keyStr += Double.toString(max);
        keyStr += ",";
        keyStr += Double.toString(min);
        keyStr += ",";
        _key = new Text(keyStr);
        context.write(_key, new DoubleWritable(sum / count));
    }
}