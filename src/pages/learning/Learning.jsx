import React, { Fragment, useEffect, useRef, useState } from 'react';
import styles from './Learning.module.scss';
import clsx from 'clsx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Layout,
  Popconfirm,
  Progress,
  Radio,
  Row,
  Space,
  notification,
} from 'antd';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  requestLoadTopicByCourse,
  requestLoadTotalLearnedTopic,
} from '../../stores/middleware/topicMiddleware';
import { apiLoadTopicById } from '../../api/topic';
import TTCSconfig from '../../helper/config';
import { requestLoadQuestionsByIdTopic } from '../../stores/middleware/questionsMiddeware';
import { unwrapResult } from '@reduxjs/toolkit';
import { requestUpdateStudiedForUser } from '../../stores/middleware/userMiddleware';
import { answers } from '../../utils/constants';
import { requestLoadCourseBySlug } from '../../stores/middleware/courseMiddleware';
import DarkMode from '../../components/DarkMode/DarkMode';
import { useAuth0 } from '@auth0/auth0-react';
const loading = false;
function Learning() {
  const navigate = useNavigate();
  const [isShowSider, setIsShowSider] = useState(false);
  const [indexOpenTopic, setIndexOpenTopic] = useState([]);
  const [indexTopic, setIndexTopic] = useState();
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [dataTopicActive, setDataTopicActive] = useState();
  const [totalQs, setTotalQs] = useState(0);
  const [timePractice, setTimePractice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoPlayerRef = useRef(null);
  const topics = useSelector((state) => state.topic.topics);
  const course = useSelector((state) => state.course.course);
  let userInfo = useSelector((state) => state.user.userInfo);
  let userInfoEmailGg = useSelector((state) => state.user.userInfoEmailGg);
  const questions = useSelector((state) => state.questions.questions);
  const topicTotalLearned = useSelector((state) => state.topic.totalLearned);
  const topicTotal = useSelector((state) => state.topic.total);
  const [isReview, setIsReview] = useState(false);
  const [isExercise, setIsExercise] = useState(false);
  const [arrAllTopic, setArrAllTopic] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated && !userInfo) {
    userInfo = userInfoEmailGg;
  }
  useEffect(() => {
    let arrAllTopics = [];
    topics.forEach((topic) => {
      arrAllTopics.push(...topic?.topicChildData);
    });
    arrAllTopics = arrAllTopics.filter(
      (topic) => topic.status === TTCSconfig.STATUS_PUBLIC
    );
    setArrAllTopic(arrAllTopics);
  }, [topics]);

  const handleNextTopic = () => {
    const id = arrAllTopic.findIndex((topic) => {
      return topic.id === dataTopicActive?.id;
    });
    if (id > -1) {
      let indexNext = id + 1;
      if (indexNext > arrAllTopic.length) {
        indexNext = arrAllTopic.length;
      }
      let idNext = arrAllTopic[indexNext].id;
      handleChangeTopic(idNext);
    }
  };
  const handlePrevTopic = () => {
    const id = arrAllTopic.findIndex((topic) => {
      return topic.id === dataTopicActive?.id;
    });
    if (id > -1) {
      let indexPrev = id - 1;
      if (indexPrev < 0) {
        indexPrev = 0;
      }
      let idNext = arrAllTopic[indexPrev].id;
      handleChangeTopic(idNext);
    }
  };
  // Lesson learned
  useEffect(() => {
    if (course?.id && userInfo?._id) {
      loadTotalLearnedTopic(course?.id, userInfo?._id);
    }
  }, [course?.id, userInfo?._id, userInfo]);
  const loadTotalLearnedTopic = async (idCourse, idUser) => {
    try {
      const result = dispatch(
        requestLoadTotalLearnedTopic({ idCourse, idUser })
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
      loadTopicByParam(params.id);
    }
    loadCourse(params.slugChild || '');
  }, [params.slugChild, params.id]);
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
  const loadTopicByParam = (param) => {
    const arg = param.split('-');
    if (Number(arg[1]) === TTCSconfig.TYPE_LESSON) {
      loadTopicByCourse(arg[0], Number(arg[1]));
    } else {
      navigate(-1);
    }
  };
  const loadTopicByCourse = async (idCourse, type, parentId) => {
    try {
      const result = dispatch(
        requestLoadTopicByCourse({
          idCourse,
          type,
          parentId,
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
  const loadQuestionsByIdTopic = async (idTopic) => {
    try {
      const result = dispatch(
        requestLoadQuestionsByIdTopic({
          idTopic,
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
  useEffect(() => {
    if (
      dataTopicActive?.topicType === TTCSconfig.TYPE_TOPIC_PRATICE &&
      dataTopicActive?.id
    ) {
      loadQuestionsByIdTopic(dataTopicActive?.id || '');
    }

    if (
      dataTopicActive?.topicType === TTCSconfig.TYPE_TOPIC_VIDEO &&
      dataTopicActive?.id
    ) {
      videoPlayerRef.current.currentTime =
        userInfo?.progess?.find((o) => o.idTopic === dataTopicActive?.id)
          ?.timeStudy || 0;
      setIsModalOpen(false);
    }
    if (dataTopicActive?.timePracticeInVideo?.length) {
      dataTopicActive?.timePracticeInVideo?.map((o) => {
        setTimePractice(o.time);
        setTotalQs(o.totalQuestion);
      });
    } else {
      setTimePractice(0);
      setTotalQs(0);
    }

    if (userInfo?.progess?.find((o) => o.idTopic === dataTopicActive?.id)) {
      userInfo?.progess?.find(
        (o) =>
          o.idTopic === dataTopicActive?.id && setSelectedQuestions(o.answers)
      );
      setIsReview(true);
    } else {
      setSelectedQuestions([]);
      setIsReview(false);
    }

    handleUpdateDocument(dataTopicActive?.id || '', userInfo?._id || '');
  }, [dataTopicActive?.id, userInfo]);

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
      setIsExercise(true);
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
  const handleUpdateDocument = async (idTopic, idUser) => {
    try {
      if (
        dataTopicActive?.topicType === TTCSconfig.TYPE_TOPIC_DOCUMENT &&
        dataTopicActive &&
        !userInfo?.progess?.find((o) => o.idTopic === idTopic)
      ) {
        const result = await dispatch(
          requestUpdateStudiedForUser({
            idTopic,
            idUser,
            status: TTCSconfig.STATUS_LEARNED,
            timeStudy: 0,
          })
        );
        unwrapResult(result);
      }
    } catch (error) {
      notification.error({
        message: 'server error!!',
        duration: 1.5,
      });
    }
  };
  const handleSubmitExercise = async () => {
    try {
      const result = await dispatch(
        requestUpdateStudiedForUser({
          idTopic: dataTopicActive?.id || '',
          idUser: userInfo?._id || '',
          status: TTCSconfig.STATUS_LEARNED,
          timeStudy: 0,
          answers: selectedQuestions,
        })
      );
      unwrapResult(result);
    } catch (error) {
      notification.error({
        message: 'server error!!',
        duration: 1.5,
      });
    }
    setIsReview(true);
  };

  const handleRemakeExercise = () => {
    setSelectedQuestions([]);
    setIsReview(false);
  };
  const handleUpdateLearned = async (idTopic, idUser, timeStudy) => {
    try {
      if (!userInfo?.progess?.find((o) => o.idTopic === idTopic)) {
        const result = await dispatch(
          requestUpdateStudiedForUser({
            idTopic,
            idUser,
            status: TTCSconfig.STATUS_LEARNED,
            timeStudy,
          })
        );
        unwrapResult(result);
      }
    } catch (error) {
      notification.error({
        message: 'server error!!',
        duration: 1.5,
      });
    }
  };

  let previousTime = 0;
  const handleTimeUpdateVideo = (e) => {
    if (
      Math.floor(e.target.currentTime) === timePractice &&
      isExercise &&
      timePractice
    ) {
      videoPlayerRef.current.pause();
      setIsModalOpen(true);
      setIsExercise(false);
    }
    if ((e.target.currentTime / Number(dataTopicActive?.timeExam)) * 100 > 90) {
      handleUpdateLearned(
        dataTopicActive?.id || '',
        userInfo?._id || '',
        Math.floor(e.target.currentTime)
      );
    }
    setTimeout(() => {
      previousTime = e.target.currentTime;
    }, 1695);
  };

  const handleSeekingVideo = (e) => {
    if (e.target.currentTime > previousTime) {
      e.target.currentTime = previousTime;
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
              src={
                'data:image/png;base64,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'
              }
              alt="learn4ever_logo"
            />
          </Link>

          <div className={clsx(styles.nameCourse)}>{course?.courseName}</div>

          {!loading && (
            <div className={clsx(styles.progress)}>
              <Progress
                type="circle"
                size={36}
                strokeColor={'#fff'}
                percent={Math.round((topicTotalLearned / topicTotal) * 100)}
                format={(successPercent) => `${successPercent}%`}
              />
              <div className={clsx(styles.lesson)}>
                <strong>
                  <span>{topicTotalLearned}</span>/<span>{topicTotal}</span>
                </strong>
                <p>&nbsp;bài học</p>
              </div>
              <DarkMode />
            </div>
          )}
        </div>
      </header>
      {/* Content */}
      <Layout className={clsx(styles.layoutLearning)}>
        <Sider
          style={{ backgroundColor: 'transparent', color: 'inherit' }}
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
                        {
                          topic.topicChildData.filter((o1) =>
                            userInfo?.progess?.some(
                              (o2) =>
                                o2.idTopic === o1.id &&
                                o1.status === TTCSconfig.STATUS_PUBLIC
                            )
                          ).length
                        }
                        /
                        {
                          topic?.topicChildData.filter(
                            (o) => o.status === TTCSconfig.STATUS_PUBLIC
                          ).length
                        }
                        &nbsp;|&nbsp;
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
                            topicChild.status === TTCSconfig.STATUS_PUBLIC && (
                              <div key={indexChild}>
                                <div
                                  onClick={() => {
                                    setIndexTopic(topic.id);
                                    handleChangeTopic(topicChild.id || '');
                                  }}
                                  className={clsx(styles.subLessonItemWrapper, {
                                    [styles.lessonActive]:
                                      dataTopicActive?.id === topicChild?.id,
                                  })}
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
                                    {userInfo?.progess?.find(
                                      (c) =>
                                        c.idTopic === topicChild.id &&
                                        c.status === TTCSconfig.STATUS_LEARNED
                                    ) && <FaCheckCircle />}
                                  </div>
                                </div>
                              </div>
                            )
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
          {/* ====================== Video ====================== */}
          <div>
            {dataTopicActive?.topicType === TTCSconfig.TYPE_TOPIC_VIDEO && (
              <div className={clsx(styles.contentVideo)}>
                <div className={clsx(styles.videoPlayer)}>
                  <video
                    controls
                    autoPlay={false}
                    className={clsx(styles.videoEmbed)}
                    title="video player"
                    ref={videoPlayerRef}
                    onTimeUpdate={handleTimeUpdateVideo}
                    onSeeking={handleSeekingVideo}
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
          {/* ====================== Description ====================== */}
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
          {/* ====================== Practice ====================== */}
          <div>
            {dataTopicActive?.topicType === TTCSconfig.TYPE_TOPIC_PRATICE && (
              <div className={clsx(styles.practiceContent, 'dark')}>
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
                            <div className={clsx(styles.questionIndex)}>
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
                              <Space
                                direction="vertical"
                                className={clsx(styles.rowQuiz)}
                              >
                                {question.answer?.map((item, i) => {
                                  return (
                                    <Radio
                                      className={
                                        selectedQuestions.find(
                                          (o) => o.idQuestion === question.id
                                        )
                                          ? item?.isResult
                                            ? clsx(
                                                styles.quizChoiceRadio,
                                                styles.correct
                                              )
                                            : selectedQuestions.find(
                                                (o) =>
                                                  o.idAnswer.toString() ===
                                                  item?._id?.toString()
                                              ) &&
                                              clsx(
                                                styles.quizChoiceRadio,
                                                styles.inCorrect
                                              )
                                          : clsx(styles.quizChoiceRadio)
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
                                          styles.quizChoiceAnswer
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
                                  <div className={clsx(styles.quizExplain)}>
                                    <p className={clsx(styles.text)}>
                                      Giải thích
                                    </p>
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
                    title="Bạn có chắc muốn nộp?"
                    onConfirm={() => handleSubmitExercise()}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary">Nộp bài</Button>
                  </Popconfirm>
                )}
              </div>
            )}
          </div>
        </Content>
      </Layout>
      {/* Footer */}
      <footer className={clsx(styles.footerLearning)}>
        <button
          className={clsx(styles.btnLessonPrev)}
          onClick={handlePrevTopic}
        >
          <FaChevronLeft className={styles.iconPrev} />
          <span>BÀI TRƯỚC</span>
        </button>
        <button
          className={clsx(styles.btnLessonNext)}
          onClick={handleNextTopic}
        >
          <span>BÀI TIẾP</span>
          <FaChevronRight className={styles.iconNext} />
        </button>
        <div className={clsx(styles.btnLessonToggle)}>
          <h3>
            {topics?.map(
              (topic, i) =>
                topic.id === indexTopic && <div key={i}>{topic.name}</div>
            )}
          </h3>
          <button onClick={() => setIsShowSider(!isShowSider)}>
            {isShowSider ? <FaArrowRight /> : <FaBars />}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Learning;
