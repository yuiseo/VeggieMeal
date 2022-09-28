import styles from 'styles/VeggieModal.module.scss';

type VeggieModalProps={
    setShow:any,
}

export default function VeggieModal({setShow}:VeggieModalProps){
    return(
        <div className={styles.modal_bg}>
            <aside className={styles.modal}>
                <header>
                    <div>
                        <span>채식</span>
                        <span style={{color:'#29B973'}}>&nbsp;7단계</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#5C5ACD" className="bi bi-x-lg" viewBox="0 0 16 16"
                    stroke="#5C5ACD" strokeWidth={3}>
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                </header>
                <div className={styles.info}>
                    <p>각 단계마다 표시된 재료만 섭취해요</p>
                    <div>
                        <span style={{fontWeight:'600', color:'#5C5ACD'}}>*&nbsp;</span>
                        <span>플렉시테리언은 기본적으로 채식주의를 지향하되, 때에 따라 육류를 섭취해요.</span>
                    </div>
                </div>
            </aside>
        </div>
    )
}