import React, { useRef } from 'react'
import { clsx } from 'clsx';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'


import styles from './Home.module.scss'
import Header from "../../layout/Header/Header"
import Footer from "../../layout/Footer/Footer"
import silde1 from "../../assets/imgs/sildes/slide_1.svg"
import silde2 from "../../assets/imgs/sildes/slide_2.svg"
import silde3 from "../../assets/imgs/sildes/slide_3.jpg"
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

function HomePage() {
  const ref = useRef();
  return (
    <div className='home'>
      <Header />
      <div className={styles.slides}>
        <Carousel
          className={clsx(styles.carouselSlice)}
          autoplay
          dots
          pauseOnDotsHover
          pauseOnHover
          draggable
          ref={ref}
          autoplaySpeed={3500}
          style={{ backgroundColor: "#bed4c9", borderRadius: 12, marginLeft: 12, marginRight: 12 }}
        >
          {slides.length > 0 &&
            slides?.map(({ title, desc, img }, index) =>
              <Slide
                key={index}
                title={title}
                desc={desc}
                img={img}
              />)}
        </Carousel>
        <LeftOutlined
          onClick={() => ref.current.prev()}
          className={styles.preSlide} />
        <RightOutlined
          onClick={() => ref.current.next()}
          className={styles.nextSlide} />
      </div>
      <Footer />
    </div>
  )
}

export default HomePage