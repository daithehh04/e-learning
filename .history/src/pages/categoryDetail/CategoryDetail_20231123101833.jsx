import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './CategoryDetail.module.scss'
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import { useParams } from "react-router";

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

function CategoryDetail() {
  const [categorys, setCategorys] = useState([
    { id: 1, nameSubject: `Toán`, img: imgCources1, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 2, nameSubject: `Vật Lý`, img: imgCources2, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 3, nameSubject: `Sinh`, img: imgCources3, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 4, nameSubject: `Tiếng Anh`, img: imgCources4, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 5, nameSubject: `Hoá`, img: imgCources5, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
  ]);
  const params = useParams();
  console.log(params.slug);
  return (
    <div className={styles.CategoryDetail}>
      <Header />
      <main className={styles.mainCategoryDetail}>
        <h2>Luyện tập trắc nghiệm online {params.slug}</h2>
        <p>Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh...</p>
        <div className={clsx(styles.listCourses)}>
          {
            categorys.length > 0 && (
              categorys.map(({ id, img, desc, room, slug }, index) =>
                <CourseItems
                  key={id}
                  img={img}
                  desc={desc}
                  nameSubject={nameSubject}

                  index={index}

                />)
            )
          }
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CategoryDetail