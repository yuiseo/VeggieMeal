import styles from 'styles/Table.module.scss';
interface TableProps {
  tableData: any;
  tableColumns: any;
}

interface DataProps {
  date: string;
  max_val: number;
  min_val: number;
  val: number;
  index?: number;
}

export default function Table({ tableData, tableColumns }: TableProps) {
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
          {tableData.map(({ date, max_val, min_val, val, index }: DataProps) => (
            <tr key={index}>
              <td>{date}</td>
              <td style={{ color: 'red' }}>▲{max_val.toLocaleString()}</td>
              <td style={{ color: 'blue' }}>▼{min_val.toLocaleString()}</td>
              <td>{val.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}