import React from 'react'
import styles from './Footer.module.scss'
import clsx from 'clsx'
import { Row, Col } from 'antd'
import { MdEmail } from "react-icons/md";
import { PiPhoneCallFill } from "react-icons/pi";
import { BsFillGeoAltFill } from "react-icons/bs";
import { PiUsersThreeFill } from "react-icons/pi";
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
                         <Col xs={24} sm={24} md={24} lg={8} >
                              <div className={clsx(styles.footerItem)} >
                                   <div className={clsx(styles.footerLogo)}>
                                        <NavLink className={clsx(styles.logo)}
                                             to={"/"}
                                        >
                                             <div className={clsx(styles.logoWrap)}>
                                                  <img src={logo} alt="logo" />
                                             </div>
                                             <span>KMA WEB</span>
                                        </NavLink>

                                   </div>
                                   <ul className={clsx(styles.footerInfoWrap)}>
                                        <li className={clsx(styles.footerInfoItem)}>
                                             <PiUsersThreeFill className={clsx(styles.icon)} />
                                             <span className={clsx(styles.text)}>
                                                  Phát triển bởi Sinh viên Học viện kỹ thuật Mật Mã
                                             </span>

                                        </li>

                                        <li className={clsx(styles.footerInfoItem)}>
                                             <BsFillGeoAltFill className={clsx(styles.icon)} />
                                             <span className={clsx(styles.addrres)}>
                                                  141 Đường Chiến Thắng, Xã Tân Triều, Huyện Thanh Trì, Hà Nội
                                             </span>
                                        </li>

                                   </ul>
                              </div>
                         </Col>
                         <Col xs={24} sm={24} md={24} lg={7}>
                              <div className={clsx(styles.footerItem)}>
                                   <h3 className={clsx(styles.headingLv2)}>Hỗ trợ</h3>
                                   <ul>
                                        <li>
                                             <a
                                                  className={styles.support}
                                                  href="mailto:kmaweb@example.com">
                                                  <MdEmail className={styles.icon} />
                                                  <span>kmaweb@example.com</span>
                                             </a>

                                        </li>

                                        <li>
                                             <a
                                                  className={styles.support}
                                                  href="tel:+84123456789">
                                                  <PiPhoneCallFill className={styles.icon} />
                                                  <span> 0123456789</span>
                                             </a>
                                        </li>
                                   </ul>
                              </div>
                         </Col>
                         <Col xs={24} sm={24} md={24} lg={5}>
                              <div className={clsx(styles.footerItem)}>
                                   <h3 className={clsx(styles.headingLv2)}>Về chúng tôi</h3>
                                   <ul>
                                        <li>
                                             <NavLink
                                                  to={'/gioi-thieu'}>
                                                  <span>  Giới Thiệu</span>

                                             </NavLink>
                                        </li>
                                        <li>
                                             <NavLink
                                                  to={'/lien-he'}>
                                                  <span> Liên Hệ</span>
                                             </NavLink>
                                        </li>
                                   </ul>
                              </div>
                         </Col>
                         <Col xs={24} sm={24} md={24} lg={4}>
                              <div
                                   className={clsx(styles.footerItem)}>
                                   <h3 className={clsx(styles.headingLv2)}>Chính Sách</h3>
                                   <ul>
                                        <li>
                                             <NavLink
                                                  to={'/gioi-thieu'}>
                                                  <span> Điều Khoản sử dụng</span>

                                             </NavLink>
                                        </li>
                                        <li>
                                             <NavLink
                                                  to={'/lien-he'}>
                                                  <span>Chính Sách bảo mật</span>
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
                         <div className={clsx(styles.footerSocialInner)}>
                              <div className={clsx(styles.footerSocialItem)}>
                                   <img src={facebook} alt="facebook" />

                              </div>
                              <div className={clsx(styles.footerSocialItem)}>
                                   <img src={instagram} alt="instagram" />

                              </div>
                              <div className={clsx(styles.footerSocialItem)}>
                                   <img src={twitter} alt="twitter" />

                              </div>
                              <div className={clsx(styles.footerSocialItem)}>
                                   <img src={youtube} alt="youtube" />

                              </div>
                         </div>

                    </div>

               </div>
          </footer>
     )
}
