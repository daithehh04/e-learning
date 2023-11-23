import React from 'react';
import clsx from 'clsx';
import styles from './CategoryDetail.module.scss'
import { Header } from 'antd/es/layout/layout';

function CategoryDetail() {
  return (
    <div className={styles.CategoryDetail}>
      <Header />
      <Footer />

    </div>
  )
}

export default CategoryDetail