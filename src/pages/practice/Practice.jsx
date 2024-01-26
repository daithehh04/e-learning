import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import styles from './Practice.module.scss';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { requestLoadCourseBySlug } from '../../stores/middleware/courseMiddleware';
import { requestLoadQuestionsByIdTopic } from '../../stores/middleware/questionsMiddeware';
import { requestLoadTopicById } from '../../stores/middleware/topicMiddleware';
import TextArea from 'antd/es/input/TextArea';
import { apiCreateFeedback } from '../../api/feeback';
import {
  FaCheckCircle,
  FaClock,
  FaMarker,
  FaRegCheckCircle,
  FaRegClock,
  FaRegQuestionCircle,
  FaSignOutAlt,
  FaStar,
  FaTimesCircle,
  FaUndoAlt,
} from 'react-icons/fa';
import {
  Button,
  Breadcrumb,
  Col,
  Drawer,
  Modal,
  notification,
  Progress,
  Radio,
  Row,
  Space,
  Statistic,
} from 'antd';
import { answers, feedbackChild } from '../../utils/contants';
import moment from 'moment';
import { requestUpdateStudiedForUser } from '../../stores/middleware/userMiddleware';
import { useAuth0 } from '@auth0/auth0-react';
function Practice() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  //console.log(params);
  const { Countdown } = Statistic;
  let userInfo = useSelector((state) => state.user.userInfo);
  let userInfoEmailGg = useSelector((state) => state.user.userInfoEmailGg);
  const course = useSelector((state) => state.course.course);
  const totalQuestion = useSelector((state) => state.questions.total);
  const loading = useSelector((state) => state.course.loading);
  const questions = useSelector((state) => state.questions.questions);
  const topic = useSelector((state) => state.topic.topicInfo);
  const timePratice = useRef();
  const [isReview, setIsReview] = useState(false);
  const [timeCoundown, setTimeCoundown] = useState(moment().valueOf());
  const [clockStick, setClockStick] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [correctQuestions, setCorrectQuestions] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [statusLearn, setStatusLearn] = useState(0);
  const [openQuestionList, setOpenQuestionList] = useState(false);
  const [isOpenModelSubmit, setIsOpenModelSubmit] = useState(false);
  const [isOpenModelFeedback, setIsOpenModelFeedback] = useState(false);
  const [isOpenReviewExam, setIsOpenReviewExam] = useState(false);
  const [selectedFeedback, setSelectFeedback] = useState([]);
  const [textFeedback, setTextFeedback] = useState('');
  const [idQuestion, setIdQuestion] = useState();
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated && !userInfo) {
    userInfo = userInfoEmailGg;
  }
  const handlSaveSelected = (idQuestion = string, idAnswer = string) => {
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
  const handleClockStick = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 180
        ? setClockStick(!clockStick)
        : setClockStick(clockStick);
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
  const handleFeedbackOk = async () => {
    console.log(textFeedback);
    try {
      if (textFeedback.trim() !== '') {
        const res = await apiCreateFeedback({
          content: textFeedback.trim(),
          idQuestion: idQuestion,
          idCourse: course?.id,
          type: selectedFeedback,
          idUser: userInfo?._id,
        });
        notification.success({
          message: 'đã gửi feedback',
          duration: 1.5,
        });
      } else {
        notification.success({
          message: 'vui lòng nhập content',
          duration: 1.5,
        });
      }
      notification.success({
        message: 'Phản hồi thành công',
        duration: 1.5,
      });
    } catch (error) {
      notification.error({
        message: 'cập nhật không được',
        duration: 1.5,
      });
    }
    setTextFeedback('');
    handleCancel();
  };

  const handleCancel = () => {
    setIsOpenModelSubmit(false);
    setIsOpenModelFeedback(false);
    setIsOpenReviewExam(false);
    setSelectFeedback([]);
    setTextFeedback('');
    setCorrect(0);
    setCorrectQuestions([]);
  };
  const handleMark = (idQuestion = string, isCheck = boolean) => {
    if (isCheck) {
      setCorrectQuestions([...correctQuestions, idQuestion]);
      setCorrect(correct + 1);
    } else if (correctQuestions.find((o) => o === idQuestion)) {
      setCorrect(correct - 1);
      setCorrectQuestions(correctQuestions.filter((o) => o !== idQuestion));
    }
  };
  useEffect(() => {
    if (userInfo?.progess?.find((o) => o.idTopic === params.idChild)) {
      userInfo?.progess?.find(
        (o) => o.idTopic === params.idChild && setSelectedQuestions(o.answers)
      );
      setStatusLearn(
        userInfo?.progess?.find((o) => o.idTopic === params.idChild)?.status
      );
      setIsReview(true);
      setCorrect(0);
      setCorrectQuestions([]);
    } else {
      setStatusLearn(0);
      setSelectedQuestions([]);
      setIsReview(false);
      setTimeCoundown(Date.now() + (topic?.timeExam || 0) * 1000 * 60);
    }
  }, [params.idChild, userInfo, topic?.id]);
  useEffect(() => {
    window.addEventListener('scroll', handleClockStick);
    return () => {
      window.removeEventListener('scroll', handleClockStick);
    };
  }, []);
  const loadQuestionByTopic = async (idTopic, status) => {
    try {
      const result = await dispatch(
        requestLoadQuestionsByIdTopic({ idTopic, status })
      );
      unwrapResult(result);
    } catch (error) {
      notification.error({
        message: 'lỗi server, không tải được câu hỏi',
        duration: 1.5,
      });
    }
  };
  const handleSubmitOk = async () => {
    try {
      const result = await dispatch(
        requestUpdateStudiedForUser({
          idTopic: topic?.id || '',
          idUser: userInfo?._id || '',
          status: 2,
          timeStudy: timePratice.current,
          date: new Date(),
          nameExam: topic?.name,
          score: Math.round((correct / totalQuestion) * 100) / 10,
          correctQuestion: correct,
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
    setIsOpenModelSubmit(false);
  };
  const loadTopicById = async (id) => {
    try {
      const result = await dispatch(requestLoadTopicById({ id }));
      unwrapResult(result);
    } catch (error) {
      notification.error({
        message: 'lỗi server, không tải được câu hỏi',
        duration: 1.5,
      });
    }
  };

  useEffect(() => {
    loadQuestionByTopic(params.idChild || '', 1);
    loadCourse(params.slugChild || '');
    loadTopicById(params.idChild || '');
  }, [params.idChild, params.slugChild]);
  const handleReviewExam = () => {
    if (statusLearn === 2) {
      setSelectedQuestions([]);
      setStatusLearn(0);
      setIsOpenReviewExam(false);
      setIsReview(false);
      setTimeCoundown(Date.now() + (topic?.timeExam || 0) * 1000 * 60);
    }
  };
  const handleCloseQuestionList = () => {
    setOpenQuestionList(false);
  };

  const handleShowQuestionList = () => {
    setOpenQuestionList(!openQuestionList);
  };

  return (
    <>
      <Header />
      <main>
        <div className="wide">
          <div className={styles.practiceContainer}>
            <div className={clsx(styles.practiceBreadcumb, 'dark')}>
              <Breadcrumb separator="›">
                <Breadcrumb.Item>
                  <NavLink
                    to={'/'}
                    className={clsx(styles.practiceBreadcumbLink)}
                  >
                    Trang chủ
                  </NavLink>
                </Breadcrumb.Item>
                {!loading && (
                  <>
                    <Breadcrumb.Item>
                      <NavLink
                        to={`/${course?.category?.slug}`}
                        className={clsx(styles.practiceBreadcumbLink)}
                      >
                        {course?.category?.name}
                      </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <NavLink
                        to={`/${course?.category?.slug}/${course?.slug}`}
                        className={clsx(styles.practiceBreadcumbLink)}
                      >
                        {course?.courseName}
                      </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <NavLink
                        to={`/${course?.category?.slug}/${course?.slug}/de-kiem-tra/${params.id}`}
                        className={clsx(styles.practiceBreadcumbLink)}
                      >
                        Đề kiểm tra
                      </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <NavLink
                        to={`/${course?.category?.slug}/${course?.slug}/de-kiem-tra/${params.id}`}
                        className={clsx(
                          styles.practiceBreadcumbLink,
                          styles.active
                        )}
                      >
                        {topic?.name}
                      </NavLink>
                    </Breadcrumb.Item>
                  </>
                )}
              </Breadcrumb>
            </div>
            <h1 className={clsx(styles.practiceHeading)}>{topic?.name}</h1>
            <Row gutter={10} className={clsx(styles.practiceView)}>
              <Col xl={16} lg={16} md={24} sm={24} xs={24}>
                <Row
                  className={
                    clockStick
                      ? clsx(styles.practiceClockPanel, 'stick')
                      : clsx(styles.practiceClockPanel)
                  }
                  onScroll={handleClockStick}
                >
                  <FaRegClock className={clsx(styles.practiceClockIcon)} />
                  <span className={clsx(styles.practiceClockTime)}>
                    <Countdown
                      value={!isReview ? timeCoundown : 0}
                      onFinish={handleSubmitOk}
                      onChange={(val) => {
                        timePratice.current = val;
                      }}
                    />
                  </span>
                </Row>
                <div>
                  {questions.length > 0 &&
                    questions?.map((qs, i) => {
                      return (
                        <Row
                          id={qs.id}
                          className={clsx(styles.practicePractice)}
                          key={qs.id}
                        >
                          <div className={clsx(styles.practicePracticeItem)}>
                            <div className={clsx(styles.feedbackIconWrapper)}>
                              <FaMarker
                                className={clsx(styles.feedbackIcon)}
                                onClick={() => {
                                  setIsOpenModelFeedback(true);
                                  setIdQuestion(qs?.id);
                                }}
                              />
                            </div>
                            <div className={clsx(styles.gameView)}>
                              <div className={clsx(styles.gameViewQuestion)}>
                                <div
                                  className={clsx(styles.gameViewQuestionIndex)}
                                >
                                  <span>{i + 1}.</span>
                                </div>
                                <div
                                  className={clsx(styles.gameViewQuestionText)}
                                >
                                  <div
                                    className={clsx(styles.categorySummary)}
                                    dangerouslySetInnerHTML={{
                                      __html: qs.question ?? '',
                                    }}
                                  />
                                </div>
                              </div>

                              <div className={clsx(styles.gameViewQuizChoices)}>
                                <div className={clsx(styles.quizChoicesItem)}>
                                  <Space direction="vertical">
                                    {qs.answer?.map((item, i) => {
                                      return (
                                        <Radio
                                          className={
                                            isReview
                                              ? statusLearn === 2 &&
                                              (item?.isResult
                                                ? clsx(
                                                  styles.quizChoicesItemRadio,
                                                  styles.correct
                                                )
                                                : selectedQuestions.find(
                                                  (o) =>
                                                    o.idAnswer.toString() ===
                                                    item?._id?.toString()
                                                ) &&
                                                clsx(
                                                  styles.quizChoicesItemRadio,
                                                  styles.inCorrect
                                                ))
                                              : clsx(
                                                styles.quizChoicesItemRadio
                                              )
                                          }
                                          value={item}
                                          key={i}
                                          checked={
                                            !!selectedQuestions.find(
                                              (o) =>
                                                o.idAnswer.toString() ===
                                                item?._id?.toString()
                                            )
                                          }
                                          onClick={(e) => {
                                            handlSaveSelected(
                                              qs?.id || '',
                                              item?._id || ''
                                            );
                                            handleMark(
                                              qs?.id || '',
                                              item?.isResult
                                            );
                                          }}
                                          disabled={isReview}
                                        >
                                          <div
                                            className={clsx(
                                              styles.quizChoicesItemAnswer
                                            )}
                                          >
                                            {answers[item.index]}.&nbsp;
                                            <span
                                              dangerouslySetInnerHTML={{
                                                __html: item.text ?? '',
                                              }}
                                            ></span>
                                          </div>
                                        </Radio>
                                      );
                                    })}

                                    {isReview && statusLearn === 2 && (
                                      <div className={clsx(styles.quizExplain)}>
                                        {qs.hint && (
                                          <div
                                            className={clsx(
                                              styles.quizExplainItem
                                            )}
                                          >
                                            <p>Giải thích</p>
                                          </div>
                                        )}

                                        {selectedQuestions.find(
                                          (o) => o.idQuestion === qs.id
                                        ) ? (
                                          qs.answer?.find(
                                            (item) =>
                                              item?.isResult &&
                                              selectedQuestions.find(
                                                (o) =>
                                                  o.idAnswer.toString() ===
                                                  item?._id?.toString()
                                              )
                                          ) ? (
                                            <p style={{ color: '#33cd99' }}>
                                              Bạn chọn đáp án đúng
                                            </p>
                                          ) : (
                                            <p style={{ color: '#ff4747' }}>
                                              Bạn chọn đáp án sai
                                            </p>
                                          )
                                        ) : (
                                          <p style={{ color: '#ff4747' }}>
                                            Bạn chưa chọn đáp án
                                          </p>
                                        )}

                                        {qs.hint && (
                                          <div
                                            className={clsx(
                                              'quiz__explain--item'
                                            )}
                                          >
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: qs.hint ?? '',
                                              }}
                                            ></div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </Space>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Row>
                      );
                    })}
                </div>
              </Col>

              <Col xl={8} lg={8} md={0} sm={0} xs={0}>
                <div className={clsx(styles.practicePalettePanel)}>
                  <div className={clsx(styles.practicePaletteMain)}>
                    <div className={clsx(styles.practicePaletteHeader)}>
                      <div className={clsx(styles.practicePaletteTitle)}>
                        Bảng câu hỏi
                      </div>
                    </div>

                    <div>
                      <div className={clsx(styles.practicePaletteProgress)}>
                        <Progress
                          percent={
                            (selectedQuestions.length / totalQuestion) * 100
                          }
                          status="active"
                          strokeColor={'#009d9d'}
                          showInfo={false}
                        />
                        <div
                          className={clsx(styles.practicePaletteProgressTsitle)}
                        >
                          {selectedQuestions.length}/{totalQuestion}
                        </div>
                      </div>

                      <div
                        className={clsx(styles.practicePaletteQuestionList)}
                        style={
                          isReview ? { height: '30vh' } : { height: '60vh' }
                        }
                      >
                        <Row
                          style={{
                            marginTop: '0.4rem',
                          }}
                          gutter={[0, 16]}
                        >
                          {questions?.map((o, i) =>
                            isReview ? (
                              <Col
                                span={3}
                                className={clsx(styles.questionItem)}
                                key={i}
                              >
                                <a href={`#${o.id}`}>
                                  <span
                                    className={
                                      statusLearn === 2
                                        ? o.answer?.find(
                                          (item) =>
                                            item?.isResult &&
                                            selectedQuestions.find(
                                              (o) =>
                                                o.idAnswer.toString() ===
                                                item?._id?.toString()
                                            )
                                        )
                                          ? clsx(
                                            styles.questionItemBground,
                                            styles.green,
                                            styles.active
                                          )
                                          : clsx(
                                            styles.questionItemBground,
                                            styles.red,
                                            styles.active
                                          )
                                        : clsx(styles.questionItemBground)
                                    }
                                  >
                                    {i + 1}
                                  </span>
                                </a>
                              </Col>
                            ) : (
                              <Col
                                span={3}
                                className={clsx(styles.questionItem)}
                                key={i}
                              >
                                <a href={`#${o.id}`}>
                                  <span
                                    className={
                                      selectedQuestions.find(
                                        (c) => c.idQuestion === o.id
                                      )
                                        ? clsx(
                                          styles.questionItemBground,
                                          styles.active
                                        )
                                        : clsx(styles.questionItemBground)
                                    }
                                  >
                                    {i + 1}
                                  </span>
                                </a>
                              </Col>
                            )
                          )}
                        </Row>
                      </div>
                    </div>

                    {isReview && statusLearn === 2 && (
                      <div className={clsx(styles.practicePaletteReview)}>
                        {userInfo?.progess?.map(
                          (o, i) =>
                            o.idTopic === topic?.id && (
                              <div key={i}>
                                <div className={clsx(styles.examPanelScore)}>
                                  <FaStar
                                    style={{
                                      color: '#ffe644',
                                      fontSize: '8rem',
                                    }}
                                  />
                                  <span>{o.score}</span>
                                </div>
                                <Row
                                  className={clsx(styles.examPanelBody)}
                                  gutter={[16, 16]}
                                >
                                  <Col
                                    span={7}
                                    className={clsx(
                                      styles.examPanelBodyItem,
                                      'exam__panel--correct'
                                    )}
                                  >
                                    <FaCheckCircle
                                      style={{
                                        color: '#33cd99',
                                        fontSize: '1.8rem',
                                      }}
                                    />
                                    <span style={{ fontSize: '1.4rem' }}>
                                      Câu đúng
                                    </span>
                                    <span style={{ fontSize: '2.2rem' }}>
                                      {o.correctQuestion}
                                    </span>
                                  </Col>
                                  <Col
                                    span={7}
                                    className={clsx(
                                      styles.examPanelBodyItem,
                                      'exam__panel--inCorrect'
                                    )}
                                  >
                                    <FaTimesCircle
                                      style={{
                                        color: '#ff4747',
                                        fontSize: '1.8rem',
                                      }}
                                    />
                                    <span style={{ fontSize: '1.4rem' }}>
                                      Câu sai
                                    </span>
                                    <span style={{ fontSize: '2.2rem' }}>
                                      {totalQuestion - o.correctQuestion}
                                    </span>
                                  </Col>
                                  <Col
                                    span={7}
                                    className={clsx(
                                      styles.examPanelBodyItem,
                                      'exam__panel--time'
                                    )}
                                  >
                                    <FaClock
                                      style={{
                                        color: '#ffba34',
                                        fontSize: '1.8rem',
                                      }}
                                    />
                                    <span style={{ fontSize: '1.4rem' }}>
                                      Thời gian
                                    </span>
                                    <span style={{ fontSize: '2.2rem' }}>
                                      {moment(
                                        Math.abs(
                                          (topic?.timeExam || 0) * 60000 -
                                          o.timeStudy
                                        )
                                      ).format('mm:ss')}
                                    </span>
                                  </Col>
                                </Row>
                              </div>
                            )
                        )}
                      </div>
                    )}
                    <div className={clsx(styles.practicePaletteFooter)}>
                      {isReview ? (
                        statusLearn === 2 ? (
                          <div className={clsx(styles.btnGroup)}>
                            <button
                              className={clsx(styles.btn, styles.btnSubmit)}
                              onClick={() => setIsOpenReviewExam(true)}
                            >
                              Làm lại
                            </button>
                            <button
                              className={clsx(styles.btn)}
                              onClick={() => {
                                navigate(
                                  `/${course?.category?.slug}/${course?.slug}/de-kiem-tra/${params.id}`
                                );
                              }}
                            >
                              Thoát
                            </button>
                          </div>
                        ) : (
                          <div className={clsx(styles.btnGroup)}>
                            <button
                              className={clsx(styles.btn, styles.btnSubmit)}
                              onClick={() => setIsOpenReviewExam(true)}
                            >
                              Làm tiếp
                            </button>
                            <button
                              className={clsx(styles.btn)}
                              onClick={() => {
                                navigate(
                                  `/${course?.category?.slug}/${course?.slug}/de-kiem-tra/${params.id}`
                                );
                              }}
                            >
                              Thoát
                            </button>
                          </div>
                        )
                      ) : (
                        <div className={clsx(styles.btnGroup)}>
                          <button
                            className={clsx(styles.btn, styles.btnSubmit)}
                            onClick={() => {
                              setIsOpenModelSubmit(true);
                            }}
                          >
                            Nộp bài
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className={clsx(styles.practiceSubnav)}>
              <Row className={clsx(styles.practiceSubnavMain)}>
                {isReview ? (
                  <>
                    <Col
                      span={8}
                      className={clsx(styles.practiceSubnavItem)}
                      onClick={() => {
                        navigate(
                          `/${course?.category?.slug}/${course?.slug}/de-kiem-tra/${params.id}`
                        );
                      }}
                    >
                      <FaSignOutAlt
                        className={clsx(styles.practiceSubnavItemIcon)}
                      />
                      <div className={clsx(styles.practiceSubnavItemLabel)}>
                        Thoát
                      </div>
                    </Col>
                    <Col
                      span={8}
                      className={clsx(styles.practiceSubnavItem)}
                      onClick={() => setIsOpenReviewExam(true)}
                    >
                      <FaUndoAlt
                        className={clsx(styles.practiceSubnavItemIcon)}
                      />
                      <div className={clsx(styles.practiceSubnavItemLabel)}>
                        Làm lại
                      </div>
                    </Col>
                  </>
                ) : (
                  <Col
                    span={8}
                    className={clsx(styles.practiceSubnavItem)}
                    onClick={() => {
                      setIsOpenModelSubmit(true);
                      console.log('dm');
                    }}
                  >
                    <FaRegCheckCircle
                      className={clsx(styles.practiceSubnavItemIcon)}
                    />
                    <div className={clsx(styles.practiceSubnavItemLabel)}>
                      Nộp bài
                    </div>
                  </Col>
                )}

                <Col
                  span={8}
                  className={
                    openQuestionList
                      ? clsx(styles.practiceSubnavItem, styles.active)
                      : clsx(styles.practiceSubnavItem)
                  }
                  onClick={handleShowQuestionList}
                >
                  <FaRegQuestionCircle
                    className={clsx(styles.practiceSubnavItemIcon)}
                  />
                  <div className={clsx(styles.practiceSubnavItemLabel)}>
                    Danh sách câu hỏi
                  </div>
                </Col>
                <Drawer
                  className={clsx(styles.practiceDrawer)}
                  placement={'bottom'}
                  onClose={handleCloseQuestionList}
                  open={openQuestionList}
                  height={'80%'}
                  zIndex={100}
                >
                  <div className={clsx(styles.practicePaletteBody)}>
                    {isReview && (
                      <div className={clsx(styles.practicePaletteReview)}>
                        {userInfo?.progess?.map(
                          (o, i) =>
                            o.idTopic === topic?.id && (
                              <div key={i}>
                                <div className={clsx(styles.examPanelScore)}>
                                  <FaStar
                                    style={{
                                      color: '#ffe644',
                                      fontSize: '8rem',
                                    }}
                                  />
                                  <span>{o.score}</span>
                                </div>
                                <Row
                                  className={clsx('exam__panel--body')}
                                  gutter={[16, 16]}
                                >
                                  <Col
                                    span={7}
                                    className={clsx(styles.examPanelBodyItem)}
                                  >
                                    <FaCheckCircle
                                      style={{
                                        color: '#33cd99',
                                        fontSize: '1.8rem',
                                      }}
                                    />
                                    <span style={{ fontSize: '1.4rem' }}>
                                      Câu đúng
                                    </span>
                                    <span style={{ fontSize: '2.2rem' }}>
                                      {o.correctQuestion}
                                    </span>
                                  </Col>
                                  <Col
                                    span={7}
                                    className={clsx(styles.examPanelBodyItem)}
                                  >
                                    <FaTimesCircle
                                      style={{
                                        color: '#ff4747',
                                        fontSize: '1.8rem',
                                      }}
                                    />
                                    <span style={{ fontSize: '1.4rem' }}>
                                      Câu sai
                                    </span>
                                    <span style={{ fontSize: '2.2rem' }}>
                                      {totalQuestion - o.correctQuestion}
                                    </span>
                                  </Col>
                                  <Col
                                    span={7}
                                    className={clsx(styles.examPanelBodyItem)}
                                  >
                                    <FaClock
                                      style={{
                                        color: '#ffba34',
                                        fontSize: '1.8rem',
                                      }}
                                    />
                                    <span style={{ fontSize: '1.4rem' }}>
                                      Thời gian
                                    </span>
                                    <span style={{ fontSize: '2.2rem' }}>
                                      {moment(
                                        Math.abs(
                                          (topic?.timeExam || 0) * 60000 -
                                          o.timeStudy
                                        )
                                      ).format('mm:ss')}
                                    </span>
                                  </Col>
                                </Row>
                              </div>
                            )
                        )}
                      </div>
                    )}
                    <div className={clsx(styles.practicePaletteProgress)}>
                      <Progress
                        percent={
                          (selectedQuestions.length / totalQuestion) * 100
                        }
                        status="active"
                        strokeColor={'#009d9d'}
                        showInfo={false}
                      />
                      <div
                        className={clsx(styles.practicePaletteProgressTitle)}
                      >
                        {selectedQuestions.length}/{totalQuestion}
                      </div>
                    </div>

                    <div className={clsx(styles.practicePaletteQuestionList)}>
                      <Row
                        style={{
                          marginTop: '0.4rem',
                        }}
                        gutter={[0, 16]}
                      >
                        {questions?.map((o, i) => (
                          <Col
                            span={3}
                            styles={{ textAlign: 'center' }}
                            key={i}
                          >
                            <a
                              href={`#${o.id}`}
                              onClick={handleCloseQuestionList}
                            >
                              <span
                                className={
                                  o.answer?.find(
                                    (item) =>
                                      item?.isResult &&
                                      selectedQuestions.find(
                                        (o) =>
                                          o.idAnswer.toString() ===
                                          item?._id?.toString()
                                      )
                                  )
                                    ? clsx(
                                      styles.questionItemBground,
                                      styles.green,
                                      styles.active
                                    )
                                    : clsx(
                                      styles.questionItemBground,
                                      styles.red,
                                      styles.active
                                    )
                                }
                              >
                                {i + 1}
                              </span>
                            </a>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </div>
                </Drawer>
              </Row>
            </div>
            <div>
              <Modal
                className={clsx(styles.modal, styles.modalSubmit)}
                title="Nộp bài"
                open={isOpenModelSubmit}
                onOk={handleSubmitOk}
                onCancel={handleCancel}
                okText={'Nộp bài'}
                cancelText={'Hủy'}
              >
                {selectedQuestions.length === totalQuestion ? (
                  <p>Bạn có chắc chắn muốn nộp bài làm của mình không?</p>
                ) : (
                  <p>
                    Bạn vẫn còn câu hỏi chưa trả lời. Bạn có chắc chắn muốn nộp
                    bài làm của mình không?
                  </p>
                )}
              </Modal>
              <Modal
                className={clsx(styles.modal, styles.modalSubmit)}
                title="Làm lại"
                open={isOpenReviewExam}
                onOk={handleReviewExam}
                onCancel={handleCancel}
                okText={'Làm lại'}
                cancelText={'Hủy'}
              >
                <p>Bạn có chắc chắn muốn làm lại không?</p>
              </Modal>
              <Modal
                className={clsx(styles.modal, styles.modalFeedback)}
                title="BẠN ĐANG GẶP VẤN ĐỀ GÌ?"
                open={isOpenModelFeedback}
                onOk={handleFeedbackOk}
                onCancel={handleCancel}
                okText="Gửi phản hồi"
                footer={
                  textFeedback.trim() !== '' || selectedFeedback.length ? (
                    <Button
                      className={clsx(styles.btnFeedback)}
                      onClick={handleFeedbackOk}
                    >
                      Gửi phản hồi
                    </Button>
                  ) : (
                    <Button className={clsx(styles.btnFeedback)} disabled>
                      Gửi phản hồi
                    </Button>
                  )
                }
              >
                <Row
                  gutter={[16, 16]}
                  className={clsx(styles.modalFeedbackList)}
                >
                  {feedbackChild?.map((o, i) => (
                    <Col
                      key={i}
                      xl={8}
                      lg={8}
                      md={8}
                      sm={12}
                      xs={12}
                      className={clsx(styles.modalFeedbackItem)}
                      onClick={() => {
                        if (!selectedFeedback.find((c) => c === o?.type)) {
                          setSelectFeedback([...selectedFeedback, o?.type]);
                        } else {
                          setSelectFeedback(
                            selectedFeedback.filter((c) => c !== o?.type)
                          );
                        }
                      }}
                    >
                      <span
                        className={
                          selectedFeedback.find((c) => c === o?.type)
                            ? clsx(styles.selected)
                            : ''
                        }
                      >
                        {o.text}
                      </span>
                    </Col>
                  ))}
                </Row>
                <TextArea
                  name="feedbackText"
                  autoSize={{
                    minRows: 4,
                    maxRows: 10,
                  }}
                  placeholder="Nhập vấn đề bạn đang mắc phải..."
                  style={{ minWidth: '100%' }}
                  onChange={(e) => {
                    setTextFeedback(e.target.value);
                  }}
                  value={textFeedback}
                  showCount
                  maxLength={500}
                />
                <div className={clsx(styles.modalFeedbackNote)}>
                  Phản hồi của bạn sẽ được ghi nhận!
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
export default Practice;
