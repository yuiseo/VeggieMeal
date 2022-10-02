import styles from 'styles/Button.module.scss';

type BtnProps = {
    content:string,
    bgColor:string,
    textSize:string,
}

export default function Btn ({content, bgColor, textSize} : BtnProps){
    return (
        <button className={`${styles.Btn} ${styles[bgColor]} ${styles[textSize]}`}>{content}</button>
    )
}

Btn.defaultProps = {
    bgColor: 'green',
    textSize: 'medium'
}