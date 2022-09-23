import styles from 'styles/SelectBox.module.scss';
import { useState } from "react";

// data = select 박스에 나타나야 하는 옵션들
//  setState = setState 함수
// title = select 박스의 타이틀
// another = setState 외에 추가적으로 처리해야 하는 로직

type SelectProps = {
    data:string[],
    setState:any,
    title:string,
    another?:any
}

export default function SelectBox({data, setState, title, another}:SelectProps){
    const [choice, setChocie] = useState<string>(title);
    const [isToggle, setIsToggle] = useState<Boolean>(false);
    const len = data.length-1;
    return (
        <div className={styles.select}>
            <div className={styles.selected} onClick={() => {setIsToggle(value => !value)}}>
              <div className={styles.selected_value}>{choice}</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#5C5ACD" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
              </svg>
            </div>
            {isToggle ? 
            <ul className={styles.select_ul}>
            {data.map((item, index) => <li 
            key={index}
            className={
                (item === choice ? `${styles.choice_li} ` : 'not_chice_li ') + 
                (index === len ? `${styles.last_li} `: 
                index === 0 ? `${styles.first_li}` : 'just_li')}
            onClick={()=>{
                setState(item)
                setChocie(item)
                setIsToggle(value => !value)
                if(another){
                  another(item)
                }
                }}>{item}</li>)}
            </ul> : null
            }
            
          </div>
    )
}