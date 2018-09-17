import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import MapIndex from '@/pages/MapIndex';
import Authorization from '@/pages/Authorization';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/map'
      // name: 'HelloWorld',
      // component: HelloWorld
    },
    {
      path: '/map',
      name: 'MapIndex',
      component: MapIndex
    },
    {
      path: '/author',
      name: 'AuthorizationIndex',
      component: Authorization
    }
  ]
});
