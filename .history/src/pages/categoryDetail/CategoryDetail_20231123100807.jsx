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
        <h2>Luyện tập trắc nghiệm online</h2>
        <p>Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh...</p>

      </main>
      <Footer />
    </div>
  )
}

export default CategoryDetail