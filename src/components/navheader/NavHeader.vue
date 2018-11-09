<template>
  <el-row class="bgcolor">
    <i @click="goback" class="fa fa-chevron-left"></i>
    <span><slot></slot></span>
  </el-row>
</template>
<script>
export default {
  name: 'NavHeader',
  methods: {
    goback() {
      const self = this;
      self.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.bgcolor {
  height: 3em;
  background: black;
  /* text-align: center; */
  padding: 8px;
}
span,i {
  color: aliceblue;
  font-size: 1.4em;
}
span {
  margin-left: 36%;
}
</style>

