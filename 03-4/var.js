const odd = "홀수입니다.";
const even = "짝수입니다.";

module.exports = {
  odd,
  even,
};

// exports.odd = "홀수입니다.";
// exports.even = "짝수입니다.";
// exports.add = "추가 값입니다.";

console.log(exports === module.exports);
console.log(exports);
console.log(module.exports);

// console.log(exports === module.exports);
// console.log(exports);
// console.log(module.exports);
// console.log(exports);
