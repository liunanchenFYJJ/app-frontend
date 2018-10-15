import Vue from 'vue';
import Router from 'vue-router';
import MapIndex from '@/pages/MapIndex';
import PointManagement from '@/pages/PointManagement';
import Authorization from '@/pages/Authorization';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  // base: 'prod',
  routes: [
    {
      path: '/',
      redirect: '/map'
    },
    {
      path: '/map',
      name: 'MapIndex',
      component: MapIndex
    },
    {
      path: '/manage',
      name: 'PointManagement',
      component: PointManagement
    },
    {
      path: '/author',
      name: 'AuthorizationIndex',
      component: Authorization
    }
  ]
});
