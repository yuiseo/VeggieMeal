import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ChartLine() {


  return (
    <>
      <ApexChart
        style={{ width: '400px' }}
        series={[
          {
            type: 'bar',
            name: '물가 평균',
            data: [3000, 1000, 2000, 6000, 8000, 500, 1000, 700],
          },
          {
            type: 'bar',
            name: "뭐 넣기로 했죠",
            data: [3000, 1000, 2000, 6000, 8000, 500, 1000, 700],
          },
        ]}
        options={{
          // responsive: [{
          //   breakpoint: 800,
          // }],

          chart: {
            // height: 400,

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
    </>
  )
}