import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './CategoryDetail.module.scss'
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import { useParams } from "react-router";

function CategoryDetail() {
  const [categorys, setCategorys] = useState([
    { id: 1, room: 1, slug: "lop-1", img: imgCources1, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 2, room: 2, slug: "lop-2", img: imgCources2, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 3, room: 3, slug: "lop-3", img: imgCources3, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 4, room: 4, slug: "lop-4", img: imgCources4, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 5, room: 5, slug: "lop-5", img: imgCources5, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 6, room: 6, slug: "lop-6", img: imgCources6, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 7, room: 7, slug: "lop-7", img: imgCources7, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 8, room: 8, slug: "lop-8", img: imgCources8, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 9, room: 9, slug: "lop-9", img: imgCources9, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 10, room: 10, slug: "lop-10", img: imgCources10, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 11, room: 11, slug: "lop-11", img: imgCources11, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
    { id: 12, room: 12, slug: "lop-12", img: imgCources12, desc: "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh..." },
  ]);
  const params = useParams();
  console.log(params.slug);
  return (
    <div className={styles.CategoryDetail}>
      <Header />
      <main className={styles.mainCategoryDetail}>
        <h2>Luyện tập trắc nghiệm online {params.slug}</h2>
        <p>Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh...</p>

      </main>
      <Footer />
    </div>
  )
}

export default CategoryDetail