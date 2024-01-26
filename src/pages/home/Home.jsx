import React, { useRef, useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { FaArrowCircleUp } from 'react-icons/fa';
import { Carousel } from 'antd';
import silde1 from '../../assets/imgs/sildes/slide_1.svg';
import silde2 from '../../assets/imgs/sildes/slide_2.svg';
import silde3 from '../../assets/imgs/sildes/slide_3.jpg';
import styles from './Home.module.scss';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import Slide from '../../components/Slide/Slide';
import Marquee from '../../components/Marquee/Marquee';
import Courses from '../../components/Courses/Courses';
import Feature from '../../components/Feature/Feature';
import Feedback from '../../components/Feedback/Feedback';
import { useSelector } from 'react-redux';

import { useAuth0 } from '@auth0/auth0-react';
import { unwrapResult } from '@reduxjs/toolkit';
import { requestLogin } from '../../stores/middleware/userMiddleware';
import { encrypt } from '../../utils/crypto';
import { Helmet } from 'react-helmet';
const slides = [
  {
    title: 'Học thoải mái tại nhà riêng của bạn',
    desc: 'Circuit là nhà cung cấp đào tạo toàn cầu có trụ sở trên khắp Vương quốc Anh, chuyên về các khóa đào tạo được công nhận và thiết kế riêng.',
    img: silde1,
  },
  {
    title: 'Chúng tôi chia sẻ kiến thức với thế giới',
    desc: 'Circuit là nhà cung cấp đào tạo toàn cầu có trụ sở trên khắp Vương quốc Anh, chuyên về các khóa đào tạo được công nhận và thiết kế riêng.',
    img: silde2,
  },
  {
    title: 'Bạn học hôm nay và kiếm được vào ngày mai.',
    desc: 'Circuit là nhà cung cấp đào tạo toàn cầu có trụ sở trên khắp Vương quốc Anh, chuyên về các khóa đào tạo được công nhận và thiết kế riêng.',
    img: silde3,
  },
];
function HomePage() {
  const { user } = useAuth0();
  const categorys = useSelector((state) => state.categorys.categorys);
  const ref = useRef();
  const [scrollTop, setScrollTop] = useState();
  const handleScrollTop = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight < 140 ? setScrollTop(false) : setScrollTop(true);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScrollTop);

    return () => {
      window.removeEventListener('scroll', handleScrollTop);
    };
  }, []);
  const handleLogin = async () => {
    try {
      const encodePassword = encrypt(data.password);
      const actionResult = await dispatch(
        requestLogin({
          account: user.email,
          password: user.password,
        })
      );
      const res = unwrapResult(actionResult);
      switch (res.loginCode) {
        case TTCSconfig.LOGIN_FAILED:
          return notification.error({
            message: 'Đăng nhập thất bại',
            duration: 1.5,
          });

        case TTCSconfig.LOGIN_ACCOUNT_NOT_EXIST:
          return notification.warning({
            message: 'Tài khoản hoặc mật khẩu không đúng',
            duration: 1.5,
          });

        case TTCSconfig.LOGIN_WRONG_PASSWORD:
          return notification.warning({
            message: 'Tài khoản hoặc mật khẩu không đúng',
            duration: 1.5,
          });

        case TTCSconfig.LOGIN_SUCCESS:
          Cookies.set('token', res.token, {
            expires: 60 * 60 * 24 * 30,
          });
          return notification.success({
            message: 'Đăng nhập thành công',
            duration: 1.5,
          });
      }
    } catch (err) {
      return notification.error({
        message: 'Đăng nhập thất bại, lỗi server',
        duration: 1.5,
      });
    }
  };
  // useEffect(() => {
  //   handle
  // }, []);
  const handleScropTopClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="home">
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <Header />
      <main>
        <Marquee />
        <section className={clsx(styles.slides)}>
          <Carousel
            className={clsx(styles.carouselSlice)}
            autoplay
            dots
            pauseOnDotsHover
            pauseOnHover
            draggable
            ref={ref}
            autoplaySpeed={4500}
          >
            {slides?.length > 0 &&
              slides.map(({ title, desc, img }, index) => (
                <Slide key={index} title={title} desc={desc} img={img} />
              ))}
          </Carousel>
          <LeftOutlined
            onClick={() => ref.current.prev()}
            className={clsx(styles.preSlide)}
          />
          <RightOutlined
            onClick={() => ref.current.next()}
            className={clsx(styles.nextSlide)}
          />
        </section>
        <Courses />
        <Feature />
        <Feedback />
        <button
          className={clsx(styles.arrowToTop, !scrollTop && styles.isHidden)}
          onClick={handleScropTopClick}
        >
          <FaArrowCircleUp className={clsx(styles.icon)} />
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
