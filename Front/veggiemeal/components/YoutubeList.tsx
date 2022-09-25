
import styles from 'styles/YoutubeList.module.scss';
export default function YoutubeList() {


  return (
    <>
      <div className={styles.box}>
        {/* 섬네일 이미지 */}
        <div className={styles.thumbnail_box}>
          <div id={styles.thumbnail}></div>
        </div>
        {/* 유튜브 영상 설명 */}
        <div className={styles.content}>
          <p>유튜브 영상 이름이 들어 갈 곳 입니다람쥐이이이이잉</p>
        </div>
      </div>
    </>
  )
}
