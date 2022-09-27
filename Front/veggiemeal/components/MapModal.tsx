import styles from 'styles/MapModal.module.scss';
import Image from 'next/image';

type MartModalProps={
    name:string,
    data:any,
    setSelectedMart:any
}

export default function MapModal({name, data, setSelectedMart}:MartModalProps){
    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <p style={{marginRight:'5px'}}>내 주변</p>
                <p className={name === "이마트" ? `${styles.emart_name}` : `${styles.homeplus_name}`}>{name}</p>
            </div>
            <article>
                {data?.map((item:any, index:string) => <div key={index} className={styles.mart_div}
                onClick={()=>{setSelectedMart(item)}}>
                    <div className={styles.mart_header}>
                    {name === "이마트" ? <Image src="/emart.png" width={30} height={30} /> :  <Image src="/homeplus.png" width={30} height={30} />}
                    <p>{item['place_name']}</p>
                    </div>
                    <div className={styles.mart_location}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#3E3E3E" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>
                    <p>{item['road_address_name']}</p>
                    </div>
                    <div className={styles.mart_location}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                    </svg>
                    <a href={item['place_url']} target="_blank">상세보기</a>
                    </div>
                    <a href={`	https://map.kakao.com/link/to/${item['id']}`} target="_blank" className={styles.find_road_btn}>
                        <button>카카오맵 길찾기</button>
                    </a>
                </div>)}
            </article>
        </div>
    )
}