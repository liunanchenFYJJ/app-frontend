<template>
  <div class="bg" :class="{red: isRed}" :style="{fontSize: postFontSize + 'em'}">
    Authorization
    <transition name="bounce">
      <p v-if="show">p show</p>
    </transition>
    <transition
      enter-active-class="animated swing"
      leave-active-class="animated bounceOutRight"
    >
      <p v-if="show">p show</p>
    </transition>
    <TestCom :msg1="msg" @large-textt="large">{{msg}}</TestCom>
    <!-- <TestCom :msg1="msg" @large-textt="postFontSize += $event"></TestCom> -->
    <!-- <CustomInput v-model="customMsg" /> -->
    <!-- v-model 分解写法 -->
    <!-- <CustomInput v-bind:cusvalue="customMsg" v-on:cusinput="customMsg = $event">slot—value</CustomInput> -->
    <!-- 组件名的驼峰写法，可以‘-’写法 -->
    <custom-input ref="testRef" v-bind:cusvalue="customMsg" v-on:cusinput="customMsg = $event">slot—value</custom-input>
  </div>
</template>
<script>
// import TestCom from '@/components/TestCom';
// import CustomInput from '@/components/CustomInput';

export default {
  // components: { TestCom, CustomInput },
  data() {
    return {
      msg: 'xyz',
      // red: { color: 'red' }
      isRed: true,
      postFontSize: 2,
      customMsg: 'customMsg_jj',
      show: true
    };
  },
  beforeCreate() {
    // console.log(this); // this 是一个Vue 实例,一直存在，跟生命周期无关
  },
  created() {
    console.log(this);
  },
  methods: {
    large(post) {
      const self = this;
      self.postFontSize += post;
      self.show = !self.show;
    }
  }
};
</script>
<style scoped>
.bg {
  background-color: blue;
}
.red {
  color: red;
  /* 这里的背景覆盖之前的 */
  background-color: aquamarine;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>

