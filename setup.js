const fs = require('fs');

const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Mikjáll Incorporated | Global Sovereign Infrastructure</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700;900&family=JetBrains+Mono&display=swap" rel="stylesheet">
    <style>
        :root { --bg: #000; --border: #151515; --text: #fff; --green: #00FF41; --red: #ff3e3e; --dim: #444; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body { background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; overflow-x: hidden; }

        nav { height: 100px; display: flex; justify-content: space-between; align-items: center; padding: 0 80px; border-bottom: 1px solid var(--border); background: #000; position: sticky; top: 0; z-index: 1000; }
        .logo { font-size: 16px; font-weight: 900; letter-spacing: 15px; text-transform: uppercase; }
        .nav-links { display: flex; gap: 40px; font-size: 10px; font-weight: 700; letter-spacing: 4px; color: var(--dim); }

        .presentation-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 1px; background: var(--border); border-bottom: 1px solid var(--border); }
        .carousel { height: 550px; position: relative; overflow: hidden; background: #050505; display: flex; align-items: center; }
        .slide { position: absolute; width: 100%; height: 100%; opacity: 0; transition: 1.5s; background-size: cover; background-position: center; display: flex; align-items: center; padding: 80px; }
        .slide.active { opacity: 1; }
        .slide::after { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, #000 30%, transparent 100%); }
        .slide h1 { font-size: 5rem; font-weight: 100; letter-spacing: -4px; line-height: 0.9; position: relative; z-index: 10; }

        .news-sidebar { background: #020202; padding: 60px; }
        .news-header { font-size: 9px; font-weight: 900; letter-spacing: 5px; color: #1a1a1a; margin-bottom: 40px; text-transform: uppercase; }
        .news-item { border-left: 1px solid #111; padding-left: 25px; margin-bottom: 35px; }
        .news-item b { font-family: 'JetBrains Mono'; font-size: 10px; color: var(--green); display: block; margin-bottom: 10px; }
        .news-item p { font-size: 14px; color: #777; line-height: 1.6; }

        .war-map { height: 600px; background: #080808; position: relative; border-bottom: 1px solid var(--border); }
        .map-label { position: absolute; top: 50px; left: 80px; z-index: 10; font-size: 10px; letter-spacing: 10px; color: #222; font-weight: 900; }
        canvas#mapCanvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.9; }

        .server-section { padding: 100px 80px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; border-bottom: 1px solid var(--border); }
        .server-card { border: 1px solid var(--border); padding: 40px; background: #030303; }
        .server-card h4 { font-family: 'JetBrains Mono'; font-size: 10px; color: #222; letter-spacing: 3px; margin-bottom: 20px; }
        .stat-row { display: flex; justify-content: space-between; font-size: 11px; font-family: 'JetBrains Mono'; color: #555; margin-bottom: 10px; }
        .stat-row b { color: var(--green); }

        .payment-gate { padding: 120px 80px; background: #000; border-bottom: 1px solid var(--border); display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .pay-info h2 { font-size: 3.5rem; font-weight: 100; margin-bottom: 30px; }
        .m-box { border: 1px solid var(--border); padding: 25px; font-size: 11px; font-weight: 900; letter-spacing: 5px; display: inline-block; margin-right: 20px; }

        .products-grid { display: grid; grid-template-columns: repeat(4, 1fr); background: var(--border); gap: 1px; }
        .product-card { background: #000; padding: 80px 50px; color: #fff; text-decoration: none; }
        .product-card h3 { font-size: 11px; font-weight: 900; letter-spacing: 5px; margin-bottom: 30px; }

        footer { padding: 100px 80px; text-align: center; border-top: 1px solid var(--border); font-size: 10px; letter-spacing: 15px; color: #0a0a0a; font-weight: 900; }
    </style>
</head>
<body>
    <nav>
        <div class="logo">MIKJÁLL <span style="opacity:0.2">INC.</span></div>
        <div class="nav-links"><span>DEFESA</span><span>CUSTÓDIA</span><span>HOLDING</span></div>
    </nav>
    <main>
        <section class="presentation-grid">
            <div class="carousel" id="carousel">
                <div class="slide active" style="background-image: url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200')">
                    <div style="position:relative; z-index:10"><h1>Soberania Digital.</h1></div>
                </div>
                <div class="slide" style="background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200')">
                    <div style="position:relative; z-index:10"><h1>Arsenal de Inteligência.</h1></div>
                </div>
            </div>
            <div class="news-sidebar">
                <div class="news-header">Cyber_Intel_Stream</div>
                <div class="news-item"><b>17:40 // LIVE</b><p>Defesa ativa no nó de Porto Alegre. Protocolo V-Nexo operacional.</p></div>
                <div class="news-item"><b>17:20 // VAULT</b><p>Sincronização concluída com o Cofre de Reykjavík.</p></div>
            </div>
        </section>
        <section class="war-map">
            <div class="map-label">V-NEXO // GLOBAL_WAR_MAP</div>
            <canvas id="mapCanvas"></canvas>
        </section>
        <section class="server-section">
            <div class="server-card"><h4>NODE_BRAZIL_PA</h4><div class="stat-row">STATUS: <b>ONLINE</b></div><div class="stat-row">LATENCY: <b>12ms</b></div></div>
            <div class="server-card"><h4>NODE_ICELAND_RK</h4><div class="stat-row">STATUS: <b>ONLINE</b></div><div class="stat-row">LATENCY: <b>94ms</b></div></div>
            <div class="server-card"><h4>NODE_RUSSIA_MS</h4><div class="stat-row">STATUS: <b>ENCRYPTED</b></div><div class="stat-row">LATENCY: <b>108ms</b></div></div>
        </section>
        <section class="payment-gate">
            <div class="pay-info">
                <h2>Pagamento Soberano.</h2>
                <p style="color:#555; font-size:18px; line-height:1.8; margin-bottom:40px">Garantimos anonimato total via liquidação em ativos descentralizados.</p>
                <div class="m-box">BITCOIN</div><div class="m-box" style="color:var(--green)">MONERO (XMR)</div>
            </div>
        </section>
        <section class="products-grid">
            <div class="product-card"><h3>AMERICAN DOG SEC</h3><p style="color:#444">Defesa ofensiva.</p></div>
            <div class="product-card"><h3>WIFEMARKED VAULT</h3><p style="color:#444">Custódia soberana.</p></div>
            <div class="product-card"><h3>MIKJALL SPORTS</h3><p style="color:#444">Performance biológica.</p></div>
            <div class="product-card"><h3>MIKJALL MUSIC</h3><p style="color:#444">Ativos culturais.</p></div>
        </section>
    </main>
    <footer>MIKJÁLL INCORPORATED // 2026</footer>
    <script>
        let cur = 0; const slides = document.querySelectorAll('.slide');
        setInterval(() => { slides[cur].classList.remove('active'); cur = (cur + 1) % slides.length; slides[cur].classList.add('active'); }, 5000);
        const canvas = document.getElementById('mapCanvas'); const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth; canvas.height = 600;
        const pts = [{x:0.3, y:0.7}, {x:0.45, y:0.2}, {x:0.65, y:0.3}];
        let atks = [];
        function draw() {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            pts.forEach(p => { ctx.fillStyle = '#fff'; ctx.shadowBlur = 20; ctx.shadowColor = '#fff'; ctx.beginPath(); ctx.arc(canvas.width*p.x, canvas.height*p.y, 5, 0, Math.PI*2); ctx.fill(); });
            if(Math.random() < 0.05) { const t = pts[Math.floor(Math.random()*pts.length)]; atks.push({x: Math.random()*canvas.width, y:0, tx: canvas.width*t.x, ty: canvas.height*t.y, p:0}); }
            atks.forEach((a, i) => { a.p += 0.01; const cx = a.x + (a.tx - a.x) * a.p; const cy = a.y + (a.ty - a.y) * a.p; ctx.strokeStyle = 'rgba(255, 62, 62, '+(1-a.p)+')'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(cx, cy); ctx.stroke(); if(a.p >= 1) atks.splice(i, 1); });
            requestAnimationFrame(draw);
        } draw();
    </script>
</body>
</html>
\`;

const serverCode = \`const http = require('http'); const html = \\\`\\\` + htmlContent + \\\`\\\`; http.createServer((req, res) => { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(html); }).listen(3000, () => console.log('SYSTEM_ONLINE: http://localhost:3000'));\`;
fs.writeFileSync('server.js', serverCode);
console.log('CONSTRUCTION_COMPLETE');