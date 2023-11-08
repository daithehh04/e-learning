import React from 'react'
import styles from './CourseItems.module.scss'
import clsx from 'clsx'

export default function CourseItems({ img, desc, room }) {
     return (
          <div className={clsx(styles.CourseItems)}>
               <div className="imgInner">

               </div>

          </div>
     )
}
