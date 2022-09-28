import Image from 'next/image';
import Ingredient from 'components/Ingredient';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from 'styles/IngredientSlider.module.scss';
import left from '/public/left.png';
import right from '/public/right.png';

SwiperCore.use([Navigation, Pagination]);


export default function IngredientSlider() {
  const DumiData = [
    {
      recipe_id: 1,
      name: '양파',
    },
    {
      recipe_id: 2,
      name: '대파',
    },
    {
      recipe_id: 3,
      name: '버섯',
    },
    {
      recipe_id: 4,
      name: '콩나물',
    },
    {
      recipe_id: 5,
      name: '시금치',
    },
    {
      recipe_id: 6,
      name: '무',
    },
  ]

  return (
    <div className={styles.slider_box}>
      <Swiper
        style={{ maxWidth: '85vw' }}
        spaceBetween={10}
        slidesPerView={3}
        slidesPerGroup={3}
        scrollbar={{
          draggable: true,
          // el: '.swiper-scrollbar',
        }}
        observer={true}
        observeParents={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        // pagination={{ clickable: true }}
        breakpoints={{
          350: {
            slidesPerView: 1.5,
            // slidesPerGroup: 1
          },
          550: {
            slidesPerView: 2,
          },
          750: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 3.4,
          }
        }}
      >

        {DumiData.map((item, index) => <SwiperSlide key={index}><Ingredient {...item} /></SwiperSlide>)}
        {/* <div class="swiper-pagination"></div> */}

      </Swiper>


    </div >
  )
}