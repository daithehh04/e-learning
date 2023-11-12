import React from 'react'
import { Carousel } from "antd";
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


                    </div>

               </Carousel>
          </div>


     )
}
