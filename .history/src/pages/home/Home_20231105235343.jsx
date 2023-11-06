import React from 'react'
import { clsx } from 'clsx';
import styles from './Home.module.scss'
import Header from "../../layout/Header/Header"
import Footer from "../../layout/Footer/Footer"
import { Carousel } from "antd";
function HomePage() {
  const PrevArrowCarousel = (props: any) => {
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

  const NextArrowCarousel = (props: any) => {
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


      </Carousel>
      <Footer />
    </div>
  )
}

export default HomePage