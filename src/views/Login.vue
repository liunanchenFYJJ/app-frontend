<template>
    <div>
      <nav-header>注册/登陆</nav-header>
      <el-row :gutter="40">
        <el-col :span="20" :offset="2">
          <el-input autofocus="true" v-model="phonenum" placeholder="手机号">
            <span slot="suffix">获取验证码</span>
          </el-input>
          <el-input type="password" v-model="password" placeholder="验证码"></el-input>
          <el-row style="margin-top: 10px;">
            <el-col :span="12">
              <input @click="admin" type="radio" name="user" id=""><label>admin</label>
            </el-col>
            <el-col :span="12">
              <input @click="user" type="radio" name="user" id=""><label>user</label>
            </el-col>
          </el-row>
          <button @click="login">登陆</button>
        </el-col>
      </el-row>
    </div>
</template>
<script>
export default {
  data() {
    return {
      phonenum: '',
      password: ''
    };
  },
  methods: {
    getcode() {
      console.log('sd');
    },
    admin() {
      const self = this;
      self.phonenum = 'admin';
      self.password = '123456';
    },
    user() {
      const self = this;
      self.phonenum = 'user';
      self.password = '123456';
    },
    login() {
      const self = this;
      // cookie 过期时间？
      console.log(self.$route);
      document.cookie = `auth=${self.phonenum}`;
      // self.$router.push({ name: 'Order' });
      self.$router.push(self.$route.query.redirect || '/'); // 登陆后回到刚刚想要访问的页面
    }
  }
};
</script>
<style>
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
    margin-bottom: 0;
  } */
}
.el-input {
  margin-top: 20px;
}
.el-input__suffix {
  margin-top: 10px;
  z-index: 200;
}
button {
  width: 100%;
  height: 3.2em;
  color: white;
  background-color: rgb(114, 205, 110);
  margin-top: 30px;
  border: none;
  border-radius: 5px;
}
</style>
