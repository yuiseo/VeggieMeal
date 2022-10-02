import styles from 'styles/ChartColumn.module.scss';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PriceDataProps {
  selectTitle?: string;
  priceData?: any;
}
export default function ChartLine({ selectTitle, priceData }: PriceDataProps) {
  let maxPrice: any = priceData.map(({ max }: any) => max)
  console.log('max', maxPrice)
  let minPrice: any = priceData.map(({ min }: any) => min)
  console.log('min', minPrice)
  let PriceDate: any = priceData.map(({ dealDate }: any) => dealDate.slice(4, 6) + '월 ' + dealDate.slice(6, 8) + '일')
  console.log('date', PriceDate)
  const realData: any[] = [
    {
      type: 'bar',
      name: '최저가',
      data: minPrice,
    },
    {
      type: 'bar',
      name: '최고가',
      data: maxPrice,
    },
  ]


  return (
    <div className={styles.Container}>
      <ApexChart
        // style={{ width: '30rem' }}
        series={realData}
        options={{
          // responsive: [{
          //   breakpoint: 800,
          // }],
          noData: {
            text: '데이터가 없어요',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: '14px',
              fontFamily: 'SUIT Variable'
            }
          },

          chart: {
            toolbar: {
              show: false,
            },
            background: 'transparent',
          },

          plotOptions: {
            bar: {
              // columnWidth: '100%',
              horizontal: false,
              borderRadius: 10,
              // dataLabels: {
              //   // position: 'top',
              // }
            },
          },
          // dataLabels: {
          //   enabled: true,
          //   formatter: function (val) {
          //     return Math.floor(Number(val)) + "원";
          //   },
          //   offsetY: -20,
          //   style: {
          //     fontSize: '12px',
          //   }
          // },

          labels: PriceDate,
          xaxis: {
            type: 'category',
            // categories: PriceDate,

          },
          yaxis: {
            max: function (max) {
              return Math.max(max) + 100
            },
            min: 0,
            forceNiceScale: true,

            labels: {
              formatter: function (value) {
                return value.toLocaleString() + "원"
              }
            },
          },
          stroke: {
            // curve: "smooth",
            // width: 10,
          },
          colors: ['#29B973', '#5C5ACD'],
          title: {
            text: `{ ${selectTitle} }의 최저가 및 최고가`,
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize: '20px',
              fontWeight: 'bold',
              fontFamily: 'SUIT Variable',
              color: '#263238'
            },
          },
        }
        }
      >
      </ApexChart>
    </div >
  )
}