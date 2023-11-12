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
                    autoplaySpeed={40000}
                    initialSlide={2}
                    slidesToShow={3}
                    slidesToScroll={1}
                    responsive={[
                         {
                              breakpoint: 100,
                              settings: {
                                   slidesToShow: 3,
                                   slidesToScroll: 1,
                                   initialSlide: 0,
                                   arrows: false,
                                   draggable: true,
                              },
                         },

                         {
                              breakpoint: 991,
                              settings: {
                                   slidesToShow: 2,
                                   slidesToScroll: 1,
                                   initialSlide: 0,
                                   arrows: false,
                                   draggable: true,
                              },
                         },
                         {
                              breakpoint: 767,
                              settings: {
                                   slidesToShow: 2,
                                   slidesToScroll: 1,
                                   initialSlide: 0,
                                   arrows: false,
                                   draggable: true,
                              },
                         },
                    ]}
               >
                    <div className={clsx(styles.feedBackItem)}>
                         <div className={clsx(styles.feedBackItemInner)}>
                              <span className={clsx(styles.nameSchool)}>THCS Trường Sơn</span>
                              <p className={clsx(styles.contentFeddBack)}>
                                   Nội dung bài tập rất hữu ích, mình thường xuyên
                                   luyện tập trên web tại nhà ❤️
                              </p>
                              <div className={clsx(styles.info)}>
                                   <div className={clsx(styles.imgWrap)}>
                                        <img src={imgUser1} alt="" />
                                   </div>
                                   <div className={clsx(styles.contentInfo)}>
                                        <span className={clsx(styles.nameUser)}>Nguyễn Văn Tuấn</span>
                                        <Rate disabled allowHalf defaultValue={3.5} />
                                   </div>

                              </div>
                         </div>

                    </div>
                    <div className={clsx(styles.feedBackItem)}>
                         <div className={clsx(styles.feedBackItemInner)}>
                              <span className={clsx(styles.nameSchool)}>THPT Lục Nam</span>
                              <p className={clsx(styles.contentFeddBack)}>
                                   Trang web có kho đề rất phong phú, đa dạng, giao
                                   diện đẹp. Mình thấy luyện tập ở đây giúp việc học
                                   dễ dàng, hiệu quả hơn.
                              </p>
                              <div className={clsx(styles.info)}>
                                   <div className={clsx(styles.imgWrap)}>
                                        <img src={imgUser1} alt="" />
                                   </div>
                                   <div className={clsx(styles.contentInfo)}>
                                        <span className={clsx(styles.nameUser)}>Nguyễn Đại Thế</span>
                                        <Rate disabled allowHalf defaultValue={4.5} />
                                   </div>

                              </div>
                         </div>

                    </div>
                    <div className={clsx(styles.feedBackItem)}>
                         <div className={clsx(styles.feedBackItemInner)}>
                              <span className={clsx(styles.nameSchool)}>THPT Yên Dũng 2</span>
                              <p className={clsx(styles.contentFeddBack)}>
                                   Từ khi luyện tập trên KMA WEB  mình tiến bộ
                                   rõ rệt, giá luyện phải chăng không quá cao so với
                                   thị trường.
                              </p>
                              <div className={clsx(styles.info)}>
                                   <div className={clsx(styles.imgWrap)}>
                                        <img src={imgUser1} alt="" />
                                   </div>
                                   <div className={clsx(styles.contentInfo)}>
                                        <span className={clsx(styles.nameUser)}>Nguyễn Văn Dũng</span>
                                        <Rate disabled allowHalf defaultValue={3.5} />
                                   </div>

                              </div>
                         </div>

                    </div>
                    <div className={clsx(styles.feedBackItem)}>
                         <div className={clsx(styles.feedBackItemInner)}>
                              <span className={clsx(styles.nameSchool)}>THCS Lương Thế Vinh</span>
                              <p className={clsx(styles.contentFeddBack)}>
                                   Nội dung bài tập rất hữu ích, mình thường xuyên
                                   luyện tập trên web tại nhà ❤️
                              </p>
                              <div className={clsx(styles.info)}>
                                   <div className={clsx(styles.imgWrap)}>
                                        <img src={imgUser1} alt="" />
                                   </div>
                                   <div className={clsx(styles.contentInfo)}>
                                        <span className={clsx(styles.nameUser)}>Nguyễn Văn Tuấn</span>
                                        <Rate disabled allowHalf defaultValue={4.5} />
                                   </div>

                              </div>

                         </div>
                    </div>
                    <div className={clsx(styles.feedBackItem)}>
                         <div className={clsx(styles.feedBackItemInner)}>
                              <span className={clsx(styles.nameSchool)}>THPT Chuyên Amsterdam</span>
                              <p className={clsx(styles.contentFeddBack)}>
                                   Trang web có kho đề rất phong phú, đa dạng, giao
                                   diện đẹp. Mình thấy luyện tập ở đây giúp việc học
                                   dễ dàng, hiệu quả hơn.
                              </p>
                              <div className={clsx(styles.info)}>
                                   <div className={clsx(styles.imgWrap)}>
                                        <img src={imgUser1} alt="" />
                                   </div>
                                   <div className={clsx(styles.contentInfo)}>
                                        <span className={clsx(styles.nameUser)}>Lê Văn Dũng</span>
                                        <Rate disabled allowHalf defaultValue={5} />
                                   </div>

                              </div>
                         </div>

                    </div>
                    <div className={clsx(styles.feedBackItem)}>
                         <div className={clsx(styles.feedBackItemInner)}>
                              <span className={clsx(styles.nameSchool)}>THPT Chu Văn An</span>
                              <p className={clsx(styles.contentFeddBack)}>
                                   Mình thấy web hiệu quả để ôn thi đại học vì cover
                                   khá nhiều môn , giao diện cũng dễ nhìn nữa!
                              </p>
                              <div className={clsx(styles.info)}>
                                   <div className={clsx(styles.imgWrap)}>
                                        <img src={imgUser1} alt="" />
                                   </div>
                                   <div className={clsx(styles.contentInfo)}>
                                        <span className={clsx(styles.nameUser)}>Nguyễn Thị Nga</span>
                                        <Rate disabled allowHalf defaultValue={4.5} />
                                   </div>

                              </div>
                         </div>

                    </div>

               </Carousel>
          </div>


     )
}
