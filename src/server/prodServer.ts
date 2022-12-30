import http, { IncomingMessage, ServerResponse } from 'http';
import next from 'next';
import { NextUrlWithParsedQuery } from 'next/dist/server/request-meta';
import { parse } from 'url';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const allowCors =
  (fn: typeof handle) =>
  async (
    req: IncomingMessage,
    res: ServerResponse,
    parsedUrl?: NextUrlWithParsedQuery,
  ) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    );
    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      return;
    }
    return await fn(req, res, parsedUrl);
  };

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    const proto = req.headers['x-forwarded-proto'];
    if (proto && proto === 'http') {
      // redirect to ssl
      res.writeHead(303, {
        location: `https://${req.headers.host}${req.headers.url ?? ''}`,
      });
      res.end();
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const parsedUrl = parse(req.url!, true);
    allowCors(handle)(req, res, parsedUrl);
  });
  server.listen(port);

  // tslint:disable-next-line:no-console
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`,
  );
});
