import styles from 'styles/Table.module.scss';
interface TableProps {
  dealData: any;
  tableColumns: any;
}

interface DataProps {
  dealDate: string;
  max: number;
  min: number;
  price: number;
  index?: number;
  selectTitle: string;
}

export default function Table({ dealData, tableColumns }: TableProps) {
  // console.log(index)
  return (
    <div className={styles.table_Container}>
      <table style={{ textAlign: 'center' }}>
        {/* table의 제목 행 */}
        <thead>
          <tr>
            {tableColumns.map((column: string) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>

        {/* data */}
        <tbody>
          {dealData && dealData.sort().reverse().map(({ dealDate, max, min, price }: DataProps) => (
            <tr key={dealDate}>
              <td>{dealDate.slice(4, 6)}/{dealDate.slice(6, 8)}</td>
              <td style={{ color: 'red' }}>▲{max.toLocaleString()}</td>
              <td style={{ color: 'blue' }}>▼{min.toLocaleString()}</td>
              <td>&nbsp;&nbsp;{price.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className={styles.footer}>
        <p>단위 : 원/100g</p>
      </div> */}
    </div>
  )
}