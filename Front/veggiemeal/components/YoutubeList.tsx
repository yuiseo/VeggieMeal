import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from 'styles/YoutubeList.module.scss';

interface YoutubeProps {
  children?: any;
  title: any;
  high: any;
  videoId: any;
}

export default function YoutubeList({ title, high, videoId }: YoutubeProps) {
  console.log(title)
  const router = useRouter()
  return (
    <div className={styles.box}>
      {/* 섬네일 이미지 */}
      <div className={styles.thumbnail_box}>
        <img src={high.url} id={styles.thumbnail} onClick={() => router.push(`https://www.youtube.com/watch?v=${videoId}`)}>
          {/* <Image sizes={'50vw'} src={high.url} width={high.width} height={high.height} /> */}
          {/* <img src={high.url}></img> */}
        </img>
      </div>
      {/* 유튜브 영상 */}
      <div className={styles.content}>
        <p onClick={() => router.push(`https://www.youtube.com/watch?v=${videoId}`)}>{title}</p>
      </div>
    </div>
  )
}
