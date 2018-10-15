// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import App from './App';
import router from './router';
import MyComponents from './components'; // 模仿ElementUI 将所有的组建全部导入

// Vue.use() 基于vue.js 编写的插件
Vue.use(ElementUI);
Vue.use(MyComponents);


// 不是基于vue.js 编写的插件 挂载到vue 原型上
// Vue.prototype.$axios = axios;
axios.defaults.baseURL = process.env.API_ROOT; // 根据不同环境配置请求路径
Object.defineProperty(Vue.prototype, '$axios', { value: axios });

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
