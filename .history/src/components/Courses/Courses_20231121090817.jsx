import { useState } from "react"
import { clsx } from "clsx"

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
import CourseItems from '../../components/CourseItems/CourseItems';
import styles from './Courses.module.scss'

export default function Courses() {
     const [cources, setCourses] = useState([
          { id: 1, room: 1, slug: "lop-1", img: imgCources1, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
          { id: 2, room: 2, slug: "lop-2", img: imgCources2, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
          { id: 3, room: 3, slug: "lop-3", img: imgCources3, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
          { id: 4, room: 4, slug: "lop-4", img: imgCources4, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
          { id: 5, room: 5, slug: "lop-5", img: imgCources5, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
          { id: 6, room: 6, slug: "lop-6", img: imgCources6, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
          { id: 7, room: 7, slug: "lop-7", img: imgCources7, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
          { id: 8, room: 8, slug: "lop-8", img: imgCources8, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
          { id: 9, room: 9, slug: "lop-9", img: imgCources9, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
          { id: 10, room: 10, slug: "lop-10", img: imgCources10, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
          { id: 11, room: 11, slug: "lop-11", img: imgCources11, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
          { id: 12, room: 12, slug: "lop-12", img: imgCources12, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
     ])
     const [isShowAllCourse, setisShowAllCourse] = useState(false)
     const handleShowAllCourses = () => {
          setisShowAllCourse(!isShowAllCourse)
     }
     return (
          <section className={clsx(styles.learnCources)}>
               <h2 className={clsx(styles.headingLv2)}>Luyện tập trắc nghiệm online tại KMA WEB</h2>
               <p className={clsx(styles.desc)}>Làm trắc nghiệm online các môn Toán, Lý, Hóa, Sinh, Sử, Địa, GDCD, Tiếng Anh,
                    Văn với các bài luyện tập theo chương trình học và đề thi học kì, giữa kì, ... có đáp án,
                    lời giải chi tiết.</p>
               <div className={clsx(styles.listCourses)}>
                    {
                         cources.length > 0 && (
                              cources.map(({ id, img, desc, room, slug }, index) =>
                                   <CourseItems
                                        key={id}
                                        img={img}
                                        desc={desc}
                                        room={room}
                                        slug={slug}
                                        index={index}
                                        isShowAllCourse={isShowAllCourse}
                                   />)
                         )
                    }
               </div>
               <button
                    onClick={handleShowAllCourses}
                    className={clsx(styles.btnAllCources, styles.btn, {
                         [styles.hidden]: isShowAllCourse
                    })}
               >{isShowAllCourse ? "Ẩn Một số khoá học" : "Hiển Thị Tất cả khoá học"}
               </button>
          </section>
     )
}