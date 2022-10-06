import styles from 'styles/RecipeStep.module.scss';
interface StepDataProps {
  no: number;
  description: string;
}
export default function RecipeStep({ no, description }: StepDataProps) {
  return (
    <>
      <div className={styles.box}>
        {/* 순서 번호 */}
        <div className={styles.number}>
          {no > 10 ? <p>{no}</p> : <p>0{no}</p>}
        </div>
        {/* 만드는 방법 상세 */}
        <div className={styles.detail}>
          <p style={{fontWeight:'500'}}>
            {description}
          </p>
        </div>
      </div>
    </>
  )
}