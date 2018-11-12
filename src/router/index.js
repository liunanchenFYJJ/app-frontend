import Vue from 'vue';
import Router from 'vue-router';
import MapIndex from '@/pages/MapIndex';
import PointManagement from '@/pages/PointManagement';
import Authorization from '@/pages/Authorization';
// 模仿eleme的路由都在views文件夹中
import Index from '@/views/Index';
import Login from '@/views/Login';
import Home from '@/views/Home';
import Discover from '@/views/Discover';
import Order from '@/views/Order';
import Profile from '@/views/Profile';

// 路由懒加载？
// const Index = () => { import('@/views/Index'); };
// const Login = () => { import('@/views/Login'); };
// const Home = () => { import('@/views/Home'); };
// const Discover = () => { import('@/views/Discover'); };
// const Order = () => { import('@/views/Order'); };
// const Profile = () => { import('@/views/Profile'); };

Vue.use(Router);

const router = new Router({
  mode: 'history',
  // base: 'prod',
  routes: [
    {
      path: '/',
      redirect: '/index/home'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/map',
      name: 'MapIndex',
      component: MapIndex
      // component: () => { import('@/pages/MapIndex'); }
      // component: (resolve) => { require(['@/pages/MapIndex'], resolve) }
    },
    {
      path: '/manage',
      name: 'PointManagement',
      component: PointManagement
      // component: () => { import('@/pages/PointManagement'); }
      // component: (resolve) => { require(['@/pages/PointManagement'], resolve) }
    },
    {
      path: '/author',
      name: 'AuthorizationIndex',
      component: Authorization
      // component: () => { import('@/pages/Authorization'); }
      // component: (resolve) => { require(['@/pages/Authorization'], resolve) }
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: 'discover',
          name: 'discover',
          component: Discover
        },
        {
          path: 'order',
          name: 'Order', // 命名路由
          component: Order,
          meta: { auth: true } // 需要登陆权限
        },
        {
          path: 'profile',
          name: 'profile',
          component: Profile,
          meta: { auth: true }
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log(to.meta);
  // console.log(from);
  // console.log(next);
  // 实现先登陆
  if (to.meta.auth) { // 需要登陆
    console.log('此页面需要登陆！');
    const user = document.cookie.split('=')[1]; // 取到user
    console.log(user);
    if (user) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
  } else { // 不需要登陆
    next();
  }
});

export default router;