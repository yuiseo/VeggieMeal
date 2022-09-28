import styles from 'styles/ChartColumn.module.scss';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });


export default function ChartLine() {
  const dumidata = [
    {
      type: 'bar',
      name: '최고가',
      data: [3000, 1000, 2000, 6000, 8000, 500, 1000, 700],
    },
    {
      type: 'bar',
      name: "최저가",
      data: [3000, 1000, 2000, 6000, 8000, 500, 1000, 700],
    },
  ]


  return (
    <div className={styles.Container}>
      <ApexChart
        // style={{ width: '400px' }}
        series={dumidata}
        options={{
          // responsive: [{
          //   breakpoint: 800,
          // }],

          chart: {
            // height: 1000,
            stacked: true,
            toolbar: {
              show: false,
            },
            background: 'transparent',
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '80%'
            },
          },

          labels: ['9월 7일', '9월 7일', '9월 7일', '9월 7일', '9월 7일', '9월 7일', '9월 7일', '9월 7일',],
          xaxis: {
            type: 'category'
          },
          yaxis: {
            max: function (max) {
              return Math.max(max) + 1000
            },
            forceNiceScale: true,

            labels: {
              formatter: function (value) {
                return value.toLocaleString()
              }
            },
          },
          stroke: {
            curve: "smooth",
            // width: 4,
          },
          colors: ['#29B973', '#5C5ACD']
        }}
      >
      </ApexChart>
    </div>
  )
}