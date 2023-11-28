import React, { Fragment, useEffect, useState } from 'react';
import styles from './Learning.module.scss';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Progress, notification } from 'antd';
import dayjs from 'dayjs';
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
import { requestLoadTotalLearnedTopic } from '../../stores/middleware/topicMiddleware';
import { apiLoadTopicById } from '../../api/topic';
import TTCSconfig from '../../helper/config';
const loading = false;
function Learning() {
  const navigate = useNavigate();
  const [isShowSider, setIsShowSider] = useState(false);
  const [indexOpenTopic, setIndexOpenTopic] = useState([]);
  const [indexTopic, setIndexTopic] = useState();
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [dataTopicActive, setDataTopicActive] = useState();
  const topics = useSelector((state) => state.topic.topics);
  const course = useSelector((state) => state.course.course);
  const userInfo = useSelector((state) => state.user.userInfo);
  const topicTotalLearned = useSelector((state) => state.topic.totalLearned);
  // Lesson learned
  useEffect(() => {
    console.log(course?.id && userInfo?._id);
    if (course?.id && userInfo?._id) {
      requestLoadTotalLearnedTopic(course?.id, userInfo?._id);
    }
  }, [course?.id, userInfo?._id, userInfo]);
  const handleClickToggleLesson = (index) => {
    if (indexOpenTopic.find((lesson) => lesson === index + 1)) {
      const indexPrev = indexOpenTopic.filter((o) => o !== index + 1);
      setIndexOpenTopic(indexPrev);
    } else {
      setIndexOpenTopic([...indexOpenTopic, index + 1]);
    }
  };
  const handleChangeTopic = async (id) => {
    try {
      const res = await apiLoadTopicById({ id });
      setDataTopicActive(res.data);
      // setIsExercise(true);
    } catch (error) {
      notification.error({
        message: 'server error!!',
        duration: 1.5,
      });
    }
  };
  const handleSaveSelected = (idQuestion, idAnswer) => {
    if (selectedQuestions.find((o) => o.idQuestion === idQuestion)) {
      setSelectedQuestions([
        ...selectedQuestions.filter((c) => c.idQuestion !== idQuestion),
        {
          idQuestion,
          idAnswer,
        },
      ]);
    } else {
      setSelectedQuestions((o) => [
        ...o,
        {
          idQuestion,
          idAnswer,
        },
      ]);
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
                                  handleChangeTopic(topicChild.id || '');
                                }}
                                className={clsx(styles.subLessonItemWrapper)}
                              >
                                <div className={clsx(styles.subLessonItem)}>
                                  <h4 className={clsx(styles.nameTopic)}>
                                    {topicChild?.name}
                                  </h4>
                                  <p className={clsx(styles.iconTopic)}>
                                    {topicChild?.topicType ===
                                    TTCSconfig.TYPE_TOPIC_VIDEO ? (
                                      <FaPlayCircle />
                                    ) : topicChild?.topicType ===
                                      TTCSconfig.TYPE_TOPIC_DOCUMENT ? (
                                      <FaFileAlt />
                                    ) : topicChild?.topicType ===
                                      TTCSconfig.TYPE_TOPIC_PRATICE ? (
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
          <div>
            {dataTopicActive?.topicType === TTCSconfig.TYPE_TOPIC_VIDEO && (
              <div className={clsx(styles.contentVideo)}>
                <div className={clsx(styles.videoPlayer)}>
                  <video
                    controls
                    autoPlay={false}
                    className={clsx(styles.videoEmbed)}
                    title="video player"
                    // ref={videoPlayerRef}
                    // onTimeUpdate={handleTimeUpdateVideo}
                    // onSeeking={handleSeekingVideo}
                  >
                    <source
                      src={dataTopicActive?.video || ''}
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>
            )}
          </div>
          {/* Description */}
          <div className={clsx(styles.contentDesc)}>
            <div className={clsx(styles.title)}>
              <h1 className={clsx(styles.heading)}>{dataTopicActive?.name}</h1>
              <p className={clsx(styles.timeUpdate)}>
                Cập nhật ngày {dayjs(dataTopicActive?.updateDate).date()} tháng{' '}
                {dayjs(dataTopicActive?.updateDate).month() + 1} năm{' '}
                {dayjs(dataTopicActive?.updateDate).year()}
              </p>
            </div>
            {/* text */}
            <div
              className={clsx(styles.descText)}
              dangerouslySetInnerHTML={{
                __html: dataTopicActive?.des ?? '',
              }}
            ></div>
          </div>
          {/* Practice */}
          {/* <div>
            {dataTopicActive?.topicType === TTCSconfig.TYPE_TOPIC_PRATICE && (
              <div>
                {questions.length > 0 &&
                  questions?.map((question, index) => {
                    return (
                      <Row
                        id={question.id}
                        className={clsx(styles.contentPractice)}
                        key={question.id}
                      >
                        <div className={clsx(styles.gameView)}>
                          <div className={clsx(styles.question)}>
                            <div className={clsx(styles.questionIdex)}>
                              <span>{index + 1}.</span>
                            </div>
                            <div
                              className={clsx(styles.questionText)}
                              dangerouslySetInnerHTML={{
                                __html: question.question ?? '',
                              }}
                            ></div>
                          </div>

                          <div className={clsx(styles.quiz)}>
                            <div className={clsx(styles.quizItem)}>
                              <Space direction="vertical">
                                {question.answer?.map((item, i) => {
                                  return (
                                    <Radio
                                      className={
                                        selectedQuestions.find(
                                          (o) => o.idQuestion === question.id
                                        )
                                          ? item?.isResult
                                            ? cx(
                                                'quiz-choices__item--radio',
                                                'correct'
                                              )
                                            : selectedQuestions.find(
                                                (o) =>
                                                  o.idAnswer.toString() ===
                                                  item?._id?.toString()
                                              ) &&
                                              cx(
                                                'quiz-choices__item--radio',
                                                'inCorrect'
                                              )
                                          : cx('quiz-choices__item--radio')
                                      }
                                      value={item}
                                      key={i}
                                      onClick={(e) => {
                                        handleSaveSelected(
                                          question?.id || '',
                                          item?._id || ''
                                        );
                                      }}
                                      disabled={isReview}
                                      checked={
                                        !!selectedQuestions.find(
                                          (o) =>
                                            o.idAnswer.toString() ===
                                            item?._id?.toString()
                                        )
                                      }
                                    >
                                      <span
                                        className={clsx(
                                          'quiz-choices__item--answer'
                                        )}
                                      >
                                        {answers[item.index]}.&nbsp;
                                        <span
                                          dangerouslySetInnerHTML={{
                                            __html: item.text ?? '',
                                          }}
                                        ></span>
                                      </span>
                                    </Radio>
                                  );
                                })}

                                {selectedQuestions.find(
                                  (o) => o.idQuestion === question.id
                                ) && (
                                  <div className={clsx('quiz__explain')}>
                                    <p>Giải thích</p>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: question.hint ?? '',
                                      }}
                                    ></div>
                                  </div>
                                )}
                              </Space>
                            </div>
                          </div>
                        </div>
                      </Row>
                    );
                  })}
                {isReview ? (
                  <Button onClick={handleRemakeExercise} type="primary">
                    Làm lại
                  </Button>
                ) : (
                  <Popconfirm
                    placement="top"
                    title="Bạn cos chắc muốn nộp?"
                    onConfirm={() => handleSubmitExercise()}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary">Nộp bài</Button>
                  </Popconfirm>
                )}
              </div>
            )}
          </div> */}
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
