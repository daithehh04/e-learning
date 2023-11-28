import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes/routes';
import Loading from './components/loading/Loading';
import Cookies from 'js-cookie';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { requestGetUserFromToken } from './stores/middleware/userMiddleware';
import { useLayoutEffect } from 'react';
import { notification } from 'antd';
import { unwrapResult } from '@reduxjs/toolkit';

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const isLoading = useSelector((state) => state.user.loadingCheckLogin);
  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const cookie = Cookies.get('token');
    try {
      const result = dispatch(requestGetUserFromToken({ token: cookie || '' }));
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
            return isLoading ? (
              <Route key={index} path={route.path} element={<Loading />} />
            ) : (
              <Route key={index} path={route.path} element={<Page />} />
            );
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            return isLoading ? (
              <Route key={index} path={route.path} element={<Loading />} />
            ) : (
              <Route
                key={index}
                path={route.path}
                element={
                  userInfo?._id ? <Page /> : <Navigate to={'/dang-nhap'} />
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
