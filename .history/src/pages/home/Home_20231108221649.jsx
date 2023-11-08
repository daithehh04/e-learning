import React, { useRef, useState } from 'react'
import { clsx } from 'clsx';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'


import styles from './Home.module.scss'
import Header from "../../layout/Header/Header"
import Footer from "../../layout/Footer/Footer"
import silde1 from "../../assets/imgs/sildes/slide_1.svg"
import silde2 from "../../assets/imgs/sildes/slide_2.svg"
import silde3 from "../../assets/imgs/sildes/slide_3.jpg"
import imgCources1 from "../../assets/imgs/courses/imgCourses1.svg"
import imgCources2 from "../../assets/imgs/courses/imgCourses2.svg"
import imgCources3 from "../../assets/imgs/courses/imgCourses3.svg"
import imgCources4 from "../../assets/imgs/courses/imgCourses4.svg"
import imgCources5 from "../../assets/imgs/courses/imgCourses5.svg"
import imgCources6 from "../../assets/imgs/courses/imgCourses6.svg"
import imgCources7 from "../../assets/imgs/courses/imgCourses7.svg"
import imgCources8 from "../../assets/imgs/courses/imgCourses8.svg"
import imgCources9 from "../../assets/imgs/courses/imgCourses9.svg"
import imgCources10 from "../../assets/imgs/courses/imgCourses10.svg"
import imgCources11 from "../../assets/imgs/courses/imgCourses11.svg"
import imgCources12 from "../../assets/imgs/courses/imgCourses12.svg"
import { Carousel } from "antd";
import CourseItems from '../../components/CourseItems/CourseItems';
import Slide from '../../components/Slide/Slide';
import Marquee from "../../components/Marquee/Marquee"

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
import React from 'react'

function HomePage() {
  const ref = useRef();
  return (
    <div className='home'>
      <Header />
      <main>
        <Marquee />
        <section className={clsx(styles.slides)}>
          <Carousel
            className={clsx(styles.carouselSlice)}
            autoplay
            dots
            pauseOnDotsHover
            pauseOnHover
            draggable
            ref={ref}
            autoplaySpeed={4500}
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
            className={clsx(styles.preSlide)} />
          <RightOutlined
            onClick={() => ref.current.next()}
            className={clsx(styles.nextSlide)} />
        </section>

      </main>
      <Footer />
    </div>
  )
}

export default HomePage