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
const loading = false;
const topics = [
  {
    id: '1acv',
    des: `
    <h3><strong>1. H&igrave;nh vu&ocirc;ng</strong></h3>
    <ul>
    <li>H&igrave;nh vu&ocirc;ng c&oacute; bốn cạnh bằng nhau v&agrave; bốn g&oacute;c bằng nhau</li>
    <li>Một số v&iacute; dụ thường gặp trong đời sống: Gạch hoa, khung treo ảnh, &ocirc; cửa sổ, &hellip;
    <figure id="attachment_164" class="wp-caption aligncenter" style="text-align: center;" aria-describedby="caption-attachment-164"><img class="wp-image-164 size-medium lazyloaded" style="display: block; margin-left: auto; margin-right: auto;" src="https://itoan.vn/wp-content/uploads/2021/07/hinh-vuong-300x200.jpg" sizes="(max-width: 300px) 100vw, 300px" srcset="https://itoan.vn/wp-content/uploads/2021/07/hinh-vuong-300x200.jpg 300w, https://itoan.vn/wp-content/uploads/2021/07/hinh-vuong.jpg 600w" alt="H&igrave;nh vu&ocirc;ng B&agrave;i tập To&aacute;n 1" width="300" height="200" data-ll-status="loaded">
    <figcaption id="caption-attachment-164" class="wp-caption-text">H&igrave;nh vu&ocirc;ng&nbsp;</figcaption>
    </figure>
    </li>
    </ul>
    <h3><strong>2. H&igrave;nh tr&ograve;n</strong></h3>
    <ul>
    <li>Đường bao quanh h&igrave;nh tr&ograve;n l&agrave; đường cong kh&eacute;p k&iacute;n, kh&ocirc;ng c&oacute; g&oacute;c, kh&ocirc;ng c&oacute; cạnh.</li>
    <li>Một số v&iacute; dụ thường gặp trong đời sống: Đồng hồ, b&aacute;nh xe, đĩa CD, &hellip;
    <figure id="attachment_165" class="wp-caption aligncenter" style="text-align: center;" aria-describedby="caption-attachment-165"><img class="wp-image-165 size-medium lazyloaded" style="display: block; margin-left: auto; margin-right: auto;" src="https://itoan.vn/wp-content/uploads/2021/07/hinh-tron-300x200.jpg" sizes="(max-width: 300px) 100vw, 300px" srcset="https://itoan.vn/wp-content/uploads/2021/07/hinh-tron-300x200.jpg 300w, https://itoan.vn/wp-content/uploads/2021/07/hinh-tron.jpg 600w" alt="H&igrave;nh tr&ograve;n B&agrave;i tập to&aacute;n lớp 1" width="300" height="200" data-ll-status="loaded">
    <figcaption id="caption-attachment-165" class="wp-caption-text">H&igrave;nh tr&ograve;n</figcaption>
    </figure>
    </li>
    </ul>
    <h3><strong>3. H&igrave;nh tam gi&aacute;c</strong></h3>
    <ul>
    <li>H&igrave;nh tam gi&aacute;c l&agrave; h&igrave;nh c&oacute; ba cạnh v&agrave; ba g&oacute;c.</li>
    <li>Một số v&iacute; dụ thường gặp trong đời sống: thước eke, khăn qu&agrave;ng đỏ, biển b&aacute;o giao th&ocirc;ng, &hellip;
    <figure id="attachment_166" class="wp-caption aligncenter" style="text-align: center;" aria-describedby="caption-attachment-166"><img class="wp-image-166 size-medium lazyloaded" style="display: block; margin-left: auto; margin-right: auto;" src="https://itoan.vn/wp-content/uploads/2021/07/hinh-tam-giac-300x200.jpg" sizes="(max-width: 300px) 100vw, 300px" srcset="https://itoan.vn/wp-content/uploads/2021/07/hinh-tam-giac-300x200.jpg 300w, https://itoan.vn/wp-content/uploads/2021/07/hinh-tam-giac.jpg 600w" alt="H&igrave;nh tam gi&aacute;c B&agrave;i tập to&aacute;n 1" width="300" height="200" data-ll-status="loaded">
    <figcaption id="caption-attachment-166" class="wp-caption-text">H&igrave;nh tam gi&aacute;c</figcaption>
    </figure>
    </li>
    </ul>
    <h3><strong>4. H&igrave;nh chữ nhật</strong></h3>
    <ul>
    <li>H&igrave;nh chữ nhật c&oacute; bốn cạnh v&agrave; bốn g&oacute;c bằng nhau.</li>
    <li>Một số v&iacute; dụ thường gặp trong đời sống: quyển s&aacute;ch, hộp b&uacute;t, bảng viết, &hellip;
    <figure id="attachment_167" class="wp-caption aligncenter" style="text-align: center;" aria-describedby="caption-attachment-167"><img class="wp-image-167 size-medium lazyloaded" style="display: block; margin-left: auto; margin-right: auto;" src="https://itoan.vn/wp-content/uploads/2021/07/hinh-chu-nhat-300x200.jpg" sizes="(max-width: 300px) 100vw, 300px" srcset="https://itoan.vn/wp-content/uploads/2021/07/hinh-chu-nhat-300x200.jpg 300w, https://itoan.vn/wp-content/uploads/2021/07/hinh-chu-nhat.jpg 600w" alt="H&igrave;nh chữ nhật B&agrave;i tập To&aacute;n lớp 1" width="300" height="200" data-ll-status="loaded">
    <figcaption id="caption-attachment-167" class="wp-caption-text">H&igrave;nh chữ nhật</figcaption>
    </figure>
    </li>
    </ul>
    `,
    name: 'I. Các số đến 10. Hình vuông, hình tròn và hình tam giác',
    topicChildData: [
      {
        id: '1dfe1',
        name: 'Làm quen các số 1, 2, 3, 4, 5',
        status: 1,
        timeExam: 169,
        topicType: 1,
        video:
          'http://res.cloudinary.com/dxp3jz1fc/video/upload/v1675790377/d85vrtprfiyttr2pstgm.mp4',
      },
      {
        id: '1dfe2',
        name: 'Làm quen các số 1, 2, 3, 4, 5, 6',
        status: 1,
        timeExam: 169,
        topicType: 1,
        video:
          'http://res.cloudinary.com/dxp3jz1fc/video/upload/v1675790377/d85vrtprfiyttr2pstgm.mp4',
      },
      {
        id: '1dfe3',
        name: 'Làm quen các số 1, 2, 3, 4, 5, 6, 7',
        status: 0,
        timeExam: 169,
        topicType: 3,
        video: '',
      },
      {
        id: '1dfe4',
        name: 'Làm quen các số 1, 2, 3, 4, 5, 6, 7, 8',
        status: 0,
        timeExam: 169,
        topicType: 2,
        video: '',
      },
    ],
  },
  {
    id: '1acv2',
    name: 'II. Phép công, phép trừ trong phạm vi 10',
    des: '',
    topicChildData: [
      {
        id: '1df1',
        name: 'Phép cộng trong phạm vi 10',
        status: 1,
        timeExam: 200,
        topicType: 2,
        video: '',
      },
      {
        id: '1df2',
        name: 'Phép trừ trong phạm vi 10',
        status: 1,
        timeExam: 190,
        topicType: 2,
        video: '',
      },
      {
        id: '1df3',
        name: 'Phép nhân trong phạm vi 10',
        status: 1,
        timeExam: 210,
        topicType: 3,
        video: '',
      },
      {
        id: '1df44',
        name: 'Phép chia trong phạm vi 10',
        status: 0,
        timeExam: 220,
        topicType: 3,
        video: '',
      },
    ],
  },
  {
    id: '1acv2e',
    name: 'III. Biểu thức chính quy',
    des: '',
    topicChildData: [
      {
        id: '1df1e',
        name: 'Phép cộng trong phạm vi 10',
        status: 1,
        timeExam: 110,
        topicType: 3,
        video: '',
      },
      {
        id: '1df2e',
        name: 'Phép trừ trong phạm vi 10',
        status: 1,
        timeExam: 190,
        topicType: 3,
        video: '',
      },
      {
        id: '1df3e',
        name: 'Phép nhân trong phạm vi 10',
        status: 1,
        timeExam: 310,
        topicType: 2,
        video: '',
      },
      {
        id: '1df44e',
        name: 'Phép chia trong phạm vi 10',
        status: 0,
        timeExam: 420,
        topicType: 2,
        video: '',
      },
    ],
  },
];
function Learning() {
  const navigate = useNavigate();
  const [isShowSider, setIsShowSider] = useState(false);
  const [indexOpenTopic, setIndexOpenTopic] = useState([]);
  const [indexTopic, setIndexTopic] = useState();
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
