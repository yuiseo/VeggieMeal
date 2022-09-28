import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });


export default function ChartColumn() {


  return (
    // <>
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
          // min: function (min) {
          //   return Math.min(min) - 100
          // },
        },
        colors: ['#5C5ACD']
      }}
    >
    </ApexChart >
    // </>
  )
}