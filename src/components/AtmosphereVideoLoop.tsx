import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Sparkles, Flame, Eye, VolumeX } from 'lucide-react';

export const AtmosphereVideoLoop: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [mood, setMood] = useState<'hearth' | 'pass' | 'salon'>('hearth');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Atmospheric procedural cinematic video canvas simulating live hearth flames, ember swirls, and kitchen pass heat
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    canvas.width = 960;
    canvas.height = 540;

    // Fluid flame and glowing ember particle nodes
    const flames: { x: number; y: number; r: number; vy: number; vx: number; hue: number; alpha: number; life: number; maxLife: number }[] = [];
    const embers: { x: number; y: number; r: number; vy: number; vx: number; alpha: number }[] = [];

    for (let i = 0; i < 60; i++) {
      flames.push({
        x: 480 + (Math.random() - 0.5) * 500,
        y: 450 + Math.random() * 90,
        r: 15 + Math.random() * 40,
        vy: -(1.5 + Math.random() * 3),
        vx: (Math.random() - 0.5) * 1.5,
        hue: 20 + Math.random() * 25,
        alpha: 0.2 + Math.random() * 0.4,
        life: 0,
        maxLife: 60 + Math.random() * 60,
      });
    }

    for (let i = 0; i < 45; i++) {
      embers.push({
        x: Math.random() * 960,
        y: Math.random() * 540,
        r: 1 + Math.random() * 2.5,
        vy: -(0.5 + Math.random() * 1.8),
        vx: (Math.random() - 0.5) * 0.8,
        alpha: 0.3 + Math.random() * 0.6,
      });
    }

    let t = 0;

    const render = () => {
      if (!isPlaying) {
        animId = requestAnimationFrame(render);
        return;
      }

      t += 0.02;
      ctx.clearRect(0, 0, 960, 540);

      // Deep dark cinematic background
      ctx.fillStyle = mood === 'hearth' ? '#0d0906' : mood === 'pass' ? '#120d0a' : '#0a0a09';
      ctx.fillRect(0, 0, 960, 540);

      // Atmospheric gradient backdrop
      const baseGrad = ctx.createRadialGradient(480, 480, 30, 480, 320, 480);
      if (mood === 'hearth') {
        baseGrad.addColorStop(0, 'rgba(215, 95, 25, 0.42)');
        baseGrad.addColorStop(0.5, 'rgba(199, 168, 92, 0.15)');
        baseGrad.addColorStop(1, 'rgba(11, 10, 9, 0)');
      } else if (mood === 'pass') {
        baseGrad.addColorStop(0, 'rgba(235, 175, 75, 0.35)');
        baseGrad.addColorStop(0.6, 'rgba(140, 45, 20, 0.12)');
        baseGrad.addColorStop(1, 'rgba(11, 10, 9, 0)');
      } else {
        baseGrad.addColorStop(0, 'rgba(199, 168, 92, 0.22)');
        baseGrad.addColorStop(0.6, 'rgba(45, 35, 25, 0.1)');
        baseGrad.addColorStop(1, 'rgba(11, 10, 9, 0)');
      }
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, 960, 540);

      // Flame bodies
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (const f of flames) {
        f.life++;
        f.y += f.vy;
        f.x += f.vx + Math.sin(t + f.y * 0.02) * 0.8;

        const progress = f.life / f.maxLife;
        const currentAlpha = (1 - progress) * f.alpha;

        const fg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
        fg.addColorStop(0, `hsla(${f.hue + 15}, 100%, 80%, ${currentAlpha})`);
        fg.addColorStop(0.5, `hsla(${f.hue}, 95%, 50%, ${currentAlpha * 0.6})`);
        fg.addColorStop(1, 'transparent');

        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();

        if (f.life >= f.maxLife || f.y < 120) {
          f.life = 0;
          f.y = 480 + Math.random() * 50;
          f.x = 480 + (Math.random() - 0.5) * 500;
        }
      }

      // Embers
      for (const e of embers) {
        e.y += e.vy;
        e.x += e.vx + Math.sin(t * 2 + e.y * 0.03) * 0.5;
        if (e.y < 0) e.y = 540;

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 215, 140, ${e.alpha})`;
        ctx.fill();
      }
      ctx.restore();

      // Film grain / texture overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      for (let i = 0; i < 20; i++) {
        ctx.fillRect(Math.random() * 960, Math.random() * 540, 2, 1);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, mood]);

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-[#c7a85c]/35 bg-[#0b0a09] shadow-2xl ${className}`}>
      {/* Visual Canvas loop */}
      <canvas ref={canvasRef} className="h-full w-full object-cover" />

      {/* Atmospheric Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0a09] via-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0b0a09_100%)] opacity-85" />

      {/* Top Header Badge */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.24em] text-white/80">Live Kitchen Atmosphere</span>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1 backdrop-blur-md text-[9px] uppercase tracking-[0.2em] text-[#e5c97d]">
          <VolumeX size={12} className="text-[#c7a85c]" />
          <span>Soundless Ambient Loop</span>
        </div>
      </div>

      {/* Bottom Controls & Narrative */}
      <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#e5c97d] flex items-center gap-1.5">
            <Flame size={13} className="text-[#e5c97d]" />
            <span>The Living Pass · Soho Hearth</span>
          </span>
          <h4 className="font-serif text-xl sm:text-2xl text-white mt-1">
            {mood === 'hearth'
              ? 'White-Oak Embers at 420°C'
              : mood === 'pass'
              ? 'Plating Inspection & Garnish Pass'
              : 'Candlelight in the Main Salon'}
          </h4>
        </div>

        <div className="flex items-center gap-3">
          {/* Mood Selector */}
          <div className="flex items-center rounded-full border border-white/20 bg-black/70 p-1 backdrop-blur-md">
            {(
              [
                ['hearth', 'Hearth'],
                ['pass', 'The Pass'],
                ['salon', 'Salon'],
              ] as const
            ).map(([m, label]) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`rounded-full px-3 py-1 text-[9px] uppercase tracking-[0.16em] transition-all cursor-pointer ${
                  mood === m ? 'bg-[#c7a85c] text-[#0b0a09] font-medium' : 'text-white/60 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Pause / Play button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn-pill-3d flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/70 text-white hover:border-[#c7a85c] hover:text-[#c7a85c] transition-all cursor-pointer"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
