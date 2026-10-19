import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, X, Maximize2, Sparkles, Volume2, VolumeX, Flame, Film } from 'lucide-react';
import openFireImg from '../assets/images/luminary_open_fire_1791143030752.jpg';
import heroDiningImg from '../assets/images/luminary_hero_dining_1791143020999.jpg';
import conservatoryImg from '../assets/images/luminary_conservatory_1791155233511.jpg';
import platedDishImg from '../assets/images/luminary_plated_dish_1791143053718.jpg';

interface PromotionalVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHAPTERS = [
  {
    time: '0:00',
    title: 'Act I: Ocean & Tidal Salt',
    location: 'Peconic Bay Oyster Grounds · 05:00 AM',
    image: platedDishImg,
    narration: 'Before the city wakes, the first dayboats pull into the cold Atlantic shelf. Salinity is our first brushstroke.',
  },
  {
    time: '0:45',
    title: 'Act II: The White-Oak Hearth',
    location: '18 Mercer Street Kitchen · 02:00 PM',
    image: openFireImg,
    narration: 'White-oak binchotan logs are stacked with geometric care. Live fire transforms heat into an unhurried culinary language.',
  },
  {
    time: '1:30',
    title: 'Act III: The Plating Atelier',
    location: 'The Pass Sketchboard · 05:15 PM',
    image: conservatoryImg,
    narration: 'Every plate is drafted on watercolor stock before the stoves ignite. Precision meeting spontaneous beauty.',
  },
  {
    time: '2:15',
    title: 'Act IV: Dusk in Soho',
    location: 'Main Salon & Conservatory · 07:30 PM',
    image: heroDiningImg,
    narration: 'Candlelight hits the dark walnut tables. Thirty-one artisans move in synchronized silence. Dinner begins.',
  },
];

export const PromotionalVideoModal: React.FC<PromotionalVideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto progression of scenes
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentChapter((c) => (c + 1) % CHAPTERS.length);
          return 0;
        }
        return prev + 1.25;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  // Ambient film grain & 3D particle dust canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    canvas.width = 640;
    canvas.height = 360;

    const particles: { x: number; y: number; s: number; vx: number; vy: number; a: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * 640,
        y: Math.random() * 360,
        s: 1 + Math.random() * 2.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.3 - Math.random() * 0.5,
        a: 0.2 + Math.random() * 0.6,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, 640, 360);

      // 3D golden floating embers
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) p.y = 360;
        if (p.x < 0) p.x = 640;
        if (p.x > 640) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 201, 125, ${p.a})`;
        ctx.fill();
      }
      ctx.restore();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, [isOpen]);

  if (!isOpen) return null;

  const chapter = CHAPTERS[currentChapter];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-2xl animate-fade-up"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-5xl rounded-3xl border border-[#c7a85c]/40 bg-[#0e0c0a] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
        {/* Top bar with Red hover close button */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#14120f]">
          <div className="flex items-center gap-3">
            <Film size={16} className="text-[#c7a85c]" />
            <span className="font-serif text-sm tracking-[0.24em] text-white">
              LUMINARY · CINEMATIC TRAILER (2026)
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-white/15 p-1.5 text-white/60 transition-all duration-200 active:scale-90 cursor-pointer hover:text-red-500 hover:bg-red-500/15 hover:border-red-500/50"
            aria-label="Close documentary film"
            title="Close film"
          >
            <X size={18} />
          </button>
        </div>

        {/* 2.39:1 Anamorphic Cinema Viewport */}
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-black select-none">
          {/* Chapter Background Slide with Smooth Parallax Zoom */}
          <img
            src={chapter.image}
            alt={chapter.title}
            className="h-full w-full object-cover transition-all duration-1000 scale-105"
            referrerPolicy="no-referrer"
          />

          {/* Anamorphic Blue / Amber Lens Flare and Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#000000_100%)] opacity-80" />

          {/* 3D Embers Overlay Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />

          {/* On-Screen Cinematic Subtitles */}
          <div className="absolute bottom-10 left-8 right-8 z-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#e5c97d] flex items-center gap-2 mb-2">
              <Sparkles size={12} />
              <span>{chapter.location}</span>
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-white font-normal drop-shadow-lg">
              {chapter.title}
            </h3>
            <p className="mt-2 text-xs md:text-sm font-serif italic text-white/85 max-w-2xl leading-relaxed drop-shadow">
              &ldquo;{chapter.narration}&rdquo;
            </p>
          </div>

          {/* Center Play / Pause Indicator on Click */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 m-auto h-16 w-16 rounded-full border border-white/30 bg-black/60 text-white flex items-center justify-center transition-all duration-150 active:scale-90 hover:scale-110 hover:border-[#c7a85c] hover:text-[#c7a85c] backdrop-blur-md cursor-pointer"
            aria-label={isPlaying ? 'Pause film' : 'Play film'}
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-1" />}
          </button>
        </div>

        {/* Video Scrubber & Chapter Selectors */}
        <div className="border-t border-white/10 bg-[#12100d] p-5">
          {/* Progress bar */}
          <div className="relative h-1.5 w-full rounded-full bg-white/10 overflow-hidden cursor-pointer mb-4">
            <div
              className="h-full bg-[#c7a85c] transition-all duration-100 shadow-[0_0_8px_#c7a85c]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Chapter Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CHAPTERS.map((ch, idx) => {
              const isActive = currentChapter === idx;
              return (
                <button
                  key={ch.title}
                  onClick={() => {
                    setCurrentChapter(idx);
                    setProgress(0);
                    setIsPlaying(true);
                  }}
                  className={`rounded-xl border p-2.5 text-left transition-all duration-150 active:scale-95 cursor-pointer ${
                    isActive
                      ? 'border-[#c7a85c] bg-[#c7a85c]/15 shadow-md'
                      : 'border-white/10 bg-[#0d0c0a] hover:border-white/25'
                  }`}
                >
                  <span className="text-[9px] uppercase tracking-[0.16em] text-[#c7a85c] block">
                    {ch.time}
                  </span>
                  <h4 className="font-serif text-xs text-white truncate mt-0.5">{ch.title}</h4>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
