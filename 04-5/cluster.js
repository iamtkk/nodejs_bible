const cluster = require("cluster");
const http = require("http");
const cpuNums = require("os").cpus().length;

if (cluster.isPrimary) {
  console.log(`마스터 PID : ${process.pid}`);
  for (let i = 0; i < cpuNums; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`${worker.process.pid}가 종료되었습니다.`);
    console.log(`code : ${code}, signal : ${signal}`);
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("<h1>Hello Node</h1>");
      res.end("<h2>Hello server</h2>");
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    })
    .listen(8080, () => {
      console.log(`8080번 포트 리스닝 : ${process.pid}`);
    });
  console.log("워커 PID : ", process.pid);
}
