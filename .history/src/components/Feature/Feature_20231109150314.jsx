import React from 'react'
import clsx from 'clsx'
import styles from './Feature.module.scss'
import img from '../../assets/imgs/banner/BG.svg'


export default function Feature() {
     return (
          <section className={clsx(styles.feature)}>
               <div className={clsx(styles.imgWrap)}>
                    <img src={img} alt="" />
               </div>
               <div className={clsx(styles.content)}></div>

          </section>
     )
}
