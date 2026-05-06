import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Logo from '../components/Logo';

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');`;

const styles = `
  ${FONTS}

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ap-root {
    min-height: 100vh;
    background: #050c1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Rajdhani', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .ap-bg {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='92'%3E%3Cpolygon points='40,4 76,24 76,68 40,88 4,68 4,24' fill='none' stroke='rgba(30%2C90%2C200%2C0.09)' stroke-width='1'/%3E%3C/svg%3E");
    background-size: 80px 92px;
  }

  .ap-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(70px);
    pointer-events: none;
  }
  .ap-orb--1 { width:400px; height:400px; background:rgba(11,100,255,0.13); top:-10%; right:-10%; }
  .ap-orb--2 { width:300px; height:300px; background:rgba(0,190,255,0.10); bottom:-5%; left:-5%; }

  /* Card */
  .ap-card {
    position: relative;
    z-index: 10;
    width: 90%;
    max-width: 460px;
    background: rgba(7, 18, 45, 0.72);
    border: 1px solid rgba(30, 110, 255, 0.22);
    border-radius: 4px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 80px rgba(11, 100, 255, 0.12), inset 0 1px 0 rgba(150, 200, 255, 0.07);
    padding: 48px 44px 44px;
    animation: ap-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  @keyframes ap-in {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* Logo */
  .ap-logo-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 28px;
    filter: drop-shadow(0 0 18px rgba(0,160,255,0.45));
  }
  .ap-brand-name {
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 4px;
    color: rgba(0,190,255,0.65);
    text-transform: uppercase;
    margin-top: 12px;
  }

  /* Tabs */
  .ap-tabs {
    display: flex;
    margin-bottom: 32px;
    border-bottom: 1px solid rgba(30, 100, 200, 0.2);
  }
  .ap-tab {
    flex: 1;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 10px 0 14px;
    color: rgba(80, 140, 200, 0.55);
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: color 0.2s, border-color 0.2s;
  }
  .ap-tab--active {
    color: #00c8ff;
    border-bottom-color: #00c8ff;
  }
  .ap-tab:hover:not(.ap-tab--active) {
    color: rgba(120, 180, 230, 0.8);
  }

  /* Fields */
  .ap-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 18px;
  }
  .ap-label {
    font-family: 'Orbitron', monospace;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: rgba(100, 160, 210, 0.7);
  }
  .ap-input-wrap {
    position: relative;
  }
  .ap-input {
    width: 100%;
    background: rgba(5, 15, 40, 0.8);
    border: 1px solid rgba(30, 100, 200, 0.28);
    border-radius: 2px;
    color: #d0e8ff;
    font-family: 'Rajdhani', sans-serif;
    font-size: 15px;
    font-weight: 500;
    padding: 12px 16px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .ap-input:focus {
    border-color: rgba(0, 180, 255, 0.55);
    box-shadow: 0 0 0 3px rgba(0, 180, 255, 0.1), 0 0 16px rgba(0, 140, 255, 0.15);
  }
  .ap-input::placeholder { color: rgba(60, 110, 160, 0.5); }

  /* Submit button */
  .ap-submit {
    width: 100%;
    margin-top: 8px;
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #ffffff;
    background: linear-gradient(135deg, #0b5cff 0%, #0090e0 100%);
    border: none;
    cursor: pointer;
    padding: 15px;
    border-radius: 2px;
    position: relative;
    overflow: hidden;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 0 0 1px rgba(0, 180, 255, 0.3), 0 6px 24px rgba(11, 100, 255, 0.35);
  }
  .ap-submit::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%);
  }
  .ap-submit:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 0 0 1px rgba(0,200,255,0.5), 0 10px 32px rgba(11,100,255,0.5);
  }
  .ap-submit:active:not(:disabled) { transform: translateY(0); }
  .ap-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  /* Message banners */
  .ap-msg {
    margin-top: 16px;
    padding: 11px 16px;
    border-radius: 2px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.3px;
    text-align: center;
    animation: ap-msg-in 0.3s ease both;
  }
  @keyframes ap-msg-in {
    from { opacity:0; transform:translateY(-6px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .ap-msg--error {
    background: rgba(255, 50, 80, 0.12);
    border: 1px solid rgba(255, 80, 100, 0.3);
    color: #ff8099;
  }
  .ap-msg--success {
    background: rgba(0, 200, 120, 0.1);
    border: 1px solid rgba(0, 200, 120, 0.3);
    color: #50e8a0;
  }

  /* Divider */
  .ap-card-divider {
    width: 40px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #0b72ff, transparent);
    margin: 0 auto 28px;
  }

  /* Back link */
  .ap-back {
    display: block;
    text-align: center;
    margin-top: 22px;
    font-size: 12px;
    color: rgba(80, 140, 200, 0.5);
    cursor: pointer;
    font-family: 'Orbitron', monospace;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    transition: color 0.2s;
    background: none;
    border: none;
  }
  .ap-back:hover { color: rgba(0, 190, 255, 0.8); }
`;

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    styleRef.current = el;
    return () => { el.remove(); };
  }, []);

  const handleSubmit = async () => {
    if (!email || !password) {
      setMessage({ type: 'error', text: 'Email and password are required.' });
      return;
    }
    setLoading(true);
    setMessage(null);

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage({ type: 'error', text: error.message });
      else setMessage({ type: 'success', text: 'Account created! Check your email to confirm.' });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage({ type: 'error', text: error.message });
      else navigate('/dashboard');
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="ap-root">
      <div className="ap-bg" />
      <div className="ap-orb ap-orb--1" />
      <div className="ap-orb ap-orb--2" />

      <div className="ap-card">
        <div className="ap-logo-row">
          <Logo size={72} />
          <span className="ap-brand-name">Machine Learning Hub</span>
        </div>

        <div className="ap-card-divider" />

        <div className="ap-tabs">
          <button
            className={`ap-tab ${mode === 'login' ? 'ap-tab--active' : ''}`}
            onClick={() => { setMode('login'); setMessage(null); }}
          >
            Login
          </button>
          <button
            className={`ap-tab ${mode === 'signup' ? 'ap-tab--active' : ''}`}
            onClick={() => { setMode('signup'); setMessage(null); }}
          >
            Sign Up
          </button>
        </div>

        <div className="ap-field">
          <label className="ap-label">Email Address</label>
          <div className="ap-input-wrap">
            <input
              className="ap-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="ap-field">
          <label className="ap-label">Password</label>
          <div className="ap-input-wrap">
            <input
              className="ap-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            />
          </div>
        </div>

        <button
          className="ap-submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Create Account'}
        </button>

        {message && (
          <div className={`ap-msg ap-msg--${message.type}`}>
            {message.text}
          </div>
        )}

        <button className="ap-back" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
