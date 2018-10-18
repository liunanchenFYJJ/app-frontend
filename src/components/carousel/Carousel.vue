<template>
    <div id="carousel">ECarousel
        <ul>
            <li>1</li>
            <li>2</li>
        </ul>
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'ECarousel',
  data() {
    return {

    };
  },
  mounted() {
    const self = this;
    document.addEventListener('touchmove', self.carousel, false);
  },
  methods: {
    carousel() {
      console.log('carousel');
    }
  }
};
</script>
<style scoped>
#carousel {
    width: 100%;
    height: 200px;
    background-color: red;
    margin-top: 10px;
}
</style>

