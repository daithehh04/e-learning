import React from 'react'
import { clsx } from 'clsx';
import styles from './Home.module.scss'
import Header from "../../layout/Header/Header"
import Footer from "../../layout/Footer/Footer"
import silde1 from "../../assets/imgs/sildes/slide_1.svg"
import silde2 from "../../assets/imgs/sildes/slide_2.svg"
import silde3 from "../../assets/imgs/sildes/silde_3.jpg"
import { Carousel } from "antd";
import Slide from '../../components/Slide/Slide';

const slides = [
  {
    title: "Học thoải mái tại nhà riêng của bạn",
    desc: "Circuit là nhà cung cấp đào tạo toàn cầu có trụ sở trên khắp Vương quốc Anh, chuyên về các khóa đào tạo được công nhận và thiết kế riêng.",
    img: silde1
  },
  {
    title: "Chúng tôi chia sẻ kiến thức với thế giới",
    desc: "Circuit là nhà cung cấp đào tạo toàn cầu có trụ sở trên khắp Vương quốc Anh, chuyên về các khóa đào tạo được công nhận và thiết kế riêng.",
    img: silde2
  },
  {
    title: "Bạn học hôm nay và kiếm được vào ngày mai.",
    desc: "Circuit là nhà cung cấp đào tạo toàn cầu có trụ sở trên khắp Vương quốc Anh, chuyên về các khóa đào tạo được công nhận và thiết kế riêng.",
    img: silde3
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
      >
        {slides.length > 0 &&
          slides?.map(({ title, desc, img }) =>
            <Slide
              title={title}
              desc={desc}
              img={img}
            />)}

      </Carousel>
      <Footer />
    </div>
  )
}

export default HomePage