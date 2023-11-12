import React from 'react'
import { Carousel, Rate } from "antd";
import clsx from 'clsx';
import styles from './Feedback.module.scss';

export default function Feedback() {
     return (
          <div className={clsx(styles.feedBack)}>
               <h2>Đánh giá và Phản Hồi</h2>
               <Carousel
                    className={clsx(styles.carouselSlice)}
                    autoplay
                    pauseOnDotsHover
                    pauseOnHover
                    draggable
                    autoplaySpeed={4500}
               >
                    <div className={clsx(styles.feedBackItem)}>
                         <span className={clsx(styles.nameSchool)}></span>
                         <p className={clsx(styles.contentFeddBack)}>
                              Nội dung bài tập rất hữu ích, mình thường xuyên
                              luyện tập trên web tại nhà ❤️
                         </p>
                         <div className={clsx(styles.info)}>
                              <div className={clsx(styles.imgWrap)}>
                                   <img src="" alt="" />
                              </div>
                              <div className={clsx(styles.contentInfo)}>
                                   <span className={clsx(styles.nameUser)}>Nguyễn Văn Tuấn</span>
                                   <Rate disabled allowHalf defaultValue={4.5} />
                              </div>

                         </div>

                    </div>

               </Carousel>
          </div>


     )
}
