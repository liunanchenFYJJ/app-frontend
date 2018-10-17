import Vue from 'vue';
import Router from 'vue-router';
import MapIndex from '@/pages/MapIndex';
import PointManagement from '@/pages/PointManagement';
import Authorization from '@/pages/Authorization';
// 模仿eleme的路由都在views文件夹中
import Home from '@/views/Home';
// 异步路由？

Vue.use(Router);

export default new Router({
  mode: 'history',
  // base: 'prod',
  routes: [
    {
      path: '/',
      redirect: '/home'
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
      path: '/home',
      name: 'index',
      component: Home
    }
  ]
});
