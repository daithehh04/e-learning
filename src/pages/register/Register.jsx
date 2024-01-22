import {
  ContactsOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserAddOutlined,
  UserOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Row, Col, Select, notification } from 'antd';
import React, { useEffect } from 'react';

import styles from './Register.module.scss';
import { EmailRegExp, isValidPhone, PhoneRegExp } from '../../utils/validation';
import { encrypt } from '../../utils/crypto';
import TTCSconfig from '../../helper/config';
import { Link, useNavigate } from 'react-router-dom';

import { unwrapResult } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { classes, genders } from '../../utils/contants';
import { useDispatch, useSelector } from 'react-redux';
import { requestRegister } from '../../stores/middleware/userMiddleware';
import clsx from 'clsx';
import { Helmet } from 'react-helmet';

const Register = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // lay token tu cookie
  useEffect(() => {
    if (userInfo?._id) {
      navigate(-1);
    }
  }, [userInfo]);

  const handleRegister = async (data) => {
    const { confirm, ...rest } = data;
    try {
      const encodePassword = encrypt(data.password);
      const actionResult = await dispatch(
        requestRegister({
          ...rest,
          password: encodePassword,
        })
      );
      const res = unwrapResult(actionResult);
      switch (res.loginCode) {
        case TTCSconfig.LOGIN_FAILED:
          return notification.error({
            message: 'Đăng ký thất bại',
            duration: 1.5,
          });

        case TTCSconfig.LOGIN_ACCOUNT_IS_USED:
          return notification.warning({
            message: 'Tài khoản đã tồn tại',
            duration: 1.5,
          });

        case TTCSconfig.LOGIN_SUCCESS:
          Cookies.set('token', res.token, {
            expires: 60 * 60 * 24 * 30,
          });
          return notification.success({
            message: 'Đăng ký thành công',
            duration: 1.5,
          });
      }
    } catch (err) {
      notification.error({
        message: 'Đăng ký thất bại, lỗi server',
        duration: 1.5,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className={clsx(styles.register)}>
        <div className={clsx(styles.registerWrapper)}>
          <h2 className={clsx(styles.registerTitle)}>Tạo tài khoản</h2>
          <Form
            name="register"
            className={clsx(styles.registerForm)}
            initialValues={{
              remember: true,
            }}
            onFinish={handleRegister}
          >
            <Row gutter={16}>
              <Col
                className="gutter-row"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
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
                      <UserAddOutlined
                        className={clsx(styles.inputIcon)}
                        style={{ fontSize: '1.8rem', marginRight: '0.8rem' }}
                      />
                    }
                    placeholder="Nhập tài khoản"
                    style={{ padding: '12px' }}
                    className={clsx(styles.inputForm)}
                  />
                </Form.Item>
              </Col>

              <Col
                className="gutter-row"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      pattern: EmailRegExp,
                      message: 'Email không đúng định dạng!',
                    },
                    {
                      required: true,
                      message: 'Vui lòng nhập trường này!',
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <MailOutlined
                        className={clsx(styles.inputIcon)}
                        style={{ fontSize: '1.8rem', marginRight: '0.8rem' }}
                      />
                    }
                    placeholder="Nhập email"
                    style={{ padding: '12px' }}
                    className={clsx(styles.inputForm)}
                  />
                </Form.Item>
              </Col>

              <Col
                className="gutter-row"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                <Form.Item
                  name="name"
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
                        className={clsx(styles.inputIcon)}
                        style={{ fontSize: '1.8rem', marginRight: '0.8rem' }}
                      />
                    }
                    placeholder="Nhập tên"
                    style={{ padding: '12px' }}
                    className={clsx(styles.inputForm)}
                  />
                </Form.Item>
              </Col>

              <Col
                className="gutter-row"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      pattern: PhoneRegExp,
                      message: 'vui lòng nhập số điện thoại',
                    },
                    {
                      required: true,
                      message: 'Vui lòng nhập trường này!',
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <PhoneOutlined
                        className={clsx(styles.inputIcon)}
                        style={{ fontSize: '1.8rem', marginRight: '0.8rem' }}
                      />
                    }
                    placeholder="Nhập số điện thoại"
                    style={{ padding: '12px' }}
                    className={clsx(styles.inputForm)}
                  />
                </Form.Item>
              </Col>

              <Col
                className="gutter-row"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                <Form.Item
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn giới tính!',
                    },
                  ]}
                >
                  <Select
                    className={clsx(styles.registerSelect)}
                    allowClear
                    optionLabelProp="label"
                    placeholder={
                      <React.Fragment>
                        <WomanOutlined
                          className={clsx(styles.inputIcon)}
                          style={{
                            fontSize: '1.8rem',
                            marginRight: '0.8rem',
                            color: '#000',
                          }}
                        />
                        &nbsp; Chọn giới tính
                      </React.Fragment>
                    }
                    size={'large'}
                  >
                    {genders?.map((data) => (
                      <Select.Option
                        value={data.value}
                        key={data.value}
                        label={
                          <React.Fragment>
                            <WomanOutlined
                              className={clsx(styles.inputIcon)}
                              style={{
                                fontSize: '1.8rem',
                                marginRight: '0.8rem',
                              }}
                            />
                            &nbsp;
                            {data.label}
                          </React.Fragment>
                        }
                      >
                        {data.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col
                className="gutter-row"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                <Form.Item
                  name="classNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn lớp!',
                    },
                  ]}
                >
                  <Select
                    className={clsx(styles.registerSelect)}
                    allowClear
                    optionLabelProp="label"
                    placeholder={
                      <React.Fragment>
                        <ContactsOutlined
                          className={clsx(styles.inputIcon)}
                          style={{
                            fontSize: '1.8rem',
                            marginRight: '0.8rem',
                            color: '#000',
                          }}
                        />
                        &nbsp; Chọn lớp
                      </React.Fragment>
                    }
                    size={'large'}
                    listHeight={128}
                  >
                    {classes?.map((data) => (
                      <Select.Option
                        value={data.value}
                        key={data.value}
                        label={
                          <React.Fragment>
                            <ContactsOutlined
                              className={clsx(styles.inputIcon)}
                              style={{
                                fontSize: '1.8rem',
                                marginRight: '0.8rem',
                              }}
                            />
                            &nbsp;
                            {data.label}
                          </React.Fragment>
                        }
                      >
                        {data.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col
                className="gutter-row"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập trường này!',
                    },
                  ]}
                  //   hasFeedback
                >
                  <Input.Password
                    prefix={
                      <LockOutlined
                        className={clsx(styles.inputIcon)}
                        style={{ fontSize: '1.8rem', marginRight: '0.8rem' }}
                      />
                    }
                    type="password"
                    placeholder="Nhập mật khẩu"
                    style={{ padding: '12px' }}
                    className={clsx(styles.inputForm)}
                  />
                </Form.Item>
              </Col>

              <Col
                className="gutter-row"
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={24}
              >
                <Form.Item
                  name="confirm"
                  dependencies={['password']}
                  //   hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập trường này!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('Mật khẩu không trùng khớp!')
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={
                      <LockOutlined
                        className={clsx(styles.inputIcon)}
                        style={{ fontSize: '1.8rem', marginRight: '0.8rem' }}
                      />
                    }
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    style={{ padding: '12px' }}
                    className={clsx(styles.inputForm)}
                  />
                </Form.Item>
              </Col>

              <Col className="gutter-row" span={24}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={clsx(styles.registerBtnForm)}
                    loading={loading}
                  >
                    Đăng ký
                  </Button>
                  <div className={clsx(styles.registerOr)}>
                    <span className={clsx(styles.text)}>HOẶC</span>
                  </div>
                  <div className={clsx(styles.registerLogin)}>
                    Bạn đã có tài khoản?{' '}
                    <Link to="/dang-nhap" className={clsx(styles.link)}>
                      Đăng nhập ngay!
                    </Link>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
