const dep1_exports = require('./dep1');
console.log('require dep1_exports', dep1_exports);
module.exports = () => {
  console.log('dep1_exports', dep1_exports);
};
