<template>
    <div id="home" @scroll="handleScroll">
        <section>
            <header>
                <e-header></e-header>
            </header>
            <main>
                <e-carousel></e-carousel>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <div style="height: 150px;background-color:blue"></div>
                    </el-col>
                    <el-col :span="12">
                        <div style="height: 150px;background-color:blue"></div>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="24">1</el-col>
                </el-row>
                <i v-for="i in 60" :key="i" class="fa fa-camera-retro fa-4x"></i>
            </main>
            <!-- <el-footer>Footer</el-footer> -->
        </section>
        <!-- <footer>4</footer> -->
    </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      istotop: true
    };
  },
  mounted() {
    // this.handleAa();
    // document.addEventListener('touchmove', this.handleAa, false);
  },
  methods: {
    handleScroll(e) {
    //   const self = this;
      const top = document.querySelector('.totop');
      //   console.log(top.style);
      //   console.log(e.target.scrollTop);
      if (e.target.scrollTop >= 60) {
        // self.istotop = true;
        //     //   alert('sd')
        top.style.position = 'fixed';
        top.style.top = '10px';
        top.style.width = '90%';
      } else {
        // self.istotop = false;
        top.style.position = 'relative';
        top.style.top = 0;
        top.style.width = '100%';
      }
    }
    // handleAa() {
    //     var a = document.querySelector('#aa');
    //     console.log(a);
    // }
  }
};
</script>
<style>
#home {
    height: 1000px;
    overflow-y: auto;
}
.totop {
  /* width: 90%; */
  /* position: fixed;
  top: 10px; */
}
.el-carousel__item {
    /* background-color: black; */
    /* height: 200px; */
}
/* .el-carousel__arrow {
    display: none;
} */
/* .el-carousel__arrow--right {
    display: none;
} */
header {
    margin-top: 30px;
    padding-left: 20px;
    padding-right: 20px;
}
main {
    padding-left: 20px;
    padding-right: 20px;
}
</style>
