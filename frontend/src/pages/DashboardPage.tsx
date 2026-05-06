import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Logo from '../components/Logo';

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');`;

const styles = `
  ${FONTS}

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .dp-root {
    min-height: 100vh;
    background: #050c1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Rajdhani', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .dp-bg {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='92'%3E%3Cpolygon points='40,4 76,24 76,68 40,88 4,68 4,24' fill='none' stroke='rgba(30%2C90%2C200%2C0.09)' stroke-width='1'/%3E%3C/svg%3E");
    background-size: 80px 92px;
  }

  .dp-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(70px);
    pointer-events: none;
  }
  .dp-orb--1 { width: 400px; height: 400px; background: rgba(11,100,255,0.13); top: -10%; right: -10%; }
  .dp-orb--2 { width: 300px; height: 300px; background: rgba(0,190,255,0.10); bottom: -5%; left: -5%; }

  .dp-card {
    position: relative;
    z-index: 10;
    width: 90%;
    max-width: 460px;
    background: rgba(7, 18, 45, 0.72);
    border: 1px solid rgba(30, 110, 255, 0.22);
    border-radius: 4px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 80px rgba(11, 100, 255, 0.12), inset 0 1px 0 rgba(150, 200, 255, 0.07);
    padding: 48px 44px;
    text-align: center;
    animation: dp-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes dp-in {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .dp-logo-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    filter: drop-shadow(0 0 18px rgba(0,160,255,0.45));
  }

  .dp-heading {
    font-family: 'Orbitron', monospace;
    font-size: 22px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 16px;
    letter-spacing: 1px;
  }

  .dp-text {
    font-size: 16px;
    color: rgba(160, 200, 240, 0.7);
    margin-bottom: 36px;
    line-height: 1.5;
  }

  .dp-email {
    display: block;
    margin-top: 8px;
    color: #00c8ff;
    font-weight: 600;
    letter-spacing: 0.5px;
    font-size: 18px;
  }

  .dp-logout {
    width: 100%;
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #ff6b6b;
    background: rgba(255, 50, 80, 0.08);
    border: 1px solid rgba(255, 80, 100, 0.3);
    cursor: pointer;
    padding: 15px;
    border-radius: 2px;
    transition: all 0.2s ease;
  }

  .dp-logout:hover {
    background: rgba(255, 50, 80, 0.15);
    box-shadow: 0 0 15px rgba(255, 50, 80, 0.2);
    transform: translateY(-1px);
  }

  .dp-spinner {
    color: #00c8ff;
    font-size: 14px;
    font-family: 'Orbitron', monospace;
    letter-spacing: 4px;
    animation: dp-pulse 1.5s infinite;
  }

  @keyframes dp-pulse {
    0% { opacity: 0.4; }
    50% { opacity: 1; }
    100% { opacity: 0.4; }
  }
`;

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | undefined>('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  // Inject styles on mount
  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    styleRef.current = el;
    return () => { el.remove(); };
  }, []);

  // Verify session
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth'); // Boot them out if not logged in
      } else {
        setUserEmail(session.user.email);
      }
      setLoading(false);
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="dp-root">
        <div className="dp-bg" />
        <div className="dp-spinner">INITIALIZING...</div>
      </div>
    );
  }

  return (
    <div className="dp-root">
      <div className="dp-bg" />
      <div className="dp-orb dp-orb--1" />
      <div className="dp-orb dp-orb--2" />

      <div className="dp-card">
        <div className="dp-logo-wrap">
          <Logo size={72} />
        </div>

        <h1 className="dp-heading">Welcome to the Dashboard!</h1>
        
        <p className="dp-text">
          You are successfully logged in as:
          <span className="dp-email">{userEmail}</span>
        </p>

        <button className="dp-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}