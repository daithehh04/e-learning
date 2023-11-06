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
                         <div className={styles.slideLeft}>
                              <h2 className={styles.title}>
                                   {title}
                              </h2>
                              <p className={styles.desc}>
                                   {desc}
                              </p>

                         </div>
                    </Col>
                    <Col
                         className={styles.slideCol}
                         xs={8}
                         sm={8}
                         md={8}
                         lg={12}
                    >
                         <div className={styles.imgWrap}>
                              <img src={img} alt={title} />
                         </div>
                    </Col>
               </Row>
          </div>
     )
}
