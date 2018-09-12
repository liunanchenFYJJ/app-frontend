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
  created() {
    const self = this;
    console.log($)
    self.getAllPrj();
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
    },
    getAllPrj() {
      const self = this;
      console.log('get')
      self.$axios.post('/api')
        .then((response) => {
          self.msg = response.data.title;
        })
        .catch((response) => {
          self.msg = response;
          // console.log(response);
        });
      // self.$axios.post('/api/getAllPrj', {})
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((response) => {
      //     console.log(response);
      //   });
      // self.$axios.post('http://192.168.0.119:8080/power/getAllPrj', {}, 
        // {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //     'Access-Control-Allow-Origin': '*'
        //   }
        // }
        // )
        // .then(function (response) {
        //   console.log(response);
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
      $.post('/api', {}, function(e) {
        console.log(e);
      })
      // $.ajax({
      //   url: 'http://192.168.0.119:8080/power/getAllPrj',
      //   dataType: 'json',
      //   processData: false, 
      //   type: 'post',
      //   data: {},
      //   success:function(data){
      //     console.log(data);
      //   },
      //   error:function(XMLHttpRequest, textStatus, errorThrown) {
      //     console.log(XMLHttpRequest.status);
      //     console.log(XMLHttpRequest.readyState);
      //     console.log(textStatus);
      //   }
      // });
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
