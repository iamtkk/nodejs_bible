console.log(this);
console.log(this === module.exports);
console.log(this === exports);

function whatIsThis() {
  console.log("function", this === exports, this === global);
}
// 함수안에서의 this는 global이다.
whatIsThis();
