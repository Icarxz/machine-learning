interface LogoProps {
  size?: number;
  style?: React.CSSProperties;
}

export default function Logo({ size = 64, style }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <defs>
        <linearGradient id="cGrad" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#60b8ff" />
          <stop offset="100%" stopColor="#00d4ff" />
        </linearGradient>
        <linearGradient id="hexFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1255cc" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#071b55" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="hexStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a0d4ff" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#3388ff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#00c8ff" stopOpacity="0.9" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="hexClip">
          <polygon points="100,8 182,54 182,146 100,192 18,146 18,54" />
        </clipPath>
      </defs>

      {/* Hex background */}
      <polygon
        points="100,8 182,54 182,146 100,192 18,146 18,54"
        fill="url(#hexFill)"
      />

      {/* Diagonal streaks (clipped to hex) */}
      <g clipPath="url(#hexClip)">
        <line x1="28" y1="178" x2="108" y2="18" stroke="white" strokeWidth="2.5" strokeOpacity="0.85" filter="url(#glow)" />
        <line x1="88" y1="184" x2="168" y2="24" stroke="#60b8ff" strokeWidth="1.5" strokeOpacity="0.55" />
        {/* Subtle grid lines */}
        <line x1="18" y1="100" x2="182" y2="100" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
        <line x1="100" y1="8" x2="100" y2="192" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
      </g>

      {/* Hex border */}
      <polygon
        points="100,8 182,54 182,146 100,192 18,146 18,54"
        fill="none"
        stroke="url(#hexStroke)"
        strokeWidth="3.5"
        filter="url(#glow)"
      />

      {/* Outer C — wide angular geometric shape */}
      <path
        d="M133,52 L72,52 L50,74 L50,126 L72,148 L133,148 L133,126 L82,126 L68,112 L68,88 L82,74 L133,74 Z"
        fill="none"
        stroke="url(#cGrad)"
        strokeWidth="4.5"
        strokeLinejoin="miter"
        filter="url(#softGlow)"
      />

      {/* Inner C — offset inward for layered 3D depth */}
      <path
        d="M124,64 L80,64 L62,82 L62,118 L80,136 L124,136 L124,118 L88,118 L78,108 L78,92 L88,82 L124,82 Z"
        fill="none"
        stroke="rgba(0,190,255,0.55)"
        strokeWidth="2.5"
        strokeLinejoin="miter"
      />

      {/* Innermost C — final depth layer */}
      <path
        d="M115,74 L86,74 L72,88 L72,112 L86,126 L115,126 L115,112 L94,112 L86,104 L86,96 L94,88 L115,88 Z"
        fill="none"
        stroke="rgba(0,140,220,0.3)"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />

      {/* Hex inner border ring */}
      <polygon
        points="100,18 172,60 172,140 100,182 28,140 28,60"
        fill="none"
        stroke="rgba(100,180,255,0.12)"
        strokeWidth="1"
      />
    </svg>
  );
}
