const sharp = require('sharp');
const fs = require('fs');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050814" />
      <stop offset="50%" stop-color="#0a1128" />
      <stop offset="100%" stop-color="#030712" />
    </linearGradient>
    <radialGradient id="cyanGlow" cx="20%" cy="30%" r="40%">
      <stop offset="0%" stop-color="#00d4ff" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#00d4ff" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="violetGlow" cx="80%" cy="70%" r="40%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#cyanGlow)" />
  <rect width="1200" height="630" fill="url(#violetGlow)" />

  <!-- Outer Border -->
  <rect x="30" y="30" width="1140" height="570" rx="24" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="2" />

  <!-- Badge -->
  <rect x="70" y="70" width="280" height="40" rx="20" fill="rgba(0, 212, 255, 0.1)" stroke="rgba(0, 212, 255, 0.3)" stroke-width="1.5" />
  <circle cx="90" cy="90" r="5" fill="#00d4ff" />
  <text x="108" y="95" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="bold" fill="#00d4ff" letter-spacing="1.5">AI &amp; ML ENGINEER</text>

  <!-- Canonical URL right aligned -->
  <text x="1130" y="95" text-anchor="end" font-family="monospace" font-size="16" fill="#64748b">pavan-portfolio-gamma-six.vercel.app</text>

  <!-- Name -->
  <text x="70" y="220" font-family="system-ui, -apple-system, sans-serif" font-size="56" font-weight="800" fill="#ffffff" letter-spacing="-1">Rajana Durga Pavan Kumar</text>

  <!-- Tagline -->
  <text x="70" y="285" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="600" fill="#38bdf8">Building Enterprise RAG Systems &amp; Multi-Agent AI</text>

  <!-- Bio Subtitle -->
  <text x="70" y="350" font-family="system-ui, -apple-system, sans-serif" font-size="20" fill="#94a3b8">SOA University (ITER) · TIH IIT Guwahati Intern · Neo4j Certified · Google Cloud Diamond</text>

  <!-- Tech Badges -->
  <g transform="translate(70, 440)">
    <rect x="0" y="0" width="210" height="44" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
    <text x="105" y="27" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#e2e8f0">Graph RAG (Neo4j)</text>

    <rect x="225" y="0" width="180" height="44" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
    <text x="315" y="27" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#e2e8f0">Pinecone Vector</text>

    <rect x="420" y="0" width="170" height="44" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
    <text x="505" y="27" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#e2e8f0">Gemini 1.5 Pro</text>

    <rect x="605" y="0" width="160" height="44" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
    <text x="685" y="27" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#e2e8f0">PyTorch &amp; NLP</text>

    <rect x="780" y="0" width="140" height="44" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
    <text x="850" y="27" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#e2e8f0">Next.js 15</text>
  </g>
</svg>
`;

sharp(Buffer.from(svg))
  .png()
  .toFile('public/og-image.png')
  .then(() => {
    console.log('Successfully generated public/og-image.png (1200x630)');
    // Also save as og.png
    return sharp(Buffer.from(svg)).png().toFile('public/og.png');
  })
  .then(() => {
    console.log('Successfully generated public/og.png (1200x630)');
  })
  .catch(console.error);
