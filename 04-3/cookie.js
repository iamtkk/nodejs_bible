const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const cookieParser = (cookie = "") =>
  cookie
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http
  .createServer(async (req, res) => {
    const cookies = cookieParser(req.headers.cookie);
    console.log("cookies : ", cookies);
    if (req.url.startsWith("/login")) {
      const url = new URL(req.url, "http://localhost:8080");
      console.log("url : ", url);
      const name = url.searchParams.get("name");
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5);
      res.writeHead(302, {
        location: "/",
        "set-cookie": `name=${encodeURIComponent(
          name
        )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
      });
      return res.end();
    } else if (cookies && cookies.name) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(`${cookies.name}님 안녕하세요.`);
    } else {
      try {
        const data = await fs.readFile(path.join(__dirname, "cookie2.html"));
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        return res.end(data);
      } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end(error.message);
      }
    }
  })
  .listen(8080, () => {
    console.log("8080번 포트에서 서버 대기 중입니다.");
  });
