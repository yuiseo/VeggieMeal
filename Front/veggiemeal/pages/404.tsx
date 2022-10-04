import Image from 'next/image';
import styles from 'styles/NotFound.module.scss';
import Head from "next/head";
import { useRouter } from 'next/router';


const Tada = require('react-reveal/Tada');


export default function Error(){

    const router = useRouter();
    return(
        <>
        <Head>
            <title>404 | 베지밀</title>
        </Head>
            <main>
                <Tada>
                  <p className={styles.title}>404</p>
                </Tada>
                <p className={styles.not_found}>Not Found</p>
                <div className={styles.info}>
                    <p>페이지를 찾을 수 없어요!</p>
                    <p>죄송한 마음을 담아 귀여운 코끼리를 보여 드릴게요.</p>
                </div>
                <Image src="/elephant.png" width={300} height={300} quality={100} onClick={()=>{router.push("/")}} />
                <div className={styles.to_main}>
                    <span style={{fontWeight:'800', color:'#29B973'}}>* </span>
                    <span>코끼리를 클릭하시면 메인 페이지로 데려다 드려요</span>
                </div>
            </main>
        </>
    )
}