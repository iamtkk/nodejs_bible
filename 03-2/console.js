const string = 'abc';
const number = 1;
const boolean = true;
// prettier-ignore
const json = '{"key" : "value"}';
console.log('json : ', typeof json);

const obj = {
  outside: {
    inside: {
      key: 'value',
    },
  },
};
console.log('obj: ', typeof obj);

console.time('전체 시간');
console.log('평범한 로그');
console.log(string, number, boolean);
console.error('에러 메시지는 console.error에 담아주세요');

console.table([
  { name: '태관', birth: 1982 },
  { name: 'hero', birth: 1988 },
]);

console.dir(obj, { color: false, depth: 2 });
console.dir(obj, { color: true, depth: 1 });

console.time('시간 측정');
for (let i = 0; i < 100000; i++) {}
console.timeEnd('시간 측정');

function b() {
  console.trace('에러 위치 추적');
}

function a() {
  b();
}
a();
console.timeEnd('전체 시간');
