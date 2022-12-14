import styles from 'styles/Mart.module.scss';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import { useRef, useState } from 'react';
import {useRouter} from 'next/router';


type MartProps={
    title:string,
    price:number | undefined,
    isCheap:string | undefined,
    data:string[][] | undefined,
    setMart:any
}

export default function Mart({title, price, isCheap, data, setMart}: MartProps ){
    const router = useRouter();
    const martRef = useRef<any>();
    const [martUrl, setMartUrl] = useState<string>();
    let titleName:string;
    if(title === 'emart'){
        titleName='이마트';
    }else{
        titleName='홈플러스';
    }
    
    function DownloadMart(){
        const martImg = martRef.current;
        htmlToImage.toPng(martImg)
        .then((dataUrl) => {
            setMartUrl(dataUrl)
           download(dataUrl, 'veggieMeal')
    })};
    
    return(
        <article ref={martRef} className={`${title}_mart`} >
            <div className={`${title} ${styles.mart_container}`}>
                <div className={styles.header}>
                    <div className={styles.mart_icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16"
                    style={{marginRight:'10px'}}
                    onClick={()=>{
                        if(confirm(`${titleName} 목록을 초기화할까요?`) === true){
                            setMart([])
                        }
                    }}>
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                    </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-box-arrow-up" viewBox="0 0 16 16"
                        onClick={DownloadMart}>
                            <path fillRule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/>
                            <path fillRule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"/>
                        </svg>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-share-fill" viewBox="0 0 16 16"
                        onClick={ShareKakao}>
                            <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                        </svg> */}
                    </div>
                    <div className={styles.mart_title}>
                        {title === 'emart' ? <img src="/emart.png" width={35} height={35}  /> : <img src="/homeplus.png" width={35} height={35}  />}
                        {title === 'emart' ? <p>이마트</p> : <p>홈플러스</p>}
                    </div>
                </div>
                <hr className={styles.hr} style={{marginTop:'127px'}} />
                {price ? 
                <div className={styles.price}>
                    <p>총 가격 &nbsp;</p>
                    <p className={isCheap === title ? `${styles.cheaper}` : `${styles.not_cheap}`}>{String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                    <p>&nbsp; 원</p>
                </div>
                : 
                <div className={styles.price}>
                    <p>선택된 제품이 없어요</p>
                </div>
                }
                <hr className={styles.hr} />
                <div className={styles.map_btn} onClick={()=>{router.push(`cart/${title}`)}}>
                    {title === "emart" ?
                    <div className={styles.find_way}>
                        <p>내 주변 이마트 찾기</p>
                    </div>
                    : 
                    <div className={styles.find_way}>
                        <p>내 주변 홈플러스 찾기</p>
                    </div>
                    }
                </div>
                <div className={styles.item_list}>
                    {data?.map((item, index) => <div key={index} className={styles.user_item}>
                        <p className={styles.item_title}>{item[0]}</p>
                        <p className={styles.item_price}>{String(item[1]).replace(/\B(?=(\d{3})+(?!\d))/g, ',') +"원" }</p>
                    </div>)}
                </div>
            </div>
        </article>
    )
}