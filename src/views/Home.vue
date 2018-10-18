<template>
    <div id="home">
        <div style="height: 1000px;overflow-y: auto;">
            <el-container>
                <el-header>Header</el-header>
                <el-main>Main
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

    };
  }
};
</script>
<style>
#home {
  /* overflow-y: auto; */
}
</style>

