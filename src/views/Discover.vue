<template>
    <div>discover
      <el-button @click="test">test</el-button>
    </div>
</template>

<script>
// import querystring from 'querystring'

export default {
  data() {
    return {

    };
  },
  created() {
    // const self = this;
    // self.test();
  },
  methods: {
    test() {
      console.log('sd');
      const self = this;
      const testdata = { username: 'jj', password: '123456' };
      self.$axios({
        method: 'post',
        url: '/api/sys/login',
        // data: "username=jj&password=123456"
        data: testdata
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>

