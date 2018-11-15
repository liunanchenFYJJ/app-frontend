export default function Map() {
  this.map = {}; // 无参
}

Map.prototype = {
  constructor: Map,

  get(key) {
    // if (this.map[key] || this.map[key] === 0 || this.map[key] === false) {
    return this.map[key];
    // } else {
    //   return null;
    // }
  },

  set(key, value) {
    this.map[key] = value;
  },

  remove(key) {
    delete this.map[key];
  },

  size() {
    let count = 0;
    for (const key in this.map) {
      if (key) {
        count += 1;
      }
    }
    return count;
  },

  each(fn) {
    for (const key in this.map) {
      if (key) {
        fn(key, this.map[key]);
      }
    }
  }

};

// let testmap = new Map();
// testmap.set("name", "hh");
// testmap.set("name", "lla");
// testmap.set("age", 0);
// // testmap.remove('name');
// console.log(testmap.get("name"));
// testmap.each(function(k,v) {
//   console.log(`${k}-${v}`);
// })

// // console.log(testmap instanceof Map);
// let testmap1 = new Map();
// testmap.get();
// console.log(testmap.get == testmap1.get); // no good
