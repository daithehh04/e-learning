import React from 'react'
import styles from './Footer.module.scss'
import clsx from 'clsx'
import { Row, Col } from 'antd'
import { NavLink, Link } from "react-router-dom";

export default function Footer() {
     return (
          <footer>
               <div className={clsx(styles.footerContainer)}>
                    <Row>
                         <Col>
                              <div className={styles.footerInfo} >
                                   <ul className={styles.footerInfoWrap}>
                                        <li className={styles.footerInfoItem}>
                                             <NavLink
                                                  to={"/"}
                                             >
                                                  <img src="../../assets/imgs/logo/logo.svg" alt="logo" />
                                                  <span>KMA WEB</span>
                                             </NavLink>

                                        </li>
                                        <li className={styles.footerInfoItem}>
                                             <Link
                                                  to={"/"}
                                             >
                                                  <img src="../../assets/imgs/logo/Vector.svg" alt="logo" />
                                                  <span>KMA WEB</span>
                                             </Link>

                                        </li>

                                        <li className={styles.footerInfoItem}>
                                             <Link
                                                  to={"/"}
                                             >
                                                  <img src="../../assets/imgs/logo/Vector.svg" alt="logo" />
                                                  <span>KMA WEB</span>
                                             </Link>

                                        </li>

                                        <li className={styles.footerInfoItem}>
                                             <Link
                                                  to={"/"}
                                             >
                                                  <img src="../../assets/imgs/logo/Vector.svg" alt="logo" />
                                                  <span>KMA WEB</span>
                                             </Link>

                                        </li>

                                        <li className={styles.footerInfoItem}>
                                             <Link
                                                  to={"/"}
                                             >
                                                  <img src="../../assets/imgs/logo/Vector.svg" alt="logo" />
                                                  <span>KMA WEB</span>
                                             </Link>

                                        </li>
                                   </ul>


                              </div>
                         </Col>
                         <Col></Col>
                         <Col></Col>
                         <Col></Col>
                    </Row>
               </div>
          </footer>
     )
}
