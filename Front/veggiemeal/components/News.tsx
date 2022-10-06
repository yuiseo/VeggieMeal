import styles from 'styles/News.module.scss';
import {useRouter} from 'next/router';


type NewsProps={
    data:{[key:string]:string}
}

export default function News({data}:NewsProps){
    const router = useRouter();
    const description = data['description'].replaceAll("&quot;", "").replaceAll("&apos;", "").replaceAll("<b>", "").replaceAll("</b>", "");
    const title = data['title'].replaceAll("&quot;", "").replaceAll("&apos;", "").replaceAll("<b>", "").replaceAll("</b>", "");
    return(
        <div className={styles.news_div} onClick={()=>{window.open(`${data['link']}`)}}>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
        </div>
    )
}