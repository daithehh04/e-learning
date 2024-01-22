import React from 'react';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
} from 'antd';
import styles from './profile.module.scss';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { classes, genders } from '../../utils/contants';
import { LockOutlined } from '@ant-design/icons';
import { AvatarIcon } from '../../components/Icons/Icons';
import Cookies from 'js-cookie';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAuth0 } from '@auth0/auth0-react';
import {
  requestChangePassword,
  requestUpdateUserInfo,
} from '../../stores/middleware/userMiddleware';
import {
  FaRegUser,
  FaRegEnvelope,
  FaPhone,
  FaRegCalendarAlt,
  FaTransgender,
  FaRegAddressCard,
} from 'react-icons/fa';
import dayjs from 'dayjs';
import TTCSconfig from '../../helper/config';
import { encrypt } from '../../utils/crypto';
import { useState, useEffect } from 'react';
const EmailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PhoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  let userInfo = useSelector((state) => state.user.userInfo);
  let userInfoEmailGg = useSelector((state) => state.user.userInfoEmailGg);
  const [infoForm] = Form.useForm();
  const [modalForm] = Form.useForm();
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated && !userInfo) {
    userInfo = userInfoEmailGg;
  }
  useEffect(() => {
    infoForm.setFieldsValue({
      name: userInfo?.name,
      email: userInfo?.email,
      phoneNumber: userInfo?.phoneNumber,
      birth: userInfo?.birth ? dayjs(userInfo?.birth) : null,
      classNumber: userInfo?.classNumber,
      gender: userInfo?.gender,
    });
  }, [infoForm]);
  const handleShowModal = () => {
    setIsModalOpen(true);
  };
  const handleChangePassword = () => {
    modalForm.validateFields().then(async (value) => {
      const cookie = Cookies.get('token');
      const { password, newPassword, ...rest } = value;

      const passEncode = encrypt(password);
      const newPassEncode = encrypt(newPassword);

      try {
        const actionResult = await dispatch(
          requestChangePassword({
            token: cookie,
            password: passEncode,
            newPassword: newPassEncode,
          })
        );
        const res = unwrapResult(actionResult);

        switch (res.loginCode) {
          case TTCSconfig.LOGIN_SUCCESS:
            handleCancelModal();
            return notification.success({
              message: 'Đổi mật khẩu thành công',
              duration: 1.5,
            });

          case TTCSconfig.LOGIN_WRONG_PASSWORD:
            modalForm.setFieldsValue({
              password: '',
              newPassword: '',
              confirmNewPassword: '',
            });
            return notification.warning({
              message: 'Mật khẩu hiện tại không chính xác!',
              duration: 1.5,
            });

          case TTCSconfig.LOGIN_FAILED:
            return notification.warning({
              message: 'Lỗi server!',
              duration: 1.5,
            });

          case TTCSconfig.LOGIN_TOKEN_INVALID:
            notification.warning({
              message: 'Không thể tìm thấy token!',
              duration: 1.5,
            });
            window.location.href = '/dang-nhap';
            break;
        }
      } catch (error) {
        return notification.warning({
          message: 'Cập nhật thất bại, lỗi server!',
          duration: 1.5,
        });
      }
    });
  };
  const handleUpdate = async () => {
    infoForm.validateFields().then(async (value) => {
      const cookie = Cookies.get('token');
      value.birth = value.birth?.valueOf();

      try {
        const actionResult = await dispatch(
          requestUpdateUserInfo({ token: cookie, userInfo: value })
        );
        const res = unwrapResult(actionResult);
        switch (res.status) {
          case TTCSconfig.STATUS_SUCCESS:
            return notification.success({
              message: 'Cập nhật thành công!',
              duration: 1.5,
            });

          case TTCSconfig.STATUS_FAIL:
            return notification.warning({
              message: 'Cập nhật thất bại!',
              duration: 1.5,
            });
        }
      } catch (error) {
        return notification.warning({
          message: 'Cập nhật thất bại, lỗi server!',
          duration: 1.5,
        });
      }
    });
  };

  const handleCancelModal = () => {
    modalForm.setFieldsValue({
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    });
    setIsModalOpen(false);
  };
  return (
    <>
      <Header />

      <div className={clsx(styles.profileContainer)}>
        <div className={clsx('wide')}>
          <div className={clsx(styles.profileWrapper)}>
            <div className={clsx(styles.profileTitle)}>Thông tin cá nhân</div>
            <div className={clsx(styles.profileBox)}>
              <Form name="profile" form={infoForm}>
                <Row gutter={60} align="middle">
                  <Col xl={10} lg={10} md={10} sm={24} xs={24}>
                    <div className={styles.profileAvatarWrap}>
                      <div>
                        <AvatarIcon className={clsx(styles.profileIcon)} />
                      </div>
                      <div className={clsx(styles.profileUsername)}>
                        {userInfo?.account}
                      </div>
                    </div>
                    <div className={clsx(styles.profileGroupBtn)}>
                      <button
                        className={clsx(styles.btnChange, styles.profileButton)}
                        onClick={handleShowModal}
                      >
                        Đổi mật khẩu
                      </button>

                      <Modal
                        className={clsx(styles.profileModal)}
                        open={isModalOpen}
                        onCancel={handleCancelModal}
                        footer={[
                          <Button
                            key="changePassword"
                            className={clsx(
                              styles.profileButton,
                              styles.btnModal
                            )}
                            onClick={handleChangePassword}
                          >
                            Xác nhận
                          </Button>,
                        ]}
                      >
                        <h2 className={clsx(styles.profileModalTitle)}>
                          Đổi mật khẩu
                        </h2>
                        <Form
                          className={clsx(styles.profileModalForm)}
                          form={modalForm}
                          name="modal"
                        >
                          <Form.Item
                            name="password"
                            className={clsx(styles.profileFormitem)}
                          >
                            <Input
                              prefix={
                                <LockOutlined
                                  style={{
                                    fontSize: '1.8rem',
                                    marginRight: '0.8rem',
                                  }}
                                />
                              }
                              type="password"
                              placeholder="Mật khẩu hiện tại"
                              style={{ padding: '1.6rem' }}
                            />
                          </Form.Item>
                          <Form.Item
                            name="newPassword"
                            className={clsx(styles.profileFormitem)}
                            dependencies={['password']}
                            rules={[
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (
                                    !value ||
                                    getFieldValue('password') !== value
                                  ) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    new Error(
                                      'Mật khẩu mới phải khác mật khẩu hiện tại!'
                                    )
                                  );
                                },
                              }),
                            ]}
                          >
                            <Input
                              prefix={
                                <LockOutlined
                                  style={{
                                    fontSize: '1.8rem',
                                    marginRight: '0.8rem',
                                  }}
                                />
                              }
                              type="password"
                              placeholder="Mật khẩu mới"
                              style={{ padding: '1.6rem' }}
                            />
                          </Form.Item>
                          <Form.Item
                            name="confirmNewPassword"
                            className={clsx(styles.profileFormitem)}
                            dependencies={['newPassword']}
                            rules={[
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (
                                    !value ||
                                    getFieldValue('newPassword') === value
                                  ) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    new Error('Mật khẩu không trùng khớp!')
                                  );
                                },
                              }),
                            ]}
                          >
                            <Input
                              prefix={
                                <LockOutlined
                                  style={{
                                    fontSize: '1.8rem',
                                    marginRight: '0.8rem',
                                  }}
                                />
                              }
                              type="password"
                              placeholder="Xác nhận mật khẩu"
                              style={{ padding: '1.6rem' }}
                            />
                          </Form.Item>
                        </Form>
                      </Modal>

                      <button
                        className={clsx(styles.btnUpdate, styles.profileButton)}
                        onClick={handleUpdate}
                      >
                        Cập nhật
                      </button>
                    </div>
                  </Col>

                  <Col xl={14} lg={14} md={14} sm={24} xs={24}>
                    <Row gutter={16}>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item
                          className={clsx(styles.profileFormitem)}
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
                              <FaRegUser
                                style={{
                                  fontSize: '1.8rem',
                                  marginRight: '0.8rem',
                                }}
                              />
                            }
                            placeholder="Nhập tên"
                            style={{ padding: '16px' }}
                            value={userInfo?.name}
                          />
                        </Form.Item>
                      </Col>

                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item
                          className={clsx(styles.profileFormitem)}
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
                              <FaRegEnvelope
                                style={{
                                  fontSize: '1.8rem',
                                  marginRight: '0.8rem',
                                }}
                              />
                            }
                            placeholder="Nhập email"
                            style={{ padding: '16px' }}
                            value={userInfo?.email}
                          />
                        </Form.Item>
                      </Col>

                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item
                          className={clsx(styles.profileFormitem)}
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
                              <FaPhone
                                style={{
                                  fontSize: '1.8rem',
                                  marginRight: '0.8rem',
                                }}
                              />
                            }
                            placeholder="Nhập số điện thoại"
                            style={{ padding: '16px' }}
                            value={userInfo?.phoneNumber}
                          />
                        </Form.Item>
                      </Col>

                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item
                          className={clsx(styles.profileFormitem)}
                          name="birth"
                        >
                          <DatePicker
                            suffixIcon={<FaRegCalendarAlt />}
                            placeholder="Chọn ngày sinh"
                            format={'DD/MM/YYYY'}
                            allowClear={false}
                            showToday={false}
                            className={clsx(styles.profileDatepicker)}
                          />
                        </Form.Item>
                      </Col>

                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item
                          className={clsx(styles.profileFormitem)}
                          name="classNumber"
                        >
                          <Select
                            className={clsx(styles.profileSelect)}
                            optionLabelProp="label"
                            placeholder={
                              <React.Fragment>
                                <FaRegAddressCard
                                  style={{
                                    fontSize: '1.8rem',
                                    marginRight: '0.8rem',
                                    // marginTop: '0.8rem',
                                    color: '#000',
                                  }}
                                />
                                &nbsp; Chọn lớp
                              </React.Fragment>
                            }
                            size={'large'}
                            listHeight={128}
                            value={userInfo?.classNumber}
                          >
                            {classes?.map((data) => (
                              <Select.Option
                                value={data.value}
                                key={data.value}
                                label={
                                  <React.Fragment>
                                    <FaRegAddressCard
                                      style={{
                                        fontSize: '1.8rem',
                                        marginRight: '0.8rem',
                                        // marginTop: '0.8rem',
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

                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item
                          className={clsx(styles.profileFormitem)}
                          name="gender"
                        >
                          <Select
                            className={clsx(styles.profileSelect)}
                            optionLabelProp="label"
                            placeholder={
                              <React.Fragment>
                                <FaTransgender
                                  style={{
                                    fontSize: '1.8rem',
                                    marginRight: '0.8rem',
                                    // marginTop: '0.8rem',
                                    color: '#000',
                                  }}
                                />
                                &nbsp; Chọn giới tính
                              </React.Fragment>
                            }
                            size={'large'}
                            listHeight={128}
                            value={userInfo?.gender}
                          >
                            {genders?.map((data) => (
                              <Select.Option
                                value={data.value}
                                key={data.value}
                                label={
                                  <React.Fragment>
                                    <FaTransgender
                                      style={{
                                        fontSize: '1.8rem',
                                        marginRight: '0.8rem',
                                        marginTop: '0.8rem',
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
                    </Row>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
