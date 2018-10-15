import TestCom from './TestCom';

TestCom.install = function (Vue) {
  Vue.component(TestCom.name, TestCom);
};

export default TestCom;
