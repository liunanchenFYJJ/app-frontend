<template>
    <div>discover
      <el-button @click="test">test</el-button>
    </div>
</template>

<script>
// import querystring from 'querystring'

export default {
  name: 'Discover',
  data() {
    return {

    };
  },
  created() {
    // const self = this;
    // 此处因为是异步操作，所以打印username的时候，test_ajax()还没有执行完成
    // const username = self.test_ajax();
    // console.log(username);
  },
  methods: {
    test() {
      const self = this;
      const testdata = { username: 'jj', password: '123456' };
      self.$axios({
        method: 'post',
        url: '/api/sys/login',
        // data: "username=jj&password=123456"
        data: testdata
      })
        .then((response) => {
          // console.log(response.data.data.username);
          return response.data.data.username;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    test_ajax() {
      const testdata = { username: 'jj', password: '123456' };
      window.$.post('/api/sys/login', testdata, (e) => {
        // console.log(e.data.username);
        return e.data.username;
      });
    }
  }
};
</script>

