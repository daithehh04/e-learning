import React from 'react'
import styles from './Footer.module.scss'
import clsx from 'clsx'
import { Row, Col } from 'antd'
import { MdEmail } from "react-icons/md";
import { PiPhoneCallFill } from "react-icons/pi";
import { BsFillGeoAltFill } from "react-icons/bs";
import { NavLink, Link } from "react-router-dom";

import logo from '../../assets/imgs/logo/logo.svg'


export default function Footer() {
     return (
          <footer className={styles.footer}>
               <div className={clsx(styles.footerContainer)}>
                    <Row>
                         <Col>
                              <div className={styles.footerInfo} >
                                   <ul className={styles.footerInfoWrap}>
                                        <li className={styles.footerInfoItem}>
                                             <NavLink
                                                  to={"/"}
                                             >
                                                  <img src={logo} alt="logo" />
                                                  <span>KMA WEB</span>
                                             </NavLink>

                                        </li>
                                        <li className={styles.footerInfoItem}>
                                             <span className={styles.text}>
                                                  Phát triển bởi Sinh viên Học viện kỹ thuật Mật Mã
                                             </span>

                                        </li>

                                        <li className={styles.footerInfoItem}>
                                             <div className={styles.address}>
                                                  <span>
                                                       141 Đường Chiến Thắng, Xã Tân Triều, Huyện Thanh Trì, Hà Nội
                                                  </span>

                                             </div>
                                        </li>

                                        <li className={styles.footerInfoItem}>
                                             <a href="mailto:kmaweb@example.com">

                                             </a>

                                        </li>

                                        <li className={styles.footerInfoItem}>
                                             <Link
                                                  to={"/"}
                                             >
                                                  <img src={logo} alt="logo" />
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
