import Head from "next/head";
import Image from 'next/image';
import styles from 'styles/Veggie.module.scss';

import leafy from '/public/leafy_green.png';
import egg from '/public/egg.png';
import fish from '/public/fish.png';
import meat from '/public/meat.png';
import milk from '/public/milk.png';
import hen from '/public/hen.png';
import veggie from '/public/veggie.png';

import RecipeList from 'components/RecipeList';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Veggie() {
  const dumidata = [
    {
      recipeId: 1,
      name: '나물 비빔밥',
      cal: 500,
      hour: 60,
      category: '한식',
      recipeImg: 'https://media.istockphoto.com/photos/bi-bim-bap-picture-id183752521?k=20&m=183752521&s=612x612&w=0&h=SPJ7HvPRH7zwyHbiSqrTjVGUDlk8pyxl0YOKawWwNjU=',
    },
    {
      recipeId: 2,
      name: '나물 비빔밥',
      cal: 500,
      hour: 60,
      category: '한식',
      recipeImg: 'https://media.istockphoto.com/photos/bi-bim-bap-picture-id183752521?k=20&m=183752521&s=612x612&w=0&h=SPJ7HvPRH7zwyHbiSqrTjVGUDlk8pyxl0YOKawWwNjU='
    },
    {
      recipeId: 3,
      name: '나물 비빔밥',
      cal: 500,
      hour: 60,
      category: '한식',
      recipeImg: 'https://media.istockphoto.com/photos/bi-bim-bap-picture-id183752521?k=20&m=183752521&s=612x612&w=0&h=SPJ7HvPRH7zwyHbiSqrTjVGUDlk8pyxl0YOKawWwNjU='
    },
    {
      recipeId: 4,
      name: '나물 비빔밥',
      cal: 500,
      hour: 60,
      category: '한식',
      recipeImg: 'https://media.istockphoto.com/photos/bi-bim-bap-picture-id183752521?k=20&m=183752521&s=612x612&w=0&h=SPJ7HvPRH7zwyHbiSqrTjVGUDlk8pyxl0YOKawWwNjU='
    },
    {
      recipeId: 5,
      name: '나물 비빔밥',
      cal: 500,
      hour: 60,
      category: '한식',
      recipeImg: 'https://media.istockphoto.com/photos/bi-bim-bap-picture-id183752521?k=20&m=183752521&s=612x612&w=0&h=SPJ7HvPRH7zwyHbiSqrTjVGUDlk8pyxl0YOKawWwNjU='
    },
    {
      recipeId: 6,
      name: '나물 비빔밥',
      cal: 500,
      hour: 60,
      category: '한식',
      recipeImg: 'https://media.istockphoto.com/photos/bi-bim-bap-picture-id183752521?k=20&m=183752521&s=612x612&w=0&h=SPJ7HvPRH7zwyHbiSqrTjVGUDlk8pyxl0YOKawWwNjU='
    },
    {
      recipeId: 7,
      name: '나물 비빔밥',
      cal: 500,
      hour: 60,
      category: '한식',
      recipeImg: 'https://media.istockphoto.com/photos/bi-bim-bap-picture-id183752521?k=20&m=183752521&s=612x612&w=0&h=SPJ7HvPRH7zwyHbiSqrTjVGUDlk8pyxl0YOKawWwNjU='
    },

  ]
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

          {/* 비건 단계 */}
          <div id={styles.veggie_imgs}>
            <div><Image src={veggie} alt='veggie' quality={100} width={40} height={40} /></div>
            <div><Image src={milk} alt='milk' quality={100} width={40} height={40} /></div>
            <div><Image src={egg} alt='egg' quality={100} width={40} height={40} /></div>
            <div><Image src={fish} alt='fish' quality={100} width={40} height={40} /></div>
            <div><Image src={hen} alt='hen' quality={100} width={40} height={40} /></div>
            <div><Image src={meat} alt='meat' quality={100} width={40} height={40} /></div>
            {/* 모달창을 위한 물음표 */}
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#FFB500" className="bi bi-question-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
              </svg>
            </div>
          </div>
          {/* select 박스 */}
          <div>
            <Form.Select aria-label="비건단계 선택" style={{ marginTop: 20 }}>
              <option>임시로 부트스트랩인데 꽤 예쁜데요...?</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>

          {/* 레시피 목록 */}
          <div className={styles.veggie_list_title}>
            <h3>{'{'} </h3>
            <h3>락토베지테리언</h3>
            <h3> {'}'}</h3>
            <h3>레시피 목록</h3>
          </div>
          <article className={styles.veggie_list}>
            <Container>
              <Row>
                {dumidata.map((item, index) => <RecipeList key={`recipeId`} {...item}><Col /></RecipeList>)}
              </Row>
            </Container>
          </article>
        </section>
      </main>
    </div >
  )
}