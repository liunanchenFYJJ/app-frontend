<template>
  <div>
    <li>{{remsg}}</li>
    <button @click="large">bigger</button>
  </div>
</template>
<script>
export default {
  name: 'TestCom',
  props: ['msg1'], // 给组件一个prop
  computed: {
    remsg() {
      // return this.msg1.split('').reverse().join('');
      return new Date();
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

