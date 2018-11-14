<template>
    <div id="home" @scroll="handleScroll">
        <section>
            <header>
                <e-header></e-header>
            </header>
            <main>
                <e-carousel></e-carousel>
                <el-row :gutter="10">
                    <el-col v-for="(item, i) in infolist" :key="i" :span="12">
                        <centerad :adInfo=item></centerad>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="24">广告轮播</el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col v-for="(item, i) in 10" :key="i" :span="24">
                        <shopinfo></shopinfo>
                        Shopdetail {{count}}
                    </el-col>
                </el-row>
                <!-- <i v-for="i in 60" :key="i" class="fa fa-camera-retro fa-4x"></i> -->
            </main>
            <!-- <el-footer>Footer</el-footer> -->
        </section>
        <!-- <footer>4</footer> -->
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      istotop: true,
      infolist: [
        {
          title: '品质套餐',
          subtitle: '搭配齐全吃得好',
          action: '立即抢购',
          imgsrc: 'https://fuss10.elemecdn.com/d/d4/16ff085900d62b8d60fa7e9c6b65dpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/'
        },
        {
          title: '限量抢购',
          subtitle: '超值美味9.9元起',
          action: '1493人正在抢',
          imgsrc: 'https://fuss10.elemecdn.com/b/e1/0fa0ed514c093a7138b0b9a50d61fpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/'
        }
      ]
    };
  },
  created() {
    const self = this;
    console.log(self.$store);
    // self.getAllstore();
  },
  mounted() {
    // this.handleAa();
    // document.addEventListener('touchmove', this.handleAa, false);
  },
  computed: {
    ...mapState([
      'count'
    ])
  },
  methods: {
    // fjumptoad(i) {
    //   console.log(i)
    // },
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
    },
    // handleAa() {
    //     var a = document.querySelector('#aa');
    //     console.log(a);
    // }
    getAllstore() {
      const self = this;
      self.$axios({
        method: 'get',
        url: 'https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=31.29834&longitude=120.583191&offset=0&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id&terminal=h5'
      })
        .then((response) => {
          console.log(response);
        });
    }
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
