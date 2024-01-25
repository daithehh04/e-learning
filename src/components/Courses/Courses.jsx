import { useState } from 'react';
import { clsx } from 'clsx';
import CourseItems from '../../components/CourseItems/CourseItems';
import styles from './Courses.module.scss';
import { useSelector } from 'react-redux';

export default function Courses() {
  const categorys = useSelector((state) => state.categorys.categorys);

  const [isShowAllCourse, setisShowAllCourse] = useState(false);
  const handleShowAllCourses = () => {
    setisShowAllCourse(!isShowAllCourse);
  };
  return (
    <section className={clsx(styles.learnCources)}>
      <h2 className={clsx(styles.headingLv2)}>
        Luyện tập trắc nghiệm online tại KMA WEB
      </h2>
      <p className={clsx(styles.desc)}>
        Làm trắc nghiệm online các môn Toán, Lý, Hóa, Sinh, Sử, Địa, GDCD, Tiếng
        Anh, Văn với các bài luyện tập theo chương trình học và đề thi học kì,
        giữa kì, ... có đáp án, lời giải chi tiết.
      </p>
      <div className={clsx(styles.listCourses)}>
        {categorys.length > 0 &&
          categorys.map(({ _id, avatar, des, name, slug }, index) => (
            <CourseItems
              key={_id}
              img={avatar}
              desc={des}
              room={name}
              slug={slug}
              index={index}
              isShowAllCourse={isShowAllCourse}
            />
          ))}
      </div>
      <button
        onClick={handleShowAllCourses}
        className={clsx(styles.btnAllCources, 'btn-common', styles.btn, {
          [styles.hidden]: isShowAllCourse,
        })}
      >
        {isShowAllCourse ? 'Ẩn Một số khoá học' : 'Hiển Thị Tất cả khoá học'}
      </button>
    </section>
  );
}
