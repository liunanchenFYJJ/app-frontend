<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div @click="chooseAdd">
                    <i class="fa fa-map-marker fa-lg"></i>
                    <span>腾飞创新园</span>
                    <i class="fa fa-sort-desc fa-lg"></i>
                </div>
            </el-col>
            <el-col :span="24" style="margin-top: 10px;">
                <!-- <div id="totop" :class="{ totop: istotop}"> -->
                <div class="totop">
                    <el-input placeholder="search for delicious food"></el-input>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  name: 'EHeader',
  data() {
    return {};
  },
  methods: {
    // handleScroll(e) {
    //   const self = this;
    //   var top = document.querySelector('.totop');
    // //   console.log(top.style);
    // //   console.log(e.target.scrollTop);
    //   if (e.target.scrollTop >= 60) {
    //     // self.istotop = true;
    //     //     //   alert('sd')
    //     top.style.position = "fixed";
    //     top.style.top = "10px";
    //     top.style.width = "90%";
    //   } else {
    //     // self.istotop = false;
    //     top.style.position = "relative";
    //     top.style.top = 0;
    //     top.style.width = "100%";
    //   }
    // },
    chooseAdd() {
      console.log('choose your city');
    }
  }
};
</script>

