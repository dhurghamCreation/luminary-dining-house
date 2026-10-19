import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Flame, Move } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  alpha: number;
  maxLife: number;
  life: number;
  hue: number;
  sparkleSpeed: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const EmberCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [intensity, setIntensity] = useState<'gentle' | 'vibrant' | 'blaze'>('vibrant');
  const [interactiveMode, setInteractiveMode] = useState<'attract' | 'ignite'>('ignite');
  const [sparksCount, setSparksCount] = useState(0);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -100, y: -100, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const maxParticles = intensity === 'gentle' ? 70 : intensity === 'vibrant' ? 140 : 220;
    particlesRef.current = [];

    const createParticle = (spawnX?: number, spawnY?: number, isBurst?: boolean): Particle => {
      const x = spawnX !== undefined ? spawnX : Math.random() * width;
      const y = spawnY !== undefined ? spawnY : height + 10 + Math.random() * 40;
      const baseSize = isBurst ? 2 + Math.random() * 3.5 : 1.2 + Math.random() * 2.8;
      const vy = isBurst
        ? -(2.5 + Math.random() * 5.5)
        : -(0.6 + Math.random() * 1.8);
      const vx = isBurst
        ? (Math.random() - 0.5) * 6
        : (Math.random() - 0.5) * 1.2;
      const maxLife = isBurst ? 50 + Math.random() * 80 : 120 + Math.random() * 200;
      const hue = isBurst ? 38 + Math.random() * 18 : 22 + Math.random() * 26;

      return {
        x,
        y,
        vx,
        vy,
        size: baseSize,
        baseSize,
        alpha: 0,
        maxLife,
        life: 0,
        hue,
        sparkleSpeed: 0.05 + Math.random() * 0.12,
      };
    };

    // Pre-populate particles
    for (let i = 0; i < maxParticles; i++) {
      const p = createParticle(Math.random() * width, Math.random() * height);
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Ambient radial warm hearth base
      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.95,
        10,
        width / 2,
        height * 0.7,
        width * 0.65
      );
      gradient.addColorStop(0, 'rgba(215, 120, 30, 0.22)');
      gradient.addColorStop(0.4, 'rgba(199, 168, 92, 0.08)');
      gradient.addColorStop(1, 'rgba(11, 10, 9, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render expanding shockwaves from clicks
      for (let sIdx = shockwavesRef.current.length - 1; sIdx >= 0; sIdx--) {
        const sw = shockwavesRef.current[sIdx];
        sw.radius += 4;
        sw.alpha = Math.max(0, 1 - sw.radius / sw.maxRadius);

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(240, 217, 154, ${sw.alpha * 0.7})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = 'rgba(230, 140, 40, 0.8)';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.restore();

        if (sw.radius >= sw.maxRadius) {
          shockwavesRef.current.splice(sIdx, 1);
        }
      }

      // Cursor heat spot
      if (mouseRef.current.active) {
        const cursorGlow = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          95
        );
        cursorGlow.addColorStop(0, 'rgba(245, 225, 160, 0.28)');
        cursorGlow.addColorStop(0.5, 'rgba(208, 122, 36, 0.12)');
        cursorGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = cursorGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw and update embers
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        // Turbulence
        const noise = Math.sin(time + p.y * 0.02) * 0.45;
        p.x += p.vx + noise;
        p.y += p.vy;

        // Mouse interaction
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const force = (140 - dist) / 140;
            if (interactiveMode === 'attract') {
              p.x += (dx / dist) * force * 2.2;
              p.y += (dy / dist) * force * 2.2;
            } else {
              p.x -= (dx / dist) * force * 2.5;
              p.y -= force * 3.5;
              p.size = p.baseSize * (1 + force * 1.3);
            }
          }
        }

        // Alpha fade
        const progress = p.life / p.maxLife;
        if (progress < 0.15) {
          p.alpha = progress / 0.15;
        } else if (progress > 0.65) {
          p.alpha = 1 - (progress - 0.65) / 0.35;
        } else {
          p.alpha = 1;
        }

        const flicker = Math.sin(p.life * p.sparkleSpeed) * 0.3 + 0.9;
        const currentSize = Math.max(0.5, p.size * flicker);

        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        // Outer halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 95%, 55%, ${p.alpha * 0.35})`;
        ctx.fill();

        // Inner core
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue + 12}, 100%, 88%, ${p.alpha * 0.95})`;
        ctx.fill();

        ctx.restore();

        if (p.life >= p.maxLife || p.y < -20 || p.x < -20 || p.x > width + 20) {
          particles[i] = createParticle();
        }
      }

      while (particles.length < maxParticles) {
        particles.push(createParticle());
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity, interactiveMode]);

  // FULLY FIXED CLICK TO SPARK FIRE
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    setSparksCount((c) => c + 40);

    // 1. Add shockwave
    shockwavesRef.current.push({
      x: clickX,
      y: clickY,
      radius: 5,
      maxRadius: 85,
      alpha: 1,
    });

    // 2. Spawn 45 burst sparks radiating from click
    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 6.5;
      const baseSize = 2 + Math.random() * 3.5;
      const hue = 32 + Math.random() * 24;

      particlesRef.current.push({
        x: clickX + (Math.random() - 0.5) * 10,
        y: clickY + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        size: baseSize,
        baseSize,
        alpha: 1,
        maxLife: 60 + Math.random() * 70,
        life: 0,
        hue,
        sparkleSpeed: 0.1 + Math.random() * 0.15,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div className="relative h-[480px] w-full overflow-hidden border-y border-[var(--line)] bg-[#0e0c0a] select-none">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0 h-full w-full cursor-crosshair active:scale-[0.998] transition-transform"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0b0a09_100%)]" />

      {/* Floating UI overlay */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-12 pointer-events-none">
        <div className="flex flex-wrap items-center justify-between gap-4 pointer-events-auto">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#c7a85c]">
              <Flame size={14} className="animate-flame text-[#e5c97d]" />
              <span>Living Hearth · Wood-Fired Kitchen</span>
            </div>
            <h2 className="mt-2 font-serif text-3xl md:text-5xl text-white tracking-tight">
              Where fire becomes <em className="text-[#c7a85c] font-normal">flavor.</em>
            </h2>
          </div>

          {/* Hearth intensity controls */}
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/70 p-1.5 backdrop-blur-md">
            <span className="px-2 text-[9px] uppercase tracking-[0.2em] text-white/50">Flame:</span>
            {(['gentle', 'vibrant', 'blaze'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setIntensity(mode)}
                className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] transition-all duration-150 active:scale-95 cursor-pointer ${
                  intensity === mode
                    ? 'bg-[#c7a85c] text-[#0b0a09] font-medium shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6 pointer-events-auto">
          <p className="max-w-md text-xs leading-6 text-white/65">
            Every service is lit with white-oak embers from the Hudson Valley. Click anywhere to ignite fiery bursts of sparks and watch the heat rise.
          </p>

          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.24em] text-[#c7a85c]">
            <button
              onClick={() => setInteractiveMode(interactiveMode === 'ignite' ? 'attract' : 'ignite')}
              className="flex items-center gap-2 rounded-full border border-[#c7a85c]/40 bg-[#c7a85c]/10 px-3.5 py-1.5 text-[#f6f2e9] transition-all duration-150 active:scale-95 cursor-pointer hover:border-[#c7a85c] hover:bg-[#c7a85c]/25"
            >
              <Move size={12} className="text-[#c7a85c]" />
              <span>Mode: {interactiveMode === 'ignite' ? 'Thermal Gust' : 'Ember Vortex'}</span>
            </button>

            {sparksCount > 0 && (
              <span className="rounded-full bg-black/60 border border-[#c7a85c]/30 px-3 py-1 text-[#e5c97d]">
                {sparksCount} Sparks Ignited
              </span>
            )}
            <span className="hidden sm:inline text-white/40">· Click to spark fire</span>
          </div>
        </div>
      </div>
    </div>
  );
};
