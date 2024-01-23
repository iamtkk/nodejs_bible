const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const parseCookie = (cookie = "") =>
  cookie
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http
  .createServer((req, res) => {
    const cookies = parseCookie(req.headers.cookie);
    console.log(cookies);
    res.writeHead(200, { "set-cookie": "mycookie=test" });
    return res.end("Hello Cookie");
  })
  .listen(8080, () => {
    console.log("Listening 8080 Port");
  });
