// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import 'animate.css/animate.css'; // 引入animate.css
import 'font-awesome/css/font-awesome.css'; // 引入font-awesome
// 处理axios请求格式
import querystring from 'querystring';
import App from './App';
import router from './router';
import MyComponents from './components'; // 模仿ElementUI 将所有的组建全部导入
// import TestCom from './components/testCom'; // 单独引入
// import CustomInput from './components/customInput';


// Vue.use() 基于vue.js 编写的插件
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(MyComponents);
// Vue.use(TestCom);
// Vue.use(CustomInput);
// console.log(Vuex);
// console.log(MyComponents);

// 不是基于vue.js 编写的插件 挂载到vue 原型上
// Vue.prototype.$axios = axios;
// 关于不同环境加载不同url问题？
// axios.defaults.baseURL = process.env.API_ROOT; // 根据不同环境配置请求路径
// 通过配置好一个axios实例，提供在全局调用
const axiosinstance = axios.create({
  transformRequest: [(data) => {
    return querystring.stringify(data);
  }]
});
Object.defineProperty(Vue.prototype, '$axios', { value: axiosinstance });

Vue.config.productionTip = false;

// webpack 的 require.context
// 2。全局全部引入
// const requireComponent = require.context(
//   // 其组件目录的相对路径
//   './components',
//   // './components/testCom',
//   // './components/customInput',
//   // 是否查询其子目录
//   true,
//   // 匹配基础组件文件名的正则表达式
//   /[A-Z]\w+\.(vue|js)$/
// );

// // fileName -- 文件路径
// // componentConfig -- 对应组件具体配置
// // componentName -- 组件名
// requireComponent.keys().forEach((fileName) => {
//   // 获取组件配置
//   const componentConfig = requireComponent(fileName);
//   // console.log(componentConfig.default.name);

//   // 获取组件名.这里没有用到 lodash 或者可以直接从componentConfig里面取值
//   const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');

//   // 全局注册组件
//   Vue.component(
//     componentName,
//     // 如果这个组件选项是通过 `export default` 导出的，
//     // 那么就会优先使用 `.default`，
//     // 否则回退到使用模块的根。
//     componentConfig.default || componentConfig
//   );
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
