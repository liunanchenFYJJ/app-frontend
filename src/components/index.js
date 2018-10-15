import Vue from 'vue';
import CustomInput from './customInput/index';
import TestCom from './testCom/index';

const components = [
  CustomInput,
  TestCom
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
  TestCom
};
