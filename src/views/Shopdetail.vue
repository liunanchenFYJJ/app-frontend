<template>
  <div>
    <shop-item></shop-item>
    <shop-item></shop-item>
  </div>
</template>
<script>
import Map from '@/class/map';

export default {
  data() {
    return {

    };
  },
  created() {
    const self = this;
    console.log(self.$store);
    // self.getAllstore();
    const m1 = new Map();
    m1.set('sa', 'sd');
    console.log(m1.get('as'));
  }
};
</script>
