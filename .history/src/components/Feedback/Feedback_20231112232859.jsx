import React from 'react'
import { Carousel } from "antd";

export default function Feedback() {
     return (
          <Carousel
               className={clsx(styles.carouselSlice)}
               autoplay
               dots
               pauseOnDotsHover
               pauseOnHover
               draggable
               autoplaySpeed={4500}>

          </Carousel>


     )
}
