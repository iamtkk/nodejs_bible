console.log(module);
console.log("require가 가장 위에 오지 않아도 됩니다.");

module.exports = "저를 찾아보세요.";

require("./var");

console.log("require.cache입니다.");
console.log("1 :", require.cache);
console.log("require.main입니다.");
console.log("2 :", require.main === module);
console.log(module);
console.log("3 :", require.main.filename);

// console.log(global);
