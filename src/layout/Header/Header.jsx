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
import { apiLogout } from '../../api/auth';
import { requestGetUserFromToken } from '../../stores/middleware/userMiddleware';
import { unwrapResult } from '@reduxjs/toolkit';
import ChatGPT from '../../components/ChatGPT/ChatGPT';
import imageChat from '../../assets/imgs/chatgpt/chatbot.jpg';
import useSelection from 'antd/es/table/hooks/useSelection';
import { chatgptSlice } from '../../stores/slices/chatgptSlice';
import DarkMode from '../../components/DarkMode/DarkMode';
// import { useAuth0 } from '@auth0/auth0-react';

export default function Header() {
  const dispatch = useDispatch();
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
  console.log(isShowChatGPT);

  const navLinkClass = ({ isActive }) => {
    return isActive ? 'activated' : ` `;
  };
  const navigate = useNavigate();
  // const { isLoading, loginWithPopup, isAuthenticated } = useAuth0();
  const [rooms, setRoom] = useState([
    { id: 1, name: 'lớp 1', slug: 'lop-1' },
    { id: 2, name: 'lớp 2', slug: 'lop-2' },
    { id: 3, name: 'lớp 3', slug: 'lop-3' },
    { id: 4, name: 'lớp 4', slug: 'lop-4' },
    { id: 5, name: 'lớp 5', slug: 'lop-5' },
    { id: 6, name: 'lớp 6', slug: 'lop-6' },
    { id: 7, name: 'lớp 7', slug: 'lop-7' },
    { id: 8, name: 'lớp 8', slug: 'lop-8' },
    { id: 9, name: 'lớp 9', slug: 'lop-9' },
    { id: 10, name: 'lớp 10', slug: 'lop-10' },
    { id: 11, name: 'lớp 11', slug: 'lop-11' },
    { id: 12, name: 'Lớp 12', slug: 'log-12' },
  ]);
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
              <Dropdown
                menu={{ items }}
                trigger={['hover']}
                placement={'bottomRight'}
              >
                <button className={clsx(styles.btnHeader)}>
                  <FaUser className={clsx(styles.user)} />
                </button>
              </Dropdown>
              <DarkMode />
            </div>
          )}
        </div>
        <div className={clsx(styles.headerBottom)}>
          {rooms.length > 0 && (
            <ul>
              {rooms.map(({ id, name, slug }) => (
                <li key={id}>
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
