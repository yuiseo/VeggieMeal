import styles from 'styles/ChartLine.module.scss';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PriceDataProps {
  priceData: any;
  selectTitle?: any;
}
export default function ChartColumn({ priceData, selectTitle }: PriceDataProps) {
  let priceList: any = priceData && priceData.map(({ price }: any) => price)
  let PriceDate: any = priceData && priceData.map(({ dealDate }: any) => dealDate.slice(4, 6) + '월 ' + dealDate.slice(6, 8) + '일')
  return (
    <div className={styles.Container}>
      <ApexChart
        height={400}
        type='area'
        series={[
          {
            name: '물가 평균',
            data: priceList === undefined ? [1] : priceList,
          }
        ]}
        options={{
          chart: {
            // height: 300,
            toolbar: {
              show: false,
            },
            background: 'transparent',
          },
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
          dataLabels: {
            enabled: false
          },
          labels: PriceDate,
          xaxis: {
            type: 'category',
            position: 'bottom',

          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return value.toLocaleString() + "원"
              }
            },
            forceNiceScale: true,
            max: function (max) {
              return Math.max(max) + 1
            },
          },
          colors: ['#5C5ACD'],
          title: {
            text: `${selectTitle}의 평균 물가`,
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize: '25px',
              fontFamily: 'SUIT Variable',
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