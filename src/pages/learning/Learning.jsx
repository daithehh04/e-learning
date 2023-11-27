import React, { Fragment, useEffect, useState } from 'react';
import styles from './Learning.module.scss';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Progress } from 'antd';
import {
  FaArrowRight,
  FaBars,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaFileAlt,
  FaHeart,
  FaPlayCircle,
  FaQuestionCircle,
  FaTimes,
} from 'react-icons/fa';
import {
  IoChevronBackOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
} from 'react-icons/io5';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
const loading = false;
function Learning() {
  const navigate = useNavigate();
  const [isShowSider, setIsShowSider] = useState(false);
  const [indexOpenTopic, setIndexOpenTopic] = useState([]);
  const [indexTopic, setIndexTopic] = useState();
  const topics = useSelector((state) => state.topic.topics);
  const course = useSelector((state) => state.course.course);
  // Lesson learned
  // useEffect(() => {
  //   if (course?.id && userInfo?._id) {
  //     loadTotalLearnedTopic(course?.id, userInfo?._id);
  //   }
  // }, [course?.id, userInfo?._id, userInfo]);
  const handleClickToggleLesson = (index) => {
    if (indexOpenTopic.find((lesson) => lesson === index + 1)) {
      const indexPrev = indexOpenTopic.filter((o) => o !== index + 1);
      setIndexOpenTopic(indexPrev);
    } else {
      setIndexOpenTopic([...indexOpenTopic, index + 1]);
    }
  };
  return (
    <div className={clsx(styles.learning)}>
      {/* Header */}
      <header>
        <div className={clsx(styles.headerWrapper)}>
          <div className={clsx(styles.icon)} onClick={() => navigate(-1)}>
            <IoChevronBackOutline />
          </div>

          <Link to={'/'} className={clsx(styles.logo)}>
            <img
              src={'http://localhost:8080/src/assets/imgs/logo/logo.svg'}
              alt="learn4ever_logo"
            />
          </Link>

          <div className={clsx(styles.nameCourse)}>Toán 1</div>

          {!loading && (
            <div className={clsx(styles.progress)}>
              <Progress
                type="circle"
                size={36}
                strokeColor={'#fff'}
                percent={Math.round((9 / 18) * 100)}
                // format={(successPercent) => `${successPercent}%`}
              />
              <div className={clsx(styles.lesson)}>
                <strong>
                  <span>1</span>/<span>2</span>
                </strong>
                <p>&nbsp;bài học</p>
              </div>
            </div>
          )}
        </div>
      </header>
      {/* Content */}
      <Layout className={clsx(styles.layoutLearning)}>
        <Sider
          className={clsx(styles.layoutSider, {
            [styles.hideSider]: isShowSider,
          })}
        >
          <h2 className={clsx(styles.heading)}>Nội dung khóa học</h2>
          <div className={clsx(styles.body)}>
            {topics?.length > 0 &&
              topics?.map((topic, index) => {
                return (
                  <div key={index} className={clsx(styles.lessonItem)}>
                    <div
                      className={clsx(styles.itemChapter)}
                      onClick={() => handleClickToggleLesson(index)}
                    >
                      <h3 className={clsx(styles.nameChapter)}>
                        {topic?.name}
                      </h3>
                      <span className={clsx(styles.timeChapter)}>
                        0/5 &nbsp;|&nbsp;
                        {moment(
                          topic?.topicChildData.reduce(
                            (accumulator, currentValue) =>
                              accumulator + Number(currentValue.timeExam),
                            0
                          ) * 1000
                        ).format('mm:ss')}
                      </span>
                      <span
                        className={clsx(styles.iconArrowUp, {
                          [styles.iconDown]: indexOpenTopic.find(
                            (o) => o === index + 1
                          ),
                        })}
                      >
                        <IoChevronDownOutline />
                      </span>
                    </div>
                    {indexOpenTopic.find((o) => o === index + 1) &&
                      topic?.topicChildData.length > 0 &&
                      [...topic?.topicChildData]?.map(
                        (topicChild, indexChild) => {
                          return (
                            <div key={indexChild}>
                              <div
                                onClick={() => {
                                  setIndexTopic(topic.id);
                                }}
                                className={clsx(styles.subLessonItemWrapper)}
                              >
                                <div className={clsx(styles.subLessonItem)}>
                                  <h4 className={clsx(styles.nameTopic)}>
                                    {topicChild?.name}
                                  </h4>
                                  <p className={clsx(styles.iconTopic)}>
                                    {topicChild?.topicType === 1 ? (
                                      <FaPlayCircle />
                                    ) : topicChild?.topicType === 2 ? (
                                      <FaFileAlt />
                                    ) : topicChild?.topicType === 3 ? (
                                      <FaQuestionCircle />
                                    ) : (
                                      <></>
                                    )}
                                    <span>
                                      {moment(
                                        (topicChild?.timeExam || 0) * 1000
                                      ).format('mm:ss')}
                                    </span>
                                  </p>
                                </div>
                                <div className={clsx(styles.iconDone)}>
                                  {<FaCheckCircle />}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>
                );
              })}
          </div>
        </Sider>
        <Content
          className={clsx(styles.layoutContent, {
            [styles.hideSider]: isShowSider,
          })}
        >
          <h2>Hình vuông, hình tròn và hình tam giác</h2>
          <div
            className={clsx(styles.contentDesc)}
            dangerouslySetInnerHTML={{
              __html: topics[0]?.des ?? '',
            }}
          ></div>
        </Content>
      </Layout>
      {/* Footer */}
      <footer className={clsx(styles.footerLearning)}>
        <button className={clsx(styles.btnLessonPrev)}>
          <FaChevronLeft className={styles.iconPrev} />
          <span>BÀI TRƯỚC</span>
        </button>
        <button className={clsx(styles.btnLessonNext)}>
          <span>BÀI TIẾP</span>
          <FaChevronRight className={styles.iconNext} />
        </button>
        <div className={clsx(styles.btnLessonToggle)}>
          <h3>I. Các số đếm</h3>
          <button onClick={() => setIsShowSider(!isShowSider)}>
            {isShowSider ? <FaArrowRight /> : <FaBars />}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Learning;
