<template>
  <div class="box">
    <div id="allmap" v-show="showMap"></div>
    <el-table :data="tableData" size="mini" max-height="370">
        <el-table-column property="serName" label="名称" width="300">
        <template slot-scope="scope">
            <el-input placeholder="维修点名称" v-model="scope.row.serName"></el-input>
        </template>
        </el-table-column>
        <el-table-column property="serPassword" label="密码">
        <template slot-scope="scope">
            <el-input placeholder="密码" v-model="scope.row.serPassword"></el-input>
        </template>
        </el-table-column>
        <el-table-column property="phone" label="手机号">
        <template slot-scope="scope">
            <el-input placeholder="联系电话" v-model="scope.row.phone"></el-input>
        </template>
        </el-table-column>
        <el-table-column property="serAddress" label="地址" width="300">
        <template slot-scope="scope">
            <el-input placeholder="维修点地址" v-model="scope.row.serAddress" @focus="fpoint(scope)"></el-input>
        </template>
        </el-table-column>
        <el-table-column property="serLat" label="纬度">
        <template slot-scope="scope">
            <el-input :disabled="true" placeholder="纬度" v-model="scope.row.serLat"></el-input>
        </template>
        </el-table-column>
        <el-table-column property="serLon" label="经度">
        <template slot-scope="scope">
            <el-input :disabled="true" placeholder="经度" v-model="scope.row.serLon"></el-input>
        </template>
        </el-table-column>
    </el-table>
    <span slot="footer" class="footer">
        <el-button size="small" @click="backto">返回</el-button>
        <el-button size="small" type="primary" @click="oneMoreCol">增加一行</el-button>
        <el-button size="small" type="primary" @click="insertvalue">提交</el-button>
    </span>
  </div>
</template>
<script>
export default {
  name: 'manage',
  data() {
    return {
      tableData: [],
      pushData: {
        serName: '',
        serPassword: '',
        phone: '',
        serAddress: '',
        serLat: '',
        serLon: ''
      },
      showMap: true,
      sindex: -1
    };
  },
  created() {
    const self = this;
    self.tableData.push(self.pushData);
  },
  mounted() {
    const self = this;
    self.initMap();
  },
  methods: {
    initMap() {
      const self = this;
      self.map = new window.BMap.Map('allmap'); // 创建Map实例
      // self.map.centerAndZoom(new window.BMap.Point(120.598736, 31.304552), 11); // 初始化地图,设置中心点坐标和地图级别
      self.map.centerAndZoom('苏州', 12);
      self.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
      const size = new window.BMap.Size(10, 10);
      const top_letf_navigation = new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_LEFT, type: window.BMAP_NAVIGATION_CONTROL_SMALL });
      self.map.addControl(new window.BMap.CityListControl({
        anchor: window.BMAP_ANCHOR_TOP_RIGHT,
        offset: size
      }));
      self.map.addControl(top_letf_navigation);
      self.map.setMapStyle({ style: 'midnight' });
      self.map.addEventListener('click', self.showInfo);
    },
    showInfo(e) {
      const self = this;
      const i = self.sindex;
      self.tableData.map((item, index) => {
        const titem = item;
        if (index === i) {
          titem.serLat = e.point.lat;
          titem.serLon = e.point.lng;
        }
        return titem;
      });
    },
    fpoint(scope) {
      const self = this;
      self.sindex = scope.$index;
    },
    jumpto() {
      const self = this;
      self.$router.push({ path: 'manage' });
    },
    backto() {
      const self = this;
      self.$router.push({ path: 'map' });
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
      const insert = function insertValue() {
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
              self.backto();
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
      self.pushData = {};
      self.tableData.push({
        serName: '',
        serPassword: '',
        phone: '',
        serAddress: '',
        serLat: '',
        serLon: ''
      });
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
    width: 98%;
    height: 100%;
    padding: 1%;
  }
  #allmap {
    width: 100%;
    height: 40%;
  }
  .footer {
    position: fixed;
    bottom: 20px;
  }
</style>
