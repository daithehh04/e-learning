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
                    <ul>
                         <li>
                              <AiFillCheckCircle />

                         </li>
                         <li>
                              <AiFillCheckCircle />

                         </li>
                         <li>
                              <AiFillCheckCircle />

                         </li>
                         <li>
                              <AiFillCheckCircle />

                         </li>
                    </ul>

               </div>

          </section>
     )
}
