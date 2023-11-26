import React from 'react'
import { useLocale } from 'antd/es/locale'
import { useEffect } from 'react';

export default function ScrollToTop() {
     const { pathname } = useLocale();
     useEffect(() => {
          window && window.scrollTo(0, 0);
     }, [pathname])

     return null
}

