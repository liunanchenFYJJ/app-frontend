<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button type="primary" @click="query">request</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: ''
    };
  },
  methods: {
    query() {
      const self = this;
      self.$axios.get('/api/v2/movie/top250')
        .then((response) => {
          self.msg = response.data.title;
        })
        .catch((response) => {
          self.msg = response;
          // console.log(response);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
