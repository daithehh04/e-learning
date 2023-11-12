import React from 'react'
import { Carousel, Rate } from "antd";
import clsx from 'clsx';
import styles from './Feedback.module.scss';
import imgUser1 from '../../assets/imgs/feedback/user1.jpg';

export default function Feedback() {
     return (
          <div className={clsx(styles.feedBack)}>
               <h2>Đánh giá và Phản Hồi</h2>
               <Carousel
                    className={clsx(styles.carouselSlice)}
                    autoplay
                    pauseOnDotsHover
                    pauseOnHover
                    draggable
                    autoplaySpeed={4500}
               >
                    <div className={clsx(styles.feedBackItem)}>
                         <span className={clsx(styles.nameSchool)}>THCS Trường Sơn</span>
                         <p className={clsx(styles.contentFeddBack)}>
                              Nội dung bài tập rất hữu ích, mình thường xuyên
                              luyện tập trên web tại nhà ❤️
                         </p>
                         <div className={clsx(styles.info)}>
                              <div className={clsx(styles.imgWrap)}>
                                   <img src="" alt="" />
                              </div>
                              <div className={clsx(styles.contentInfo)}>
                                   <span className={clsx(styles.nameUser)}>Nguyễn Văn Tuấn</span>
                                   <Rate disabled allowHalf defaultValue={4.5} />
                              </div>

                         </div>

                    </div>
                    <div className={clsx(styles.feedBackItem)}>
                         <span className={clsx(styles.nameSchool)}>THCS Trường Sơn</span>
                         <p className={clsx(styles.contentFeddBack)}>
                              Trang web có kho đề rất phong phú, đa dạng, giao
                              diện đẹp. Mình thấy luyện tập ở đây giúp việc học
                              dễ dàng, hiệu quả hơn.
                         </p>
                         <div className={clsx(styles.info)}>
                              <div className={clsx(styles.imgWrap)}>
                                   <img src="" alt="" />
                              </div>
                              <div className={clsx(styles.contentInfo)}>
                                   <span className={clsx(styles.nameUser)}>Nguyễn Văn Tuấn</span>
                                   <Rate disabled allowHalf defaultValue={4.5} />
                              </div>

                         </div>

                    </div>
                    <div className={clsx(styles.feedBackItem)}>
                         <span className={clsx(styles.nameSchool)}>THCS Trường Sơn</span>
                         <p className={clsx(styles.contentFeddBack)}>
                              Từ khi luyện tập trên KMA WEB  mình tiến bộ
                              rõ rệt, giá luyện phải chăng không quá cao so với
                              thị trường.
                         </p>
                         <div className={clsx(styles.info)}>
                              <div className={clsx(styles.imgWrap)}>
                                   <img src="" alt="" />
                              </div>
                              <div className={clsx(styles.contentInfo)}>
                                   <span className={clsx(styles.nameUser)}>Nguyễn Văn Tuấn</span>
                                   <Rate disabled allowHalf defaultValue={4.5} />
                              </div>

                         </div>

                    </div>
                    <div className={clsx(styles.feedBackItem)}>
                         <span className={clsx(styles.nameSchool)}>THCS Trường Sơn</span>
                         <p className={clsx(styles.contentFeddBack)}>
                              Nội dung bài tập rất hữu ích, mình thường xuyên
                              luyện tập trên web tại nhà ❤️
                         </p>
                         <div className={clsx(styles.info)}>
                              <div className={clsx(styles.imgWrap)}>
                                   <img src="" alt="" />
                              </div>
                              <div className={clsx(styles.contentInfo)}>
                                   <span className={clsx(styles.nameUser)}>Nguyễn Văn Tuấn</span>
                                   <Rate disabled allowHalf defaultValue={4.5} />
                              </div>

                         </div>

                    </div>
                    <div className={clsx(styles.feedBackItem)}>
                         <span className={clsx(styles.nameSchool)}>THCS Trường Sơn</span>
                         <p className={clsx(styles.contentFeddBack)}>
                              Trang web có kho đề rất phong phú, đa dạng, giao
                              diện đẹp. Mình thấy luyện tập ở đây giúp việc học
                              dễ dàng, hiệu quả hơn.
                         </p>
                         <div className={clsx(styles.info)}>
                              <div className={clsx(styles.imgWrap)}>
                                   <img src="" alt="" />
                              </div>
                              <div className={clsx(styles.contentInfo)}>
                                   <span className={clsx(styles.nameUser)}>Nguyễn Văn Tuấn</span>
                                   <Rate disabled allowHalf defaultValue={4.5} />
                              </div>

                         </div>

                    </div>
                    <div className={clsx(styles.feedBackItem)}>
                         <span className={clsx(styles.nameSchool)}>THCS Trường Sơn</span>
                         <p className={clsx(styles.contentFeddBack)}>
                              Mình thấy web hiệu quả để ôn thi đại học vì cover
                              khá nhiều môn , giao diện cũng dễ nhìn nữa!
                         </p>
                         <div className={clsx(styles.info)}>
                              <div className={clsx(styles.imgWrap)}>
                                   <img src="" alt="" />
                              </div>
                              <div className={clsx(styles.contentInfo)}>
                                   <span className={clsx(styles.nameUser)}>Nguyễn Văn Tuấn</span>
                                   <Rate disabled allowHalf defaultValue={4.5} />
                              </div>

                         </div>

                    </div>

               </Carousel>
          </div>


     )
}
