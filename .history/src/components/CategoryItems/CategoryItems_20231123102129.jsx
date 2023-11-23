import React from 'react'
import styles from './CourseItems.module.scss'
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

export default function CategorysItems({ img, desc, room, index, slug, isShowAllCourse }) {
     const navigate = useNavigate();
     const flag = isShowAllCourse ? false : (index > 5) ? true : false;
     return (
          <div
               onClick={() => navigate(`/${slug}`)}
               className={clsx(styles.CategorysItems, {
                    [styles.hidden]: flag
               })}>
               <div className={clsx(styles.imgWrap)}>
                    <img src={img} alt={desc} />
                    <div className={styles.overlay}>
                         <button className={clsx(styles.btn, styles.btnAdd)}>Làm ngay</button>
                    </div>
               </div>
               <div className={clsx(styles.content)}>
                    <h3 className={clsx(styles.headingLv3)}>Lớp  {room}</h3>
                    <p className={clsx(styles.desc)}>{desc}</p>
               </div>
          </div>
     )
}
