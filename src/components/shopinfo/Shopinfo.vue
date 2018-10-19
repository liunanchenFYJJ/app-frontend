<template>
    <el-row>
        <el-col :span="6">
            <div style="width: 100%;">
                <img src="https://fuss10.elemecdn.com/5/68/b8db7b0182d78591f8d1bb19e05eepng.png?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" alt="">
            </div>
        </el-col>
        <el-col :span="18">
            <div>
                <section><i class="iclass">品牌</i><span>四有青年米粉</span></section>
                <section>
                    <el-rate style="display: inline;" v-model="ratevalue" show-score score-template="{value}" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">></el-rate><span>月售231单</span>
                </section>
                <section>
                    <span>$20起送|远距离配送费$7.6</span>
                </section>
                <hr>
                <section>
                    <span>本店新用户立减5元</span>
                </section>
                <section>
                    <span>新用户下单立减17元</span>
                </section>
            </div>
        </el-col>
    </el-row>
</template>
<script>
export default {
  name: 'Shopinfo',
  data() {
    return {
      ratevalue: 3
    };
  }
};
</script>
<style scoped>
img {
    width: 80px;
    height: 80px;
}
h3 {
    margin: 0;
    padding: 0;
}
.iclass {
    background-color: orange;
}
span {
    /* border: solid 1px black; */
}
</style>
