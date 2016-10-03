class Test {
  constructor(a, b) {
    this._a = a;
    this._b = b;
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  let t = new Test(0,0);
  console.log('Hello world!');
});