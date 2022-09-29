import styles from 'styles/News.module.scss';
import {useRouter} from 'next/router';


type NewsProps={
    data:{[key:string]:string}
}

export default function News({data}:NewsProps){
    const router = useRouter();
    const date = new Date(data['pubDate'])
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const description = data['description'].replaceAll("&quot;", "").replaceAll("&apos;", "").replaceAll("<b>", "").replaceAll("</b>", "");
    const title = data['title'].replaceAll("&quot;", "").replaceAll("&apos;", "").replaceAll("<b>", "").replaceAll("</b>", "");
    return(
        <div className={styles.news_div}>
            <p className={styles.date}>{year}.{month}.{day}</p>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
        </div>
    )
}