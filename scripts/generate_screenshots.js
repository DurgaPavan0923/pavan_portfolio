const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createProjectScreenshots() {
  const outDir = path.join(__dirname, '..', 'public', 'projects');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. FactLens AI
  const factlensSvg = Buffer.from(`
  <svg width="1200" height="750" viewBox="0 0 1200 750" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Background Canvas -->
    <rect width="1200" height="750" rx="24" fill="#090d16"/>
    
    <!-- Browser Top Bar -->
    <rect width="1200" height="56" rx="24" fill="#0d131f"/>
    <rect y="32" width="1200" height="24" fill="#0d131f"/>
    <circle cx="36" cy="28" r="7" fill="#ef4444"/>
    <circle cx="60" cy="28" r="7" fill="#f59e0b"/>
    <circle cx="84" cy="28" r="7" fill="#10b981"/>
    
    <!-- URL Bar -->
    <rect x="130" y="14" width="940" height="28" rx="8" fill="#161f30" stroke="rgba(255,255,255,0.08)"/>
    <text x="150" y="33" fill="#00cfff" font-family="monospace" font-size="13" font-weight="500">https://ai-powered-fake-news-detector-for-s.vercel.app</text>
    <rect x="1040" y="20" width="16" height="16" rx="4" fill="#10b981" opacity="0.8"/>

    <!-- Header / Brand -->
    <rect x="40" y="80" width="1120" height="60" rx="16" fill="#0f172a" stroke="rgba(0,207,255,0.2)"/>
    <text x="64" y="117" fill="#ffffff" font-family="sans-serif" font-size="20" font-weight="700">FactLens AI <tspan fill="#00cfff" font-size="14">// Multi-Agent Graph RAG Verification</tspan></text>
    <rect x="980" y="94" width="150" height="32" rx="10" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1"/>
    <text x="1005" y="115" fill="#34d399" font-family="sans-serif" font-size="13" font-weight="600">● Status: Online</text>

    <!-- Main Grid Layout -->
    <!-- Left Panel: Claim Analysis -->
    <rect x="40" y="160" width="680" height="550" rx="18" fill="#0d131f" stroke="rgba(255,255,255,0.08)"/>
    <text x="68" y="198" fill="#94a3b8" font-family="monospace" font-size="12" font-weight="600" letter-spacing="1">INBOUND CLAIM QUERY</text>
    
    <rect x="68" y="215" width="624" height="80" rx="12" fill="#131c2e" stroke="rgba(0,207,255,0.3)"/>
    <text x="88" y="248" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="500">&quot;Recent climate reports claim arctic ice levels reached an all-time low in 2025.&quot;</text>
    <text x="88" y="274" fill="#64748b" font-family="monospace" font-size="11">Tokens: 18 • Language: en • Domain: Climate Science</text>

    <!-- Multi-Agent Consensus Breakdown -->
    <text x="68" y="330" fill="#94a3b8" font-family="monospace" font-size="12" font-weight="600" letter-spacing="1">MULTI-AGENT VERIFICATION CONSENSUS</text>
    
    <!-- Agent 1: Deconstructor -->
    <rect x="68" y="348" width="190" height="120" rx="12" fill="#161f30" stroke="rgba(255,255,255,0.06)"/>
    <text x="84" y="374" fill="#38bdf8" font-family="sans-serif" font-size="13" font-weight="700">Claim Deconstructor</text>
    <text x="84" y="396" fill="#94a3b8" font-family="sans-serif" font-size="11">Extracted Entities:</text>
    <text x="84" y="414" fill="#e2e8f0" font-family="monospace" font-size="10">• Arctic Ice Sheet</text>
    <text x="84" y="432" fill="#e2e8f0" font-family="monospace" font-size="10">• Historical 2025 Datum</text>
    <rect x="84" y="446" width="70" height="16" rx="4" fill="rgba(56,189,248,0.2)"/>
    <text x="92" y="458" fill="#38bdf8" font-family="sans-serif" font-size="9" font-weight="600">Pass (0.98)</text>

    <!-- Agent 2: Pinecone Vector Retrieval -->
    <rect x="285" y="348" width="190" height="120" rx="12" fill="#161f30" stroke="rgba(255,255,255,0.06)"/>
    <text x="301" y="374" fill="#34d399" font-family="sans-serif" font-size="13" font-weight="700">Vector Retrieval</text>
    <text x="301" y="396" fill="#94a3b8" font-family="sans-serif" font-size="11">Pinecone Index:</text>
    <text x="301" y="414" fill="#e2e8f0" font-family="monospace" font-size="10">• Top-3 Chunks Retrieved</text>
    <text x="301" y="432" fill="#e2e8f0" font-family="monospace" font-size="10">• Cosine Sim: 0.942</text>
    <rect x="301" y="446" width="75" height="16" rx="4" fill="rgba(52,211,153,0.2)"/>
    <text x="309" y="458" fill="#34d399" font-family="sans-serif" font-size="9" font-weight="600">Grounded</text>

    <!-- Agent 3: Neo4j Graph Traversal -->
    <rect x="502" y="348" width="190" height="120" rx="12" fill="#161f30" stroke="rgba(255,255,255,0.06)"/>
    <text x="518" y="374" fill="#f472b6" font-family="sans-serif" font-size="13" font-weight="700">Neo4j Graph</text>
    <text x="518" y="396" fill="#94a3b8" font-family="sans-serif" font-size="11">Cypher 2-Hop Query:</text>
    <text x="518" y="414" fill="#e2e8f0" font-family="monospace" font-size="10">• MATCH (e)-[:REPORTED]-></text>
    <text x="518" y="432" fill="#e2e8f0" font-family="monospace" font-size="10">• 14 Validated Citations</text>
    <rect x="518" y="446" width="70" height="16" rx="4" fill="rgba(244,114,182,0.2)"/>
    <text x="526" y="458" fill="#f472b6" font-family="sans-serif" font-size="9" font-weight="600">Traversed</text>

    <!-- Arbiter Synthesis -->
    <rect x="68" y="488" width="624" height="195" rx="14" fill="#131c2e" stroke="rgba(0,207,255,0.2)"/>
    <text x="92" y="518" fill="#38bdf8" font-family="sans-serif" font-size="14" font-weight="700">Consensus Arbiter Verdict: VERIFIED TRUE</text>
    <text x="92" y="544" fill="#94a3b8" font-family="sans-serif" font-size="12" font-weight="400">The claim is corroborated by NOAA and National Snow and Ice Data Center (NSIDC) reports.</text>
    <text x="92" y="572" fill="#cbd5e1" font-family="monospace" font-size="11">[1] NSIDC Arctic Sea Ice News (doi:10.5067/NSIDC-0051)</text>
    <text x="92" y="594" fill="#cbd5e1" font-family="monospace" font-size="11">[2] WMO Global Climate State 2025 Statement (ISBN 978-92-63-11330-6)</text>
    <rect x="92" y="620" width="180" height="36" rx="8" fill="#00cfff"/>
    <text x="122" y="643" fill="#090d16" font-family="sans-serif" font-size="12" font-weight="700">Export Citation (APA)</text>

    <!-- Right Panel: Telemetry & Benchmark Card -->
    <rect x="744" y="160" width="416" height="550" rx="18" fill="#0d131f" stroke="rgba(255,255,255,0.08)"/>
    <text x="772" y="198" fill="#94a3b8" font-family="monospace" font-size="12" font-weight="600" letter-spacing="1">BENCHMARK ACCURACY &amp; LATENCY</text>

    <!-- Score Big Card -->
    <rect x="772" y="215" width="360" height="130" rx="14" fill="#161f30" stroke="rgba(16,185,129,0.3)"/>
    <text x="796" y="252" fill="#94a3b8" font-family="sans-serif" font-size="13">Evaluation Accuracy (FEVER/LIAR n=100)</text>
    <text x="796" y="305" fill="#34d399" font-family="sans-serif" font-size="48" font-weight="800">94.0%</text>
    <text x="950" y="300" fill="#64748b" font-family="monospace" font-size="12">Macro-F1: 0.9400</text>

    <!-- Metrics Breakdown Grid -->
    <rect x="772" y="360" width="172" height="90" rx="12" fill="#131c2e" stroke="rgba(255,255,255,0.06)"/>
    <text x="788" y="386" fill="#94a3b8" font-family="monospace" font-size="10">SIMULATED P50 LATENCY</text>
    <text x="788" y="422" fill="#38bdf8" font-family="sans-serif" font-size="24" font-weight="700">8.99 ms</text>

    <rect x="960" y="360" width="172" height="90" rx="12" fill="#131c2e" stroke="rgba(255,255,255,0.06)"/>
    <text x="976" y="386" fill="#94a3b8" font-family="monospace" font-size="10">ZERO-SHOT BASELINE</text>
    <text x="976" y="422" fill="#f59e0b" font-family="sans-serif" font-size="24" font-weight="700">87.0%</text>

    <!-- Stack Architecture Card -->
    <rect x="772" y="468" width="360" height="215" rx="14" fill="#131c2e" stroke="rgba(255,255,255,0.06)"/>
    <text x="796" y="498" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="700">Verified Architecture Stack</text>
    <text x="796" y="528" fill="#94a3b8" font-family="sans-serif" font-size="12">• Google Gemini API (Adversarial Prompts)</text>
    <text x="796" y="552" fill="#94a3b8" font-family="sans-serif" font-size="12">• Neo4j AuraDB (Entity Graph Relationships)</text>
    <text x="796" y="576" fill="#94a3b8" font-family="sans-serif" font-size="12">• Pinecone Serverless (Dense Embeddings)</text>
    <text x="796" y="600" fill="#94a3b8" font-family="sans-serif" font-size="12">• Next.js 15 App Router &amp; TypeScript</text>
    <text x="796" y="640" fill="#64748b" font-family="monospace" font-size="11">Evaluation: Single-claim offline simulation</text>
  </svg>
  `);

  await sharp(factlensSvg)
    .webp({ quality: 90 })
    .toFile(path.join(outDir, 'factlens-ai.webp'));
  console.log('Created factlens-ai.webp');

  // 2. InsightAI ATS Engine
  const insightSvg = Buffer.from(`
  <svg width="1200" height="750" viewBox="0 0 1200 750" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="750" rx="24" fill="#090d16"/>
    <rect width="1200" height="56" rx="24" fill="#0d131f"/>
    <rect y="32" width="1200" height="24" fill="#0d131f"/>
    <circle cx="36" cy="28" r="7" fill="#ef4444"/>
    <circle cx="60" cy="28" r="7" fill="#f59e0b"/>
    <circle cx="84" cy="28" r="7" fill="#10b981"/>
    <rect x="130" y="14" width="940" height="28" rx="8" fill="#161f30" stroke="rgba(255,255,255,0.08)"/>
    <text x="150" y="33" fill="#00cfff" font-family="monospace" font-size="13" font-weight="500">https://ai-resume-screening-job-match-syste-one.vercel.app</text>

    <rect x="40" y="80" width="1120" height="60" rx="16" fill="#0f172a" stroke="rgba(0,207,255,0.2)"/>
    <text x="64" y="117" fill="#ffffff" font-family="sans-serif" font-size="20" font-weight="700">InsightAI <tspan fill="#00cfff" font-size="14">// Resume Screening &amp; ATS Match Engine</tspan></text>
    <rect x="980" y="94" width="150" height="32" rx="10" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1"/>
    <text x="1005" y="115" fill="#34d399" font-family="sans-serif" font-size="13" font-weight="600">● Status: Active</text>

    <!-- Left Panel: Resume vs JD Analysis -->
    <rect x="40" y="160" width="680" height="550" rx="18" fill="#0d131f" stroke="rgba(255,255,255,0.08)"/>
    <text x="68" y="198" fill="#94a3b8" font-family="monospace" font-size="12" font-weight="600" letter-spacing="1">RESUME MATCH &amp; SEMANTIC ALIGNMENT</text>

    <rect x="68" y="215" width="624" height="125" rx="12" fill="#131c2e" stroke="rgba(255,255,255,0.06)"/>
    <text x="88" y="242" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="600">Target Profile: Senior AI/ML Platform Engineer</text>
    <text x="88" y="268" fill="#94a3b8" font-family="sans-serif" font-size="12">Parsed Sections: 12 Work History • 8 Skills Categories • 4 Education Records</text>
    <rect x="88" y="285" width="110" height="24" rx="6" fill="rgba(0,207,255,0.15)"/>
    <text x="98" y="301" fill="#38bdf8" font-family="monospace" font-size="11">PyPDF v3.12</text>
    <rect x="210" y="285" width="120" height="24" rx="6" fill="rgba(16,185,129,0.15)"/>
    <text x="220" y="301" fill="#34d399" font-family="monospace" font-size="11">TF-IDF + Cosine</text>

    <text x="68" y="375" fill="#94a3b8" font-family="monospace" font-size="12" font-weight="600" letter-spacing="1">SKILL ALIGNMENT &amp; GAPS BREAKDOWN</text>
    
    <!-- Skills Matrix -->
    <rect x="68" y="392" width="300" height="135" rx="12" fill="#161f30" stroke="rgba(16,185,129,0.2)"/>
    <text x="84" y="418" fill="#34d399" font-family="sans-serif" font-size="13" font-weight="700">Verified Matching Skills (92%)</text>
    <text x="84" y="444" fill="#cbd5e1" font-family="sans-serif" font-size="11">✔ Python &amp; PyTorch Deep Learning</text>
    <text x="84" y="468" fill="#cbd5e1" font-family="sans-serif" font-size="11">✔ RAG Architecture &amp; Vector Embeddings</text>
    <text x="84" y="492" fill="#cbd5e1" font-family="sans-serif" font-size="11">✔ Docker &amp; FastAPI Microservices</text>

    <rect x="392" y="392" width="300" height="135" rx="12" fill="#161f30" stroke="rgba(245,158,11,0.2)"/>
    <text x="408" y="418" fill="#fbbf24" font-family="sans-serif" font-size="13" font-weight="700">Identified Skill Gaps (8%)</text>
    <text x="408" y="444" fill="#cbd5e1" font-family="sans-serif" font-size="11">⚠ Distributed Triton Inference Server</text>
    <text x="408" y="468" fill="#cbd5e1" font-family="sans-serif" font-size="11">⚠ Kubernetes Helm Chart Orchestration</text>
    <text x="408" y="492" fill="#94a3b8" font-family="sans-serif" font-size="11">Suggested: Include Triton or vLLM project</text>

    <!-- Question Copilot -->
    <rect x="68" y="545" width="624" height="135" rx="14" fill="#131c2e" stroke="rgba(0,207,255,0.2)"/>
    <text x="92" y="575" fill="#38bdf8" font-family="sans-serif" font-size="13" font-weight="700">Automated Technical Interview Questions</text>
    <text x="92" y="600" fill="#f8fafc" font-family="sans-serif" font-size="12">Q1: How do you handle cold-start latency when scaling Pinecone vector queries under burst load?</text>
    <text x="92" y="624" fill="#f8fafc" font-family="sans-serif" font-size="12">Q2: Describe the trade-offs between Platt probability calibration and isotonic regression.</text>
    <text x="92" y="652" fill="#64748b" font-family="monospace" font-size="10">Generated using LLM prompt-grounded candidate gap synthesis</text>

    <!-- Right Panel: Benchmark Card -->
    <rect x="744" y="160" width="416" height="550" rx="18" fill="#0d131f" stroke="rgba(255,255,255,0.08)"/>
    <text x="772" y="198" fill="#94a3b8" font-family="monospace" font-size="12" font-weight="600" letter-spacing="1">EVALUATION ON RESUME-JD CORPUS</text>

    <rect x="772" y="215" width="360" height="130" rx="14" fill="#161f30" stroke="rgba(0,207,255,0.3)"/>
    <text x="796" y="252" fill="#94a3b8" font-family="sans-serif" font-size="13">Precision@1 (Synthetic Corpus n=32)</text>
    <text x="796" y="305" fill="#00cfff" font-family="sans-serif" font-size="48" font-weight="800">100.0%</text>
    <text x="980" y="300" fill="#64748b" font-family="monospace" font-size="12">NDCG@3: 0.9955</text>

    <rect x="772" y="360" width="172" height="90" rx="12" fill="#131c2e" stroke="rgba(255,255,255,0.06)"/>
    <text x="788" y="386" fill="#94a3b8" font-family="monospace" font-size="10">SCORING P50 LATENCY</text>
    <text x="788" y="422" fill="#38bdf8" font-family="sans-serif" font-size="24" font-weight="700">0.197 ms</text>

    <rect x="960" y="360" width="172" height="90" rx="12" fill="#131c2e" stroke="rgba(255,255,255,0.06)"/>
    <text x="976" y="386" fill="#94a3b8" font-family="monospace" font-size="10">CORPUS SAMPLES</text>
    <text x="976" y="422" fill="#a855f7" font-family="sans-serif" font-size="24" font-weight="700">32 pairs</text>

    <rect x="772" y="468" width="360" height="215" rx="14" fill="#131c2e" stroke="rgba(255,255,255,0.06)"/>
    <text x="796" y="498" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="700">System Architecture</text>
    <text x="796" y="528" fill="#94a3b8" font-family="sans-serif" font-size="12">• Python FastAPI microservice architecture</text>
    <text x="796" y="552" fill="#94a3b8" font-family="sans-serif" font-size="12">• Scikit-learn TF-IDF &amp; Cosine Metric</text>
    <text x="796" y="576" fill="#94a3b8" font-family="sans-serif" font-size="12">• Streamlit interactive UI &amp; Vercel Edge</text>
    <text x="796" y="600" fill="#94a3b8" font-family="sans-serif" font-size="12">• PyPDF layout extraction pipeline</text>
    <text x="796" y="640" fill="#64748b" font-family="monospace" font-size="11">Limitation: Evaluated on small synthetic test set</text>
  </svg>
  `);

  await sharp(insightSvg)
    .webp({ quality: 90 })
    .toFile(path.join(outDir, 'insight-ai.webp'));
  console.log('Created insight-ai.webp');

  // 3. Underwater Analytics & Potability
  const waterSvg = Buffer.from(`
  <svg width="1200" height="750" viewBox="0 0 1200 750" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="750" rx="24" fill="#090d16"/>
    <rect width="1200" height="56" rx="24" fill="#0d131f"/>
    <rect y="32" width="1200" height="24" fill="#0d131f"/>
    <circle cx="36" cy="28" r="7" fill="#ef4444"/>
    <circle cx="60" cy="28" r="7" fill="#f59e0b"/>
    <circle cx="84" cy="28" r="7" fill="#10b981"/>
    <rect x="130" y="14" width="940" height="28" rx="8" fill="#161f30" stroke="rgba(255,255,255,0.08)"/>
    <text x="150" y="33" fill="#00cfff" font-family="monospace" font-size="13" font-weight="500">https://water-potability-vert.vercel.app</text>

    <rect x="40" y="80" width="1120" height="60" rx="16" fill="#0f172a" stroke="rgba(0,207,255,0.2)"/>
    <text x="64" y="117" fill="#ffffff" font-family="sans-serif" font-size="20" font-weight="700">AquaGuard Telemetry <tspan fill="#00cfff" font-size="14">// TIH IIT Guwahati Environmental ML</tspan></text>
    <rect x="980" y="94" width="150" height="32" rx="10" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1"/>
    <text x="1005" y="115" fill="#34d399" font-family="sans-serif" font-size="13" font-weight="600">● Model: Calibrated</text>

    <!-- Left Panel: Dual Track Analysis -->
    <rect x="40" y="160" width="680" height="550" rx="18" fill="#0d131f" stroke="rgba(255,255,255,0.08)"/>
    <text x="68" y="198" fill="#94a3b8" font-family="monospace" font-size="12" font-weight="600" letter-spacing="1">DUAL-TRACK PIPELINE (TRACK A &amp; TRACK B)</text>

    <!-- Track B Card -->
    <rect x="68" y="215" width="624" height="165" rx="12" fill="#131c2e" stroke="rgba(0,207,255,0.25)"/>
    <text x="88" y="242" fill="#38bdf8" font-family="sans-serif" font-size="14" font-weight="700">Track B: Potability Classification (N=3,276 Public Tabular)</text>
    <text x="88" y="268" fill="#94a3b8" font-family="sans-serif" font-size="12">9 Physicochemical Attributes: pH, Hardness, Solids, Chloramines, Sulfate, Conductivity, Organic Carbon, Trihalomethanes, Turbidity</text>
    <text x="88" y="294" fill="#cbd5e1" font-family="monospace" font-size="11">Lockbox PR-AUC: 0.5951 (vs 0.3920 WHO Baseline, +51.8% gain) • ROC-AUC: 0.6689</text>
    <text x="88" y="318" fill="#cbd5e1" font-family="monospace" font-size="11">Platt Probability Calibration • Brier Score: 0.2154 • Server P50: 2.89 ms</text>
    <rect x="88" y="334" width="130" height="24" rx="6" fill="rgba(56,189,248,0.2)"/>
    <text x="98" y="350" fill="#38bdf8" font-family="sans-serif" font-size="10" font-weight="600">WHO 4th Ed. Guardrails</text>

    <!-- Track A Card -->
    <rect x="68" y="398" width="624" height="155" rx="12" fill="#131c2e" stroke="rgba(16,185,129,0.25)"/>
    <text x="88" y="425" fill="#34d399" font-family="sans-serif" font-size="14" font-weight="700">Track A: CTD Oceanographic Telemetry Stream (N=720 Buoy Stream)</text>
    <text x="88" y="451" fill="#94a3b8" font-family="sans-serif" font-size="12">Conductivity, Temperature &amp; Depth continuous buoy measurements</text>
    <text x="88" y="477" fill="#cbd5e1" font-family="monospace" font-size="11">Causal Walk-Forward Forecaster: Dissolved Oxygen (DO) MAE: 0.1748 vs 0.2980</text>
    <text x="88" y="501" fill="#cbd5e1" font-family="monospace" font-size="11">41.3% Forecasting Error Reduction • Isolation Forest Anomaly Nu: 0.021</text>
    <rect x="88" y="516" width="145" height="24" rx="6" fill="rgba(52,211,153,0.2)"/>
    <text x="98" y="532" fill="#34d399" font-family="sans-serif" font-size="10" font-weight="600">Walk-Forward Validated</text>

    <!-- Deployment Note -->
    <rect x="68" y="572" width="624" height="110" rx="12" fill="#161f30" stroke="rgba(255,255,255,0.06)"/>
    <text x="88" y="600" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="600">FastAPI ASGI Service &amp; Radar Dashboard</text>
    <text x="88" y="624" fill="#94a3b8" font-family="sans-serif" font-size="11">Deployed on Vercel Serverless with Uvicorn ASGI adapter. Complies with strict lockbox holdouts.</text>
    <text x="88" y="648" fill="#64748b" font-family="monospace" font-size="10">Repository: DurgaPavan0923/RajanaDurgaPavanKumar_C1_ONLINETIHIITG</text>

    <!-- Right Panel: Telemetry Metrics -->
    <rect x="744" y="160" width="416" height="550" rx="18" fill="#0d131f" stroke="rgba(255,255,255,0.08)"/>
    <text x="772" y="198" fill="#94a3b8" font-family="monospace" font-size="12" font-weight="600" letter-spacing="1">VERIFIED EMPIRICAL RESULTS</text>

    <rect x="772" y="215" width="360" height="130" rx="14" fill="#161f30" stroke="rgba(52,211,153,0.3)"/>
    <text x="796" y="252" fill="#94a3b8" font-family="sans-serif" font-size="13">Lockbox PR-AUC (Track B)</text>
    <text x="796" y="305" fill="#34d399" font-family="sans-serif" font-size="48" font-weight="800">0.5951</text>
    <text x="980" y="300" fill="#64748b" font-family="monospace" font-size="12">Baseline: 0.3920</text>

    <rect x="772" y="360" width="172" height="90" rx="12" fill="#131c2e" stroke="rgba(255,255,255,0.06)"/>
    <text x="788" y="386" fill="#94a3b8" font-family="monospace" font-size="10">DO FORECASTER MAE</text>
    <text x="788" y="422" fill="#38bdf8" font-family="sans-serif" font-size="24" font-weight="700">0.1748</text>

    <rect x="960" y="360" width="172" height="90" rx="12" fill="#131c2e" stroke="rgba(255,255,255,0.06)"/>
    <text x="976" y="386" fill="#94a3b8" font-family="monospace" font-size="10">SERVER P50 LATENCY</text>
    <text x="976" y="422" fill="#f59e0b" font-family="sans-serif" font-size="24" font-weight="700">2.89 ms</text>

    <rect x="772" y="468" width="360" height="215" rx="14" fill="#131c2e" stroke="rgba(255,255,255,0.06)"/>
    <text x="796" y="498" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="700">Proven Technologic Base</text>
    <text x="796" y="528" fill="#94a3b8" font-family="sans-serif" font-size="12">• XGBoost with Platt probability calibration</text>
    <text x="796" y="552" fill="#94a3b8" font-family="sans-serif" font-size="12">• Isolation Forest temporal anomaly scoring</text>
    <text x="796" y="576" fill="#94a3b8" font-family="sans-serif" font-size="12">• FastAPI ASGI &amp; Chart.js radar envelopes</text>
    <text x="796" y="600" fill="#94a3b8" font-family="sans-serif" font-size="12">• Fold-isolated scaling (zero data leakage)</text>
    <text x="796" y="640" fill="#64748b" font-family="monospace" font-size="11">Data: Kaggle water potability + CTD streams</text>
  </svg>
  `);

  await sharp(waterSvg)
    .webp({ quality: 90 })
    .toFile(path.join(outDir, 'underwater-analytics.webp'));
  console.log('Created underwater-analytics.webp');
}

createProjectScreenshots().catch(console.error);
