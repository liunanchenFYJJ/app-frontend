<template>
    <div class="box">
      <div id="up">
        <el-form :inline="true" :model="prj" class="demo-form-inline" size="mini">
          <el-form-item>
            <el-autocomplete
              v-model="prj.prjName"
              :fetch-suggestions="querySearchAsync"
              @select="handleSelect"
              placeholder="请输入工程名称"
              style="width: 200px"
            ><i slot="suffix" @click="onCancel" class="el-input__icon el-icon-circle-close-outline"></i></el-autocomplete>
          </el-form-item>
          <el-form-item v-show="false">
            <el-input v-model="prj.prjCode" placeholder="请输入工程代码"></el-input>
          </el-form-item>
          <el-form-item>
            <!-- <el-button type="info" @click="onCancel">清除</el-button> -->
            <el-button type="primary" @click="getTopten">查询</el-button>
            <el-button @click="jumpto">新增维修点</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- dialog -->
      <el-dialog title="新增维修点" :visible.sync="dialogTableVisible" @close='closeDialog'>
        <el-table :data="tableData" size="mini">
          <el-table-column property="serName" label="名称" width="150">
            <template slot-scope="scope">
              <el-input placeholder="serName" v-model="scope.row.serName"></el-input>
            </template>
          </el-table-column>
          <el-table-column property="serPassword" label="密码">
            <template slot-scope="scope">
              <el-input placeholder="serPassword" v-model="scope.row.serPassword"></el-input>
            </template>
          </el-table-column>
          <el-table-column property="phone" label="手机号">
            <template slot-scope="scope">
              <el-input placeholder="phone" v-model="scope.row.phone"></el-input>
            </template>
          </el-table-column>
          <el-table-column property="serAddress" label="地址">
            <template slot-scope="scope">
              <el-input placeholder="serAddress" v-model="scope.row.serAddress"></el-input>
            </template>
          </el-table-column>
          <el-table-column property="serLat" label="纬度">
            <template slot-scope="scope">
              <el-input placeholder="serLat" v-model="scope.row.serLat"></el-input>
            </template>
          </el-table-column>
          <el-table-column property="serLon" label="经度">
            <template slot-scope="scope">
              <el-input placeholder="serLon" v-model="scope.row.serLon"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="oneMoreCol">增加一行</el-button>
          <el-button size="small" type="primary" @click="insertvalue">提交</el-button>
        </span>
      </el-dialog>
      <div v-show="leftshow" id="left">
        <el-table height="452px" :data="selectedPrj"
        size="small"
        @row-click="rowClick"
        :default-sort = "{prop: 'distance', order: 'ascending'}">
          <el-table-column
            label="id">
            <template slot-scope="scope">
              <!-- <span>{{scope.$index}}</span> -->
              <div class="imgDiv">
                <img src="http://api.map.baidu.com/img/markers.png" alt="" style="position: absolute;clip:rect(50px 21px 75px 0px);background-repeat: no-repeat;">
              </div>
              <!-- <img src="http://api.map.baidu.com/img/markers.png" alt="" style="position: absolute;clip:rect((1 * 25)px 21px (2 * 25)px 0px);background-repeat: no-repeat;"> -->
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            prop="serName"
            label="维修点">
            <template slot-scope="scope">
              <span class="limit8">{{scope.row.serName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="90"
            label="联系电话">
            prop="phone"
          </el-table-column>
          <el-table-column
            width="94"
            prop="distance"
            sortable
            label="距离(m)">
          </el-table-column>
        </el-table>
      </div>
      <div id="allmap"></div>
    </div>
</template>
<script>
export default {
  name: 'mapindex',
  data() {
    return {
      map: null, // 地图
      companys: [], // 所有站点
      prj: {
        prjCode: '',
        prjName: ''
      },
      leftshow: false, // 左侧栏
      selectedPrj: [], // 查询到的结果
      dialogTableVisible: false,
      tableData: [{
        serName: '',
        serPassword: '',
        phone: '',
        serAddress: '',
        serLat: '',
        serLon: ''
      }],
      timeout: null,
      centerPoint: {} // 查询中心点
    };
  },
  created() {
    const self = this;
    self.getAllPrj();
  },
  mounted() {
    const self = this;
    self.initMap(); // 初始化地图
  },
  methods: {
    jumpto() {
      const self = this;
      self.$router.push({ path: 'manage' });
    },
    rowClick(item) { // 点击tablerow
      const self = this;
      const point = new window.BMap.Point(item.serLon, item.serLat);
      self.addMarker(point, false, true, 1);
      // self.moreInfo();
    },
    // moreInfo() {
    //   const self = this;
    //   console.log('moreInfo');
    // },
    initMap() {
      const self = this;
      self.map = new window.BMap.Map('allmap'); // 创建Map实例
      self.map.centerAndZoom(new window.BMap.Point(120.598736, 31.304552), 11); // 初始化地图,设置中心点坐标和地图级别
      // self.map.centerAndZoom("苏州", 11);
      self.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
      const size = new window.BMap.Size(10, 10);
      self.map.addControl(new window.BMap.CityListControl({
        anchor: window.BMAP_ANCHOR_TOP_RIGHT,
        offset: size
      }));
      self.map.setMapStyle({ style: 'midnight' });
    },
    getAllPrj() {
      const self = this;
      self.$axios({
        method: 'post',
        url: '/getAllPrj',
        data: {}
      })
        .then((response) => {
          self.companys = response.data.data;
          self.addMarkers(); // 加载点
        })
        .catch((error) => {
          if (error) {
            self.$message({
              message: '请重试刷新',
              type: 'warning'
            });
          }
        });
    },
    addMarkers(cp = {}) {
      const self = this;
      const pointArr = [];
      if (Object.keys(cp).length !== 0) {
        const cpoint = new window.BMap.Point(cp.prjLon, cp.prjLat);
        pointArr.push(cpoint);
        self.selectedPrj.forEach((item) => {
          const point = new window.BMap.Point(item.serLon, item.serLat);
          pointArr.push(point);
          self.addMarker(point, false, true);
        });
      } else {
        self.map.clearOverlays(); // 清除地图覆盖物
        self.companys.forEach((item) => {
          const point = new window.BMap.Point(item.prjLon, item.prjLat);
          pointArr.push(point);
          self.addMarker(point);
        });
      }
      self.map.setViewport(pointArr); // 所有点自适应屏幕
    },
    addMarker(point, bounce = false, isSerpoint = false, i = '') {
      const self = this;
      let marker;
      if (isSerpoint) {
        const myIcon = new window.BMap.Icon('http://api.map.baidu.com/img/markers.png', new window.BMap.Size(23, 25), {
          offset: new window.BMap.Size(10, 25),
          imageOffset: new window.BMap.Size(0, 0 - (10 * 25)),
          anchor: new window.BMap.Size(10, 25)
        });
        if (i) {
          // self.map.clearOverlays();
          marker = new window.BMap.Marker(point, { icon: myIcon }); // 维修点标记
        } else {
          marker = new window.BMap.Marker(point); // 维修点标记
        }
      } else {
        const myIcon = new window.BMap.Symbol(window.BMap_Symbol_SHAPE_POINT, {
          scale: 1.4, // 图标缩放大小
          fillColor: 'orange', // 填充颜色
          fillOpacity: 1 // 填充透明度
        });
        marker = new window.BMap.Marker(point, { icon: myIcon }); // 站点标记
        // marker.addEventListener('click', self.moreInfo);
      }
      self.map.addOverlay(marker);
      if (bounce) { // 查询特定站点加上弹跳动画
        marker.setAnimation(window.BMap_ANIMATION_BOUNCE);
      }
    },
    getTopten() {
      const self = this;
      if (self.prj.prjCode !== '') {
        self.$axios({
          method: 'post',
          url: '/getNearServices',
          data: { prjCode: self.prj.prjCode }
        })
          .then((response) => {
            self.leftshow = true; // 左侧栏
            self.selectedPrj = response.data.data;
            self.addMarkers(self.centerPoint);
          })
          .catch((error) => {
            self.leftshow = false;
            if (error) {
              self.$message({
                message: '请确认工程名称后重试',
                type: 'warning'
              });
            }
          });
      } else {
        self.$message({
          message: '请填入工程名称',
          type: 'warning'
        });
      }
    },
    onCancel() { // 清空
      const self = this;
      self.leftshow = false;
      Object.keys(self.prj).forEach((key) => { self.prj[key] = ''; });
      // self.addMarkers(); // 回到原界面
    },
    insertvalue() {
      const self = this;
      let submitable = true;
      self.tableData.forEach((item) => {
        Object.values(item).filter((subItem) => {
          if (subItem === '') {
            submitable = false;
            return false;
          }
          return false;
        });
      });
      const insert = function () {
        self.$axios({
          method: 'post',
          url: '/insertServices',
          data: { services: self.tableData }
        })
          .then((response) => {
            if (response.data.code === '0000') {
              self.$message({
                message: '新增站点成功',
                type: 'success'
              });
              self.dialogTableVisible = false;
            }
          })
          .catch((error) => {
            if (error) {
              self.$message({
                message: '新增维修点失败',
                type: 'danger'
              });
            }
          });
      };
      if (submitable) {
        insert();
      } else {
        self.$message({
          message: '表格不能为空',
          type: 'warning'
        });
      }
    },
    oneMoreCol() {
      const self = this;
      self.tableData.push({
        serName: '',
        serPassword: '',
        phone: '',
        serAddress: '',
        serLat: '',
        serLon: ''
      });
    },
    querySearchAsync(queryString, cb) {
      const self = this;
      const company = self.companys;
      const results = queryString ? company.filter(self.createStateFilter(queryString)) : company;
      results.map((item) => {
        const test = item;
        test.value = item.prjName;
        return test;
      });
      clearTimeout(self.timeout);
      self.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) { // 选择一个地址，放到地图中心点
      const self = this;
      self.centerPoint = item;
      self.prj.prjCode = item.prjCode;
      self.map.clearOverlays();
      const point = new window.BMap.Point(item.prjLon, item.prjLat);
      self.map.centerAndZoom(point, 13);
      self.addMarker(point, true);
    },
    closeDialog() {
      const self = this;
      self.tableData = [{}];
    }
  }
};
</script>
<style scoped>
  .box{
    width: 100%;
    height: 100%;
    position: relative;
  }
  #up {
    width: 90%;
    position: absolute;
    z-index: 100;
    margin-top: 10px;
    margin-left: 10%;
    text-align: center;
  }
  #left {
    width: 24%;
    min-width: 284px;
    /* height: 60%; */
    position: absolute;
    z-index: 100;
    float: left;
    background: rgba(255, 255, 255, 0);
    margin-top: 10%;
    opacity: 0.8;
  }
  #allmap {
    width: 100%;
    height: 100%;
  }
  .el-input__icon {
    color: lightskyblue;
  }
  .imgDiv {
    /* position: relative;
    height: 20px;
    border: 1px solid #000; */
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
  .limit8 {
    width: 100px;
    white-space: nowrap; /*不换行*/
    overflow: hidden; /*截去超长*/
    text-overflow: ellipsis; /*文末省略号*/
    top: 50%;
    left: 50%;
  }
  /* .el-table__body tr:hover > td {
    background-color: red;
  } */
  /* .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #212e3e !important;
  } */
  /* img {
    position: absolute;
    clip:rect(25px 21px 50px 0px);
    background-repeat: no-repeat;
  } */
</style>
