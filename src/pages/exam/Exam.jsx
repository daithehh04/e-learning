import Header from '../../layout/Header/Header'
import Footer from '../../layout/Footer/Footer'
import clsx from 'clsx'
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Col, Popconfirm, Row } from "antd";
import { useEffect, useState } from "react";
import styles from './Exam.module.scss';
import {
  FaChevronDown,
  FaChevronUp,
  FaRegClock,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { BiChevronRight } from "react-icons/bi";
import React from 'react'
const course = {
  slug: "toan-hoc-1",
  courseName: "Toán Học 1",
  category: {
    slug: "lop-1",
    name: "lop-1"
  }
}
const topics =
  [
    {
      "id": "63c580ed5713ed65828a372e",
      "name": "Đề kiểm tra giữa học kì 1 môn Toán 1",
      "status": 1,
      "idCourse": "63ae88a2fe74a345583ff56e",
      "topicChild": [
        "63c581ec5713ed65828a373c",
        "63c581ff5713ed65828a3740",
        "63e4ec8405be95a662802654"
      ],
      "topicChildData": [
        {
          "id": "63c581ec5713ed65828a373c",
          "name": "Đề kiểm tra giữa học kì 1 môn Toán 1 - Đề số 1",
          "status": 1,
          "idCourse": "63ae88a2fe74a345583ff56e",
          "topicChild": [],
          "topicChildData": [],
          "parentId": "63c580ed5713ed65828a372e",
          "timePracticeInVideo": [],
          "type": 2,
          "des": "Học 10 thi 1",
          "index": 1,
          "createDate": 1673888236477,
          "updateDate": 1698917226768,
          "topicType": 3,
          "timeExam": 15,
          "numQuestion": 25,
          "video": null
        },
        {
          "id": "63c581ff5713ed65828a3740",
          "name": "Đề kiểm tra giữa học kì 1 môn Toán 1 - Đề số 2",
          "status": 1,
          "idCourse": "63ae88a2fe74a345583ff56e",
          "topicChild": [],
          "topicChildData": [],
          "parentId": "63c580ed5713ed65828a372e",
          "timePracticeInVideo": [],
          "type": 2,
          "des": "",
          "index": 2,
          "createDate": 1673888255198,
          "updateDate": 1698917226768,
          "topicType": 3,
          "timeExam": 10,
          "numQuestion": 5,
          "video": null
        },
      ],
      "parentId": null,
      "timePracticeInVideo": [],
      "type": 2,
      "des": "",
      "index": 0,
      "createDate": 1673887981255,
      "updateDate": 1673887981255,
      "topicType": 3,
      "timeExam": 0,
      "numQuestion": 0,
      "video": null
    }
  ]




function Exam() {
  const navigate = useNavigate();
  const loading = false;
  return (
    <>
      <Header />
      <main className={clsx(styles.exam)}>
        <div className='wide'>
          <div className={clsx(styles.examBreadcrumb)}>
            <Breadcrumb separator="›">
              <Breadcrumb.Item>
                <NavLink to={"/"} className={clsx(styles.examBreadcumbLink)}>
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
                      to={"#"}
                      className={clsx(styles.examBreadcumbLink)}
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


          <div className={clsx(styles.examView)}>
            {topics.length > 0 &&
              topics?.map((data) => {
                const dataChild = data.topicChildData;
                console.log(dataChild);
                return (
                  <div className={clsx(styles.examPanel)} key={data.id}>
                    <div className={clsx((styles.examPanelItem))}>
                      <div
                        className={clsx((styles.examPanelTitle))}
                      >
                        <FaChevronDown className={clsx(styles.panelIcon)} />
                        <h3 className={clsx(clsx(styles.panelText))}>
                          {data?.name}
                        </h3>
                      </div>
                      <Row
                        gutter={[12, 12]}

                      >
                        {dataChild[0] &&
                          dataChild?.map(
                            (dataChild, iChild) =>
                            (
                              <Col
                                xl={12}
                                lg={12}
                                md={12}
                                sm={24}
                                xs={24}
                                key={iChild}
                              >
                                <div
                                  className={clsx(styles.examPanelContent)}
                                >
                                  <span>{dataChild.name}</span>
                                  <div
                                    className={clsx(styles.examPanelAction)}
                                  >
                                    <div
                                      className={clsx(styles.panelActionItem)}
                                    >
                                      <div>
                                        <FaRegQuestionCircle />
                                        <span>
                                          {dataChild?.numQuestion} câu
                                        </span>
                                      </div>
                                      <div>
                                        <FaRegClock />
                                        <span>
                                          {dataChild?.timeExam} phút
                                        </span>
                                      </div>
                                    </div>
                                    <Popconfirm
                                      placement="top"
                                      title="Bạn muốn làm đề này sao?"
                                      onConfirm={() => {
                                        console.log(dataChild.id)
                                        navigate(`${dataChild.id}`)
                                      }
                                      }
                                      okText="Yes"
                                      cancelText="No"
                                    >
                                      <button
                                        className={clsx(
                                          styles.examPanelBtn
                                        )}
                                      >
                                        <span>Làm bài</span>
                                        <BiChevronRight
                                          className={clsx(
                                            styles.examPanelIcon
                                          )}
                                        />
                                      </button>
                                    </Popconfirm>
                                  </div>
                                </div>
                              </Col>
                            )
                          )}
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
  )
}

export default Exam