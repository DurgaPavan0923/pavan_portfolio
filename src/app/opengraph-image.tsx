import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Rajana Durga Pavan Kumar — AI & Machine Learning Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 70px',
          backgroundColor: '#050814',
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Header Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 20px',
              backgroundColor: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '9999px',
            }}
          >
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#38bdf8' }} />
            <span style={{ fontSize: '16px', color: '#38bdf8', letterSpacing: '0.05em', fontWeight: 600 }}>
              AI & MACHINE LEARNING ENGINEER
            </span>
          </div>

          <div
            style={{
              fontSize: '18px',
              color: '#94a3b8',
              letterSpacing: '0.05em',
            }}
          >
            pavan-portfolio-gamma-six.vercel.app
          </div>
        </div>

        {/* Center Main Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1
            style={{
              fontSize: '56px',
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              background: 'linear-gradient(to right, #ffffff, #e2e8f0)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Rajana Durga Pavan Kumar
          </h1>
          <p
            style={{
              fontSize: '24px',
              color: '#38bdf8',
              margin: 0,
              fontWeight: 600,
            }}
          >
            Building RAG Systems, Multi-Agent AI & Scalable Cloud ML
          </p>
          <p
            style={{
              fontSize: '18px',
              color: '#94a3b8',
              margin: 0,
              maxWidth: '900px',
              lineHeight: 1.5,
            }}
          >
            SOA University (ITER) · TIH IIT Guwahati Intern · Neo4j Certified · Google Cloud Arcade Diamond
          </p>
        </div>

        {/* Bottom Feature Badges */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {['Graph RAG (Neo4j)', 'Pinecone Vector DB', 'Google Gemini API', 'PyTorch & NLP', 'Next.js 15'].map(
            (pill, idx) => (
              <div
                key={idx}
                style={{
                  padding: '8px 18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: '#cbd5e1',
                  fontWeight: 500,
                }}
              >
                {pill}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
