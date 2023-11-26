import React from 'react'
import styles from './CategoryItems.module.scss'
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

export default function CategorysItems({ img, desc, nameSubject, index,slug }) {
     const navigate = useNavigate();
     return (
          <div
               onClick={() => navigate(`/${slug}/toan-hoc-1}`)}
               className={clsx(styles.categorysItems)}>
               <div className={clsx(styles.imgWrap)}>
                    <img src={img} alt={desc} />
                    <div className={styles.overlay}>
                         <button className={clsx(styles.btn, styles.btnAdd)}>Làm ngay</button>
                    </div>
               </div>
               <div className={clsx(styles.content)}>
                    <h3 className={clsx(styles.headingLv3)}>{nameSubject}</h3>
                    <p className={clsx(styles.desc)}>{desc}</p>
               </div>
          </div>
     )
}
