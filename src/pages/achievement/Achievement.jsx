import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import { clsx } from 'clsx';
import styles from './Achievement.module.scss';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import moment from 'moment';

function Achievement() {
  let userInfo = useSelector((state) => state.user.userInfo);
  let userInfoEmailGg = useSelector((state) => state.user.userInfoEmailGg);

  const { isAuthenticated } = useAuth0();
  if (isAuthenticated && !userInfo) {
    userInfo = userInfoEmailGg;
  }
  const achievement = userInfo?.progess?.filter((topic) => topic?.nameExam);
  const columns = [
    {
      title: 'Tên bài kiểm tra',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Ngày làm',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Điểm đạt được',
      dataIndex: 'score',
      key: 'score',
      align: 'center',
    },
  ];
  const data = achievement?.map((item, index) => {
    return {
      key: index,
      name: item.nameExam,
      date: moment(item.date).format('h:mm DD/MM/YYYY'),
      score: item.score,
    };
  });
  return (
    <div>
      <Header />
      <div className={clsx('wide')}>
        <div className={clsx(styles.achContainer)}>
          <div className={clsx(styles.achTitle, 'dark')}>Kết quả học tập</div>
          {data?.length ? (
            <Table columns={columns} dataSource={data} />
          ) : (
            <h4 className={clsx(styles.noExam)}>
              Bạn chưa làm bài kiểm tra nào!!
            </h4>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Achievement;
