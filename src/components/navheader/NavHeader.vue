<template>
  <el-row class="bgcolor">
    <i class="fa fa-chevron-left"></i>
    <span><slot></slot></span>
  </el-row>
</template>
<script>
export default {
  name: 'NavHeader'
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

