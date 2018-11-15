
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
}

Person.prototype = {
  constructor: Person,
  sayname: function() {
    console.log(this.name)
  }
}

let p1 = new Person('jj', 44, 'dancer');
let p2 = new Person('jay', 22, 'actor');

console.log(p1.sayname == p2.sayname);