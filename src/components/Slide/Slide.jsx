import React from 'react';
import styles from './Slide.module.scss';
import clsx from 'clsx';
import { Col, Row } from 'antd';

export default function Slide({ title, desc, img }) {
  return (
    <div className={clsx(styles.slide)}>
      <Row className={styles.slideRow}>
        <Col className={styles.slideCol} xs={24} sm={24} md={24} lg={12}>
          <div className={styles.slideLeft}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.desc}>{desc}</p>
          </div>
        </Col>
        <Col className={styles.slideCol} xs={24} sm={24} md={24} lg={12}>
          <div className={styles.imgWrap}>
            <img src={img} alt={title} />
          </div>
        </Col>
      </Row>
    </div>
  );
}
