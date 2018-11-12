import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 1
  },
  getters: {

  },
  mutations: {
    increment(state) {
      state.count += 1;
    }
  },
  actions: {
    
  }
});

export default store;
