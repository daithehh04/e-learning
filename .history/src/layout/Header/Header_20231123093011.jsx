import React, { useState } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/imgs/logo/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
     const navigate = useNavigate();
     const { isLoading, loginWithPopup, isAuthenticated } = useAuth0();
     const [rooms, setRoom] = useState([

          { id: 1, name: 'lớp 1', slug: "lop-1" },
          { id: 2, name: 'lớp 2', slug: "lop-2" },
          { id: 3, name: 'lớp 3', slug: "lop-3" },
          { id: 4, name: 'lớp 4', slug: "lop-4" },
          { id: 5, name: 'lớp 5', slug: "lop-5" },
          { id: 6, name: 'lớp 6', slug: "lop-6" },
          { id: 7, name: 'lớp 7', slug: "lop-7" },
          { id: 8, name: 'lớp 8', slug: "lop-8" },
          { id: 9, name: 'lớp 9', slug: "lop-9" },
          { id: 10, name: 'lớp 10', slug: "lop-10" },
          { id: 11, name: 'lớp 11', slug: "lop-11" },
          { id: 12, name: 'Lớp 12', slug: 'log-12' }


     ])
     console.log(rooms);
     return (
          <header className={clsx(styles.header)}>
               <div className={clsx(styles.headerTop)}>
                    <div className={clsx(styles.logo)}>
                         <img src={logo} alt="logo" />
                         <span>KMA WEB</span>
                    </div>
                    <div className={clsx(styles.groupBtn)}>
                         <button onClick={() => loginWithPopup()} > <button className={clsx(styles.btnLogin)}>Đăng Nhập</button></button>
                         {/* <button> <button className={clsx(styles.btnResigter)}>Đăng kí</button></button> */}
                    </div>
               </div>
               <div className={clsx(styles.headerBottom)}>
                    {
                         rooms.length > 0 &&
                         (<ul>
                              {rooms.map(({ id, name, slug }) =>
                              (<li key={id}>
                                   <div className={clsx(styles.navLinkRoom)}
                                        onClick={async () => {
                                             navigate(`/${slug}`)
                                        }}>
                                        {name}
                                   </div>
                              </li>))}
                         </ul>)
                    }
               </div>



          </header>
     )
}
