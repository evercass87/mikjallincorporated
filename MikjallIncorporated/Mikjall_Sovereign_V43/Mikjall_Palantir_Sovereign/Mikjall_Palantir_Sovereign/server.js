const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let url = req.url === '/' ? '/index.html' : req.url;
    if (!url.includes('.')) url += '.html';
    
    const filePath = path.join(__dirname, url);
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end("Ativo Mikjáll não encontrado no setor solicitado.");
        } else {
            const ext = path.extname(filePath);
            const contentType = ext === '.html' ? 'text/html' : 'text/plain';
            res.writeHead(200, { 'Content-Type': contentType + '; charset=utf-8' });
            res.end(content);
        }
    });
});

server.listen(3000, () => console.log('\n[ MIKJALL INC ] REDE ONLINE: http://localhost:3000'));
