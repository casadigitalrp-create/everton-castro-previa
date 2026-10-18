// Gera as imagens PROVISÓRIAS do site: mármore claro com veios dourados e cenas inspiradas na Grécia clássica.
// Saída: src/assets/fundos/*.jpg e public/marmore-a.jpg (textura), public/og.jpg.
// Quando as imagens finais forem geradas (veja docs/prompts-imagens.md), basta salvar por cima, com os mesmos nomes.
// Uso: node scripts/gerar-imagens.mjs
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const raiz = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const pastaFundos = path.join(raiz, "src", "assets", "fundos");
const pastaPublic = path.join(raiz, "public");
const W = 2200;
const H = 1228;

// ---------- Mármore: nuvens suaves + veios dourados e cinza desenhados como curvas contínuas ----------
const rng = (semente) => () => {
  semente |= 0;
  semente = (semente + 0x6d2b79f5) | 0;
  let t = Math.imul(semente ^ (semente >>> 15), 1 | semente);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

function caminhoSuave(pontos) {
  let d = `M${pontos[0][0].toFixed(1)} ${pontos[0][1].toFixed(1)}`;
  for (let i = 1; i < pontos.length - 1; i++) {
    const mx = (pontos[i][0] + pontos[i + 1][0]) / 2;
    const my = (pontos[i][1] + pontos[i + 1][1]) / 2;
    d += ` Q${pontos[i][0].toFixed(1)} ${pontos[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  return d;
}

function veios(R, largura, altura, quantidade) {
  const caminhar = (x, y, ang, passos, passo, deriva) => {
    const pts = [[x, y]];
    let a = ang;
    let da = 0;
    for (let i = 0; i < passos; i++) {
      da += (R() - 0.5) * deriva;
      da *= 0.8;
      a += da;
      x += Math.cos(a) * passo;
      y += Math.sin(a) * passo;
      pts.push([x, y]);
    }
    return pts;
  };
  const angulos = [-0.5, -0.38, -0.62, 0.45];
  let svg = "";
  for (let k = 0; k < quantidade; k++) {
    const principal = k < 3;
    const ouro = k % 2 === 0;
    const cor = ouro ? "#b8893a" : "#8d877c";
    const larg = principal ? 2.3 : 1.15;
    const ang = angulos[k % angulos.length] + (R() - 0.5) * 0.35;
    const p = caminhar(R() * largura * 0.7 - 120, R() * altura, ang, 36, 62, 0.42);
    svg += `<path d="${caminhoSuave(p)}" fill="none" stroke="${cor}" stroke-width="${larg * 5}" opacity="0.1" stroke-linecap="round" filter="url(#macio)"/>`;
    svg += `<path d="${caminhoSuave(p)}" fill="none" stroke="${cor}" stroke-width="${larg}" opacity="${ouro ? 0.78 : 0.5}" stroke-linecap="round"/>`;
    for (let b = 0; b < (principal ? 6 : 3); b++) {
      const i = 3 + Math.floor(R() * (p.length - 8));
      const lado = R() > 0.5 ? 1 : -1;
      const q = caminhar(
        p[i][0],
        p[i][1],
        ang + lado * (0.5 + R() * 0.6),
        8 + Math.floor(R() * 8),
        38,
        0.6,
      );
      svg += `<path d="${caminhoSuave(q)}" fill="none" stroke="${cor}" stroke-width="${larg * 0.55}" opacity="${ouro ? 0.6 : 0.38}" stroke-linecap="round"/>`;
    }
  }
  return svg;
}

async function marmore(largura, altura, semente, quantidade = 7) {
  const M = 200;
  const BW = largura + 2 * M;
  const BH = altura + 2 * M;
  const R = rng(semente);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${BW}" height="${BH}" viewBox="0 0 ${BW} ${BH}">
<defs>
  <filter id="nuvem" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.0022 0.0035" numOctaves="4" seed="${semente}"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.64  0 0 0 0 0.60  0 0 0 0 0.55  0 0 0 -2.2 1.25"/>
  </filter>
  <filter id="macio" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="7"/></filter>
  <filter id="tremor" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="3" seed="${semente + 2}" result="t"/>
    <feDisplacementMap in="SourceGraphic" in2="t" scale="26" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</defs>
<rect width="${BW}" height="${BH}" fill="#f8f5ee"/>
<rect width="${BW}" height="${BH}" filter="url(#nuvem)" opacity="0.5"/>
<g filter="url(#tremor)">${veios(R, BW, BH, quantidade)}</g>
</svg>`;
  return sharp(Buffer.from(svg))
    .extract({ left: M, top: M, width: largura, height: altura })
    .png()
    .toBuffer();
}

// ---------- Elementos de cena ----------
const defs = `
<defs>
  <linearGradient id="fuste" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset="0.45" stop-color="#f3eee2"/><stop offset="1" stop-color="#cfc6b2"/></linearGradient>
  <linearGradient id="pedra" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffdf8"/><stop offset="1" stop-color="#ddd3bd"/></linearGradient>
  <linearGradient id="ouro" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1dca6"/><stop offset="0.5" stop-color="#c9a04a"/><stop offset="1" stop-color="#a87c2c"/></linearGradient>
  <radialGradient id="luz" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff3cf" stop-opacity="0.85"/><stop offset="1" stop-color="#fff3cf" stop-opacity="0"/></radialGradient>
  <filter id="sombra" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="10" dy="22" stdDeviation="18" flood-color="#6b5a35" flood-opacity="0.28"/></filter>
  <pattern id="meandro" width="36" height="18" patternUnits="userSpaceOnUse"><path d="M0 15H36M30 15V3H6V11H22V7H14" fill="none" stroke="#b8893a" stroke-width="2.2" stroke-linecap="square"/></pattern>
</defs>`;

const cena = (corpo, largura = W, altura = H) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${largura}" height="${altura}" viewBox="0 0 ${largura} ${altura}">${defs}${corpo}</svg>`;

const folha = (x, y, ang, tam = 1) =>
  `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(15 * tam).toFixed(1)}" ry="${(36 * tam).toFixed(1)}" transform="rotate(${ang.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="url(#ouro)" opacity="0.95"/>`;

function louro(cx, cy, raio, folhas = 15, abertura = 0.42, arco = true) {
  let s = "";
  for (let lado = -1; lado <= 1; lado += 2) {
    for (let i = 0; i < folhas; i++) {
      const t = i / (folhas - 1);
      const a = Math.PI / 2 + lado * (abertura + t * (Math.PI - abertura * 1.1));
      const x = cx + Math.cos(a) * raio;
      const y = cy + Math.sin(a) * raio;
      const tangente = (a * 180) / Math.PI + (lado === 1 ? 90 : -90);
      s += folha(x, y, tangente + lado * 28, 1 - t * 0.25);
      s += folha(x + Math.cos(a) * 24, y + Math.sin(a) * 24, tangente - lado * 28, 0.8 - t * 0.2);
    }
    if (arco)
      s += `<path d="M${cx + Math.cos(Math.PI / 2 + lado * abertura) * raio} ${cy + Math.sin(Math.PI / 2 + lado * abertura) * raio} A${raio} ${raio} 0 1 ${lado === 1 ? 0 : 1} ${cx + Math.cos(Math.PI / 2 + lado * Math.PI * 0.96) * raio} ${cy + Math.sin(Math.PI / 2 + lado * Math.PI * 0.96) * raio}" fill="none" stroke="#a87c2c" stroke-width="3" opacity="0.7"/>`;
  }
  return s;
}

// Coluna dórica
function colunaDorica(x, topo, base, larg = 150) {
  const h = base - topo;
  let estrias = "";
  for (let i = 1; i < 8; i++) {
    estrias += `<line x1="${x - larg / 2 + (larg / 8) * i}" y1="${topo + 40}" x2="${x - larg / 2 + (larg / 8) * i}" y2="${base - 20}" stroke="#b9ae96" stroke-width="2" opacity="0.5"/>`;
  }
  return `<g filter="url(#sombra)">
    <rect x="${x - larg / 2}" y="${topo + 28}" width="${larg}" height="${h - 28}" fill="url(#fuste)"/>
    ${estrias}
    <rect x="${x - larg * 0.72}" y="${topo}" width="${larg * 1.44}" height="26" rx="4" fill="url(#pedra)"/>
    <path d="M${x - larg * 0.52} ${topo + 26} h${larg * 1.04} l-${larg * 0.1} 22 h-${larg * 0.84} z" fill="url(#pedra)"/>
    <rect x="${x - larg * 0.7}" y="${base - 18}" width="${larg * 1.4}" height="18" fill="url(#pedra)"/>
  </g>`;
}

// Coluna jônica (capitel com volutas)
function colunaJonica(x, topo, base, larg = 150) {
  const h = base - topo;
  let estrias = "";
  for (let i = 1; i < 8; i++) {
    estrias += `<line x1="${x - larg / 2 + (larg / 8) * i}" y1="${topo + 70}" x2="${x - larg / 2 + (larg / 8) * i}" y2="${base - 36}" stroke="#b9ae96" stroke-width="2" opacity="0.5"/>`;
  }
  const volutaX = larg * 0.72;
  const voluta = (cx) => `
    <circle cx="${cx}" cy="${topo + 44}" r="30" fill="url(#pedra)" stroke="#a87c2c" stroke-width="3"/>
    <circle cx="${cx}" cy="${topo + 44}" r="19" fill="none" stroke="#a87c2c" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${topo + 44}" r="9" fill="none" stroke="#a87c2c" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${topo + 44}" r="3.5" fill="#a87c2c"/>`;
  return `<g filter="url(#sombra)">
    <rect x="${x - larg / 2}" y="${topo + 74}" width="${larg}" height="${h - 110}" fill="url(#fuste)"/>
    ${estrias}
    <rect x="${x - larg * 0.78}" y="${topo}" width="${larg * 1.56}" height="18" rx="3" fill="url(#pedra)"/>
    <rect x="${x - volutaX}" y="${topo + 18}" width="${volutaX * 2}" height="52" rx="26" fill="url(#pedra)"/>
    ${voluta(x - volutaX + 24)}${voluta(x + volutaX - 24)}
    <path d="M${x - larg / 2} ${topo + 70} h${larg} v14 h-${larg}z" fill="url(#pedra)"/>
    <ellipse cx="${x}" cy="${base - 22}" rx="${larg * 0.62}" ry="16" fill="url(#pedra)"/>
    <rect x="${x - larg * 0.7}" y="${base - 22}" width="${larg * 1.4}" height="22" rx="4" fill="url(#pedra)"/>
  </g>`;
}

// Dente em escultura (silhueta simples de molar)
const denteCaminho =
  "M-170 -230C-250 -250 -300 -150 -280 -40C-265 60 -230 110 -215 200C-200 270 -150 300 -110 240C-80 190 -60 110 0 110C60 110 80 190 110 240C150 300 200 270 215 200C230 110 265 60 280 -40C300 -150 250 -250 170 -230C110 -215 60 -190 0 -200C-60 -190 -110 -215 -170 -230Z";

function dente(cx, cy, escala = 1, id = "d") {
  return `<g transform="translate(${cx} ${cy}) scale(${escala})">
    <clipPath id="${id}"><path d="${denteCaminho}"/></clipPath>
    <path d="${denteCaminho}" fill="url(#pedra)" filter="url(#sombra)"/>
    <g clip-path="url(#${id})">
      <path d="M-260 -140C-150 -60 -90 40 -30 100S90 180 160 260" fill="none" stroke="#b8893a" stroke-width="3.5" opacity="0.8"/>
      <path d="M-210 -230C-190 -120 -170 -40 -150 40" fill="none" stroke="#8d877c" stroke-width="2" opacity="0.5"/>
      <path d="M120 -230C100 -150 150 -60 190 20S220 130 200 220" fill="none" stroke="#b8893a" stroke-width="2.5" opacity="0.7"/>
      <ellipse cx="-120" cy="-120" rx="70" ry="120" fill="#fff" opacity="0.5" transform="rotate(-25 -120 -120)"/>
    </g>
    <path d="${denteCaminho}" fill="none" stroke="#c9a04a" stroke-width="5" opacity="0.8"/>
  </g>`;
}

// ---------- Cenas ----------
const templo = cena(`
  <ellipse cx="1650" cy="560" rx="620" ry="460" fill="url(#luz)"/>
  <g filter="url(#sombra)">
    <path d="M1080 340 L1650 150 L2220 340 Z" fill="url(#pedra)" stroke="#c9a04a" stroke-width="4"/>
    <path d="M1180 330 L1650 180 L2120 330" fill="none" stroke="#c9a04a" stroke-width="2" opacity="0.6"/>
    <rect x="1080" y="340" width="1140" height="46" fill="url(#pedra)"/>
    <rect x="1080" y="386" width="1140" height="64" fill="url(#pedra)"/>
    ${Array.from({ length: 14 }, (_, i) => `<rect x="${1110 + i * 80}" y="396" width="26" height="44" fill="#d8cfb9"/><line x1="${1118 + i * 80}" y1="398" x2="${1118 + i * 80}" y2="438" stroke="#b9ae96" stroke-width="2"/><line x1="${1128 + i * 80}" y1="398" x2="${1128 + i * 80}" y2="438" stroke="#b9ae96" stroke-width="2"/>`).join("")}
    <rect x="1080" y="450" width="1140" height="14" fill="url(#ouro)"/>
  </g>
  ${[1230, 1490, 1750, 2010].map((x) => colunaDorica(x, 464, 1000, 148)).join("")}
  <g filter="url(#sombra)">
    <rect x="1020" y="1000" width="1240" height="34" fill="url(#pedra)"/>
    <rect x="960" y="1034" width="1360" height="38" fill="url(#pedra)"/>
    <rect x="900" y="1072" width="1480" height="42" fill="url(#pedra)"/>
  </g>
`);

const denteMarmore = cena(`
  <ellipse cx="1560" cy="600" rx="640" ry="480" fill="url(#luz)"/>
  <g filter="url(#sombra)">
    <rect x="1330" y="900" width="460" height="52" rx="6" fill="url(#pedra)"/>
    <rect x="1370" y="952" width="380" height="40" fill="url(#pedra)"/>
    <rect x="1290" y="990" width="540" height="56" rx="6" fill="url(#pedra)"/>
    <rect x="1330" y="900" width="460" height="8" fill="url(#ouro)"/>
    <rect x="1290" y="990" width="540" height="8" fill="url(#ouro)"/>
  </g>
  ${dente(1560, 600, 1.08, "d1")}
`);

const louroCena = cena(`
  <ellipse cx="1560" cy="614" rx="640" ry="500" fill="url(#luz)"/>
  <circle cx="1560" cy="614" r="270" fill="url(#pedra)" filter="url(#sombra)"/>
  <circle cx="1560" cy="614" r="236" fill="none" stroke="#c9a04a" stroke-width="3" opacity="0.7"/>
  <rect x="1330" y="590" width="460" height="18" fill="url(#meandro)"/>
  ${louro(1560, 614, 330, 16, 0.5)}
  ${dente(1560, 640, 0.42, "d2")}
  <path d="M1500 940 q60 40 120 0" fill="none" stroke="#a87c2c" stroke-width="5" stroke-linecap="round"/>
  <path d="M1540 944 l-34 70 M1580 944 l34 70" stroke="#c9a04a" stroke-width="12" stroke-linecap="round"/>
`);

const anforaCena = (() => {
  const corpo =
    "M-60 -380C-60 -330 -70 -290 -150 -230C-260 -150 -270 20 -200 150C-170 210 -120 280 -90 340L-90 380L90 380L90 340C120 280 170 210 200 150C270 20 260 -150 150 -230C70 -290 60 -330 60 -380Z";
  return cena(`
  <ellipse cx="1600" cy="600" rx="620" ry="470" fill="url(#luz)"/>
  <g transform="translate(1600 620) scale(1.15)">
    <clipPath id="anfora"><path d="${corpo}"/></clipPath>
    <path d="M-60 -250C-250 -330 -250 -140 -150 -130" fill="none" stroke="url(#ouro)" stroke-width="28" stroke-linecap="round"/>
    <path d="M60 -250C250 -330 250 -140 150 -130" fill="none" stroke="url(#ouro)" stroke-width="28" stroke-linecap="round"/>
    <path d="${corpo}" fill="url(#pedra)" filter="url(#sombra)"/>
    <ellipse cx="0" cy="-386" rx="94" ry="26" fill="url(#pedra)" stroke="#c9a04a" stroke-width="4"/>
    <g clip-path="url(#anfora)">
      <rect x="-300" y="-110" width="600" height="34" fill="url(#meandro)"/>
      <rect x="-300" y="-80" width="600" height="6" fill="url(#ouro)"/>
      <rect x="-300" y="-126" width="600" height="6" fill="url(#ouro)"/>
      <rect x="-300" y="150" width="600" height="6" fill="url(#ouro)"/>
      <rect x="-300" y="300" width="600" height="34" fill="url(#meandro)"/>
      <ellipse cx="-110" cy="-20" rx="46" ry="150" fill="#fff" opacity="0.55" transform="rotate(8 -110 -20)"/>
      <path d="M-240 40C-120 80 -60 160 -20 260" fill="none" stroke="#b8893a" stroke-width="2.5" opacity="0.6"/>
    </g>
    <path d="${corpo}" fill="none" stroke="#c9a04a" stroke-width="5" opacity="0.8"/>
    <rect x="-130" y="378" width="260" height="30" rx="6" fill="url(#pedra)" stroke="#c9a04a" stroke-width="3"/>
  </g>
`);
})();

const colunasJonicas = cena(`
  <ellipse cx="1650" cy="560" rx="600" ry="470" fill="url(#luz)"/>
  ${colunaJonica(1380, 190, 1040, 170)}
  ${colunaJonica(1860, 190, 1040, 170)}
  <g filter="url(#sombra)">
    <rect x="1220" y="1040" width="800" height="34" fill="url(#pedra)"/>
    <rect x="1160" y="1074" width="920" height="40" fill="url(#pedra)"/>
    <rect x="1290" y="170" width="640" height="20" fill="url(#ouro)" opacity="0.0"/>
  </g>
`);

// Sorriso em louro: arco de dentes dentro de uma coroa de louro (ilustração central, para cartões)
const sorrisoLouro = cena(
  `
  <ellipse cx="1100" cy="614" rx="600" ry="480" fill="url(#luz)"/>
  ${louro(1100, 600, 330, 16, 0.5)}
  <g transform="translate(1100 560)">
    ${Array.from({ length: 8 }, (_, i) => {
      const t = (i - 3.5) / 3.5;
      const x = t * 200;
      const y = -62 * t * t + 8;
      const rot = -t * 11;
      const largura = 62 - Math.abs(t) * 12;
      return `<rect x="${x - largura / 2}" y="${y}" width="${largura}" height="${86 - Math.abs(t) * 12}" rx="22" transform="rotate(${rot} ${x} ${y})" fill="url(#pedra)" stroke="#c9a04a" stroke-width="3" filter="url(#sombra)"/>`;
    }).join("")}
    <path d="M-270 -40 Q0 210 270 -40" fill="none" stroke="url(#ouro)" stroke-width="9" stroke-linecap="round"/>
  </g>
`,
  W,
  H,
);

const retrato = cena(
  `
  <rect width="1000" height="1200" fill="#f8f5ee"/>
  <circle cx="500" cy="560" r="330" fill="url(#luz)"/>
  <circle cx="500" cy="560" r="285" fill="url(#pedra)" filter="url(#sombra)"/>
  <circle cx="500" cy="560" r="248" fill="none" stroke="#c9a04a" stroke-width="4"/>
  <rect x="250" y="880" width="500" height="22" fill="url(#meandro)"/>
  <path d="M385 440 h250 M385 440 v230 h250 M385 555 h200" fill="none" stroke="url(#ouro)" stroke-width="44" stroke-linecap="square"/>
`,
  1000,
  1200,
);

// ---------- Geração ----------
const filtro = process.argv.slice(2);
const deve = (nome) => filtro.length === 0 || filtro.some((f) => nome.includes(f));

async function salvarCena(nome, svg, semente, largura = W, altura = H, qualidade = 84) {
  if (!deve(nome)) return;
  const fundo = await marmore(largura, altura, semente);
  const info = await sharp(fundo)
    .composite([{ input: Buffer.from(svg) }])
    .jpeg({ quality: qualidade, mozjpeg: true })
    .toFile(path.join(pastaFundos, nome));
  console.log(nome, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} KB`);
}

await salvarCena("fundo_templo_colunas.jpg", templo, 21);
await salvarCena("fundo_dente_marmore.jpg", denteMarmore, 33);
await salvarCena("fundo_louro_dourado.jpg", louroCena, 45);
await salvarCena("fundo_anfora_dourada.jpg", anforaCena, 57);
await salvarCena("fundo_colunas_jonicas.jpg", colunasJonicas, 69);
await salvarCena("fundo_sorriso_louro.jpg", sorrisoLouro, 81);
await salvarCena("retrato_provisorio.jpg", retrato, 93, 1000, 1200);

// Textura de mármore para fundos de seção (CSS) e imagem de compartilhamento
if (deve("marmore-a")) {
  const textura = await marmore(1800, 1000, 105, 8);
  const t = await sharp(textura)
    .jpeg({ quality: 76, mozjpeg: true })
    .toFile(path.join(pastaPublic, "marmore-a.jpg"));
  console.log("marmore-a.jpg", `${t.width}x${t.height}`, `${Math.round(t.size / 1024)} KB`);
}
if (deve("og")) {
  await sharp(path.join(pastaFundos, "fundo_templo_colunas.jpg"))
    .resize(1200, 630, { fit: "cover", position: "right" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(pastaPublic, "og.jpg"));
  console.log("og.jpg ok");
}
