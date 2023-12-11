import { Breadcrumb, Col, notification, Row } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  FaBatteryFull,
  FaClock,
  FaFilm,
  FaLightbulb,
  FaPencilRuler,
} from 'react-icons/fa';
import { NavLink, useParams } from 'react-router-dom';
import styles from './CourseDetail.module.scss';
import clsx from 'clsx';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import { unwrapResult } from '@reduxjs/toolkit';
import TTCSconfig from '../../helper/config';
import { useDispatch, useSelector } from 'react-redux';
import { requestLoadCourseBySlug } from '../../stores/middleware/courseMiddleware';
import { requestLoadTopicByCourse } from '../../stores/middleware/topicMiddleware';
import { apiLoadTopicByCourse } from '../../api/topic';

const CourseDetail = () => {
  const [totalExam, setTotalExam] = useState(0);
  const loading = false;
  const params = useParams();
  const course = useSelector((state) => state.course.course);
  const topics = useSelector((state) => state.topic.topics);
  const totalTopic = useSelector((state) => state.topic.total);
  useEffect(() => {
    loadCourse(params.slugChild || '');
  }, [params.slugChild]);
  useEffect(() => {
    if (course?.id) {
      loadTopicByCourse(course?.id || '', 1);
      loadTopicByCourse(course?.id || '', 2);
    }
  }, [course?.id]);
  const dispatch = useDispatch();
  const loadCourse = async (slugChild) => {
    try {
      const result = dispatch(
        requestLoadCourseBySlug({
          slug: slugChild,
          status: TTCSconfig.STATUS_PUBLIC,
        })
      );
      unwrapResult(result);
    } catch (error) {
      notification.error({
        message: 'server error!!',
        duration: 1.5,
      });
    }
  };
  const loadTopicByCourse = async (idCourse, type, parentId) => {
    try {
      if (type === TTCSconfig.TYPE_LESSON) {
        const result = dispatch(
          requestLoadTopicByCourse({
            idCourse,
            type,
            parentId,
            status: TTCSconfig.STATUS_PUBLIC,
          })
        );
        unwrapResult(result);
      } else {
        const res = await apiLoadTopicByCourse({
          idCourse,
          type,
          parentId,
          status: TTCSconfig.STATUS_PUBLIC,
        });
        setTotalExam(res.data.total);
      }
    } catch (error) {
      notification.error({
        message: 'server error!!',
        duration: 1.5,
      });
    }
  };

  return (
    <>
      <Header />
      <div className="wide">
        <div className={clsx(styles.detailCourse, 'dark')}>
          <div className={clsx(styles.detailContainer)}>
            <Breadcrumb separator="›">
              <Breadcrumb.Item>
                <NavLink to={'/'} className={clsx(styles.navLink)}>
                  Trang chủ
                </NavLink>
              </Breadcrumb.Item>
              {!loading && (
                <>
                  <Breadcrumb.Item>
                    <NavLink
                      to={`/${course?.category?.slug}`}
                      className={clsx(styles.navLink)}
                    >
                      {course?.category?.name}
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink
                      to={`/${course?.category?.slug}/${course?.slug}`}
                      className={clsx(styles.navLink, styles.navActive)}
                    >
                      {course?.courseName}
                    </NavLink>
                  </Breadcrumb.Item>
                </>
              )}
            </Breadcrumb>
          </div>

          <Row style={{ width: '100%', margin: '0' }} gutter={16}>
            <Col xl={16} lg={16} md={24} sm={24} xs={24}>
              <h2 className={styles.detailName}>{course?.courseName}</h2>
              <div>
                <p className={styles.shortDes}>{course?.shortDes}</p>
              </div>
              <div
                className={styles.longDes}
                dangerouslySetInnerHTML={{
                  __html: course?.des ?? '',
                }}
              ></div>
            </Col>

            <Col xl={8} lg={8} md={24} sm={24} xs={24}>
              <div className={styles.infoCourse}>
                <div className={styles.thumb}>
                  <img src={course?.avatar || ''} alt="course-avatar" />
                </div>
                <h5>Miễn phí</h5>
                <div className={styles.btnGroup}>
                  <Row>
                    <Col
                      xl={24}
                      lg={24}
                      md={12}
                      sm={24}
                      xs={24}
                      className={clsx(styles.btn)}
                    >
                      <NavLink
                        to={`chuong-trinh-hoc/${course?.id}-1`}
                        className={clsx(styles.btn1, 'btn-common')}
                      >
                        <button>Chương trình học</button>
                      </NavLink>
                    </Col>

                    <Col
                      xl={24}
                      lg={24}
                      md={12}
                      sm={24}
                      xs={24}
                      className={clsx(styles.btn)}
                    >
                      <NavLink
                        to={`de-kiem-tra/${course?.id}-2`}
                        className={clsx(styles.btn2)}
                      >
                        <button>Đề kiểm tra</button>
                      </NavLink>
                    </Col>
                  </Row>
                </div>
                <ul className={clsx(styles.detailList)}>
                  <li className={clsx(styles.detailItem)}>
                    <FaLightbulb className={clsx(styles.detailIcon)} />
                    <span>Trình độ cơ bản</span>
                  </li>
                  <li className={clsx(styles.detailItem)}>
                    <FaFilm className={clsx(styles.detailIcon)} />
                    <span>
                      Tổng số <strong>{totalTopic}</strong> bài học
                    </span>
                  </li>
                  <li className={clsx(styles.detailItem)}>
                    <FaClock className={clsx(styles.detailIcon)} />
                    <span>
                      Thời lượng{' '}
                      <strong>
                        {moment(
                          topics
                            .map((topic, i) =>
                              topic?.topicChildData.reduce(
                                (accumulator, currentValue) =>
                                  accumulator + Number(currentValue.timeExam),
                                0
                              )
                            )
                            .reduce(
                              (accumulator, currentValue) =>
                                accumulator + currentValue,
                              0
                            ) * 1000
                        ).format('mm:ss')}
                      </strong>
                    </span>
                  </li>
                  <li className={clsx(styles.detailItem)}>
                    <FaPencilRuler className={clsx(styles.detailIcon)} />
                    <span>
                      <strong>{totalExam}</strong> Đề kiểm tra
                    </span>
                  </li>
                  <li className={clsx(styles.detailItem)}>
                    <FaBatteryFull className={clsx(styles.detailIcon)} />
                    <span>Học mọi lúc, thi mọi nơi</span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetail;
