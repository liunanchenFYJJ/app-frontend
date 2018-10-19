<template>
    <div @click="jumptoad" class="centerad">
        <h3>{{ adInfo.title }}</h3>
        <p>{{ adInfo.subtitle }}</p>
        <p>{{ adInfo.action }} ></p>
        <img :src="adInfo.imgsrc" alt="">
    </div>
</template>
<script>
export default {
  name: 'Centerad',
  props: {
    adInfo: {
      type: Object
    }
  },
  methods: {
    jumptoad() {
      // div点击跳转
      console.log('sdd');
    }
  }
};
</script>
<style scoped>
.centerad {
    height: 140px;
    /* css3 的rgba() 可以让父元素透明，子元素不受影响 */
    background-color:rgba(68, 66, 66, 0.1);
    padding: 4px;
}
img {
    width: 120px;
    float: right;
}
h3, p {
    margin: 0;
    padding: 0;
}
</style>
