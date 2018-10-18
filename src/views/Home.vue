<template>
    <div id="home">
        <div @scroll="handleScroll" style="height: 1000px;overflow-y: auto;">
            <el-container>
                <el-header style="margin-top: 30px;">
                    <e-header></e-header>
                </el-header>
                <el-main>
                    <i v-for="i in 60" :key="i" class="fa fa-camera-retro fa-5x"></i>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </div>
    </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      istotop: true
    };
  },
  methods: {
    handleScroll(e) {
      const self = this;
      var top = document.querySelector(".totop");
    //   console.log(top.style);
    //   console.log(e.target.scrollTop);
      if (e.target.scrollTop >= 60) {
        // self.istotop = true;
        //     //   alert('sd')
        top.style.position = "fixed";
        top.style.top = "10px";
        top.style.width = '90%';
      } else {
        // self.istotop = false;
        top.style.position = "relative";
        top.style.top = 0;
        top.style.width = '100%';
      }
    }
  }
};
</script>
<style>
#home {
  /* overflow-y: auto; */
}
.totop {
  /* width: 90%; */
  /* position: fixed;
  top: 10px; */
}
</style>

