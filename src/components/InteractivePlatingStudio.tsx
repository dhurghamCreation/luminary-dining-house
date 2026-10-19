import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Layers, 
  RotateCcw, 
  Download, 
  Palette, 
  Check, 
  Info, 
  Eye, 
  PenTool, 
  Compass,
  Flame,
  Award,
  Trash2,
  Share2,
  Box
} from 'lucide-react';
import { useToast } from './ToastNotification';

export type PlateId = 'uni' | 'turbot' | 'agnolotti' | 'valrhona' | 'oyster' | 'beef';

interface IngredientSpot {
  name: string;
  origin: string;
  technique: string;
  x: number;
  y: number;
  flavorNote: string;
}

interface DishData {
  id: PlateId;
  courseNumber: string;
  title: string;
  subtitle: string;
  pairing: string;
  pairingNote: string;
  flavors: { salinity: number; umami: number; smoke: number; acidity: number; richness: number };
  ingredients: IngredientSpot[];
  description: string;
}

const DISHES: Record<PlateId, DishData> = {
  uni: {
    id: 'uni',
    courseNumber: 'Course I',
    title: 'Hokkaido Sea Urchin & Royal Osetra',
    subtitle: 'Cold-pressed kelp emulsion, finger lime pearls, nori tuile',
    pairing: 'Sparkling Green Shiso, Bergamot & Sea Kelp Hydrosol',
    pairingNote: 'The saline crystalline acidity cuts cleanly through the richness of the fresh uni butter.',
    flavors: { salinity: 92, umami: 88, smoke: 15, acidity: 70, richness: 85 },
    description: 'A cold, tidal opening. The sea urchin arrives live from Rishiri Island thrice weekly, paired with low-salt sturgeon roe and citrus vesicles.',
    ingredients: [
      { name: 'Red Uni Tongue', origin: 'Hokkaido, Japan', technique: 'Raw sashimi grade, kept at 4°C', x: 48, y: 52, flavorNote: 'Custard-like, ocean sweet' },
      { name: 'Royal Osetra Caviar', origin: 'Gironde Estuary', technique: 'Aged 90 days, Malossol cure', x: 54, y: 44, flavorNote: 'Nutty, mineral brine' },
      { name: 'Finger Lime Vesicles', origin: 'Byron Bay', technique: 'Hand-extracted, chilled', x: 38, y: 40, flavorNote: 'Explosive tart citrus burst' },
      { name: 'Kelp Glass & Gold Leaf', origin: 'Mendocino Coast', technique: 'Dehydrated 24h at 48°C', x: 62, y: 35, flavorNote: 'Toasted umami crunch' },
    ]
  },
  turbot: {
    id: 'turbot',
    courseNumber: 'Course II',
    title: 'Ember-Roasted Brittany Turbot',
    subtitle: 'Charred sunchoke velouté, smoked trout roe, bronze fennel oil',
    pairing: 'Smoked Barley Malt, Roasted Sunchoke & Lemon Thyme Infusion',
    pairingNote: 'Rich roasted malt echoing the caramelized sunchoke with a refreshing citrus finish.',
    flavors: { salinity: 68, umami: 82, smoke: 85, acidity: 50, richness: 78 },
    description: 'Fished by line in the Celtic Sea, grilled directly over white oak embers until the skin caramelizes into lace, with sweet earthy sunchoke cream.',
    ingredients: [
      { name: 'Turbot Fillet', origin: 'Brittany, France', technique: 'Binchotan hearth seared on bone', x: 50, y: 48, flavorNote: 'Firm, gelatinous, savory' },
      { name: 'Bronze Fennel Oil', origin: 'Rooftop Garden, NYC', technique: 'Cold chlorophyll centrifuge', x: 36, y: 62, flavorNote: 'Anise, herbaceous freshness' },
      { name: 'Smoked Golden Roe', origin: 'Lake Superior', technique: 'Cold oak smoked for 6 hours', x: 64, y: 42, flavorNote: 'Delicate woodsmoke pop' },
      { name: 'Sunchoke Silk', origin: 'Hudson Valley, NY', technique: 'Wood-fired ash-roasted puree', x: 42, y: 36, flavorNote: 'Earthy sweetness, hazelnut' },
    ]
  },
  agnolotti: {
    id: 'agnolotti',
    courseNumber: 'Course III',
    title: 'Aged Parmesan & Black Truffle Agnolotti',
    subtitle: '36-month Vacche Rosse butter, winter savory, Norcia black diamond',
    pairing: 'Aged Pu-erh Tea, Roasted Morel & Wild Blackberry Essence',
    pairingNote: 'Deep forest floor and wild fruit notes that harmonize seamlessly with the winter truffle.',
    flavors: { salinity: 55, umami: 98, smoke: 30, acidity: 25, richness: 92 },
    description: 'Thirty-egg-yolk pasta sheet rolled translucent, enclosing liquid aged parmesan fonduta that bursts warmly upon the palate under shavings of fresh black truffle.',
    ingredients: [
      { name: 'Hand-Pinched Agnolotti', origin: 'House Atelier', technique: '30-yolk dough, 0.4mm pasta roll', x: 50, y: 50, flavorNote: 'Tender tooth, silky release' },
      { name: 'Norcia Black Truffle', origin: 'Umbria, Italy', technique: 'Shaved raw tableside at 22°C', x: 58, y: 38, flavorNote: 'Forest floor, damp earth, musk' },
      { name: 'Vacche Rosse Butter', origin: 'Reggio Emilia', technique: 'Browned with mountain thyme', x: 38, y: 56, flavorNote: 'Toasted brioche, hazelnut' },
    ]
  },
  valrhona: {
    id: 'valrhona',
    courseNumber: 'Course IV',
    title: 'Guanaja 70% Dark Cacao Sphere',
    subtitle: 'Smoked arbequina olive oil, Maldon sea crystals, espresso crisp',
    pairing: 'Cold-Brew Geisha Coffee, Cacao Husk & Orange Blossom Infusion',
    pairingNote: 'Citrus jasmine perfume and bitter cocoa notes enhancing the single-origin chocolate.',
    flavors: { salinity: 40, umami: 35, smoke: 45, acidity: 35, richness: 95 },
    description: 'A study in dark balance. Bitter vintage cocoa melted with cold-pressed fruity olive oil and crunching pyramid sea crystals from the Essex coast.',
    ingredients: [
      { name: 'Valrhona Guanaja Sphere', origin: 'Tain-l’Hermitage', technique: 'Tempered 31.5°C, hand blown', x: 50, y: 48, flavorNote: 'Warm roasted bitterness, floral' },
      { name: 'Smoked Arbequina Oil', origin: 'Castillo de Canena', technique: 'Infused with applewood smoke', x: 62, y: 58, flavorNote: 'Green tomato, smoke, peppery' },
      { name: 'Flaked Sea Crystals', origin: 'Maldon, UK', technique: 'Unrefined pyramid salt crystals', x: 42, y: 40, flavorNote: 'Clean, crunching oceanic bite' },
    ]
  },
  oyster: {
    id: 'oyster',
    courseNumber: 'Course V',
    title: 'Mercer Oyster & Green Apple Granite',
    subtitle: 'Dayboat Long Island oysters, champagne vinegar mignonette, sea grapes',
    pairing: 'Fermented Honeycrisp Apple & Roasted Pine Needle Tea',
    pairingNote: 'Electric orchard acidity mirroring the crisp saline profile of raw dayboat shellfish.',
    flavors: { salinity: 95, umami: 75, smoke: 10, acidity: 85, richness: 40 },
    description: 'Pulled from cold waters this morning. Served on carved frozen stone with shaved Granny Smith apple granite and aged champagne vinegar.',
    ingredients: [
      { name: 'Mercer Dayboat Oyster', origin: 'Peconic Bay, NY', technique: 'Shucked seconds before service', x: 50, y: 52, flavorNote: 'Crisp salinity, cucumber finish' },
      { name: 'Green Apple Granite', origin: 'Catskill Orchards', technique: 'Flash-frozen at -24°C', x: 42, y: 44, flavorNote: 'Vibrant electric malic crunch' },
      { name: 'Sea Grapes', origin: 'Okinawa, Japan', technique: 'Hydrated in cold seawater', x: 60, y: 46, flavorNote: 'Popping ocean pearls' },
    ]
  },
  beef: {
    id: 'beef',
    courseNumber: 'Course VI',
    title: '60-Day Dry-Aged Ribeye over White Oak',
    subtitle: 'Bone marrow reduction, charred spring alliums, chanterelles',
    pairing: 'De-Alcoholized Cabernet Reduction, Juniper & Cedar Smudge',
    pairingNote: 'Wooded resin and berry tannins that envelop the deep caramel crust of dry-aged beef.',
    flavors: { salinity: 75, umami: 96, smoke: 90, acidity: 40, richness: 92 },
    description: 'Dry-aged in our humidity-controlled cellar on Himalayan salt bricks. Sizzled directly over embers of Pennsylvania oak to medium-rare.',
    ingredients: [
      { name: 'Aged Ribeye Cap', origin: 'Finger Lakes, NY', technique: '60 days cave aged, hearth flame', x: 50, y: 50, flavorNote: 'Blue cheese funk, deep caramel' },
      { name: 'Charred Spring Allium', origin: 'Hollow Creek Farm', technique: 'Blackened in hearth ash', x: 36, y: 42, flavorNote: 'Sweet tender melt, sweet onion' },
      { name: 'Golden Chanterelles', origin: 'Catskill Foragers', technique: 'Glazed in bone marrow jus', x: 64, y: 58, flavorNote: 'Apricot perfume, wooded earth' },
    ]
  }
};

export const InteractivePlatingStudio: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'study' | 'draw'>('study');
  const [selectedDish, setSelectedDish] = useState<PlateId>('uni');
  const [view3DMode, setView3DMode] = useState<'top' | 'angle' | 'elevation'>('top');
  const [activeLayer, setActiveLayer] = useState<{
    protein: boolean;
    reduction: boolean;
    garnish: boolean;
    gold: boolean;
  }>({
    protein: true,
    reduction: true,
    garnish: true,
    gold: true,
  });
  const [activePin, setActivePin] = useState<IngredientSpot | null>(null);

  // Drawing canvas state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'gold' | 'charcoal' | 'glaze' | 'herb' | 'caviar'>('gold');
  const [brushSize, setBrushSize] = useState<number>(8);
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [sealStampActive, setSealStampActive] = useState(false);
  const [savedStudies, setSavedStudies] = useState<{ id: string; title: string; image: string; date: string }[]>([]);

  const currentDish = DISHES[selectedDish];

  // Initialize Canvas
  useEffect(() => {
    if (activeTab !== 'draw') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 600;

    drawCeramicPlate(ctx, 600, 600);
    saveCanvasState();
  }, [activeTab]);

  const drawCeramicPlate = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h);

    // Plate shadow
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(w / 2, h / 2 + 16, w * 0.44, h * 0.44, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.filter = 'blur(16px)';
    ctx.fill();
    ctx.restore();

    // Plate rim outer
    const rimGrad = ctx.createRadialGradient(w * 0.42, h * 0.36, 40, w / 2, h / 2, w * 0.44);
    rimGrad.addColorStop(0, '#f8f4eb');
    rimGrad.addColorStop(0.65, '#e5d7bd');
    rimGrad.addColorStop(0.92, '#bfa674');
    rimGrad.addColorStop(1, '#8f7748');

    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w * 0.44, 0, Math.PI * 2);
    ctx.fillStyle = rimGrad;
    ctx.fill();

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(143, 119, 72, 0.45)';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w * 0.40, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(143, 119, 72, 0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Plate well
    const wellGrad = ctx.createRadialGradient(w * 0.45, h * 0.4, 20, w / 2, h / 2, w * 0.32);
    wellGrad.addColorStop(0, '#ffffff');
    wellGrad.addColorStop(0.5, '#f5efe0');
    wellGrad.addColorStop(1, '#e3d6be');

    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w * 0.32, 0, Math.PI * 2);
    ctx.fillStyle = wellGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(168, 142, 90, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setDrawingHistory((prev) => [...prev.slice(-9), data]);
  };

  const undoDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas || drawingHistory.length <= 1) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const newHistory = [...drawingHistory];
    newHistory.pop();
    const previous = newHistory[newHistory.length - 1];
    ctx.putImageData(previous, 0, 0);
    setDrawingHistory(newHistory);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawCeramicPlate(ctx, 600, 600);
    saveCanvasState();
    setHasDrawn(false);
    setSealStampActive(false);
    showToast('Plate Cleared', 'The ceramic plate has been wiped clean for a fresh plating draft.', 'info');
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsDrawing(true);
    setHasDrawn(true);
    drawStroke(e);
  };

  const stopDraw = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveCanvasState();
    }
  };

  const drawStroke = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== 'mousedown') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.save();

    if (tool === 'gold') {
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#e5c97d';
      ctx.shadowColor = 'rgba(229, 201, 125, 0.65)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = '#f0d99a';
      ctx.fill();

      for (let i = 0; i < 3; i++) {
        const sx = x + (Math.random() - 0.5) * brushSize * 2;
        const sy = y + (Math.random() - 0.5) * brushSize * 2;
        ctx.fillStyle = 'rgba(255, 245, 215, 0.85)';
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }
    } else if (tool === 'charcoal') {
      ctx.fillStyle = 'rgba(26, 20, 16, 0.45)';
      for (let i = 0; i < brushSize * 1.5; i++) {
        const offsetR = Math.random() * (brushSize * 0.9);
        const angle = Math.random() * Math.PI * 2;
        ctx.fillRect(
          x + Math.cos(angle) * offsetR,
          y + Math.sin(angle) * offsetR,
          1.8,
          1.8
        );
      }
    } else if (tool === 'glaze') {
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      const glazeGrad = ctx.createRadialGradient(x - 2, y - 2, 1, x, y, brushSize);
      glazeGrad.addColorStop(0, '#5a2d18');
      glazeGrad.addColorStop(0.7, '#2f150a');
      glazeGrad.addColorStop(1, 'rgba(30, 12, 6, 0.9)');
      ctx.fillStyle = glazeGrad;
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 4;
      ctx.fill();
    } else if (tool === 'herb') {
      ctx.beginPath();
      ctx.ellipse(x, y, brushSize * 0.8, brushSize * 0.4, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.3 ? '#687e3f' : '#9b6b9e';
      ctx.fill();
    } else if (tool === 'caviar') {
      ctx.beginPath();
      ctx.arc(x, y, Math.max(3, brushSize * 0.6), 0, Math.PI * 2);
      ctx.fillStyle = '#0f0e0d';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x - 1, y - 1, Math.max(1, brushSize * 0.2), 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.fill();
    }

    ctx.restore();
  };

  const stampAtelierSeal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    // Position wax seal prominently in the lower-center of the plate (perfect visibility, zero edge clipping)
    const cx = Math.round(canvas.width * 0.50);
    const cy = Math.round(canvas.height * 0.74);
    const r = 54;

    // 1. Dramatic outer shadow & organic molten wax seal contour
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 6;

    // Outer molten scalloped rim
    ctx.beginPath();
    for (let angle = 0; angle < Math.PI * 2; angle += 0.15) {
      const wobble = Math.sin(angle * 7) * 2.5 + Math.cos(angle * 4) * 1.5;
      const x = cx + (r + wobble) * Math.cos(angle);
      const y = cy + (r + wobble) * Math.sin(angle);
      if (angle === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    const waxGrad = ctx.createRadialGradient(cx - 12, cy - 14, 6, cx, cy, r);
    waxGrad.addColorStop(0, '#be2b1a');
    waxGrad.addColorStop(0.5, '#941c10');
    waxGrad.addColorStop(0.85, '#6a1006');
    waxGrad.addColorStop(1, '#450904');

    ctx.fillStyle = waxGrad;
    ctx.fill();

    // Reset shadow for crisp gold linework
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // 2. Heavy embossed gold outer ring
    ctx.beginPath();
    ctx.arc(cx, cy, r - 6, 0, Math.PI * 2);
    ctx.strokeStyle = '#f0d38d';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 3. Inner decorative gold beaded ring
    ctx.beginPath();
    ctx.arc(cx, cy, r - 12, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(240, 211, 141, 0.75)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. Center Gold Text & Star Emblem (bold, crisp, and high-contrast)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px "Cinzel", "Playfair Display", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('LUMINARY', cx, cy - 12);

    ctx.fillStyle = '#ffe082';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText('★  ATELIER  ★', cx, cy);

    ctx.fillStyle = '#fff4d6';
    ctx.font = 'bold 7.5px "DM Sans", sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('CHEF SEAL · 2026', cx, cy + 12);

    ctx.restore();
    saveCanvasState();
    setSealStampActive(true);
    showToast('Chef Seal Applied', 'Authentic red wax seal stamped clearly onto your plating study.', 'success');
  };

  // COMPLETE WORKING DOWNLOAD & SAVE IMPLEMENTATION
  const downloadAndSavePlatingStudy = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Apply seal automatically if not already stamped
    if (!sealStampActive) {
      stampAtelierSeal();
    }

    try {
      const dataUrl = canvas.toDataURL('image/png');

      // 1. Direct browser file download
      const link = document.createElement('a');
      link.download = `luminary-plating-study-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 2. Save into UI Atelier collection
      const newStudy = {
        id: Date.now().toString(),
        title: `Guest Plating Study #${savedStudies.length + 1}`,
        image: dataUrl,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setSavedStudies((prev) => [newStudy, ...prev]);

      // 3. Send to backend endpoint
      fetch('/api/plating-studies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newStudy.title,
          author: 'Distinguished Guest',
          imageData: dataUrl,
        }),
      }).catch((e) => console.log('Backend sync notice:', e));

      showToast(
        'Plating Study Preserved & Downloaded',
        'Your bespoke culinary illustration has been downloaded as a high-resolution PNG and saved to your atelier gallery.',
        'success'
      );
    } catch (err) {
      console.error('Save failed:', err);
      showToast('Export Notice', 'Unable to generate download image in this browser session.', 'info');
    }
  };

  return (
    <section id="gallery" className="relative px-6 py-24 md:px-12 md:py-36 bg-[#0b0a09]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end border-b border-[var(--line)] pb-10">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#c7a85c] mb-4">
              <PenTool size={13} />
              <span>03 / Plating Atelier</span>
            </div>
            <h2 className="font-serif text-5xl md:text-8xl leading-[0.88] tracking-[-0.04em] text-[#f6f2e9]">
              Plating as <br />
              <em className="font-normal text-[#c7a85c]">portraiture.</em>
            </h2>
          </div>

          <div className="flex flex-col gap-4 max-w-md">
            <p className="text-sm leading-relaxed text-white/60">
              Before service, every plate is drafted on watercolor stock at the pass. Explore the master courses below, or draw your own bespoke dish and download your finished study.
            </p>

            <div className="flex items-center gap-2 p-1 rounded-full border border-white/15 bg-[#141210]">
              <button
                onClick={() => setActiveTab('study')}
                className={`flex-1 rounded-full py-2 px-4 text-[10px] uppercase tracking-[0.2em] transition-all duration-200 active:scale-95 cursor-pointer ${
                  activeTab === 'study'
                    ? 'bg-[#c7a85c] text-[#0b0a09] font-medium shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Master Studies
              </button>
              <button
                onClick={() => setActiveTab('draw')}
                className={`flex-1 rounded-full py-2 px-4 text-[10px] uppercase tracking-[0.2em] transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === 'draw'
                    ? 'bg-[#c7a85c] text-[#0b0a09] font-medium shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <PenTool size={12} />
                <span>Draw Your Plate</span>
              </button>
            </div>
          </div>
        </div>

        {/* MODE 1: MASTER PLATING STUDIES */}
        {activeTab === 'study' ? (
          <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
            {/* Visual Plate Display with 3D Angles */}
            <div className="relative rounded-2xl border border-white/10 bg-[#12100d] p-6 md:p-10 flex flex-col items-center justify-center shadow-2xl">
              {/* Dish Selector Ribbon */}
              <div className="w-full flex items-center justify-start gap-2 overflow-x-auto pb-4 border-b border-white/10 mb-8 scrollbar-none">
                {(Object.keys(DISHES) as PlateId[]).map((id) => (
                  <button
                    key={id}
                    onClick={() => {
                      setSelectedDish(id);
                      setActivePin(null);
                    }}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] transition-all duration-200 active:scale-95 cursor-pointer ${
                      selectedDish === id
                        ? 'border border-[#c7a85c] bg-[#c7a85c]/15 text-[#e5c97d] font-medium'
                        : 'border border-transparent text-white/50 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {DISHES[id].title.split(' ')[0]} {DISHES[id].title.split(' ')[1]}
                  </button>
                ))}
              </div>

              {/* 3D Perspective Controls */}
              <div className="flex items-center gap-2 mb-4 self-end text-[9px] uppercase tracking-[0.18em] text-white/40">
                <span>Plate Perspective:</span>
                {(['top', 'angle', 'elevation'] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => setView3DMode(view)}
                    className={`px-2.5 py-1 rounded-md border transition-all duration-150 active:scale-95 cursor-pointer ${
                      view3DMode === view
                        ? 'border-[#c7a85c] bg-[#c7a85c]/20 text-[#e5c97d]'
                        : 'border-white/10 text-white/40 hover:text-white'
                    }`}
                  >
                    {view === 'top' ? 'Pass 2D' : view === 'angle' ? 'Sommelier 45°' : '3D Float'}
                  </button>
                ))}
              </div>

              {/* Plating Showcase Box with 3D Transform */}
              <div
                className={`relative aspect-square w-full max-w-[420px] mx-auto flex items-center justify-center transition-all duration-700 ${
                  view3DMode === 'angle'
                    ? '[transform:perspective(900px)_rotateX(26deg)_rotateZ(-2deg)_scale(0.96)] shadow-[0_24px_50px_rgba(0,0,0,0.85)]'
                    : view3DMode === 'elevation'
                    ? '[transform:perspective(1100px)_rotateY(-12deg)_rotateX(12deg)_scale(1.02)]'
                    : ''
                }`}
              >
                <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(199,168,92,0.22),transparent_70%)] blur-2xl" />

                {/* SVG Rendered Plate */}
                <svg
                  viewBox="0 0 400 400"
                  className="relative h-full w-full drop-shadow-2xl transition duration-500 hover:scale-[1.02]"
                >
                  <defs>
                    <radialGradient id="plateCeramic" cx="42%" cy="34%" r="72%">
                      <stop offset="0%" stopColor="#faf6ee" />
                      <stop offset="65%" stopColor="#e8dcbe" />
                      <stop offset="92%" stopColor="#c5b083" />
                      <stop offset="100%" stopColor="#8d774a" />
                    </radialGradient>
                    <radialGradient id="plateShadow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(0,0,0,0.6)" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </radialGradient>
                    <linearGradient id="goldShine" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f5e1ad" />
                      <stop offset="50%" stopColor="#c7a85c" />
                      <stop offset="100%" stopColor="#83692a" />
                    </linearGradient>
                    <radialGradient id="emberGlow" cx="45%" cy="45%" r="60%">
                      <stop offset="0%" stopColor="#f6c25a" />
                      <stop offset="100%" stopColor="#b8541b" />
                    </radialGradient>
                  </defs>

                  <ellipse cx="200" cy="382" rx="160" ry="18" fill="url(#plateShadow)" />
                  <circle cx="200" cy="200" r="172" fill="url(#plateCeramic)" />
                  <circle cx="200" cy="200" r="172" fill="none" stroke="rgba(141,119,74,0.35)" strokeWidth="1.5" />
                  <circle cx="200" cy="200" r="152" fill="none" stroke="rgba(141,119,74,0.2)" strokeWidth="1" strokeDasharray="3 5" />
                  <circle cx="200" cy="200" r="124" fill="rgba(255,255,255,0.4)" />

                  {/* Reduction Layer */}
                  {activeLayer.reduction && (
                    <g className="transition-opacity duration-500">
                      {selectedDish === 'uni' && <path d="M125 240c-10-52 24-95 82-100 48-5 90 24 98 68 8 40-20 74-66 84-50 10-104-6-114-52z" fill="#25351a" opacity="0.85" />}
                      {selectedDish === 'turbot' && <path d="M120 252c24-48 68-72 118-64" fill="none" stroke="#efe4c8" strokeWidth="32" strokeLinecap="round" opacity="0.9" />}
                      {selectedDish === 'agnolotti' && <circle cx="200" cy="200" r="105" fill="#f4ebd4" opacity="0.75" />}
                      {selectedDish === 'valrhona' && <path d="M120 236c-5-44 32-80 82-84 52-5 96 28 96 72 0 42-38 70-90 72-50 2-84-20-88-60z" fill="#351d12" opacity="0.92" />}
                      {selectedDish === 'oyster' && <path d="M200 305c-65-7-108-46-108-88 0-42 35-72 72-64 13 3 24 13 36 13s24-10 36-13c38-8 72 22 72 64 0 44-44 82-108 88z" fill="#ded0b0" />}
                      {selectedDish === 'beef' && <path d="M122 250c20-42 62-64 108-58" fill="none" stroke="#6b2116" strokeWidth="36" strokeLinecap="round" opacity="0.6" />}
                    </g>
                  )}

                  {/* Protein Layer */}
                  {activeLayer.protein && (
                    <g className="transition-opacity duration-500">
                      {selectedDish === 'uni' && (
                        <g>
                          {[0, 1, 2].map((i) => (
                            <ellipse key={i} cx={170 + i * 34} cy={210 - (i % 2) * 14} rx="28" ry="16" transform={`rotate(${-18 + i * 14} ${170 + i * 34} ${210 - (i % 2) * 14})`} fill="url(#emberGlow)" />
                          ))}
                        </g>
                      )}
                      {selectedDish === 'turbot' && (
                        <g transform="rotate(-11 200 196)">
                          <rect x="118" y="160" width="168" height="74" rx="28" fill="#f8f1de" />
                          <rect x="118" y="160" width="168" height="74" rx="28" fill="url(#goldShine)" opacity="0.32" />
                          <path d="M136 180h130M136 200h130M136 220h98" stroke="#a7833a" strokeWidth="2.2" opacity="0.4" strokeLinecap="round" />
                        </g>
                      )}
                      {selectedDish === 'agnolotti' && (
                        <g>
                          {Array.from({ length: 6 }, (_, i) => {
                            const a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                            const x = 200 + Math.cos(a) * 72;
                            const y = 200 + Math.sin(a) * 72;
                            return (
                              <g key={i} transform={`translate(${x} ${y}) rotate(${(a * 180) / Math.PI + 90})`}>
                                <rect x="-28" y="-21" width="56" height="42" rx="12" fill="#faf0da" stroke="#cbb482" strokeWidth="1.5" />
                                <path d="M-18 -4h36" stroke="#bfaa7a" strokeWidth="2.2" strokeLinecap="round" />
                              </g>
                            );
                          })}
                        </g>
                      )}
                      {selectedDish === 'valrhona' && (
                        <g>
                          <circle cx="200" cy="200" r="54" fill="#24140d" stroke="#5a2d18" strokeWidth="3" />
                          <ellipse cx="190" cy="188" rx="24" ry="14" fill="rgba(255,255,255,0.12)" />
                        </g>
                      )}
                      {selectedDish === 'oyster' && (
                        <g>
                          <ellipse cx="200" cy="222" rx="58" ry="34" fill="#faf4e8" />
                          <ellipse cx="200" cy="220" rx="42" ry="24" fill="#e7d7b4" opacity="0.85" />
                        </g>
                      )}
                      {selectedDish === 'beef' && (
                        <g transform="rotate(-8 200 196)">
                          <rect x="118" y="154" width="168" height="84" rx="22" fill="#4d1b12" />
                          <rect x="118" y="154" width="168" height="84" rx="22" fill="url(#emberGlow)" opacity="0.3" />
                          {[0, 1, 2, 3].map((i) => (
                            <path key={i} d={`M134 ${170 + i * 18}h132`} stroke="#1d0a06" strokeWidth="7" strokeLinecap="round" opacity="0.85" />
                          ))}
                        </g>
                      )}
                    </g>
                  )}

                  {/* Botanical Garnish */}
                  {activeLayer.garnish && (
                    <g className="transition-opacity duration-500">
                      {selectedDish === 'uni' && (
                        <g>
                          {[[190, 202, 3.5], [198, 206, 3.2], [206, 200, 3.8], [214, 208, 3.1], [222, 203, 3.4]].map(([x, y, r], idx) => (
                            <circle key={idx} cx={x} cy={y} r={r} fill="#0d0c0a" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                          ))}
                          {[[172, 192], [180, 186], [228, 194], [236, 200]].map(([x, y], idx) => (
                            <circle key={idx} cx={x} cy={y} r="2.8" fill="#88b04b" opacity="0.9" />
                          ))}
                        </g>
                      )}
                      {selectedDish === 'turbot' && (
                        <g>
                          {[0, 1, 2, 3].map((i) => (
                            <path key={i} d={`M${148 + i * 32} 248q6 -32 ${8 + i * 4} -44`} stroke="#556c39" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                          ))}
                          {[[162, 180], [170, 174], [220, 186], [230, 190]].map(([x, y], idx) => (
                            <circle key={idx} cx={x} cy={y} r="3" fill="#e68d2e" stroke="#fff" strokeWidth="0.4" />
                          ))}
                        </g>
                      )}
                    </g>
                  )}

                  {/* Gold Leaf */}
                  {activeLayer.gold && (
                    <path
                      d="M124 166c34-28 88-34 132-8"
                      fill="none"
                      stroke="url(#goldShine)"
                      strokeWidth="3.6"
                      strokeLinecap="round"
                      className="transition-opacity duration-500 drop-shadow-[0_0_8px_rgba(229,201,125,0.7)]"
                    />
                  )}

                  {/* Pinpoints */}
                  {currentDish.ingredients.map((pin, i) => {
                    const cx = (pin.x / 100) * 400;
                    const cy = (pin.y / 100) * 400;
                    const isHovered = activePin?.name === pin.name;
                    return (
                      <g
                        key={i}
                        className="cursor-pointer transition-transform duration-300"
                        onClick={() => setActivePin(isHovered ? null : pin)}
                        onMouseEnter={() => setActivePin(pin)}
                      >
                        <circle cx={cx} cy={cy} r={isHovered ? 11 : 7} fill="rgba(199, 168, 92, 0.2)" className="animate-ping" />
                        <circle cx={cx} cy={cy} r={isHovered ? 8 : 5} fill={isHovered ? '#f0d99a' : '#c7a85c'} stroke="#0b0a09" strokeWidth="1.5" />
                      </g>
                    );
                  })}
                </svg>

                {activePin && (
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-[#c7a85c]/40 bg-[#161310]/95 p-4 shadow-2xl backdrop-blur-md animate-fade-up">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.24em] text-[#c7a85c]">{activePin.origin}</span>
                      <button onClick={() => setActivePin(null)} className="text-white/40 hover:text-red-500 transition-colors p-1">
                        ✕
                      </button>
                    </div>
                    <h4 className="font-serif text-lg text-white mt-1">{activePin.name}</h4>
                    <p className="text-xs text-white/60 mt-0.5">{activePin.technique}</p>
                    <p className="text-[11px] text-[#e5c97d] mt-2 italic font-serif">&ldquo;{activePin.flavorNote}&rdquo;</p>
                  </div>
                )}
              </div>

              {/* Layer Toggles */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-white/10 pt-6 w-full">
                <span className="text-[9px] uppercase tracking-[0.22em] text-white/40 mr-2 flex items-center gap-1.5">
                  <Layers size={12} />
                  <span>Layers:</span>
                </span>
                {(
                  [
                    ['protein', 'Protein'],
                    ['reduction', 'Puree / Sauce'],
                    ['garnish', 'Botanicals'],
                    ['gold', '24k Gold'],
                  ] as const
                ).map(([layerKey, label]) => (
                  <button
                    key={layerKey}
                    onClick={() => setActiveLayer((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }))}
                    className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em] transition-all duration-150 active:scale-95 cursor-pointer ${
                      activeLayer[layerKey]
                        ? 'border border-[#c7a85c]/50 bg-[#c7a85c]/15 text-[#f6f2e9]'
                        : 'border border-white/10 text-white/30 line-through'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Plating Anatomy */}
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#c7a85c]">
                  {currentDish.courseNumber} · Seasonal Plating
                </span>
                <h3 className="font-serif text-3xl md:text-5xl text-white mt-2 tracking-tight">
                  {currentDish.title}
                </h3>
                <p className="text-xs uppercase tracking-[0.18em] text-white/45 mt-2">
                  {currentDish.subtitle}
                </p>
                <p className="text-sm leading-relaxed text-white/70 mt-5">
                  {currentDish.description}
                </p>
              </div>

              {/* Flavor Radar Bar */}
              <div className="rounded-xl border border-white/10 bg-[#141210] p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#c7a85c] flex items-center gap-2">
                    <Compass size={13} />
                    <span>Sensory Profile Analysis</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/40">
                    Master Sommelier Scale
                  </span>
                </div>

                <div className="grid gap-3.5">
                  {(
                    [
                      ['Salinity & Tidal Mineral', currentDish.flavors.salinity],
                      ['Umami Depth', currentDish.flavors.umami],
                      ['Hearth Woodsmoke', currentDish.flavors.smoke],
                      ['Acidity & Malic Pop', currentDish.flavors.acidity],
                      ['Texture & Richness', currentDish.flavors.richness],
                    ] as const
                  ).map(([trait, score]) => (
                    <div key={trait}>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-white/60">{trait}</span>
                        <span className="font-serif text-[#c7a85c]">{score}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#83692a] via-[#c7a85c] to-[#f0d99a] transition-all duration-700"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botanical Infusion Pairing */}
              <div className="rounded-xl border border-[#c7a85c]/25 bg-[#171410] p-6 relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <Sparkles size={20} className="text-[#c7a85c] shrink-0 mt-1" />
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.24em] text-[#c7a85c]">
                      Botanical Pairing Accord
                    </span>
                    <h4 className="font-serif text-xl text-white mt-1">{currentDish.pairing}</h4>
                    <p className="text-xs text-white/65 mt-2 italic font-serif leading-relaxed">
                      &ldquo;{currentDish.pairingNote}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* MODE 2: CHEF'S LIVE DRAWING ATELIER */
          <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
            {/* Interactive Drawing Board */}
            <div className="relative rounded-2xl border border-[#c7a85c]/30 bg-[#12100d] p-6 md:p-8 flex flex-col items-center justify-center shadow-2xl">
              <div className="w-full flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#c7a85c]">
                    Culinary Sketchbook
                  </span>
                  <h3 className="font-serif text-xl text-white mt-0.5">The Pass Draft Pad</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={undoDrawing}
                    disabled={drawingHistory.length <= 1}
                    className="p-2 rounded-lg border border-white/15 text-white/60 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:pointer-events-none transition-all duration-150 active:scale-95 cursor-pointer"
                    title="Undo stroke"
                  >
                    <RotateCcw size={15} />
                  </button>
                  <button
                    onClick={clearCanvas}
                    className="px-3 py-1.5 rounded-lg border border-white/15 text-[10px] uppercase tracking-[0.16em] text-white/60 hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-150 active:scale-95 cursor-pointer"
                    title="Clear ceramic plate"
                  >
                    Wipe Plate
                  </button>
                </div>
              </div>

              {/* Ceramic Canvas */}
              <div className="relative touch-none aspect-square w-full max-w-[440px] mx-auto rounded-full overflow-hidden shadow-2xl border border-white/10 bg-[#090807]">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDraw}
                  onMouseUp={stopDraw}
                  onMouseLeave={stopDraw}
                  onMouseMove={drawStroke}
                  className="h-full w-full cursor-crosshair"
                />
              </div>

              {/* Canvas controls bottom bar */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 w-full border-t border-white/10 pt-4">
                {/* Brush size */}
                <div className="flex items-center gap-2">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">Stroke:</span>
                  <input
                    type="range"
                    min="3"
                    max="28"
                    value={brushSize}
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    className="h-1 w-20 accent-[#c7a85c] cursor-pointer"
                  />
                  <span className="text-[10px] font-serif text-[#c7a85c] w-6">{brushSize}px</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={stampAtelierSeal}
                    className="flex items-center gap-2 rounded-full border border-[#c7a85c] bg-[#c7a85c]/10 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#e5c97d] transition-all duration-150 active:scale-95 cursor-pointer hover:bg-[#c7a85c] hover:text-[#0b0a09]"
                  >
                    <Award size={13} />
                    <span>{sealStampActive ? 'Seal Applied' : 'Stamp Wax Seal'}</span>
                  </button>

                  {/* REAL WORKING SAVE & DOWNLOAD BUTTON */}
                  <button
                    onClick={downloadAndSavePlatingStudy}
                    className="flex items-center gap-2 rounded-full bg-[#c7a85c] px-4.5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#0b0a09] font-medium shadow-md transition-all duration-150 active:scale-95 cursor-pointer hover:bg-[#e5c97d] hover:shadow-lg"
                  >
                    <Download size={13} />
                    <span>Save & Download Plate</span>
                  </button>
                </div>
              </div>

              {/* Saved Plates Mini Gallery */}
              {savedStudies.length > 0 && (
                <div className="mt-6 w-full border-t border-white/10 pt-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#c7a85c] block mb-2">
                    Your Saved Atelier Plates ({savedStudies.length})
                  </span>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                    {savedStudies.map((s) => (
                      <div key={s.id} className="relative group rounded-lg border border-white/15 bg-black/40 p-2 shrink-0 w-24">
                        <img src={s.image} alt={s.title} className="w-20 h-20 rounded-full object-cover mx-auto" />
                        <span className="block text-[8px] text-center text-white/60 mt-1 truncate">{s.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Drawing Tools Palette */}
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#c7a85c]">
                  Kitchen Tools
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-white mt-1">
                  Select your medium.
                </h3>
                <p className="text-xs leading-relaxed text-white/60 mt-2">
                  Click and drag across the ceramic plate to paint. Layer sauces, spatter fresh botanicals, pipe caviar, and finish with a flourish of pure gold leaf.
                </p>
              </div>

              {/* Mediums */}
              <div className="grid gap-3">
                {(
                  [
                    {
                      id: 'gold',
                      name: '24k Gold Leaf Pen',
                      desc: 'Metallic gold calligraphy strokes with shimmering particles',
                      icon: Sparkles,
                      accent: '#e5c97d',
                    },
                    {
                      id: 'charcoal',
                      name: 'Binchotan Charcoal Dust',
                      desc: 'Organic woodsmoke smudge with ash texture',
                      icon: Flame,
                      accent: '#6e5e52',
                    },
                    {
                      id: 'glaze',
                      name: 'Aged Truffle Glaze Brush',
                      desc: 'Deep glossy reduction with rich umami shine',
                      icon: Palette,
                      accent: '#5a2d18',
                    },
                    {
                      id: 'herb',
                      name: 'Botanical Sprig & Violet Stamp',
                      desc: 'Stamps micro leaves and edible violet blossoms',
                      icon: PenTool,
                      accent: '#738a4a',
                    },
                    {
                      id: 'caviar',
                      name: 'Royal Osetra Pearl Dropper',
                      desc: 'Pipes glistening sturgeon caviar with light reflection',
                      icon: Compass,
                      accent: '#201f1e',
                    },
                  ] as const
                ).map((toolItem) => {
                  const isSelected = tool === toolItem.id;
                  const Icon = toolItem.icon;
                  return (
                    <button
                      key={toolItem.id}
                      onClick={() => setTool(toolItem.id)}
                      className={`flex items-start gap-4 rounded-xl border p-4 text-left transition-all duration-200 active:scale-[0.98] cursor-pointer ${
                        isSelected
                          ? 'border-[#c7a85c] bg-[#1a1713] shadow-lg shadow-[#c7a85c]/10'
                          : 'border-white/10 bg-[#12100d] hover:border-white/25 hover:bg-[#161411]'
                      }`}
                    >
                      <div
                        className="p-2.5 rounded-lg shrink-0 mt-0.5"
                        style={{ backgroundColor: `${toolItem.accent}25` }}
                      >
                        <Icon size={18} style={{ color: toolItem.accent }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-lg text-white">{toolItem.name}</h4>
                          {isSelected && <Check size={14} className="text-[#c7a85c]" />}
                        </div>
                        <p className="text-xs text-white/50 mt-1">{toolItem.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quote Note */}
              <div className="rounded-xl border border-white/10 bg-[#141210] p-5">
                <p className="text-xs italic text-white/60 leading-relaxed font-serif">
                  &ldquo;A dish is first eaten with the eyes, then smelled with memory, and finally tasted with reverence.&rdquo;
                </p>
                <span className="block mt-2 text-[9px] uppercase tracking-[0.24em] text-[#c7a85c]">
                  — Chef Elias Warren, Pass Sketch Note
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
