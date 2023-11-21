import React from 'react';
import clsx from 'clsx';
import styles from './Header.module.scss';
import logo from '../../assets/imgs/logo/logo.svg'

export default function Header() {
     return (
          <header className={clsx(styles.header)}>
               <div className={clsx(styles.headerTop)}>
                    <div className={clsx(styles.logo)}>
                         <img src={logo} alt="logo" />
                         <span>KMA</span>
                    </div>
                    <div className={clsx(styles.groupBtn)}>
                         <button className={clsx(styles.btnLogin)}>Đăng Nhập</button>
                         <button className={clsx(styles.btnResigter)}>Đăng kí</button>

                    </div>
               </div>



          </header>
     )
}
