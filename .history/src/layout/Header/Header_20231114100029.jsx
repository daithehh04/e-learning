import React, { useState } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/imgs/logo/logo.svg'

export default function Header() {
     const [room, setRoom] = useState([{

     }])
     return (
          <header className={clsx(styles.header)}>
               <div className={clsx(styles.headerTop)}>
                    <div className={clsx(styles.logo)}>
                         <img src={logo} alt="logo" />
                         <span>KMA</span>
                    </div>
                    <div className={clsx(styles.groupBtn)}>
                         <NavLink to={'/dang-nhap'}> <button className={clsx(styles.btnLogin)}>Đăng Nhập</button></NavLink>
                         <NavLink to={'/dang-ky'}> <button className={clsx(styles.btnResigter)}>Đăng kí</button></NavLink>
                    </div>
               </div>
               <div className={clsx(styles.headerBottom)}>
               </div>



          </header>
     )
}
