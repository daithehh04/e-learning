import React from 'react';
import styles from './CourseItems.module.scss';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

export default function CourseItems({
  img,
  desc,
  room,
  index,
  slug,
  isShowAllCourse,
}) {
  const navigate = useNavigate();
  const flag = isShowAllCourse ? false : index > 5 ? true : false;
  return (
    <div
      onClick={() => navigate(`/${slug}`)}
      className={clsx(styles.courseItems, {
        [styles.hidden]: flag,
      })}
    >
      <div className={clsx(styles.imgWrap)}>
        <img src={img} alt={desc} />
        <div className={styles.overlay}>
          <button className={clsx(styles.btn, styles.btnAdd, 'btn-common')}>
            Làm ngay
          </button>
        </div>
      </div>
      <div className={clsx(styles.content)}>
        <h3 className={clsx(styles.headingLv3)}>{room}</h3>
        <div className={clsx(styles.desc)}
          dangerouslySetInnerHTML={{
            __html: desc ?? "Tổng hợp kiến thức trọng tâm, các phương pháp và cách làm bài các môn Toán, Lý, Hóa, Sinh",
          }}
        ></div>
      </div>
    </div>
  );
}
