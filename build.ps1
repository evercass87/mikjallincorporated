# INICIALIZAÇÃO DA HOLDING POR GEMINI GESTOR DE ELITE
Write-Host "[ MIKJALL INC ] - ASSUMINDO AGÊNCIALIDADE TOTAL..." -ForegroundColor Cyan

# LIMPEZA DE SEGURANÇA
if (Test-Path src) { Remove-Item -Recurse -Force src }
$folders = "src", "src/views", "src/public", "src/public/css", "src/locales"
foreach ($f in $folders) { New-Item -ItemType Directory -Path $f -Force }

# 1. BANCO DE DADOS DE IDIOMAS (UTF8 PURO)
$lang = @'
{
  "pt": { "title": "PENTEST OFFENSIVE", "vault": "THE VAULT ACCESS", "arch": "SISTEMA: ARCH LINUX HARDENED" },
  "ru": { "title": "НАСТУПАТЕЛЬНЫЙ ПЕНТЕСТ", "vault": "ДОСТУП К ХРАНИЛИЩУ", "arch": "СИСТЕМА: ARCH LINUX" },
  "is": { "title": "SÓKNARÖRYGGI", "vault": "EIGNARHVELFING", "arch": "KERFI: ARCH LINUX" },
  "sl": { "title": "OFENZIVNI PENTEST", "vault": "DOSTOP DO TREZORJA", "arch": "SISTEM: ARCH LINUX" }
}
'@
[System.IO.File]::WriteAllText((Get-Item .).FullName + "/src/locales/lang.json", $lang)

# 2. BACKEND EMPRESARIAL (SERVER.JS)
$server = @'
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const app = express();
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const logs = ["[BLACKARCH] Repositories Sync", "[SCRAPER] Automated OSINT Active", "[VAULT] AES-256 Multi-layer", "[INFRA] Node.js v22/Arch Linux"];
app.get('/', (req, res) => {
    const lang = req.query.lang || 'pt';
    let data = fs.readFileSync(path.join(__dirname, 'locales', 'lang.json'), 'utf8').replace(/^\uFEFF/, '');
    res.render('index', { t: JSON.parse(data)[lang] || JSON.parse(data)['pt'], logs });
});
app.listen(3000, () => console.log('\n[ MIKJALL INC ] - INFRAESTRUTURA ONLINE EM http://localhost:3000'));
'@
[System.IO.File]::WriteAllText((Get-Item .).FullName + "/src/server.js", $server)

# 3. VITRINE DE 100 MILHÕES (INDEX.EJS + CSS EMBEDDED PARA AGILIDADE)
$view = @'
<!DOCTYPE html>
<html>
<head>
    <title>Mikjáll Inc | Cybersec & Vault</title>
    <style>
        body { background: #000; color: #C0C0C0; font-family: 'Courier New', monospace; margin: 0; overflow: hidden; }
        .scanline { position: fixed; top: 0; width: 100%; height: 100%; background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.1) 50%); background-size: 100% 4px; pointer-events: none; z-index: 100; }
        header { padding: 30px; border-bottom: 1px solid #1A1A1A; display: flex; justify-content: space-between; }
        .logo { font-weight: bold; letter-spacing: 5px; color: #fff; text-shadow: 0 0 10px #fff; }
        .main { display: flex; height: 80vh; }
        .sidebar { width: 250px; border-right: 1px solid #1A1A1A; padding: 30px; font-size: 0.7rem; }
        .content { flex: 1; padding: 100px; text-align: center; }
        .terminal { background: #050505; border: 1px solid #1A1A1A; padding: 20px; text-align: left; color: #00FF41; font-size: 0.8rem; width: 70%; margin: 30px auto; }
        .vault-btn { border: 1px solid #fff; padding: 15px 40px; background: transparent; color: #fff; cursor: pointer; letter-spacing: 5px; font-weight: bold; transition: 0.5s; }
        .vault-btn:hover { background: #fff; color: #000; box-shadow: 0 0 20px #fff; }
        footer { position: fixed; bottom: 0; width: 100%; padding: 20px; border-top: 1px solid #1A1A1A; font-size: 0.6rem; text-align: center; opacity: 0.4; letter-spacing: 3px; }
    </style>
</head>
<body>
    <div class="scanline"></div>
    <header>
        <div class="logo">MIKJÁLL INC.</div>
        <div style="font-size:0.7rem"><a href="?lang=pt" style="color:#555">PT</a> | <a href="?lang=is" style="color:#555">IS</a> | <a href="?lang=ru" style="color:#555">RU</a></div>
    </header>
    <div class="main">
        <div class="sidebar">
            <p>> PENTEST_OFFENSIVE</p><p>> DATA_SCRAPER</p><p>> OSINT_AUTOMATION</p><p>> CRYPTO_GATEWAY</p>
        </div>
        <div class="content">
            <h1 style="font-size: 3.5rem; letter-spacing: 15px; color: #fff;"><%= t.title %></h1>
            <p style="opacity:0.5"><%= t.arch %></p>
            <button class="vault-btn"><%= t.vault %></button>
            <div class="terminal">
                <% logs.forEach(log => { %><p><%= log %></p><% }) %>
                <p>> STATUS: MIKJALL HOLDING SECURE</p>
            </div>
        </div>
    </div>
    <footer>AMERICAN DOG SEC // WIFEMARKED // MIKJALL SPORTS // MIKJALL MUSIC</footer>
</body>
</html>
'@
[System.IO.File]::WriteAllText((Get-Item .).FullName + "/src/views/index.ejs", $view)

Write-Host "[ OK ] - HOLDING CONSTRUIDA. ACESSE: http://localhost:3000" -ForegroundColor Green
node src/server.js