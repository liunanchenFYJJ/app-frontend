<template>
    <div id="footer">
        <el-row>
            <el-col v-for="(item, i) in navilist" :key="i" :span="6">
                <div @click="jumpto(item, i)" class="grid-content">
                    <span class="fa-stack fa-lg">
                        <i v-show="i === aci" class="fa fa-square-o fa-stack-2x"></i>
                        <!-- <i class="fa fa-twitter fa-stack-1x"></i> -->
                        <i :class="item.class" class="fa-stack-1x"></i>
                    </span>
                    <p>{{ item.title }}</p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  name: "EFooter",
  props: {
    navilist: {
      type: Array
    }
  },
  data() {
    return {
      aci: 0
    };
  },
  methods: {
    jumpto(item, i) {
    //   console.log(this.$router);
    //   console.log(this.$route);
      const self = this;
      switch (i) {
        // case 0:
        //   self.$router.push("home");
        //   break;
        case 1:
          self.$router.push('discover');
          self.aci = 1;
          break;
        case 2:
          self.$router.push('order');
          self.aci = 2;
          break;
        case 3:
          self.$router.push('profile');
          self.aci = 3;
          break;
        default:
          self.$router.push('home');
          self.aci = 0;
          break;
      }
    }
  }
};
</script>

<style scoped>
#footer {
  background-color: #fff;
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
}
.grid-content {
  /* margin-top: 10px; */
  text-align: center;
}
p {
  margin-top: -8px;
}
</style>

