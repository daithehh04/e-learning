import React from 'react'
import { Carousel } from "antd";

export default function Feedback() {
     return (
          <Carousel
               className={clsx(styles.carouselSlice)}
               autoplay
               pauseOnDotsHover
               pauseOnHover
               draggable
               autoplaySpeed={4500}
          >



          </Carousel>


     )
}
