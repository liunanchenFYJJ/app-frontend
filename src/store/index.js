import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0
  },
  getters: {

  },
  mutations: {
    increment(state) {
      state.count += 1;
    },
    decrement(state, pace) {
      state.count -= pace;
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment');
    },
    decrement(context, payload) {
      context.commit('decrement', payload);
    }
  }
});

export default store;
