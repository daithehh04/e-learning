import React, { useCallback, useState, useEffect } from 'react';
import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/imgs/logo/logokma.png';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, notification } from 'antd';
import Cookies from 'js-cookie';
import {
  FaBars,
  FaChartBar,
  FaRegIdCard,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';
import { unwrapResult } from "@reduxjs/toolkit";
import { apiLogout } from '../../api/auth';
import { requestGetUserFromToken } from '../../stores/middleware/userMiddleware';
import ChatGPT from '../../components/ChatGPT/ChatGPT';
import imageChat from '../../assets/imgs/chatgpt/chatbot.jpg';
import useSelection from 'antd/es/table/hooks/useSelection';
import { chatgptSlice } from '../../stores/slices/chatgptSlice';
import DarkMode from '../../components/DarkMode/DarkMode';
import { requestLoadCategorys } from '../../stores/middleware/categoryMiddleware';

// import { useAuth0 } from '@auth0/auth0-react';

export default function Header() {
  const dispatch = useDispatch();
  const categorys = useSelector(state => state.categorys.categorys);
  const { toggle } = chatgptSlice.actions;
  const [navbarStick, setNavbarStick] = useState(false);
  const isShowChatGPT = useSelector((state) => state.chatGPT.isShow);
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleLogout = useCallback(async () => {
    try {
      if (userInfo?._id) {
        const res = apiLogout({ idUser: userInfo?._id });
      }
      Cookies.remove('token');
      window.location.href = '/';
    } catch (error) {
      notification.error({ message: 'Lỗi server', duration: 1.5 });
    }
  }, []);
  const handleNavbarStick = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 150
        ? setNavbarStick(!navbarStick)
        : setNavbarStick(navbarStick);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleNavbarStick);

    return () => {
      window.removeEventListener('scroll', handleNavbarStick);
    };
  }, []);
  const loadCategorys = async () => {
    try {
      const actionResult = await dispatch(
        requestLoadCategorys({
          status: 1,
        })
      );
      console.log(actionResult);
      unwrapResult(actionResult);
    } catch (error) {
      notification.error({
        message: "không tải được danh sach danh mục",
      });
    }
  };
  useEffect(() => {
    loadCategorys();
  }, []);

  const items = [
    {
      label: <Link to={'/thong-tin-ca-nhan'}>{userInfo?.name}</Link>,
      key: '0',
      icon: <FaRegIdCard />,
      style: {
        fontSize: '1.4rem',
        fontFamily: 'var(--font-family)',
        padding: '0.8rem',
      },
      onClick: async () => {
        const cookie = Cookies.get('token');
        try {
          const result = await dispatch(
            requestGetUserFromToken({ token: cookie || '' })
          );

          unwrapResult(result);
        } catch (error) {
          if (cookie)
            notification.error({
              message: 'Server đang bị lỗi',
            });
        }
      },
    },
    {
      label: <Link to={'/achievement'}>Kết Quả Học Tập</Link>,
      key: '1',
      icon: <FaChartBar />,
      style: {
        fontSize: '1.4rem',
        fontFamily: 'var(--font-family)',
        padding: '0.8rem',
      },
    },
    {
      label: 'Đăng xuất',
      key: '3',
      icon: <FaSignOutAlt />,
      onClick: handleLogout,
      style: {
        fontSize: '1.4rem',
        fontFamily: 'var(--font-family)',
        padding: '0.8rem',
      },
    },
  ];
  const hanldeShowChatGpt = () => {
    dispatch(toggle(true));
  };
  const navLinkClass = ({ isActive }) => {
    return isActive ? 'activated' : ` `;
  };
  const navigate = useNavigate();
  return (
    <header className={clsx(styles.header)}>
      <nav
        className={
          navbarStick ? clsx(styles.navbar, styles.stick) : clsx(styles.navbar)
        }
        onScroll={handleNavbarStick}
      >
        <div className={clsx(styles.headerTop)}>
          <NavLink to={'/'}>
            <div className={clsx(styles.logo)}>
              <img src={logo} alt="logo" />
              <span>KMA WEB</span>
            </div>
          </NavLink>
          {!userInfo?._id ? (
            <div className={clsx(styles.groupBtn)}>
              <button
                className={clsx(styles.btnLogin, 'btn-common')}
                onClick={() => navigate('/dang-nhap')}
              >
                Đăng Nhập
              </button>
              <button
                className={clsx(styles.btnResigter, 'btn-common')}
                onClick={() => navigate('/dang-ky')}
              >
                Đăng kí
              </button>
            </div>
          ) : (
            <div className={clsx(styles.groupUserDarkMode)}>
              <DarkMode />
              <Dropdown
                menu={{ items }}
                trigger={['hover']}
                placement={'bottomRight'}
              >
                <button className={clsx(styles.btnHeader)}>
                  <FaUser className={clsx(styles.user)} />
                </button>
              </Dropdown>
            </div>
          )}
        </div>
        <div className={clsx(styles.headerBottom)}>
          {categorys.length > 0 && (
            <ul>
              {categorys.map(({ _id, name, slug }) => (
                <li key={_id}>
                  <NavLink
                    to={`/${slug}`}
                    className={clsx(styles.navLinkRoom, styles.navLinkClass)}
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
      {userInfo?._id && (
        <div className={styles.chatGpt}>
          <button
            onClick={hanldeShowChatGpt}
            className={clsx(styles.btnChatGpt)}
          >
            <img src={imageChat} alt="" />
          </button>
          {isShowChatGPT && <ChatGPT />}
        </div>
      )}
    </header>
  );
}
