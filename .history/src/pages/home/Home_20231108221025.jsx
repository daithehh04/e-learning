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

function HomePage() {
  const [cources, setCourses] = useState([
    { id: 1, room: 1, img: imgCources1, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 2, room: 2, img: imgCources2, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 3, room: 3, img: imgCources3, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 4, room: 4, img: imgCources4, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 5, room: 5, img: imgCources5, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 6, room: 6, img: imgCources6, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 7, room: 7, img: imgCources7, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 8, room: 8, img: imgCources8, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 9, room: 9, img: imgCources9, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 10, room: 10, img: imgCources10, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 11, room: 11, img: imgCources11, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 12, room: 12, img: imgCources12, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
  ])
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
        <section className={clsx(styles.learnCources)}>
          <h2 className={clsx(styles.headingLv2)}>Luyện tập trắc nghiệm online tại KMA WEB</h2>
          <p className={clsx(styles.desc)}>Làm trắc nghiệm online các môn Toán, Lý, Hóa, Sinh, Sử, Địa, GDCD, Tiếng Anh,
            Văn với các bài luyện tập theo chương trình học và đề thi học kì, giữa kì, ... có đáp án,
            lời giải chi tiết.</p>
          <div className={clsx(styles.listCourses)}>
            {
              cources.length > 0 && (
                cources.map(({ id, img, desc, room }, index) =>
                  <CourseItems
                    key={id}
                    img={img}
                    desc={desc}
                    room={room}
                    index={index}
                  />)
              )
            }
          </div>
          <button
            className={clsx(styles.btnAllCources, styles.btn)}
          >Hiển Thị Tất cả khoá học
          </button>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage