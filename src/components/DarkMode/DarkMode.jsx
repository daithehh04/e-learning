import React from 'react'
import styles from './DarkMode.module.scss';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

import clsx from 'clsx';
export default function DarkMode() {
     const setDarkMode = () => {
          document.documentElement.setAttribute("data-theme", "dark");
          localStorage.setItem("theme", "dark");
     }
     const setLightMode = () => {
          document.documentElement.setAttribute("data-theme", "light");
          localStorage.setItem("theme", "light");
     }
     const handleToggleTheme = (e) => {
          if (e.target.checked) {
               setDarkMode();
          } else {
               setLightMode();
          }
     }
     const theme = localStorage.getItem('theme');
     if (theme === 'dark') {
          setDarkMode();
     } else {
          setLightMode();
     }
     return (
          <div className={clsx(styles.darkMode)}>
               <input
                    className={clsx(styles.darkModeInput)}
                    type='checkbox'
                    id='darkmode-toggle'
                    onChange={handleToggleTheme}
                    defaultChecked={theme === "dark"}
               />
               <label className={clsx(styles.darkModeLabel)} htmlFor='darkmode-toggle'>
                    <MdLightMode className={clsx(styles.sun)} />
                    <MdDarkMode className={clsx(styles.moon)} />
               </label>
          </div>
     )
}

