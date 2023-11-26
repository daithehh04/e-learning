import { Breadcrumb, Col, notification, Row } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  FaBatteryFull,
  FaClock,
  FaFilm,
  FaLightbulb,
  FaPencilRuler,
} from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import styles from "./courseDetail.module.scss";
import clsx from 'clsx';
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";

const course = {
  id: '1a2e',
  category: {
    slug: 'hoc',
    name: 'toan-1'
  },
  slug: 'course-slug',
  courseName: 'course-name',
  shortDes: 'good',
  desc: 'helpful',
  avatar: 'http://res.cloudinary.com/dxp3jz1fc/image/upload/v1679486233/mukcavqjhmdsyuqpgljr.jpg'
}
const CourseDetail = () => {
  const [totalExam, setTotalExam] = useState(0);
  const loading = false
  return (
    <>
      <Header />

      <div className={clsx("detail")}>
        <div className={clsx("wide")}>
          <div className={clsx("detail__container")}>
            <div className={clsx("detail__wrapper")}>
              <div className={clsx("detail__breadcrumb")}>
                <Breadcrumb separator="›">
                  <Breadcrumb.Item>
                    <NavLink to={"/"} className={clsx("detail__breadcumb--link")}>
                      Trang chủ
                    </NavLink>
                  </Breadcrumb.Item>
                  {!loading && (
                    <>
                      <Breadcrumb.Item>
                        <NavLink
                          to={`/${course?.category?.slug}`}
                          className={clsx("detail__breadcumb--link")}
                        >
                          {course?.category?.name}
                        </NavLink>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <NavLink
                          to={`/${course?.category?.slug}/${course?.slug}`}
                          className={clsx("detail__breadcumb--link", "active")}
                        >
                          {course?.courseName}
                        </NavLink>
                      </Breadcrumb.Item>
                    </>
                  )}
                </Breadcrumb>
              </div>

              <Row
                style={{ width: "100%", margin: "0" }}
                gutter={16}
                className={clsx("detail__row")}
              >
                <Col xl={16} lg={16} md={24} sm={24} xs={24}>
                  <h1 className={clsx("detail__name")}>{course?.courseName}</h1>

                  <div className={clsx("detail__des")}>
                    <p>{course?.shortDes}</p>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: course?.des ?? "",
                    }}
                    className={clsx("detail__longDes")}
                  ></div>
                </Col>

                <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                  <div className={clsx("detail__badge")}>
                    <div className={clsx("detail__image")}>
                      <img
                        src={course?.avatar || ""}
                        alt="course-avatar"
                        className={clsx("detail__avatar")}
                      />
                    </div>
                    <h5 className={clsx("detail__price")}>Miễn phí</h5>
                    <div className={clsx("detail__group--btn")}>
                      <Row>
                        <Col xl={24} lg={24} md={12} sm={24} xs={24}>
                          <NavLink
                            to={`chuong-trinh-hoc/${course?.id}-1`}
                            className={clsx("detail__btn--link")}
                          >
                            <button className={clsx("detail__button", "btn1")}>
                              Chương trình học
                            </button>
                          </NavLink>
                        </Col>

                        <Col xl={24} lg={24} md={12} sm={24} xs={24}>
                          <NavLink
                            to={`de-kiem-tra/${course?.id}-2`}
                            className={clsx("detail__btn--link")}
                          >
                            <button className={clsx("detail__button", "btn2")}>
                              Đề kiểm tra
                            </button>
                          </NavLink>
                        </Col>
                      </Row>
                    </div>
                    <ul className={clsx("detail__list")}>
                      <li className={clsx("detail__item")}>
                        <FaLightbulb className={clsx("detail__icon")} />
                        <span>Trình độ cơ bản</span>
                      </li>
                      <li className={clsx("detail__item")}>
                        <FaFilm className={clsx("detail__icon")} />
                        <span>
                          Tổng số <strong>{6}</strong> bài học
                        </span>
                      </li>
                      <li className={clsx("detail__item")}>
                        <FaClock className={clsx("detail__icon")} />
                        <span>
                          Thời lượng{" "}
                          <strong>
                            {/* {moment(
                              topics
                                .map((topic, i) =>
                                  topic?.topicChildData.reduce(
                                    (accumulator, currentValue) =>
                                      accumulator +
                                      Number(currentValue.timeExam),
                                    0
                                  )
                                )
                                .reduce(
                                  (accumulator, currentValue) =>
                                    accumulator + currentValue,
                                  0
                                ) * 1000
                            ).format("mm:ss")} */}
                          </strong>
                        </span>
                      </li>
                      <li className={clsx("detail__item")}>
                        <FaPencilRuler className={clsx("detail__icon")} />
                        <span>
                          <strong>{totalExam}</strong> Đề kiểm tra
                        </span>
                      </li>
                      <li className={clsx("detail__item")}>
                        <FaBatteryFull className={clsx("detail__icon")} />
                        <span>Học mọi lúc, thi mọi nơi</span>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseDetail;
