const http = require("http");
const fs = require("fs").promises;
const path = require("path");

let users = {};

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      if (req.url === "/") {
        const data = await fs.readFile(path.join(__dirname, "restFront.html"));
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        return res.end(data);
      } else if (req.url === "/users") {
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8",
        });
        return res.end(JSON.stringify(users));
      }
      // /도 /users도 아니면
      try {
        const data = await fs.readFile(path.join(__dirname, req.url));
        return res.end(data);
      } catch (error) {
        console.error(error);
      }
    } else if (req.method === "POST") {
      if (req.url === "/user") {
        let body = "";
        req.on("data", (data) => {
          body += data;
        });
        return req.on("end", () => {
          const key = Date.now();
          users[key] = JSON.parse(body).name;
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end("등록 성공");
        });
      }
    } else if (req.method === "PUT") {
      if (req.url.startsWith("/user/")) {
        const key = req.url.split("/")[2];
        let body = "";
        req.on("data", (data) => {
          body += data;
        });
        return req.on("end", () => {
          users[key] = JSON.parse(body).name;
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          return res.end(JSON.stringify(users));
        });
      }
    } else if (req.method === "DELETE") {
      if (req.url.startsWith("/user/")) {
        const key = req.url.split("/")[2];
        delete users[key];
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8",
        });
        return res.end(JSON.stringify(users));
      }
    }
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("NOT FOUND");
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(err.message);
  }
});

server.listen(8080, () => {
  console.log("8080 포트로 리스닝 되었습니다.");
});
