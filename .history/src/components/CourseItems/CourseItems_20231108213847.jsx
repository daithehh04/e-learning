import React from 'react'
import styles from './CourseItems.module.scss'
import clsx from 'clsx'

export default function CourseItems({ img, desc, room }) {
     return (
          <div className={clsx(styles.courseItems)}>
               <div className={clsx(styles.imgWrap)}>
                    <img src={img} alt={desc} />
                    <div className={styles.overlay}>
                         <button className={clsx(styles.btn, styles.btnAdd)}>Làm ngay</button>
                    </div>
               </div>
               <div className={clsx(styles.content)}>
                    <h3 className={clsx(styles.headingLv3)}>Lớp:{room}</h3>
                    <p className={clsx(styles.desc)}>{desc}</p>
               </div>
          </div>
     )
}
