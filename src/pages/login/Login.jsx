import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import TTCSconfig from '../../helper/config';
import styles from './Login.module.scss';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import './Login.module.scss';
import { encrypt } from '../../utils/crypto';
import { requestLogin } from '../../stores/middleware/userMiddleware';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  // lay token tu cookie
  useEffect(() => {
    console.log('back');
    if (userInfo?._id) {
      console.log('back2');
      navigate(-1);
    }
  }, [userInfo]);
  // const handleLoginOther = () => {
  //   sessionStorage.setItem('returnUrl', window.location.pathname);
  //   // Sử dụng loginWithRedirect để đăng nhập
  //   loginWithRedirect();
  // };
  useEffect(() => {
    // Kiểm tra xem có returnUrl được lưu trong sessionStorage không
    const returnUrl = sessionStorage.getItem('returnUrl');

    if (returnUrl) {
      // Chuyển hướng về returnUrl và xóa returnUrl từ sessionStorage
      navigate(returnUrl);
      sessionStorage.removeItem('returnUrl');
    }
  }, [history]);

  const handleLogin = async (data) => {
    try {
      const encodePassword = encrypt(data.password);
      const actionResult = await dispatch(
        requestLogin({
          account: data.account,
          password: encodePassword,
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

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className={clsx(styles.login)}>
        <div className={clsx(styles.loginWrapper)}>
          <h2 className={clsx(styles.title)}>Đăng Nhập</h2>
          <Form
            name="normal_login"
            className={clsx(styles.loginForm)}
            initialValues={{
              remember: true,
            }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="account"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập trường này!',
                },
              ]}
            >
              <Input
                prefix={
                  <UserOutlined
                    className={clsx(styles.icon)}
                    style={{ fontSize: '1.8rem', marginRight: '0.8rem' }}
                  />
                }
                placeholder="Nhập tài khoản"
                style={{ padding: '12px' }}
                className={clsx(styles.inputForm)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập trường này!',
                },
              ]}
            >
              <Input.Password
                prefix={
                  <LockOutlined
                    className={clsx(styles.icon)}
                    style={{ fontSize: '1.8rem', marginRight: '0.8rem' }}
                  />
                }
                type="password"
                placeholder="Nhập mật khẩu"
                style={{ padding: '12px' }}
                className={clsx(styles.inputForm)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={clsx(styles.loginBtn)}
                loading={loading}
              >
                Đăng nhập
              </Button>
              <div className={clsx(styles.loginOr)}>
                <span className={clsx(styles.textOr)}>HOẶC</span>
              </div>
              <div>
                {/* {!isAuthenticated && (
                  <button
                    type="button"
                    onClick={handleLoginOther}
                    className={clsx(styles.btnLoginOther)}
                  >
                    Chọn Hình Thức Đăng nhập khác
                  </button>
                )} */}
              </div>
              <div className={clsx(styles.register)}>
                Bạn chưa có tài khoản?{' '}
                <Link to="/dang-ky" className={clsx(styles.btnRegister)}>
                  Đăng ký ngay!
                </Link>
              </div>
            </Form.Item>
          </Form>
          <button
            className={clsx(styles.otherLogin)}
            onClick={() => loginWithRedirect()}
          >
            Đăng nhập với hình thức khác
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
