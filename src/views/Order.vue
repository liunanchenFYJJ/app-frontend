<template>
    <div class="outer">
        <nav-header>订单</nav-header>
        <el-button @click="gotoLogin" class="btn" type="success">立即登陆</el-button>
    </div>
</template>
<script>
export default {
  name: 'Order',
  data() {
    return {

    };
  },
  methods: {
    gotoLogin() {
      const self = this;
      // 两种跳转方法
      // self.$router.push('/login');
      self.$router.push({ name: 'Login' });
    }
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

