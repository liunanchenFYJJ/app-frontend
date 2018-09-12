<template>
    <div class="box">
      <div id="allmap"></div>
    </div>
</template>
<script>
export default {
  name: 'mapindex',
  data() {
    return {

    };
  },
  mounted() {
    const self = this;
    self.initMap();
  },
  methods: {
    initMap() {
      const map = new BMap.Map('allmap');// 创建Map实例
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);// 初始化地图,设置中心点坐标和地图级别
      // 添加地图类型控件
      map.addControl(new BMap.MapTypeControl({
        mapTypes: [
          BMAP_NORMAL_MAP,
          BMAP_HYBRID_MAP
        ]
      }));
      map.setCurrentCity('苏州');// 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true);// 开启鼠标滚轮缩放
    }
  }
};
</script>
<style scoped>
  .box{
    width: 100%;
    height: 100%;
  }
  #allmap {
    width: 100%;
    height: 100%;
  }
</style>
