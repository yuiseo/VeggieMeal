package com.ssafy.veggiemeal;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class VeggiemealDriver {
    public static void main(String[] args) throws Exception {
        long beforeTime = System.currentTimeMillis();
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "VeggieMeal");
        job.setJarByClass(com.ssafy.veggiemeal.VeggiemealDriver.class);
        job.setMapperClass(com.ssafy.veggiemeal.VeggiemealMapper.class);
        job.setReducerClass(com.ssafy.veggiemeal.VeggiemealReducer.class);
        // TODO: specify output types
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(DoubleWritable.class);
        // TODO: specify input and output DIRECTORIES (not files)
        FileInputFormat.setInputPaths(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));
        if (!job.waitForCompletion(true))
            return;
        long afterTime = System.currentTimeMillis();
        long difTime = afterTime - beforeTime;
        System.out.println("-------------------------------------------------------------------------");
        System.out.println("run Time : " + difTime + "ms");
        System.out.println("-------------------------------------------------------------------------");
    }
}