import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import clsx from 'clsx';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Col, Popconfirm, Row, notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './Exam.module.scss';
import { requestLoadTopicByCourse } from '../../stores/middleware/topicMiddleware';
import { requestLoadCourseBySlug } from '../../stores/middleware/courseMiddleware';
import {
  FaChevronDown,
  FaChevronUp,
  FaRegClock,
  FaRegQuestionCircle,
} from 'react-icons/fa';
import { BiChevronRight } from 'react-icons/bi';
import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
function Exam() {
  const navigate = useNavigate();
  const loading = useSelector((state) => state.course.loading);
  const dispatch = useDispatch();
  const params = useParams();
  const topics = useSelector((state) => {
    return state.topic.topics;
  });
  const userInfo = useSelector((state) => state.user.userInfo);
  const [indexOpenTopic, setIndexOpenTopic] = useState([1]);
  const course = useSelector((state) => {
    return state.course.course;
  });

  const loadTopicByCourse = async (idCourse, type, parentId) => {
    try {
      const result = await dispatch(
        requestLoadTopicByCourse({
          idCourse,
          type,
          parentId,
          status: 1,
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
  const loadCourse = async (slugChild) => {
    try {
      const result = await dispatch(
        requestLoadCourseBySlug({
          slug: slugChild,
          status: 1,
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

  useEffect(() => {
    if (params.id) {
      const arg = params.id.split('-');
      if (Number(arg[1]) === 2) {
        loadTopicByCourse(arg[0], Number(arg[1]));
      } else {
        navigate(-1);
      }
    }
    loadCourse(params.slugChild || '');
  }, [params.slugChild, params.id]);
  return (
    <>
      <Header />
      <main className={clsx(styles.exam, 'dark')}>
        <div className="wide">
          <div className={clsx(styles.examBreadcrumb)}>
            <Breadcrumb separator="›">
              <Breadcrumb.Item>
                <NavLink to={'/'} className={clsx(styles.examBreadcumbLink)}>
                  Trang chủ
                </NavLink>
              </Breadcrumb.Item>
              {!loading && (
                <>
                  <Breadcrumb.Item>
                    <NavLink
                      to={`/${course?.category?.slug}`}
                      className={clsx(styles.examBreadcumbLink)}
                    >
                      {course?.category?.name}
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink
                      to={`/${course?.category?.slug}/${course?.slug}`}
                      className={clsx(styles.examBreadcumbLink)}
                    >
                      {course?.courseName}
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink
                      to={'#'}
                      className={clsx(
                        styles.examBreadcumbLink,
                        styles.examBreadcumbLinkActive
                      )}
                    >
                      Đề kiểm tra
                    </NavLink>
                  </Breadcrumb.Item>
                </>
              )}
            </Breadcrumb>
          </div>
          <h2 className={clsx(styles.headingLv2)}>
            Luyện đề trắc nghiệm {course?.courseName}
          </h2>

          <div className={clsx(styles.examView, 'dark')}>
            {topics.length > 0 &&
              topics?.map((data, i) => {
                const dataChild = data.topicChildData;
                return (
                  <div className={clsx(styles.examPanel)} key={data.id}>
                    <div className={clsx(styles.examPanelItem)}>
                      {indexOpenTopic.find((o) => o === i + 1) ? (
                        <div
                          className={clsx(styles.examPanelTitle)}
                          onClick={() => {
                            const indexPrev = indexOpenTopic.filter(
                              (o) => o !== i + 1
                            );
                            setIndexOpenTopic(indexPrev);
                          }}
                        >
                          <FaChevronDown className={clsx(styles.panelIcon)} />
                          <h3 className={clsx(clsx(styles.panelText))}>
                            {data?.name}
                          </h3>
                        </div>
                      ) : (
                        <div
                          className={clsx(styles.examPanelTitle)}
                          onClick={() => {
                            setIndexOpenTopic([...indexOpenTopic, i + 1]);
                          }}
                        >
                          <FaChevronDown className={clsx(styles.panelIcon)} />
                          <h3 className={clsx(styles.panelText)}>
                            {data?.name}
                          </h3>
                        </div>
                      )}
                      <Row gutter={[12, 12]}>
                        {dataChild[0] &&
                          dataChild?.map((dataChild, iChild) => (
                            <Col
                              xl={12}
                              lg={12}
                              md={12}
                              sm={24}
                              xs={24}
                              key={iChild}
                            >
                              <div className={clsx(styles.examPanelContent)}>
                                <span>{dataChild.name}</span>
                                <div className={clsx(styles.examPanelAction)}>
                                  <div className={clsx(styles.panelActionItem)}>
                                    <div>
                                      <FaRegQuestionCircle />
                                      <span>{dataChild?.numQuestion} câu</span>
                                    </div>
                                    <div>
                                      <FaRegClock />
                                      <span>{dataChild?.timeExam} phút</span>
                                    </div>
                                    {userInfo?.progess?.map(
                                      (o) =>
                                        o.idTopic === dataChild.id && (
                                          <div
                                            className={clsx(
                                              styles.examPanelScore
                                            )}
                                            key={o.idTopic}
                                          >
                                            <span>{o.score} điểm</span>
                                          </div>
                                        )
                                    )}
                                  </div>
                                  <Popconfirm
                                    placement="top"
                                    title="Bạn muốn làm đề này sao?"
                                    onConfirm={() => {
                                      navigate(`${dataChild.id}`);
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    {userInfo?.progess?.find(
                                      (o) => o.idTopic === dataChild.id
                                    ) ? (
                                      <button
                                        className={clsx(
                                          styles.examPanelBtn,
                                          styles.review,
                                          'btn-common'
                                        )}
                                      >
                                        <span>Xem lại</span>
                                        <BiChevronRight
                                          className={clsx(styles.examPanelIcon)}
                                        />
                                      </button>
                                    ) : (
                                      <button
                                        className={clsx(
                                          styles.examPanelBtn,
                                          'btn-common'
                                        )}
                                      >
                                        <span>Làm bài</span>
                                        <BiChevronRight
                                          className={clsx(styles.examPanelIcon)}
                                        />
                                      </button>
                                    )}
                                  </Popconfirm>
                                </div>
                              </div>
                            </Col>
                          ))}
                      </Row>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Exam;
