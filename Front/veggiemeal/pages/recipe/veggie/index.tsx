import Head from "next/head";
import Image from 'next/image';
import leafy from '/public/leafy_green.png';
import styles from 'styles/Veggie.module.scss';
import Form from 'react-bootstrap/Form';
import egg from '/public/egg.png';
import fish from '/public/fish.png';
import meat from '/public/meat.png';
import milk from '/public/milk.png';
import hen from '/public/hen.png';
import veggie from '/public/veggie.png';
import question from '/public/question.png';

export default function Veggie() {
  return (
    <div className={styles.container}>
      <Head>
        <title>채식 레시피 | 베지밀</title>
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <Image src={leafy} alt='leafy' quality={100} width={50} height={50} />
          <h1 className={styles.veggie_title}>채식을 부탁해</h1>
        </header>
        <section className={styles.veggie_intro}>
          <p>채식 단계를 선택해주세요! </p>
          <p>그에 맞는 레시피를 보여드릴게요. </p>
          <article className={styles.veggie_select}>
            <select>임시임</select>
            <div id={styles.veggie_imgs}>
              <div><Image src={veggie} alt='veggie' quality={100} width={40} height={40} /></div>
              <div><Image src={milk} alt='milk' quality={100} width={40} height={40} /></div>
              <div><Image src={egg} alt='egg' quality={100} width={40} height={40} /></div>
              <div><Image src={fish} alt='fish' quality={100} width={40} height={40} /></div>
              <div><Image src={hen} alt='hen' quality={100} width={40} height={40} /></div>
              <div><Image src={meat} alt='meat' quality={100} width={40} height={40} /></div>
              <div><Image src={question} alt='question' quality={100} width={25} height={25} /></div>
            </div>
          </article>
          <article className={styles.veggie_list}>
            <div className={styles.veggie_list_title}>
              <h4>락토베지테리언</h4>
              <h4>레시피 목록</h4>
              <Recipe />
            </div>
          </article>
        </section>
      </main>
    </div>
  )
}