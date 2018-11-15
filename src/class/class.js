
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

console.log(p1 instanceof Object);
console.log(p1 instanceof Person);
console.log(p2 instanceof Object);
console.log(p2 instanceof Person);
console.log(p2.sayname == p1.sayname);
console.log(p2.name == p1.name);