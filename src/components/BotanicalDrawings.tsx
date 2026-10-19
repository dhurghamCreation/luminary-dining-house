import React from 'react';

export const JuniperBranch: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} stroke="currentColor">
    <path d="M50 90C48 65 52 40 50 10" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
    {/* Needles */}
    <path d="M49 70L28 58M51 68L72 56M50 50L30 40M50 48L70 38M49 32L32 24M51 30L68 22" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M49 80L34 74M51 78L66 72M50 60L36 54M50 58L64 52" strokeWidth="1.2" strokeLinecap="round" />
    {/* Berries */}
    <circle cx="34" cy="54" r="3.5" fill="#4d5a6c" strokeWidth="0.8" opacity="0.85" />
    <circle cx="64" cy="52" r="3.2" fill="#4d5a6c" strokeWidth="0.8" opacity="0.85" />
    <circle cx="48" cy="38" r="3" fill="#4d5a6c" strokeWidth="0.8" opacity="0.85" />
  </svg>
);

export const MorelMushroom: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} stroke="currentColor">
    {/* Stem */}
    <path d="M42 65C40 78 41 90 44 94C48 95 52 95 56 94C59 90 60 78 58 65" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
    {/* Cap conical */}
    <path d="M50 10C34 26 30 48 40 65C46 68 54 68 60 65C70 48 66 26 50 10Z" strokeWidth="1.5" strokeLinecap="round" />
    {/* Honeycomb alveoli cells */}
    <ellipse cx="48" cy="22" rx="4" ry="5" strokeWidth="1" opacity="0.6" />
    <ellipse cx="42" cy="32" rx="5" ry="6" strokeWidth="1" opacity="0.6" />
    <ellipse cx="56" cy="32" rx="5" ry="5.5" strokeWidth="1" opacity="0.6" />
    <ellipse cx="38" cy="45" rx="6" ry="6" strokeWidth="1" opacity="0.6" />
    <ellipse cx="50" cy="44" rx="5" ry="6" strokeWidth="1" opacity="0.6" />
    <ellipse cx="62" cy="45" rx="5.5" ry="6" strokeWidth="1" opacity="0.6" />
    <ellipse cx="44" cy="56" rx="5" ry="5" strokeWidth="1" opacity="0.6" />
    <ellipse cx="56" cy="56" rx="5" ry="5" strokeWidth="1" opacity="0.6" />
  </svg>
);

export const SeaUrchinDrawing: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} stroke="currentColor">
    {/* Shell core */}
    <circle cx="50" cy="50" r="16" strokeWidth="1.5" opacity="0.75" />
    <circle cx="50" cy="50" r="10" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
    {/* Radiating spikes */}
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * Math.PI * 2) / 24;
      const inner = 17;
      const outer = 36 + (i % 2 === 0 ? 8 : -4);
      const x1 = 50 + Math.cos(angle) * inner;
      const y1 = 50 + Math.sin(angle) * inner;
      const x2 = 50 + Math.cos(angle) * outer;
      const y2 = 50 + Math.sin(angle) * outer;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />;
    })}
  </svg>
);

export const OakFlameEmblem: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} stroke="currentColor">
    <path
      d="M50 12C50 12 66 32 66 52C66 66 58 78 50 84C42 78 34 66 34 52C34 32 50 12 50 12Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path
      d="M50 36C50 36 58 48 58 60C58 68 54 74 50 78C46 74 42 68 42 60C42 48 50 36 50 36Z"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Embers */}
    <circle cx="50" cy="88" r="2" fill="currentColor" opacity="0.7" />
    <circle cx="42" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
    <circle cx="60" cy="28" r="1.5" fill="currentColor" opacity="0.6" />
  </svg>
);
