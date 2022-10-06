import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from 'styles/YoutubeList.module.scss';

interface YoutubeProps {
  channelTitle: any;
  children?: any;
  title: any;
  high: any;
  videoId: any;

}
interface YouProps {
  newdata: any;
}


// export async function getServerSideProps({ videoId: any }) {
//   const res = await fetch(
//     `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet,statistics`
//     // `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics${videoId}&maxResults=1&key=${process.env.YOUTUBE_API_KEY}`
//   );
//   const newdata = await res.json();
//   return {
//     props: {
//       newdata
//     }
//   };
// }
export default function YoutubeList({ title, high, videoId, channelTitle }: YoutubeProps, { newdata }: YouProps) {
  // console.log(title)
  // console.log(channelTitle)
  const router = useRouter()
  // console.log(newdata)
  return (
    <div className={styles.box}>
      {/* 섬네일 이미지 */}
      <div className={styles.thumbnail_box}>
        <img src={high.url} id={styles.thumbnail} onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`)}>
          {/* <Image sizes={'50vw'} src={high.url} width={high.width} height={high.height} /> */}
          {/* <img src={high.url}></img> */}
        </img>
      </div>
      {/* 유튜브 영상 */}
      <div className={styles.content}>
        <p className={styles.channel_title}>{channelTitle}</p>
        <p onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`)}>{title}</p>
      </div>
    </div>
  )
}


