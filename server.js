const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + (req.url === '/' ? '/index.html' : req.url);
    if (!path.extname(filePath)) filePath += '.html';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end("SETOR_NAO_LOCALIZADO");
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(content);
        }
    });
});

server.listen(3000, () => {
    console.log('\n=======================================');
    console.log('[ MIKJALL INC ] SISTEMA ONLINE');
    console.log('ENDERECO: http://localhost:3000');
    console.log('=======================================');
});
