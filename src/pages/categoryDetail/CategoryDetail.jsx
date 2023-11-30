import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './CategoryDetail.module.scss';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import { useParams } from 'react-router';
import { Breadcrumb, notification } from 'antd';
import CategoryItems from '../../components/CategoryItems/CategoryItems';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from "@reduxjs/toolkit";
import { requestLoadCategoryBySlug } from "../../stores/middleware/categoryMiddleware";
function CategoryDetail() {
  const dispatch = useDispatch();
  const categoryInfo = useSelector((state) => state.categorys.categoryInfo);
  const courses = useSelector((state) => state.categorys.courses);
  const params = useParams();
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    loadCategory(params.slug || "");
  }, [params.slug]);
  const loadCategory = async (slug) => {
    try {
      const result = await dispatch(
        requestLoadCategoryBySlug({
          slug,
        })
      );
      unwrapResult(result);
    } catch (error) {
      notification.error({
        message: "server error!!",
        duration: 1.5,
      });
    }
  };
  useEffect(() => {
    const coursePublic = courses.filter(
      (course) => course.status === 1
    );
    setCourseList(coursePublic);
  }, [courses]);

  return (
    <div className={styles.CategoryDetail}>
      <Header />
      <main className={styles.mainCategoryDetail}>
        <div className={clsx(styles.categoryBreadcumb)}>
          <Breadcrumb separator="›">
            <Breadcrumb.Item>
              <NavLink to={'/'} className={clsx(styles.categoryBreadcumbLink)}>
                Trang chủ
              </NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <NavLink
                to={`/${params.slug}`}
                className={clsx(styles.categoryBreadcumbLink)}
              >
                {categoryInfo?.name}
              </NavLink>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <h2 className={clsx(styles.headingLv2)}>
          Luyện tập trắc nghiệm online {categoryInfo?.name}
        </h2>
        <p
          className={clsx(styles.desc)}
          dangerouslySetInnerHTML={{
            __html: categoryInfo?.des ?? "",
          }}
        >

        </p>
        <div className={clsx(styles.listCategory)}>
          {courseList.length > 0 &&
            courseList.map(({ _id, courseName, shortDes, avatar, slug }, index) => (
              <CategoryItems
                key={_id}
                img={avatar}
                desc={shortDes}
                nameSubject={courseName}
                index={index}
                slug={slug}
              />
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CategoryDetail;
