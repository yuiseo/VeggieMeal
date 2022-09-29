import styles from 'styles/ChartLine.module.scss';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });


export default function ChartColumn() {


  return (
    <div className={styles.Container}>
      <ApexChart
        type='area'
        series={[
          {
            name: '물가 평균',
            data: [3000, 1000, 2000, 6000, 8000, 500, 10000, 700],
          }
        ]}
        options={{
          chart: {
            height: 300,
            toolbar: {
              show: false,
            },
            background: 'transparent',
          },
          dataLabels: {
            enabled: false
          },
          labels: ['9월 7일', '9월 7일', '9월 7일', '9월 7일', '9월 7일', '9월 7일', '9월 7일', '9월 7일',],
          xaxis: {
            type: 'category'
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return value.toLocaleString()
              }
            },
            forceNiceScale: true,
            max: function (max) {
              return Math.max(max) + 1
            },
          },
          colors: ['#5C5ACD'],
          title: {
            text: '~의 평균 물가',
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize: '25px',
              fontWeight: 'bold',
              color: '#263238'
            },
          }
        }}
      >
      </ApexChart >
    </div>
  )
}