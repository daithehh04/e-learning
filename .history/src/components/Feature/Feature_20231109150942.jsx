import React from 'react'
import clsx from 'clsx'
import { AiFillCheckCircle } from "react-icons/ai";

import styles from './Feature.module.scss'
import img from '../../assets/imgs/banner/BG.svg'


export default function Feature() {
     return (
          <section className={clsx(styles.feature)}>
               <div className={clsx(styles.imgWrap)}>
                    <img src={img} alt="" />
               </div>
               <div className={clsx(styles.content)}>
                    <h2 className={clsx(styles.headingLv2)}>
                         <span>Luyện Tập</span>
                         Trắc Nghiêm KMA WEB
                    </h2>
                    <ul className={styles.listFeature}>
                         <li className={clsx(styles.featureItem)}>
                              <AiFillCheckCircle />
                              <span>Làm bài trắc nghiệm trong mỗi bài học</span>

                         </li>
                         <li className={clsx(styles.featureItem)}>
                              <AiFillCheckCircle />
                              <span>Đề xuất nội dung học mỗi khi bạn làm bài thi không đạt.</span>

                         </li>
                         <li className={clsx(styles.featureItem)}>
                              <AiFillCheckCircle />
                              <span>Có chấm điểm, thống kê chi tiết, tiến độ hoàn thành.</span>

                         </li>
                         <li className={clsx(styles.featureItem)}>
                              <AiFillCheckCircle />
                              <span>Luyện tập theo chương trình mới nhất.</span>

                         </li>
                         <li className={clsx(styles.featureItem)}>
                              <AiFillCheckCircle />
                              <span>Các bộ đề luyện thi THPT Quốc Gia mới nhất.</span>

                         </li>
                    </ul>

               </div>

          </section>
     )
}
