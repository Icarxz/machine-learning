import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');
`;

const styles = `
  ${FONTS}

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lp-root {
    min-height: 100vh;
    background: #050c1a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    font-family: 'Rajdhani', sans-serif;
  }

  /* Hex grid background */
  .lp-bg {
    position: absolute;
    inset: 0;
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='92'%3E%3Cpolygon points='40,4 76,24 76,68 40,88 4,68 4,24' fill='none' stroke='rgba(30%2C90%2C200%2C0.10)' stroke-width='1'/%3E%3C/svg%3E");
    background-size: 80px 92px;
    opacity: 1;
  }

  /* Radial glow at center */
  .lp-glow-center {
    position: absolute;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(11,114,255,0.12) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  /* Corner accent lines */
  .lp-corner {
    position: absolute;
    width: 120px;
    height: 120px;
    pointer-events: none;
  }
  .lp-corner--tl { top: 32px; left: 32px; border-top: 2px solid rgba(0,180,255,0.4); border-left: 2px solid rgba(0,180,255,0.4); }
  .lp-corner--tr { top: 32px; right: 32px; border-top: 2px solid rgba(0,180,255,0.4); border-right: 2px solid rgba(0,180,255,0.4); }
  .lp-corner--bl { bottom: 32px; left: 32px; border-bottom: 2px solid rgba(0,180,255,0.4); border-left: 2px solid rgba(0,180,255,0.4); }
  .lp-corner--br { bottom: 32px; right: 32px; border-bottom: 2px solid rgba(0,180,255,0.4); border-right: 2px solid rgba(0,180,255,0.4); }

  /* Floating hex orbs */
  .lp-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
    animation: lp-orb-float 8s ease-in-out infinite alternate;
  }
  .lp-orb--1 {
    width: 300px; height: 300px;
    background: rgba(11, 114, 255, 0.15);
    top: 10%; left: -5%;
    animation-delay: 0s;
  }
  .lp-orb--2 {
    width: 250px; height: 250px;
    background: rgba(0, 200, 255, 0.12);
    bottom: 15%; right: 0%;
    animation-delay: -3s;
  }
  @keyframes lp-orb-float {
    from { transform: translateY(0px) scale(1); }
    to   { transform: translateY(-30px) scale(1.05); }
  }

  /* Content card */
  .lp-card {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 64px 56px;
    max-width: 640px;
    width: 90%;
    background: rgba(8, 20, 50, 0.6);
    border: 1px solid rgba(30, 110, 255, 0.22);
    border-radius: 4px;
    backdrop-filter: blur(16px);
    box-shadow: 0 0 80px rgba(11, 100, 255, 0.12), inset 0 1px 0 rgba(150, 200, 255, 0.08);
    animation: lp-card-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  @keyframes lp-card-in {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Logo wrapper */
  .lp-logo-wrap {
    margin-bottom: 28px;
    animation: lp-logo-in 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
    filter: drop-shadow(0 0 24px rgba(0, 160, 255, 0.5));
  }
  @keyframes lp-logo-in {
    from { opacity: 0; transform: scale(0.8); }
    to   { opacity: 1; transform: scale(1); }
  }

  /* Brand label */
  .lp-brand {
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: rgba(0, 190, 255, 0.7);
    margin-bottom: 16px;
    animation: lp-fade-up 0.8s ease 0.3s both;
  }

  /* Main heading */
  .lp-heading {
    font-family: 'Orbitron', monospace;
    font-size: clamp(26px, 4vw, 36px);
    font-weight: 900;
    line-height: 1.15;
    background: linear-gradient(135deg, #ffffff 20%, #60b8ff 60%, #00d4ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
    animation: lp-fade-up 0.8s ease 0.45s both;
  }

  /* Divider line */
  .lp-divider {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #0b72ff, #00c8ff, transparent);
    margin: 0 auto 24px;
    animation: lp-fade-up 0.8s ease 0.55s both;
  }

  /* Description */
  .lp-desc {
    font-size: 15px;
    font-weight: 400;
    line-height: 1.7;
    color: rgba(160, 200, 240, 0.75);
    margin-bottom: 40px;
    animation: lp-fade-up 0.8s ease 0.65s both;
  }

  /* CTA button */
  .lp-btn {
    font-family: 'Orbitron', monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #ffffff;
    background: linear-gradient(135deg, #0b5cff 0%, #0090e0 100%);
    border: none;
    cursor: pointer;
    padding: 16px 44px;
    border-radius: 2px;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 0 0 1px rgba(0, 180, 255, 0.3), 0 8px 32px rgba(11, 100, 255, 0.35);
    animation: lp-fade-up 0.8s ease 0.75s both;
  }
  .lp-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
    pointer-events: none;
  }
  .lp-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 0 1px rgba(0, 200, 255, 0.5), 0 12px 40px rgba(11, 100, 255, 0.5);
  }
  .lp-btn:active {
    transform: translateY(0px);
  }

  /* Scan line effect */
  .lp-scanline {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px);
    pointer-events: none;
    z-index: 0;
    border-radius: 4px;
    overflow: hidden;
  }

  /* Footer tag */
  .lp-footer {
    position: absolute;
    bottom: 24px;
    font-family: 'Orbitron', monospace;
    font-size: 9px;
    letter-spacing: 3px;
    color: rgba(60, 120, 180, 0.4);
    text-transform: uppercase;
    z-index: 10;
    animation: lp-fade-up 1s ease 1s both;
  }

  @keyframes lp-fade-up {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

export default function LandingPage() {
  const navigate = useNavigate();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    styleRef.current = el;
    return () => { el.remove(); };
  }, []);

  return (
    <div className="lp-root">
      <div className="lp-bg" />
      <div className="lp-glow-center" />
      <div className="lp-orb lp-orb--1" />
      <div className="lp-orb lp-orb--2" />
      <div className="lp-corner lp-corner--tl" />
      <div className="lp-corner lp-corner--tr" />
      <div className="lp-corner lp-corner--bl" />
      <div className="lp-corner lp-corner--br" />

      <div className="lp-card">
        <div className="lp-scanline" />

        <div className="lp-logo-wrap">
          <Logo size={90} />
        </div>

        <p className="lp-brand">System Integration &amp; Architecture</p>

        <h1 className="lp-heading">Machine Learning Hub</h1>

        <div className="lp-divider" />

        <p className="lp-desc">
          A simple, integrated platform for exploring machine learning concepts —
          built with React, Supabase Authentication, and deployed on Vercel.
        </p>

        <button className="lp-btn" onClick={() => navigate('/auth')}>
          Get Started
        </button>
      </div>

      <p className="lp-footer">Powered by Supabase &amp; Vercel</p>
    </div>
  );
}
