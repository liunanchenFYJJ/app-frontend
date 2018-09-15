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
            ></el-autocomplete>
          </el-form-item>
          <el-form-item v-show="false">
            <el-input clearable v-model="prj.prjCode" placeholder="请输入工程代码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getTopten">查询</el-button>
            <el-button type="info" @click="onCancel" icon="el-icon-circle-close"></el-button>
            <el-button type="primary" @click="dialogTableVisible = true">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- dialog -->
      <el-dialog title="新增维修点" :visible.sync="dialogTableVisible" @close='closeDialog'>
        <el-table :data="tableData">
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
          <el-button size="small" type="primary" icon="el-icon-circle-plus" @click="oneMoreCol"></el-button>
          <el-button size="small" type="primary" @click="insertvalue">提交</el-button>
        </span>
      </el-dialog>
      <div v-show="leftshow" id="left">
        <!-- <h3>最近维修点</h3> -->
        <el-table height="540px" :data="selectedPrj"
        :default-sort = "{prop: 'distance', order: 'ascending'}">
          <el-table-column
            prop="serName"
            label="维修点">
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
      companys: [ // 所有站点
        // {
        //   "prjCode": "PRJ_HkvlZ6_5M",
        //   "prjName": "清山会议中心（二期）",
        //   "cropCode": "QY_BykBSfIbQ",
        //   "prjLat": 31.334337,
        //   "prjLon": 120.433336
        // },
        // {
        //   "prjCode": "PRJ_ByJ9jKLFb",
        //   "prjName": "苏州普商仓储（中国国药B-3）",
        //   "cropCode": "QY_HkVMoFItW",
        //   "prjLat": 31.3567,
        //   "prjLon": 120.816519
        // }
      ],
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
      timeout:  null
    };
  },
  created() {
    const self = this;
    self.getAllPrj()
  },
  mounted() {
    const self = this;
    self.initMap()  // 初始化地图
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
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        offset: size
      }));
      self.map.setMapStyle({ style: 'midnight' });
    },
    getAllPrj() {
      const self = this;
      self.$axios({
        method: 'post',
        url: '/api/getAllPrj',
        data: {}
      })
        .then((response) => {
          self.companys = response.data.data;
          self.addMarkers();
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
    addMarkers() {
      const self = this;
      self.map.clearOverlays();  // 清除地图覆盖物
      let pointArr = [];
      self.companys.forEach((item) => {
        let point = new BMap.Point(item.prjLon, item.prjLat);
        pointArr.push(point);
        self.addMarker(point);
      })
      self.map.setViewport(pointArr); // 自适应屏幕
    },
    addMarker(point, bounce) {
      const self = this;
      let myIcon = new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
        scale: 1.4, // 图标缩放大小
        fillColor: "orange", // 填充颜色
        fillOpacity: 1 // 填充透明度
      })
      let marker = new BMap.Marker(point, { icon: myIcon });
      self.map.addOverlay(marker);
      if (bounce) {
        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
      }
      // self.map.setViewport([point]);
    },
    addSererMarker(point) { // 增加维修点
      const self = this;
      let marker = new BMap.Marker(point);
      self.map.addOverlay(marker);
      // self.map.setViewport([point]);
      // marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    },
    addMarkers1() {
      const self = this;
      // self.map.clearOverlays();  // 清除地图覆盖物
      let pointArr = [];
      self.selectedPrj.forEach((item) => {
        let point = new BMap.Point(item.serLon, item.serLat);
        pointArr.push(point);
        self.addSererMarker(point);
      })
      self.map.setViewport(pointArr); // 自适应屏幕
    },
    getTopten() {
      const self = this;
      if (self.prj.prjCode !== '') {
        self.$axios({
          method: 'post',
          url: 'api/getNearServices',
          data: { prjCode: self.prj.prjCode }
        })
          .then(function (response) {
            self.leftshow = true; // 左侧栏
            self.selectedPrj = response.data.data;
            // self.selectedPrj.forEach(item => {
            //   self.addSererMarker(new BMap.Point(item.serLon, item.serLat));
            // })
            self.addMarkers1();
          })
          .catch(function (error) {
            self.leftshow = false;
            self.$message({
              message: '请确认工程代码后重试',
              type: 'warning'
            });
          });
      } else {
        self.$message({
            message: '请填入工程名称',
          type: 'info'
        });      
      }
    },
    onCancel() { // 清空
      const self = this;
      self.leftshow = false;
      Object.keys(self.prj).forEach(key => self.prj[key] = '');
      // self.addMarkers(); // 回到原界面
    },
    insertvalue() {
      const self = this;
      // let submitable;
      // self.tableData.map((item) => {
      //   Object.values(item).filter((subItem) => {
      //     if (subItem === '') {
      //       return submitable = false;
      //     }
      //   });
      // })
      // if (submitable) {
      //   insert();
      // } else {
      //   self.$message({
      //     message: '表格不能为空',
      //     type: 'warning'
      //   });
      // }
      insert();
      function insert() {
        self.$axios({
          method: 'post',
          url: 'api/insertServices',
          data: {services: self.tableData}
          // url: 'api/insertService',
          // data: { ...self.tableData[0] }
        })
          .then(function (response) {
            if (response.data.code === '0000') {
              self.$message({
                message: '新增站点成功',
                type: 'success'
              });
              self.dialogTableVisible = false;
            }
          })
          .catch(function (error) {
            self.$message({
              message: 'error',
              type: 'warning'
            });
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
      })
    },
    querySearchAsync(queryString, cb) {
      const self = this;
      let company = self.companys;
      let results = queryString ? company.filter(self.createStateFilter(queryString)) : company;
      results.map(item => {
        return item.value = item.prjName;
      })
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
      self.prj.prjCode = item.prjCode;
      self.map.clearOverlays();
      const point = new BMap.Point(item.prjLon, item.prjLat);
      self.addMarker(point, true);
      self.map.centerAndZoom(point, 15);
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
    width: 20%;
    min-width: 200px;
    height: 100%;
    position: absolute;
    z-index: 100;
    float: left;
    background: rgba(255, 255, 255, 0);
    margin-top: 10%;
  }
  #allmap {
    width: 100%;
    height: 100%;
  }
</style>
