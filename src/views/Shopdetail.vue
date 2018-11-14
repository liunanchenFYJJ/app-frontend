<template>
  <div>
    <button @click="back">back</button>
    Shopdetail {{count}}
    <button @click="plusone">+1</button>
    <button @click="minusone(2)">-2</button>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      // amount: 0
    };
  },
  // 1.计算属性，从store实例中读取状态值
  // computed: {
  //   count() {
  //     const self = this;
  //     return self.$store.state.count;
  //   }
  // },
  // 2.使用mapState
  // computed: mapState({
  //   count: state => state.count
  // }),
  // 3. 2.的简写
  // computed: mapState([
  //   'count'
  // ]),
  // 终极写法
  computed: {
    ...mapState([
      'count'
    ])
  },
  methods: {
    ...mapActions({
      plusone: 'increment',
      minusone: 'decrement'
    }),
    // ...mapMutations({
    //   plusone: 'increment',
    //   minusone: 'decrement'
    // }),
    // plusone() {
    //   // const self = this;
    //   // self.$store.commit('increment');
    // },
    // minusone() {
    //   const self = this;
    //   self.$store.state.count -= 1;
    // },
    back() {
      const self = this;
      self.$router.go(-1);
    }
  }
};
</script>

