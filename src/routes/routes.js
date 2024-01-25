import Home from '../pages/home/Home';
import CategoryDetail from '../pages/categoryDetail/CategoryDetail';
import CourseDetail from '../pages/courseDetail/CourseDetail';
import Introduce from '../pages/introduce/Introduce';
import Contact from '../pages/contact/Contact';
import Policy from '../pages/policy/Policy';
import Privacy from '../pages/privacy/Privacy';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import NotFound from '../pages/notfound/NotFound';
import Profile from '../pages/profile/Profile';
import Practice from '../pages/practice/Practice';
import Learning from '../pages/learning/Learning';
import Exam from '../pages/exam/Exam';
import Achievement from '../pages/achievement/Achievement';

// Public routers
export const publicRoutes = [
  { path: '/', component: Home },
  { path: '/:slug', component: CategoryDetail },
  { path: '/:slug/:slugChild', component: CourseDetail },
  { path: '/gioi-thieu', component: Introduce },
  { path: '/lien-he', component: Contact },
  { path: '/dieu-khoan-su-dung', component: Policy },
  { path: '/chinh-sach-bao-mat', component: Privacy },
  { path: '/dang-nhap', component: Login },
  { path: '/dang-ky', component: Register },
  { path: '*', component: NotFound },
];

// Private routes
export const privateRoutes = [
  { path: '/thong-tin-ca-nhan', component: Profile },
  { path: '/ket-qua-hoc-tap', component: Achievement },
  {
    path: '/:slug/:slugChild/de-kiem-tra/:id/:idChild',
    component: Practice,
  },
  { path: '/:slug/:slugChild/chuong-trinh-hoc/:id', component: Learning },
  { path: '/:slug/:slugChild/de-kiem-tra/:id', component: Exam },
];
