import styles from 'styles/MapModal.module.scss';

type MartModalProps={
    name:string,
    data:any
}

export default function MapModal({name, data}:MartModalProps){
    console.log("data", data)
    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <p style={{marginRight:'5px'}}>내 주변</p>
                <p className={name === "이마트" ? `${styles.emart_name}` : `${styles.homeplus_name}`}>{name}</p>
            </div>
            {}
            <div>
                {data?.map((item:any, index:string) => <p>{item['address_name']}</p>)}
            </div>
        </div>
    )
}