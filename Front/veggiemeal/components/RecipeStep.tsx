import styles from 'styles/RecipeStep.module.scss';
export default function RecipeStep() {
  return (
    <>
      <div className={styles.box}>
        {/* 순서 번호 */}
        <div className={styles.number}>
          <p>10</p>
        </div>
        {/* 만드는 방법 상세 */}
        <div className={styles.detail}>
          <p>
            달궈진 프라이팬에 기름을 두르고, 감자를 먼저 볶다가 투명해지면 나머지 채소를 볶는다.
          </p>
        </div>
      </div>
    </>
  )
}