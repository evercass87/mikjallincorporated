const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let url = req.url === '/' ? '/index.html' : req.url;
    if (!url.includes('.')) url += '.html';
    
    const filePath = path.join(__dirname, url);
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end("Ativo Mikjáll não encontrado.");
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(content);
        }
    });
});

server.listen(3000, () => console.log('Motor Palantir Ativo: http://localhost:3000'));
