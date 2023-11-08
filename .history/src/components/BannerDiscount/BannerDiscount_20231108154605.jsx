import React from 'react'

import styles from './BannerDiscount.module.scss'
import clsx from 'clsx'


export default function BannerDiscount() {
     return (
          <section className={clsx(styles.bannerDicount)}>
               <ul className={styles.textWrapper}>
                    <li className={styles.textContext}>miễn phí 99% tất cả các khoá học dành cho đối tượng học sinh, sinh viên</li>
                    <li className={styles.textContext}>miễn phí 99% tất cả các khoá học dành cho đối tượng học sinh, sinh viên</li>
                    <li className={styles.textContext}>miễn phí 99% tất cả các khoá học dành cho đối tượng học sinh, sinh viên</li>
                    <li className={styles.textContext}>miễn phí 99% tất cả các khoá học dành cho đối tượng học sinh, sinh viên</li>
               </ul>
          </section>
     )
}
