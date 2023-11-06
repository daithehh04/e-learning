import React from 'react'
import styles from './Slide.module.css';
import clsx from 'clsx';

export default function Slide({ title, desc, img }) {
     return (
          <div className={clsx(styles.slide)}></div>
     )
}
