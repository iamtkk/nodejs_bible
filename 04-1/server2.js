const http = require("http");
const fs = require("fs").promises;

const server = http.createServer(async (req, res) => {
  try {
    const data = await fs.readFile("./server.html");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(data);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
    res.end(error.message);
  }
});

server.listen(8080);

server.on("listening", () => {
  console.log("서버가 8080번 포트로 리스닝 되었습니다.");
});
