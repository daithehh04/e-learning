import React from 'react'

import styles from './BannerDiscount.module.scss'


export default function BannerDiscount() {
     return (
          <section className={clsx(styles.bannerDicount)}>
               <div className={styles.textWrapper}>
                    <span className={styles.textContext}>miễn phí 99% tất cả các khoá học dành cho đối tượng học sinh, sinh viên</span>
                    <span className={styles.textContext}>miễn phí 99% tất cả các khoá học dành cho đối tượng học sinh, sinh viên</span>
                    <span className={styles.textContext}>miễn phí 99% tất cả các khoá học dành cho đối tượng học sinh, sinh viên</span>
                    <span className={styles.textContext}>miễn phí 99% tất cả các khoá học dành cho đối tượng học sinh, sinh viên</span>
               </div>
          </section>
     )
}
