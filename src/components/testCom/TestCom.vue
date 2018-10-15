<template>
  <div>
    <li>{{remsg}}</li>
    <button @click="large"><slot>bigger</slot></button>
  </div>
</template>
<script>
export default {
  name: 'TestCom',
  // props: ['msg1'], // 给组件一个prop
  props: { // prop会在组件实例创建之前进行验证，实例的属性在其他函数中不可用
    msg1: {
      type: String,
      required: true
    }
  },
  computed: {
    remsg() {
      return this.msg1.split('').reverse().join('');
      // return new Date();
    }
  },
  methods: {
    large() {
      const self = this;
      self.$emit('large-textt', 0.1);
    }
  }
};
</script>

