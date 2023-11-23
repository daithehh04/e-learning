import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './CategoryDetail.module.scss'
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';

function CategoryDetail() {
  const [categorys, setCategorys] = useState("");
  return (
    <div className={styles.CategoryDetail}>
      <Header />
      <main className={styles.mainCategoryDetail}>

      </main>
      <Footer />
    </div>
  )
}

export default CategoryDetail