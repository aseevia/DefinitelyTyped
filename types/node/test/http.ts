import * as http from 'http';
import * as url from 'url';
import * as net from 'net';

// http Server
{
    const server: http.Server = new http.Server();

    // test public props
    const maxHeadersCount: number = server.maxHeadersCount;
    const timeout: number = server.timeout;
    const listening: boolean = server.listening;
    const keepAliveTimeout: number = server.keepAliveTimeout;
    server.setTimeout().setTimeout(1000).setTimeout(() => {}).setTimeout(100, () => {});
}

// http IncomingMessage
// http ServerResponse
{
    // incoming
    const incoming: http.IncomingMessage = new http.IncomingMessage(new net.Socket());

    incoming.setEncoding('utf8');

    // stream
    incoming.pause();
    incoming.resume();

    // response
    const res: http.ServerResponse = new http.ServerResponse(incoming);

    // test headers
    res.setHeader('Content-Type', 'text/plain');
    const bool: boolean = res.hasHeader('Content-Type');
    const headers: string[] = res.getHeaderNames();

    // trailers
    res.addTrailers([
        ['x-fOo', 'xOxOxOx'],
        ['x-foO', 'OxOxOxO'],
        ['X-fOo', 'xOxOxOx'],
        ['X-foO', 'OxOxOxO']
    ]);
    res.addTrailers({ 'x-foo': 'bar' });

    // writeHead
    res.writeHead(200, 'OK\r\nContent-Type: text/html\r\n');
    res.writeHead(200, { 'Transfer-Encoding': 'chunked' });
    res.writeHead(200);

    // write string
    res.write('Part of my res.');
    // write buffer
    const chunk = Buffer.alloc(16390, 'Й');
    res.write(chunk);
    res.write(chunk, 'hex');

    // end
    res.end("end msg");
    // without msg
    res.end();

    // flush
    res.flushHeaders();
}

// http ClientRequest
{
    let req: http.ClientRequest = new http.ClientRequest("https://www.google.com");
    req = new http.ClientRequest(new url.URL("https://www.google.com"));
    req = new http.ClientRequest({ path: 'http://0.0.0.0' });
    req = new http.ClientRequest({ setHost: false });

    // header
    req.setHeader('Content-Type', 'text/plain');
    const bool: boolean = req.hasHeader('Content-Type');
    const headers: string[] = req.getHeaderNames();
    req.removeHeader('Date');

    // write
    const chunk = Buffer.alloc(16390, 'Й');
    req.write(chunk);
    req.write('a');
    req.end();

    // abort
    req.abort();

    // connection
    req.connection.on('pause', () => { });

    // event
    req.on('data', () => { });
}

{
    // Status codes
    let codeMessage: string = http.STATUS_CODES['400']!;
    codeMessage = http.STATUS_CODES[400]!;
}

{
    let agent: http.Agent = new http.Agent({
        keepAlive: true,
        keepAliveMsecs: 10000,
        maxSockets: Infinity,
        maxFreeSockets: 256,
        timeout: 15000
    });

    agent = http.globalAgent;

    http.request({ agent: false });
    http.request({ agent });
    http.request({ agent: undefined });
}

{
    http.get('http://www.example.com/xyz');
    http.request('http://www.example.com/xyz');

    http.get('http://www.example.com/xyz', (res: http.IncomingMessage): void => {});
    http.request('http://www.example.com/xyz', (res: http.IncomingMessage): void => {});

    http.get(new url.URL('http://www.example.com/xyz'));
    http.request(new url.URL('http://www.example.com/xyz'));

    http.get(new url.URL('http://www.example.com/xyz'), (res: http.IncomingMessage): void => {});
    http.request(new url.URL('http://www.example.com/xyz'), (res: http.IncomingMessage): void => {});

    const opts: http.RequestOptions = {
        path: '"/some/path'
    };
    http.get(new url.URL('http://www.example.com'), opts);
    http.request(new url.URL('http://www.example.com'), opts);
    http.get(new url.URL('http://www.example.com/xyz'), opts, (res: http.IncomingMessage): void => {});
    http.request(new url.URL('http://www.example.com/xyz'), opts, (res: http.IncomingMessage): void => {});
}

{
    // Make sure .listen() and .close() return a Server instance
    http.createServer().listen(0).close().address();
    net.createServer().listen(0).close().address();
}

{
    const request = http.request({ path: 'http://0.0.0.0' });
    request.once('error', () => { });
    request.setNoDelay(true);
    request.abort();
}

// http request options
{
    const requestOpts: http.RequestOptions = {
        timeout: 30000
    };

    const clientArgs: http.ClientRequestArgs = {
        timeout: 30000
    };
}

// http headers
{
    const headers: http.IncomingHttpHeaders = {
        'content-type': 'application/json',
        'set-cookie': [ 'type=ninja', 'language=javascript' ]
    };
}

// statics
{
    const maxHeaderSize = http.maxHeaderSize;
}