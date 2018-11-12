<template>
    <div class="outer">
        <nav-header>订单</nav-header>
        {{result}}
    </div>
</template>
<script>
export default {
  name: 'Order',
  data() {
    return {
      result: '',
      username: ''
    };
  },
  methods: {

  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // console.log(vm);
      const self = vm;
      setTimeout(() => {
        self.result = 'hello,jj';
      }, 2000);
    });
  }
};
</script>

<style scoped>
.outer {
  position: relative;
  /* 如果为一个固定页的高度如何设置？根据设备大小判断高度？
  index页传进来的如何处理？ */
  height: 812px;
}
.btn {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -20px 0 0 -49px;
  /* transform: translate(-50%, -50%); */
}
</style>

