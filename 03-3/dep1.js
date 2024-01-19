const dep2_exports = require('./dep2');
console.log('require dep2_exports', dep2_exports);
module.exports = () => {
  console.log('dep2_exports', dep2_exports);
};
