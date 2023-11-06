import React from 'react'
import { clsx } from 'clsx';
import styles from './Home.module.scss'
import Header from "../../layout/Header/Header"
import Footer from "../../layout/Footer/Footer"
import silde1 from "../../assets/imgs/sildes/slide_1.jpg"
import silde2 from "../../assets/imgs/sildes/slide_2.jpg"
import silde3 from "../../assets/imgs/sildes/silde_3.jpg"
import { Carousel } from "antd";
import Slide from '../../components/Slide/Slide';

const slides = [
  {
    title: "Học thoải mái tại nhà riêng của bạn",
    desc: "Circuit là nhà cung cấp đào tạo toàn cầu có trụ sở trên khắp Vương quốc Anh, chuyên về các khóa đào tạo được công nhận và thiết kế riêng.",
    img: silde_1
  }
]
const PrevArrowCarousel = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        color: "#000",
        fontSize: "2rem",
      }}
      onClick={onClick}
    >
      <FaChevronLeft />
    </div>
  );
};

const NextArrowCarousel = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        color: "#000",
        fontSize: "2rem",
      }}
      onClick={onClick}
    >
      <FaChevronRight />
    </div>
  );
};
function HomePage() {
  return (
    <div className='home'>
      <Header />
      <Carousel
        className={clsx()}
        dots={true}
        autoplay={true}
        pauseOnDotsHover={true}
        pauseOnFocus={true}
        infinite={true}
        draggable={false}
        autoplaySpeed={4000}
        initialSlide={0}
        slidesToShow={4}
        slidesToScroll={4}
        arrows={true}
        nextArrow={<NextArrowCarousel />}
        prevArrow={<PrevArrowCarousel />}
        responsive={[
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              initialSlide: 0,
              arrows: false,
              draggable: true,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 0,
              arrows: false,
              draggable: true,
            },
          },
        ]}
      >
        <Slide />

      </Carousel>
      <Footer />
    </div>
  )
}

export default HomePage