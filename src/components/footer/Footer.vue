<template>
    <div id="footer">
        <el-row>
            <el-col v-for="(item, i) in navilist" :key="i" :span="6">
                <div class="grid-content">
                    <i class="fa fa-camera-retro fa-lg"></i>
                    <p>{{ item.title }}</p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  name: 'EFooter',
  props: {
    navilist: {
      type: Array
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
  margin-top: 10px;
  text-align: center;
}
p {
  margin-top: 0;
}
</style>

