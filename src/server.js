const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const lang = req.query.lang || 'pt';
    const logs = [`[${new Date().toLocaleTimeString()}] SCRAPER_INIT...`, `[${new Date().toLocaleTimeString()}] TUNNEL_ENCRYPTED`, `[${new Date().toLocaleTimeString()}] VAULT_SYNC: OK` ];
    const langData = JSON.parse(fs.readFileSync(path.join(__dirname, 'locales', 'lang.json'), 'utf8'));
    res.render('index', { t: langData[lang] || langData['pt'], logs: logs });
});

app.listen(3000, () => console.log('\n[ MIKJALL INC ] - ARSENAL ONLINE EM http://localhost:3000'));