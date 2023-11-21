import React, { useState } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/imgs/logo/logo.svg';
import { useNavigate } from 'react-router-dom';

export default function Header() {
     const navigate = useNavigate();
     const [rooms, setRoom] = useState([
          {
               id: 1, name: 'lớp 1', slug: "lop-1",
               id: 2, name: 'lớp 2', slug: "lop-2",
               id: 3, name: 'lớp 3', slug: "lop-3",
               id: 4, name: 'lớp 4', slug: "lop-4",
               id: 5, name: 'lớp 5', slug: "lop-5",
               id: 6, name: 'lớp 6', slug: "lop-6",
               id: 7, name: 'lớp 7', slug: "lop-7",
               id: 8, name: 'lớp 8', slug: "lop-8",
               id: 9, name: 'lớp 9', slug: "lop-9",
               id: 10, name: 'lớp 10', slug: "lop-10",
               id: 11, name: 'lớp 11', slug: "lop-11",
               id: 12, name: 'Lớp 12', slug: 'log-12'


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
                    {
                         rooms.length > 0 &&
                         (<ul>
                              {rooms.map(({ name, slug }) => <li>
                                   <div onClick={async () => {
                                        navigate(`/${slug}`)

                                   }}>
                                        {name}
                                   </div>
                              </li>)}
                         </ul>)
                    }
               </div>



          </header>
     )
}
