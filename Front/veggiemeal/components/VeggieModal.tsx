import styles from 'styles/VeggieModal.module.scss';
import Image from 'next/image';

type VeggieModalProps={
    setShow:any,
}

export default function VeggieModal({setShow}:VeggieModalProps){
    return(
        <div className={styles.modal_bg} onClick={()=>{setShow(false)}}>
            <aside className={styles.modal}>
                <header>
                    <div>
                        <span>채식</span>
                        <span style={{color:'#29B973'}}>&nbsp;7단계</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#5C5ACD" className="bi bi-x-lg" viewBox="0 0 16 16"
                    stroke="#5C5ACD" strokeWidth={3} onClick={()=>{setShow(false)}}>
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
                <div className={styles.step_div}>
                    <div className={styles.step}>
                        <p>비건</p>
                        <Image src="/veggieStep/vegan.png" width={340} height={60} quality={100} />
                    </div>
                    <div className={styles.step}>
                        <p>락토 베지테리언</p>
                        <Image src="/veggieStep/lacto.png" width={340} height={60} quality={100} />
                    </div>
                    <div className={styles.step}>
                        <p>오보 베지테리언</p>
                        <Image src="/veggieStep/ovo.png" width={340} height={60} quality={100} />
                    </div>
                    <div className={styles.step}>
                        <p>락토 오보 베지테리언</p>
                        <Image src="/veggieStep/lactoOvo.png" width={340} height={60} quality={100} />
                    </div>
                    <div className={styles.step}>
                        <p>페스코 베지테리언</p>
                        <Image src="/veggieStep/pesco.png" width={340} height={60} quality={100} />
                    </div>
                    <div className={styles.step}>
                        <p>폴로 베지테리언</p>
                        <Image src="/veggieStep/pollo.png" width={340} height={60} quality={100} />
                    </div>
                    <div className={styles.step}>
                        <p>플렉시테리언</p>
                        <Image src="/veggieStep/flexi.png" width={340} height={60} quality={100} />
                    </div>
                </div>
            </aside>
        </div>
    )
}