import Vue from 'vue';
import CustomInput from './customInput/index';
import TestCom from './testCom/index';
import EFooter from './footer/index';
import EHeader from './header/index';
import ECarousel from './carousel/index';
import Centerad from './centerad/index';
import Shopinfo from './shopinfo/index';
import NavHeader from './navheader/index';

const components = [
  CustomInput,
  TestCom,
  EFooter,
  EHeader,
  ECarousel,
  Centerad,
  Shopinfo,
  NavHeader
  // 异步组件？
  // const CustomInput = (resolve) => { require.ensure([], () => { require('./customInput/index') }) }
  // const TestCom = (resolve) => { require.ensure([], () => { require('./testCom/index') }) }
];

components.forEach((component) => {
  Vue.component(component.name, component);
// Vue.use(component);
});

// const a = {
//   version: '0.0.1',
//   CustomInput,
//   TestCom
// };

export default {
  version: '0.0.1',
  CustomInput,
  TestCom,
  EFooter,
  EHeader,
  ECarousel,
  Centerad,
  Shopinfo,
  NavHeader
};
