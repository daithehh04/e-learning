import React from 'react'
import styles from './Slide.module.css';
import clsx from 'clsx';
import { Col, Row } from "antd";

export default function Slide({ title, desc, img }) {
     return (
          <div className={clsx(styles.slide)}>
               <Row className={styles.slideRow}>
                    <Col
                         className={styles.slideCol}
                         xs={16}
                         sm={16}
                         md={16}
                         lg={12}
                    >
                    </Col>
                    <Col
                         className={styles.slideCol}
                         xs={16}
                         sm={16}
                         md={16}
                         lg={12}
                    >
                    </Col>
               </Row>
          </div>
     )
}
