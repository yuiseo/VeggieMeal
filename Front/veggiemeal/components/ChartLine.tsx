import styles from 'styles/ChartLine.module.scss';
import dynamic from 'next/dynamic';
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PriceDataProps {
  priceData?: any;
  selectTitle?: string;
}
export default function ChartColumn({ priceData, selectTitle }: PriceDataProps) {
  // console.log('hihi', priceData)
  // console.log(priceData[0].price)
  let priceList: number[] = priceData.map(({ price }: any) => price)
  // console.log(priceList)
  let PriceDate: string[] = priceData.map(({ dealDate }: any) => dealDate.slice(4, 6) + '월 ' + dealDate.slice(6, 8) + '일')
  // console.log(PriceDate)
  return (
    <div className={styles.Container}>
      <ApexChart
        type='area'
        series={[
          {
            name: '물가 평균',
            data: priceList,
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
            text: `{ ${selectTitle} }의 평균 물가`,
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