// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import App from './App';
import router from './router';
import CustomInput from './components/customInput'; // 每个组建都是一个独立的文件夹，在main.js里全局调用即可
import TestCom from './components/testCom';

Vue.use(ElementUI);
Vue.use(CustomInput);
Vue.use(TestCom);
// Vue.prototype.$axios = axios;
axios.defaults.baseURL = process.env.API_ROOT; // 根据不同环境配置请求路径
Object.defineProperty(Vue.prototype, '$axios', { value: axios });
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
