import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes/routes';
import Loading from './components/loading/Loading';
import Cookies from 'js-cookie';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import {
  requestGetUserFromEmailGoogle,
  requestGetUserFromToken,
  requestRegister,
} from './stores/middleware/userMiddleware';
import { useEffect, useLayoutEffect, useState } from 'react';
import { notification } from 'antd';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const dispatch = useDispatch();
  let userInfo = useSelector((state) => state.user.userInfo);
  let userInfoEmailGg = useSelector((state) => state.user.userInfoEmailGg);
  const isLoading = useSelector((state) => state.user.loadingCheckLogin);
  const isLoadingGmail = useSelector(
    (state) => state.user.loadingCheckLoginGmail
  );
  const { user, isAuthenticated, isLoading: loading } = useAuth0();
  if (isAuthenticated) {
    if (!userInfo) {
      userInfo = userInfoEmailGg;
    }
  }
  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    getUserFromEmailGoogle(user?.email);
  }, [isAuthenticated]);
  const getUserFromEmailGoogle = async (email) => {
    try {
      const result = await dispatch(requestGetUserFromEmailGoogle({ email }));
      unwrapResult(result);
      if (!result.payload.userInfo) {
        handleRegisterGoogle();
      }
    } catch (error) {
      notification.error({
        message: 'server error!!',
        duration: 1.5,
      });
    }
  };

  const handleRegisterGoogle = async () => {
    const actionResult = await dispatch(
      requestRegister({
        name: user?.given_name,
        account: user?.email,
        password: '1',
        provider: 'google',
        email: user?.email,
      })
    );
    const res = unwrapResult(actionResult);
  };
  const checkLogin = async () => {
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
  };

  return (
    <BrowserRouter>
      <div className="App">
        <ScrollToTop />
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return isLoading || loading ? (
              <Route key={index} path={route.path} element={<Loading />} />
            ) : (
              <Route key={index} path={route.path} element={<Page />} />
            );
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            return isLoading || loading || isLoadingGmail ? (
              <Route key={index} path={route.path} element={<Loading />} />
            ) : (
              <Route
                key={index}
                path={route.path}
                element={
                  userInfo?._id || user?.email ? (
                    <Page />
                  ) : (
                    <Navigate to={'/dang-nhap'} />
                  )
                }
              />
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
