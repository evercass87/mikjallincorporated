const http = require('http');
const url = require('url');

const layout = (title, content) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>${title} | Mikjáll Incorporated</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700;900&family=JetBrains+Mono&display=swap" rel="stylesheet">
    <style>
        :root { --bg: #0a0a0a; --header-bg: rgba(10, 10, 10, 0.98); --border: #222; --matrix: #00FF41; --text: #fff; --text-dim: #aaa; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        
        .top-utility { height: 40px; background: #000; display: flex; justify-content: flex-end; align-items: center; padding: 0 80px; gap: 25px; font-size: 10px; font-family: 'JetBrains Mono'; border-bottom: 1px solid var(--border); color: #444; }
        .top-utility span { cursor: pointer; transition: 0.3s; letter-spacing: 2px; }
        .top-utility span:hover, .top-utility span.active { color: var(--matrix); }

        .rss-ticker { height: 35px; background: #050505; border-bottom: 1px solid var(--border); display: flex; align-items: center; overflow: hidden; white-space: nowrap; }
        .ticker-label { background: var(--matrix); color: #000; font-size: 9px; font-weight: 900; padding: 0 20px; height: 100%; display: flex; align-items: center; letter-spacing: 2px; }
        .ticker-content { display: inline-block; animation: scroll-news 80s linear infinite; font-family: 'JetBrains Mono'; font-size: 11px; color: #777; }
        .ticker-content b { color: #fff; margin: 0 50px; }
        @keyframes scroll-news { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        nav { height: 80px; display: flex; justify-content: space-between; align-items: center; padding: 0 80px; border-bottom: 1px solid var(--border); background: var(--header-bg); position: sticky; top: 0; z-index: 1000; backdrop-filter: blur(10px); }
        .logo { font-size: 14px; font-weight: 900; letter-spacing: 12px; text-transform: uppercase; text-decoration: none; color: #fff; }
        .nav-links a { color: #666; text-decoration: none; font-size: 10px; font-weight: 700; letter-spacing: 3px; margin-left: 35px; text-transform: uppercase; }
        .nav-links a:hover { color: #fff; }

        .inc-header { display: grid; grid-template-columns: 1.2fr 1fr; align-items: center; padding: 100px 80px; border-bottom: 1px solid var(--border); background: #000; gap: 80px; }
        .logo-branding h1 { font-size: 26px; font-weight: 900; letter-spacing: 25px; text-transform: uppercase; margin-bottom: 15px; }
        .intel-summary { border-left: 1px solid var(--border); padding-left: 50px; }
        .summary-p { font-size: 17px; color: var(--text-dim); line-height: 1.8; }

        .services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border-bottom: 1px solid var(--border); }
        .s-card { background: #000; padding: 90px 50px; text-decoration: none; color: #fff; transition: 0.5s; }
        .s-card:hover { background: #0d0d0d; }
        .s-card h3 { font-size: 11px; font-weight: 900; letter-spacing: 5px; margin-bottom: 30px; text-transform: uppercase; color: #d4d4d4; }

        .infra-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); border-bottom: 1px solid var(--border); }
        .infra-item { background: #000; padding: 120px 80px; }
        .infra-item h2 { font-size: 11px; letter-spacing: 12px; color: #333; margin-bottom: 50px; text-transform: uppercase; }
        .pay-tag { border: 1px solid #333; padding: 25px 35px; font-size: 12px; font-weight: 900; display: inline-block; margin: 0 15px 15px 0; color: #fff; }
        .pay-tag.crypto { color: var(--matrix); border-color: #004415; }
        
        footer { padding: 100px 80px; background: #050505; border-top: 1px solid var(--border); text-align: center; color: #222; font-size: 10px; letter-spacing: 15px; }
    </style>
</head>
<body>
    <div class="top-utility">
        <span onclick="setLang('pt')">PT_BR</span>
        <span onclick="setLang('en')">EN_US</span>
        <span onclick="setLang('is')">IS_IS</span>
    </div>
    <div class="rss-ticker">
        <div class="ticker-label">INTEL_FEED</div>
        <div class="ticker-content" id="ticker">
            <b>[WORLD] Critical Zero-Day in Cloud Infrastructure mitigated.</b>
            <b>[MARKET] Monero (XMR) reaches new privacy liquidity heights.</b>
        </div>
    </div>
    <nav>
        <a href="/" class="logo">MIKJÁLL INC.</a>
        <div class="nav-links">
            <a href="/defesa" id="link-defesa">Defesa</a>
            <a href="/custodia" id="link-custodia">Cofre</a>
            <a href="/performance" id="link-performance">Performance</a>
            <a href="/assets" id="link-assets">Assets</a>
        </div>
    </nav>
    <main id="main-content">${content}</main>
    <footer id="footer">MIKJÁLL INCORPORATED // 2026</footer>

    <script>
        const translations = {
            pt: {
                defesa: "Defesa", custodia: "Cofre", performance: "Performance", assets: "Assets",
                strat_h: "// ESTRATÉGIA_GLOBAL",
                strat_p: "Operamos na intersecção da tecnologia ofensiva e gestão de patrimônio de alto escalão. Nossa missão é a soberania absoluta em um mundo de dados voláteis.",
                cyber_h: "Cyber Defense", cyber_p: "Monitoramento tático e inteligência ofensiva.",
                vault_h: "Asset Vault", vault_p: "Custódia soberana sob protocolos de isolamento absoluto.",
                perf_h: "High Performance", perf_p: "Otimização sistêmica de ativos biológicos.",
                music_h: "Asset Music", music_p: "Governança de propriedade intelectual global.",
                infra_h: "Liquidação_Soberana", arch_h: "Arch_Infrastructure"
            },
            en: {
                defesa: "Defense", custodia: "Vault", performance: "Performance", assets: "Assets",
                strat_h: "// GLOBAL_STRATEGY",
                strat_p: "We operate at the intersection of offensive technology and high-end asset management. Our mission is absolute sovereignty in a world of volatile data.",
                cyber_h: "Cyber Defense", cyber_p: "Tactical monitoring and offensive intelligence.",
                vault_h: "Asset Vault", vault_p: "Sovereign custody under absolute isolation protocols.",
                perf_h: "High Performance", perf_p: "Systemic optimization of biological assets.",
                music_h: "Asset Music", music_p: "Global intellectual property governance.",
                infra_h: "Sovereign_Liquidation", arch_h: "Arch_Infrastructure"
            },
            is: {
                defesa: "Vörn", custodia: "Hvelfing", performance: "Frammistaða", assets: "Eignir",
                strat_h: "// ALÞJÓÐLEG_STEFNUMÓTUN",
                strat_p: "Við starfnum á mótum sóknartækni og hágæða eignastýringar. Markmið okkar er algjör fullveldi í heimi sveiflukenndra gagna.",
                cyber_h: "Netvörn", cyber_p: "Taktísk vöktun og sóknarnjósnir.",
                vault_h: "Eignahvelfing", vault_p: "Fullvalda varsla undir algjörum einangrunarreglum.",
                perf_h: "Mikil Frammistaða", perf_p: "Kerfisbundin hagræðing líffræðilegra eigna.",
                music_h: "Tónlistareignir", music_p: "Alþjóðleg stjórnun hugverkaréttinda.",
                infra_h: "Fullvalda_Uppgjör", arch_h: "Arch_Innviðir"
            }
        };

        function setLang(lang) {
            const t = translations[lang];
            document.getElementById('link-defesa').innerText = t.defesa;
            document.getElementById('link-custodia').innerText = t.custodia;
            document.getElementById('link-performance').innerText = t.performance;
            document.getElementById('link-assets').innerText = t.assets;
            
            // Se estiver na home, traduz o corpo
            if(document.getElementById('strat-h')) {
                document.getElementById('strat-h').innerText = t.strat_h;
                document.getElementById('strat-p').innerText = t.strat_p;
                document.getElementById('cyber-h').innerText = t.cyber_h;
                document.getElementById('cyber-p').innerText = t.cyber_p;
                document.getElementById('vault-h').innerText = t.vault_h;
                document.getElementById('vault-p').innerText = t.vault_p;
                document.getElementById('perf-h').innerText = t.perf_h;
                document.getElementById('perf-p').innerText = t.perf_p;
                document.getElementById('music-h').innerText = t.music_h;
                document.getElementById('music-p').innerText = t.music_p;
                document.getElementById('infra-h').innerText = t.infra_h;
                document.getElementById('arch-h').innerText = t.arch_h;
            }
            
            document.querySelectorAll('.top-utility span').forEach(s => s.classList.remove('active'));
            event.target.classList.add('active');
        }
    </script>
</body>
</html>
`;

const homeContent = `
    <div class="inc-header">
        <div class="logo-branding"><h1>MIKJÁLL</h1><p style="color:#444; font-size:10px; letter-spacing:12px; font-weight:900;">INCORPORATED</p></div>
        <div class="intel-summary">
            <div class="summary-h" id="strat-h">// ESTRATÉGIA_GLOBAL</div>
            <div class="summary-p" id="strat-p">Operamos na intersecção da tecnologia ofensiva e gestão de patrimônio de alto escalão. Nossa missão é a soberania absoluta em um mundo de dados voláteis.</div>
        </div>
    </div>
    <section class="services-grid">
        <a href="/defesa" class="s-card"><h3 id="cyber-h">Cyber Defense</h3><p id="cyber-p" style="color:#666; font-size:15px;">Monitoramento tático e inteligência ofensiva.</p></a>
        <a href="/custodia" class="s-card"><h3 id="vault-h">Asset Vault</h3><p id="vault-p" style="color:#666; font-size:15px;">Custódia soberana sob protocolos de isolamento absoluto.</p></a>
        <a href="/performance" class="s-card"><h3 id="perf-h">High Performance</h3><p id="perf-p" style="color:#666; font-size:15px;">Otimização sistêmica de ativos biológicos.</p></a>
        <a href="/assets" class="s-card"><h3 id="music-h">Asset Music</h3><p id="music-p" style="color:#666; font-size:15px;">Governança de propriedade intelectual global.</p></a>
    </section>
    <section class="infra-grid">
        <div class="infra-item"><h2 id="infra-h">Liquidação_Soberana</h2>
            <div class="pay-tag crypto">MONERO (XMR)</div><div class="pay-tag crypto">BITCOIN (BTC)</div>
            <div class="pay-tag">CREDIT CARD</div><div class="pay-tag">WIRE TRANSFER</div>
        </div>
        <div class="infra-item"><h2 id="arch-h">Arch_Infrastructure</h2>
            <div class="s-data">NODE_BRAZIL_PA: <b>ONLINE // 12ms</b></div>
            <div class="s-data">NODE_ICELAND_RK: <b>ONLINE // 94ms</b></div>
            <div class="s-data">KERNEL_LAYER: <b>HARDENED_STABLE_V4</b></div>
        </div>
    </section>
`;

const server = http.createServer((req, res) => {
    const path = url.parse(req.url).pathname;
    const content = path === '/' ? homeContent : `<div class="internal"><h1>${path.substring(1).toUpperCase()}</h1><p>Dossiê em processamento...</p></div>`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(layout(path === '/' ? 'Home' : 'Dossiê', content));
}).listen(3000, () => console.log('\n[ MIKJALL INC ] - V38 MULTILÍNGUE ATIVA'));
