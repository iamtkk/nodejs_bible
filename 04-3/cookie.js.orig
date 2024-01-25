const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');
const path = require('path');

const parseCookie = (cookie = '') =>
  cookie
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http
  .createServer(async (req, res) => {
    const cookies = parseCookie(req.headers.cookie);
    if (req.url.startsWith('/login')) {
      console.log('req.url : ', req.url);
      console.log('url.parse(req.url) : ', url.parse(req.url));
      const { query } = url.parse(req.url);
      console.log('qs.parse(query) : ', qs.parse(query));
      const { name } = qs.parse(query);
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5);
      res.writeHead(302, {
        Location: '/',
        'Set-Cookie': `name=${encodeURIComponent(
          name
        )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
      });
      return res.end();
    } else if (cookies.name) {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`${cookies.name}님 안녕하세요`);
    } else {
      try {
        const data = await fs.readFile(path.join(__dirname, 'cookie2.html'));
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(error.message);
      }
    }
  })
  .listen(8080, () => {
    console.log('Listening 8080 Port');
  });
