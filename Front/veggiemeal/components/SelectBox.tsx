import styles from 'styles/SelectBox.module.scss';
import { useState } from "react";

// data = select 박스에 나타나야 하는 옵션들
//  setState = setState 함수
// title = select 박스의 타이틀
// another = setState 외에 추가적으로 처리해야 하는 로직

type SelectProps = {
  data: string[] | undefined,
  setState: any,
  title: string,
  another?: any,
  dict?: { [key: string]: string }
}

export default function SelectBox({ data, setState, title, another, dict }: SelectProps) {
  const [choice, setChocie] = useState<string>(title);
  const [isToggle, setIsToggle] = useState<Boolean>(false);
  let len: number;
  if (data) {
    len = data.length - 1;
  }
  return (
    <div className={styles.select}>
      <div className={styles.selected} onClick={() => { setIsToggle(value => !value) }}>
        <div className={styles.selected_value}>{choice}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#5C5ACD" className="bi bi-caret-down-fill" viewBox="0 0 16 16" style={{ marginLeft: '10px' }}>
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      </div>
      {isToggle ?
        (data ?
          <ul className={styles.select_ul}>
            {data.map((item, index) => <li
              key={index}
              className={
                (item === choice ? `${styles.choice_li} ` : 'not_chice_li ') +
                (len === 0 ? `${styles.only_li}` : 
                  (index === 0 ? `${styles.first_li} ` : 
                    index === len ? `${styles.last_li}` : 'just_li')
                )}
              onClick={() => {
                if (dict) {
                  setState(dict[item])
                } else {
                  setState(item)
                }
                setChocie(item)
                setIsToggle(value => !value)
                if (another) {
                  another(item)
                }
              }}>{item}</li>)}
          </ul>
          :
          <ul className={styles.select_ul}>
            <li className={styles.first_li}>선택해주세요.</li>
          </ul>
        )
        : null}

    </div>
  )
}