import os from "os";

console.log("운영체제 정보---------------------");
console.log("os.arch():", os.arch()); // process.arch와 동일
console.log("os.platform():", os.platform()); // process.platform과 동일
console.log("os.type():", os.type()); // 운영체제의 종류
