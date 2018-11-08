/**
 * Created by xuanjinliang on 2018/11/07.
 */

class Superclass {
  constructor(name = 'default') {
    this.name = name;
  }

  say() {
    console.log(123);
  }
}
class Subclass extends Superclass {
  constructor(age = 22, name) {
    super(name);
    this.age = age;
  }

  say() {
    console.log(`this.name=${this.name}...this.age=${this.age}`);
  }
}

const test = new Subclass(23);
Superclass.prototype.say();
console.log(`test instanceof Subclass`, test instanceof Subclass);
console.log(`test instanceof Superclass`, test instanceof Superclass);
console.log(test.__proto__.constructor);
console.log(Subclass.prototype.constructor);
