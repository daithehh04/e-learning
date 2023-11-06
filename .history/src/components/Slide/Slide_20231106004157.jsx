import React from 'react'
import styles from './Slide.module.scss';
import clsx from 'clsx';
import { Col, Row } from "antd";

export default function Slide({ title, desc, img }) {
     return (
          <div className={clsx(styles.slide)}>
               <Row className={styles.slideRow}>
                    <Col
                         className={styles.slideCol}
                         xs={19}
                         sm={19}
                         md={19}
                         lg={24}
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
                         xs={5}
                         sm={5}
                         md={5}
                         lg={24}
                    >
                         <div className={styles.imgWrap}>
                              <img src={img} alt={title} />
                         </div>
                    </Col>
               </Row>
          </div>
     )
}
