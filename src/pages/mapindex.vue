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
      map: null,
      companys: [
        {
          "prjCode": "PRJ_HkvlZ6_5M",
          "prjName": "清山会议中心（二期）",
          "cropCode": "QY_BykBSfIbQ",
          "prjLat": 31.334337,
          "prjLon": 120.433336
        },
        {
          "prjCode": "PRJ_ByJ9jKLFb",
          "prjName": "苏州普商仓储（中国国药B-3）",
          "cropCode": "QY_HkVMoFItW",
          "prjLat": 31.3567,
          "prjLon": 120.816519
        }
      ]
    };
  },
  created() {
    const self = this;
    // console.log($)
    self.getAllPrj();
  },
  mounted() {
    const self = this;
    self.initMap();
    self.addMarkers();
  },
  methods: {
    initMap() {
      const self = this;
      self.map = new BMap.Map('allmap');// 创建Map实例
      // self.map.centerAndZoom(new BMap.Point(120.598736,31.304552), 11);// 初始化地图,设置中心点坐标和地图级别
      self.map.centerAndZoom("苏州", 11); 
      self.map.enableScrollWheelZoom(true);// 开启鼠标滚轮缩放
      let size = new BMap.Size(10, 10);
      self.map.addControl(new BMap.CityListControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: size,
        // 切换城市之间事件
        // onChangeBefore: function(){
        //   alert('before');
        // },
        // 切换城市之后事件
        // onChangeAfter:function(){
        //   alert('after');
        // }
      }));
    },
    getAllPrj() {
      const self = this;
      self.$axios({
        method: 'post',
        url: '/api/getAllPrj',
        data: {}
      })
        .then(function (response) {
          console.log(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addMarkers: function() {
      const self = this;
      // self.map.clearMap();  // 清除地图覆盖物
      function addMarker(point){
        let marker = new BMap.Marker(point);
        self.map.addOverlay(marker);
        // marker.setAnimation(BMAP_ANIMATION_BOUNCE);
        var opts = {
	        width : 200,     // 信息窗口宽度
	        height: 100,     // 信息窗口高度
	        title : "海底捞王府井店" , // 信息窗口标题
	        enableMessage:true,//设置允许信息窗发送短息
	        message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
	      }
	      var infoWindow = new BMap.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", opts);
          marker.addEventListener("click", function() {          
          self.map.openInfoWindow(infoWindow,point); //开启信息窗口
        });
      }
      self.companys.map(item => {
        addMarker(new BMap.Point(item.prjLon, item.prjLat));
      })
      // self.map.setFitView();            
    },
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
