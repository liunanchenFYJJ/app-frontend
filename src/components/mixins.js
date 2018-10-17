export const mixinsTest = {
  created() {
    const self = this;
    self.hello();
  },
  methods: {
    hello() {
      console.log('hello mixins!');
    }
  }
};

export const a = 'test';
