import React from 'react'
import styles from './Footer.module.scss'
import clsx from 'clsx'
import { Row, Col } from 'antd'
import { MdEmail } from "react-icons/md";
import { PiPhoneCallFill } from "react-icons/pi";
import { BsFillGeoAltFill } from "react-icons/bs";
import { NavLink, Link } from "react-router-dom";

import logo from '../../assets/imgs/logo/logo.svg';
import footerImg from '../../assets/imgs/footer/footer__bottom.png';
import facebook from '../../assets/imgs/footer/facebook.svg'
import youtube from '../../assets/imgs/footer/youtube.svg'
import twitter from '../../assets/imgs/footer/twitter.svg'
import instagram from '../../assets/imgs/footer/instagram.png'



export default function Footer() {
     return (
          <footer className={styles.footer}>
               <div className={clsx(styles.footerContainer)}>
                    <Row>
                         <Col sm={24} md={24} lg={6} >
                              <div className={styles.footerItem} >
                                   <ul className={styles.footerInfoWrap}>
                                        <li className={styles.footerInfoItem}>
                                             <NavLink className={ }
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
                                                  <BsFillGeoAltFill />
                                                  <span>
                                                       141 Đường Chiến Thắng, Xã Tân Triều, Huyện Thanh Trì, Hà Nội
                                                  </span>

                                             </div>
                                        </li>

                                   </ul>
                              </div>
                         </Col>
                         <Col sm={24} md={24} lg={6}>
                              <div className={clsx(styles.footerItem)}>
                                   <h2>Hỗ trợ</h2>
                                   <ul>
                                        <li>
                                             <a href="mailto:kmaweb@example.com">
                                                  <MdEmail />
                                                  <span>kmaweb@example.com</span>
                                             </a>

                                        </li>

                                        <li>
                                             <a href="tel:+84123456789">
                                                  <PiPhoneCallFill />
                                                  <span> 0123456789</span>
                                             </a>
                                        </li>
                                   </ul>
                              </div>
                         </Col>
                         <Col sm={24} md={24} lg={6}>
                              <div className={clsx(styles.footerItem)}>
                                   <h2>Về chúng tôi</h2>
                                   <ul>
                                        <li>
                                             <NavLink
                                                  to={'/gioi-thieu'}>
                                                  Giới Thiệu

                                             </NavLink>
                                        </li>
                                        <li>
                                             <NavLink
                                                  to={'/lien-he'}>
                                                  Liên Hệ
                                             </NavLink>
                                        </li>
                                   </ul>
                              </div>
                         </Col>
                         <Col sm={24} md={24} lg={6}>
                              <div className={clsx(styles.footerItem)}>
                                   <h2>Chính Sách</h2>
                                   <ul>
                                        <li>
                                             <NavLink
                                                  to={'/gioi-thieu'}>
                                                  Điều Khoản sử dụng

                                             </NavLink>
                                        </li>
                                        <li>
                                             <NavLink
                                                  to={'/lien-he'}>
                                                  Chính Sách bảo mật
                                             </NavLink>
                                        </li>
                                   </ul>
                              </div>
                         </Col>
                    </Row>
                    <div className={clsx(styles.footerSocial)}>
                         <div className={clsx(styles.imgWrap)}>
                              <img src={footerImg} alt="" />
                         </div>
                         <div className={styles.footerSocialInner}>
                              <div className={styles.footerSocialItem}>
                                   <img src={facebook} alt="facebook" />

                              </div>
                              <div className={styles.footerSocialItem}>
                                   <img src={instagram} alt="instagram" />

                              </div>
                              <div className={styles.footerSocialItem}>
                                   <img src={twitter} alt="twitter" />

                              </div>
                              <div className={styles.footerSocialItem}>
                                   <img src={youtube} alt="youtube" />

                              </div>
                         </div>

                    </div>

               </div>
          </footer>
     )
}
