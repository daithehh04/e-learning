import React from 'react'
import { clsx } from 'clsx';
import styles from './Home.module.scss'
import Header from "../../layout/Header/Header"
import Footer from "../../layout/Footer/Footer"
import { Carousel } from "antd";
function HomePage() {
  return (
    <div className='home'>
      <Header />
      <Carousel
        className={clsx()}>

      </Carousel>
      <Footer />
    </div>
  )
}

export default HomePage