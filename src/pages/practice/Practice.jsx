import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import styles from './Practice.module.scss';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from "@reduxjs/toolkit";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { requestLoadCourseBySlug } from '../../stores/middleware/courseMiddleware';
import { requestLoadQuestionsByIdTopic } from "../../stores/middleware/questionsMiddeware";
import { requestLoadTopicById } from "../../stores/middleware/topicMiddleware"
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
} from "react-icons/fa";
import {
  Breadcrumb,
  Col,
  Drawer,
  Modal,
  notification,
  Progress,
  Radio,
  Row,
  Space,
  Statistic
} from "antd";
import moment from "moment";

const loading = false;

function Practice() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);
  const [isReview, setIsReview] = useState(false);
  const [timeCoundown, setTimeCoundown] = useState(moment().valueOf());
  const { Countdown } = Statistic;
  const [clockStick, setClockStick] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [correctQuestions, setCorrectQuestions] = useState([]);
  const [correct, setCorrect] = useState(0);
  const params = useParams();
  const course = useSelector((state) => state.course.course);
  const questions = useSelector((state) => state.questions.questions);
  const topic = useSelector((state) => state.topic.topicInFo);
  const [statusLearn, setStatusLearn] = useState(0);
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
        message: "server error!!",
        duration: 1.5,
      });
    }
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
    window.addEventListener("scroll", handleClockStick);
    return () => {
      window.removeEventListener("scroll", handleClockStick);
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
        message: "lỗi server, không tải được câu hỏi",
        duration: 1.5,
      });
    }
  };
  const loadTopicById = async (id) => {
    try {
      const result = await dispatch(requestLoadTopicById({ id }));
      unwrapResult(result);
    } catch (error) {
      notification.error({
        message: "lỗi server, không tải được câu hỏi",
        duration: 1.5,
      });
    }
  };

  useEffect(() => {
    loadQuestionByTopic(params.idChild || "", 1);
    loadCourse(params.slugChild || "");
    loadTopicById(params.idChild || "");
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
  return (
    <>
      <Header />
      <main>
        <div className="wide">
          <div className={clsx(styles.practiceBreadcumb)}>
            <Breadcrumb separator="›">
              <Breadcrumb.Item>
                <NavLink
                  to={"/"}
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
                      className={clsx(styles.detailBreadcumbLink)}
                    >
                      {course?.category?.name}
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink
                      to={`/${course?.category?.slug}/${course?.slug}`}
                      className={clsx(styles.detailBreadcumbLink)}
                    >
                      {course?.courseName}
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink
                      to={`/${course?.category?.slug}/${course?.slug}/de-kiem-tra/${params.id}`}
                      className={clsx("exam__breadcumb--link")}
                    >
                      Đề kiểm tra
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink
                      to={`/${course?.category?.slug}/${course?.slug}/de-kiem-tra/${params.id}`}
                      className={clsx("practice__breadcumb--link", "active")}
                    >
                      {topic?.name}
                    </NavLink>
                  </Breadcrumb.Item>
                  <h1 className={clsx("practice__heading")}>{topic?.name}</h1>
                  <Row gutter={10} className={clsx(styles.practiceView)}>
                    <Col xl={16} lg={16} md={24} sm={24} xs={24}>
                      <Row
                        className={
                          clockStick
                            ? clsx(styles.practiceClockPanel, "stick")
                            : clsx(styles.practiceClockPanel)
                        }
                      // onScroll={handleClockStick}
                      >
                        <FaRegClock className={clsx(styles.practiceClockIcon)} />
                        <span className={clsx(styles.practiceClockTime)}>
                          {/* {!isReview && ( */}
                          <Countdown
                            value={!isReview ? timeCoundown : 0}
                          // onFinish={handleSubmitOk}
                          // onChange={(val: StatisticProps["value"]) => {
                          //   timePratice.current = val;
                          // }}
                          />
                          {/* )} */}
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
                                    // onClick={() => {
                                    //   setIsOpenModelFeedback(true);
                                    //   setIdQuestion(qs?.id);
                                    // }}
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
                                            __html: qs.question ?? "",
                                          }}
                                        />
                                      </div>
                                    </div>

                                    <div className={clsx(styles.gameViewQuizChoices)}>
                                      <div className={clsx(styles.quizChoicesItem)}>
                                        <Space direction="vertical">
                                          <Radio.Group
                                            className={clsx(styles.quizChoicesItemInner)}
                                          >
                                            {qs.answer?.map((item, i) => {
                                              return (
                                                <Radio
                                                  className={
                                                    isReview
                                                      ? statusLearn ===
                                                      2 &&
                                                      (item?.isResult
                                                        ? clsx(
                                                          styles.quizChoicesItemRadio,
                                                          "correct"
                                                        )
                                                        : selectedQuestions.find(
                                                          (o) =>
                                                            o.idAnswer.toString() ===
                                                            item?._id?.toString()
                                                        ) &&
                                                        clsx(
                                                          styles.quizChoicesItemRadio,
                                                          "inCorrect"
                                                        ))
                                                      : clsx(
                                                        styles.quizChoicesItemRadio
                                                      )
                                                  }
                                                  value={item}
                                                  key={i}
                                                  // checked={
                                                  //   !!selectedQuestions.find(
                                                  //     (o) =>
                                                  //       o.idAnswer.toString() ===
                                                  //       item?._id?.toString()
                                                  //   )
                                                  // }
                                                  onClick={(e) => {
                                                    handlSaveSelected(
                                                      qs?.id || "",
                                                      item?._id || ""
                                                    );
                                                    handleMark(
                                                      qs?.id || "",
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
                                                        __html: item.text ?? "",
                                                      }}
                                                    ></span>
                                                  </div>
                                                </Radio>
                                              );
                                            })}
                                          </Radio.Group>

                                          {isReview &&
                                            statusLearn ===
                                            2 &&
                                            (
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
                                                    <p style={{ color: "#33cd99" }}>
                                                      Bạn chọn đáp án đúng
                                                    </p>
                                                  ) : (
                                                    <p style={{ color: "#ff4747" }}>
                                                      Bạn chọn đáp án sai
                                                    </p>
                                                  )
                                                ) : (
                                                  <p style={{ color: "#ff4747" }}>
                                                    Bạn chưa chọn đáp án
                                                  </p>
                                                )}

                                                {qs.hint && (
                                                  <div
                                                    className={clsx(
                                                      "quiz__explain--item"
                                                    )}
                                                  >
                                                    <div
                                                      dangerouslySetInnerHTML={{
                                                        __html: qs.hint ?? "",
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
                                // percent={
                                //   (selectedQuestions.length / totalQuestion) * 100
                                // }
                                status="active"
                                strokeColor={"#009d9d"}
                                showInfo={false}
                              />
                              <div
                                className={clsx(styles.practicePaletteProgressTsitle)}
                              >
                                {/* {selectedQuestions.length}/{totalQuestion} */}
                              </div>
                            </div>

                            <div
                              className={clsx(styles.practicePaletteQuestionList)}
                              style={
                                isReview ? { height: "30vh" } : { height: "60vh" }
                              }
                            >
                              <Row
                                style={{
                                  marginTop: "0.4rem",
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
                                            statusLearn ===
                                              2
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
                                                  "green",
                                                  "active"
                                                )
                                                : clsx(
                                                  styles.questionItemBground,
                                                  "red",
                                                  "active"
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
                                                "active"
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

                          {isReview &&
                            (
                              <div className={clsx(styles.practicePaletteReview)}>
                                {userInfo?.progess?.map(
                                  (o, i) =>
                                    o.idTopic === topic?.id && (
                                      <div key={i}>
                                        <div className={clsx(styles.examPanelScore)}>
                                          <FaStar
                                            style={{
                                              color: "#ffe644",
                                              fontSize: "8rem",
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
                                              "exam__panel--correct"
                                            )}
                                          >
                                            <FaCheckCircle
                                              style={{
                                                color: "#33cd99",
                                                fontSize: "1.8rem",
                                              }}
                                            />
                                            <span style={{ fontSize: "1.4rem" }}>
                                              Câu đúng
                                            </span>
                                            <span style={{ fontSize: "2.2rem" }}>
                                              {o.correctQuestion}
                                            </span>
                                          </Col>
                                          <Col
                                            span={7}
                                            className={clsx(
                                              styles.examPanelBodyItem,
                                              "exam__panel--inCorrect"
                                            )}
                                          >
                                            <FaTimesCircle
                                              style={{
                                                color: "#ff4747",
                                                fontSize: "1.8rem",
                                              }}
                                            />
                                            <span style={{ fontSize: "1.4rem" }}>
                                              Câu sai
                                            </span>
                                            <span style={{ fontSize: "2.2rem" }}>
                                              {/* {totalQuestion - o.correctQuestion} */}
                                            </span>
                                          </Col>
                                          <Col
                                            span={7}
                                            className={clsx(
                                              styles.examPanelBodyItem,
                                              "exam__panel--time"
                                            )}
                                          >
                                            <FaClock
                                              style={{
                                                color: "#ffba34",
                                                fontSize: "1.8rem",
                                              }}
                                            />
                                            <span style={{ fontSize: "1.4rem" }}>
                                              Thời gian
                                            </span>
                                            <span style={{ fontSize: "2.2rem" }}>
                                              {moment(
                                                Math.abs(
                                                  (topic?.timeExam || 0) * 60000 -
                                                  o.timeStudy
                                                )
                                              ).format("mm:ss")}
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
                                  // onClick={() => setIsOpenReviewExam(true)}
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
                                // onClick={() => setIsOpenModelSubmit(true)}
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
                </>
              )}
            </Breadcrumb>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
export const answers = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
export default Practice