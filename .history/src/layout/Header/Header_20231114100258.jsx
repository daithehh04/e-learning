import React, { useState } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/imgs/logo/logo.svg'

export default function Header() {
     const [room, setRoom] = useState([
          {
               id: 1, name: 'lớp 1', slug: "lop-1",
               id: 2, name: 'lớp 2', slug: "lop-2",
               id: 3, name: 'lớp 3', slug: "lop-3",
               id: 4, name: 'lớp 4', slug: "lop-4",
               id: 5, name: 'lớp 5', slug: "lop-5",
               id: 1, name: 'lớp 1', slug: "lop-1",
               id: 1, name: 'lớp 1', slug: "lop-1",
               id: 1, name: 'lớp 1', slug: "lop-1",
               id: 1, name: 'lớp 1', slug: "lop-1",
               id: 1, name: 'lớp 1', slug: "lop-1",
               id: 1, name: 'lớp 1', slug: "lop-1",


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
