const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let url = req.url;
    
    // Tratamento de Rota Raiz
    if (url === '/' || url === '/index') {
        url = '/index.html';
    }

    // Lógica Sniper: Tenta encontrar o arquivo original ou com .html
    let filePath = path.join(__dirname, url);
    if (!fs.existsSync(filePath) && !url.includes('.')) {
        filePath += '.html';
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            console.log('Erro ao acessar:', url);
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end("404: Ativo Mikjáll não encontrado. Verifique a URL.");
        } else {
            // Identificação automática de tipo de arquivo
            const ext = path.extname(filePath);
            const contentType = ext === '.html' ? 'text/html; charset=utf-8' : 'text/plain';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('\n[ MIKJALL INC ]');
    console.log('MOTOR V44 RECALIBRADO');
    console.log('HOME: http://localhost:3000');
    console.log('DEFESA: http://localhost:3000/defesa');
});
