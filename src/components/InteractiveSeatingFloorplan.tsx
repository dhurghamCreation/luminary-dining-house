import React, { useState } from 'react';
import { Users, Flame, Sparkles, MapPin, Check } from 'lucide-react';

import { Language } from '../lib/translations';

export interface TableSpot {
  id: string;
  name: string;
  section: 'hearth' | 'main' | 'glasshouse' | 'vault';
  capacity: number;
  available: boolean;
  ambiance: string;
  cx: number;
  cy: number;
  r?: number;
  w?: number;
  h?: number;
  shape: 'circle' | 'rect';
}

interface InteractiveSeatingFloorplanProps {
  selectedTableId: string | null;
  onSelectTable: (table: TableSpot) => void;
  currentLanguage?: Language;
}

const FLOORPLAN_I18N: Record<Language, {
  capacity: string;
  upTo: string;
  guests: string;
  courseStyle: string;
  sevenActs: string;
  tastingPass: string;
  ready: string;
  occupied: string;
  reserveBtn: string;
  selectedLabel: string;
}> = {
  en: {
    capacity: 'Capacity',
    upTo: 'Up to',
    guests: 'Guests',
    courseStyle: 'Course Style',
    sevenActs: 'Seven Acts Menu',
    tastingPass: 'Tasting Pass',
    ready: 'Ready for Seating',
    occupied: 'Occupied',
    reserveBtn: 'Reserve This Exact Table',
    selectedLabel: 'Selected Table',
  },
  fr: {
    capacity: 'Capacité',
    upTo: "Jusqu'à",
    guests: 'Convives',
    courseStyle: 'Style de Menu',
    sevenActs: 'Menu Sept Actes',
    tastingPass: 'Passe Dégustation',
    ready: 'Prêt pour Service',
    occupied: 'Réservé',
    reserveBtn: 'Réserver Cette Table',
    selectedLabel: 'Table Sélectionnée',
  },
  ja: {
    capacity: '収容人数',
    upTo: '最大',
    guests: '名様',
    courseStyle: 'コース形式',
    sevenActs: '7幕のコース',
    tastingPass: '薪火パス',
    ready: 'ご案内可能',
    occupied: '満席',
    reserveBtn: 'この席を予約する',
    selectedLabel: '選択されたテーブル',
  },
  it: {
    capacity: 'Capacità',
    upTo: 'Fino a',
    guests: 'Ospiti',
    courseStyle: 'Stile Menu',
    sevenActs: 'Menu Sette Atti',
    tastingPass: 'Passo Degustazione',
    ready: 'Disponibile',
    occupied: 'Occupato',
    reserveBtn: 'Prenota Questo Tavolo',
    selectedLabel: 'Tavolo Selezionato',
  },
  ar: {
    capacity: 'السعة',
    upTo: 'حتى',
    guests: 'ضيوف',
    courseStyle: 'نمط القائمة',
    sevenActs: 'قائمة سبعة فصول',
    tastingPass: 'ممر الموقد',
    ready: 'متاح للجلوس',
    occupied: 'محجوز',
    reserveBtn: 'احجز هذه الطاولة المحددة',
    selectedLabel: 'الطاولة المختارة',
  },
};

const TABLES: TableSpot[] = [
  // Hearth Counter (Directly facing the open fire hearth)
  { id: 'C1', name: 'Chef’s Counter Seat 1', section: 'hearth', capacity: 1, available: true, ambiance: 'Front row to live white-oak embers & plating pass', cx: 130, cy: 95, r: 10, shape: 'circle' },
  { id: 'C2', name: 'Chef’s Counter Seat 2', section: 'hearth', capacity: 1, available: true, ambiance: 'Front row to live white-oak embers & plating pass', cx: 160, cy: 95, r: 10, shape: 'circle' },
  { id: 'C3', name: 'Chef’s Counter Seat 3', section: 'hearth', capacity: 1, available: false, ambiance: 'Direct view of chef seared turbot', cx: 190, cy: 95, r: 10, shape: 'circle' },
  { id: 'C4', name: 'Chef’s Counter Seat 4', section: 'hearth', capacity: 1, available: true, ambiance: 'Center pass with botanical infusions', cx: 220, cy: 95, r: 10, shape: 'circle' },
  { id: 'C5', name: 'Chef’s Counter Seat 5', section: 'hearth', capacity: 1, available: true, ambiance: 'Front row to hearth ember roast', cx: 250, cy: 95, r: 10, shape: 'circle' },
  { id: 'C6', name: 'Chef’s Counter Seat 6', section: 'hearth', capacity: 1, available: true, ambiance: 'Intimate corner pass seat', cx: 280, cy: 95, r: 10, shape: 'circle' },

  // Hearthside Booths (Left wall)
  { id: 'T1', name: 'Hearth Booth 1', section: 'hearth', capacity: 4, available: true, ambiance: 'Velvet burgundy banquette with hearth glow', cx: 80, cy: 170, w: 46, h: 36, shape: 'rect' },
  { id: 'T2', name: 'Hearth Booth 2', section: 'hearth', capacity: 4, available: false, ambiance: 'Warm amber sconce lighting, romantic booth', cx: 80, cy: 230, w: 46, h: 36, shape: 'rect' },
  { id: 'T3', name: 'Hearth Booth 3', section: 'hearth', capacity: 6, available: true, ambiance: 'Spacious corner booth for celebrations', cx: 80, cy: 300, w: 50, h: 44, shape: 'rect' },

  // Main Dining Room (Center tables)
  { id: 'T4', name: 'Center Salon Table 4', section: 'main', capacity: 2, available: true, ambiance: 'Candlelit round walnut table', cx: 180, cy: 175, r: 18, shape: 'circle' },
  { id: 'T5', name: 'Center Salon Table 5', section: 'main', capacity: 2, available: true, ambiance: 'Central room view, lively atmosphere', cx: 250, cy: 175, r: 18, shape: 'circle' },
  { id: 'T6', name: 'Center Salon Table 6', section: 'main', capacity: 4, available: true, ambiance: 'Direct acoustic sweet spot for unhurried dining', cx: 180, cy: 250, r: 24, shape: 'circle' },
  { id: 'T7', name: 'Center Salon Table 7', section: 'main', capacity: 4, available: true, ambiance: 'Adjacent to botanical garden display', cx: 250, cy: 250, r: 24, shape: 'circle' },

  // Mercer Window Banquettes (Right wall)
  { id: 'W1', name: 'Mercer Window 1', section: 'glasshouse', capacity: 2, available: true, ambiance: 'Arched historic window overlooking Soho cobblestones', cx: 335, cy: 170, w: 42, h: 32, shape: 'rect' },
  { id: 'W2', name: 'Mercer Window 2', section: 'glasshouse', capacity: 2, available: false, ambiance: 'Rainy street view, soft candlelight', cx: 335, cy: 230, w: 42, h: 32, shape: 'rect' },
  { id: 'W3', name: 'Mercer Window 3', section: 'glasshouse', capacity: 4, available: true, ambiance: 'Corner streetscape banquette', cx: 335, cy: 295, w: 46, h: 38, shape: 'rect' },

  // Private Garden Vault (Bottom alcove)
  { id: 'V1', name: 'The Private Garden Vault', section: 'vault', capacity: 12, available: true, ambiance: 'Subterranean brick-vaulted private room for celebratory gatherings', cx: 210, cy: 345, w: 90, h: 42, shape: 'rect' },
];

export const InteractiveSeatingFloorplan: React.FC<InteractiveSeatingFloorplanProps> = ({
  selectedTableId,
  onSelectTable,
  currentLanguage = 'en',
}) => {
  const tFloor = FLOORPLAN_I18N[currentLanguage] || FLOORPLAN_I18N.en;
  const [hoveredTable, setHoveredTable] = useState<TableSpot | null>(null);
  const [filterSection, setFilterSection] = useState<'all' | 'hearth' | 'main' | 'glasshouse' | 'vault'>('all');

  const filteredTables = TABLES.filter(
    (t) => filterSection === 'all' || t.section === filterSection
  );

  const selectedTable = TABLES.find((t) => t.id === selectedTableId);

  return (
    <div className="rounded-2xl border border-white/15 bg-[#12100d] p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#c7a85c] flex items-center gap-1.5">
            <MapPin size={12} />
            <span>Interactive Floorplan · 18 Mercer St</span>
          </span>
          <h3 className="font-serif text-2xl text-white mt-1">Select your table view</h3>
        </div>

        {/* Section Filters */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-full border border-white/10 bg-black/40">
          {(
            [
              ['all', 'All Rooms'],
              ['hearth', 'Hearth Pass'],
              ['main', 'Main Salon'],
              ['glasshouse', 'Street Windows'],
              ['vault', 'Private Vault'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilterSection(key)}
              className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em] transition-all duration-150 active:scale-95 cursor-pointer ${
                filterSection === key
                  ? 'bg-[#c7a85c] text-[#0b0a09] font-medium'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
        {/* SVG Blueprint Floorplan */}
        <div className="relative aspect-[4/3] w-full rounded-xl border border-white/10 bg-[#0d0c0a] p-4 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#c7a85c_1px,transparent_1px)] [background-size:16px_16px]" />

          <svg viewBox="0 0 420 410" className="w-full h-full select-none drop-shadow-xl">
            {/* Hearth Bar Structure — Red Box with text cleanly inside */}
            <rect x="50" y="42" width="320" height="32" rx="6" fill="#30150f" stroke="#8a2a1c" strokeWidth="1.5" />
            <text x="210" y="58" textAnchor="middle" dominantBaseline="central" fill="#e5c97d" fontSize="7" fontFamily="Cinzel, Playfair Display, serif" letterSpacing="0.9" fontWeight="600">
              WHITE-OAK WOOD HEARTH & PASS
            </text>
            <line x1="50" y1="80" x2="370" y2="80" stroke="#c7a85c" strokeWidth="2" strokeDasharray="4 2" />

            <rect x="40" y="30" width="340" height="360" rx="8" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            
            <line x1="380" y1="150" x2="380" y2="340" stroke="#8da0b8" strokeWidth="3" opacity="0.6" />
            <text x="395" y="245" transform="rotate(90 395 245)" textAnchor="middle" fill="#8da0b8" fontSize="8" letterSpacing="2">
              MERCER STREET WINDOWS
            </text>

            <path d="M160 390h100" stroke="#c7a85c" strokeWidth="3" />
            <text x="210" y="386" textAnchor="middle" fill="#c7a85c" fontSize="7" letterSpacing="1.5">
              PRIVATE GARDEN VAULT
            </text>

            {filteredTables.map((t) => {
              const isSelected = selectedTableId === t.id;
              const isHovered = hoveredTable?.id === t.id;
              const color = isSelected
                ? '#f0d99a'
                : isHovered
                ? '#e5c97d'
                : t.available
                ? '#c7a85c'
                : '#4a423a';

              return (
                <g
                  key={t.id}
                  className={`cursor-pointer transition-transform duration-200 ${
                    t.available ? 'hover:scale-105' : 'cursor-not-allowed opacity-50'
                  }`}
                  onClick={() => t.available && onSelectTable(t)}
                  onMouseEnter={() => setHoveredTable(t)}
                  onMouseLeave={() => setHoveredTable(null)}
                >
                  {t.shape === 'circle' ? (
                    <circle
                      cx={t.cx}
                      cy={t.cy}
                      r={t.r || 15}
                      fill={isSelected ? '#c7a85c' : '#1e1a16'}
                      stroke={color}
                      strokeWidth={isSelected ? 3 : isHovered ? 2 : 1.2}
                      className="transition-all duration-300"
                    />
                  ) : (
                    <rect
                      x={t.cx - (t.w || 40) / 2}
                      y={t.cy - (t.h || 30) / 2}
                      width={t.w || 40}
                      height={t.h || 30}
                      rx="6"
                      fill={isSelected ? '#c7a85c' : '#1e1a16'}
                      stroke={color}
                      strokeWidth={isSelected ? 3 : isHovered ? 2 : 1.2}
                      className="transition-all duration-300"
                    />
                  )}

                  <text
                    x={t.cx}
                    y={t.cy + 3}
                    textAnchor="middle"
                    fill={isSelected ? '#0b0a09' : '#ffffff'}
                    fontSize="9"
                    fontWeight="500"
                    fontFamily="DM Sans"
                  >
                    {t.id}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Blueprint Legend */}
          <div className="absolute top-3 left-3 flex items-center gap-3 text-[8px] uppercase tracking-[0.16em] text-white/50 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[#c7a85c]" /> Available
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[#4a423a]" /> Reserved
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[#f0d99a] ring-2 ring-[#c7a85c]" /> Selected
            </span>
          </div>
        </div>

        {/* Selected Table Spotlight */}
        <div className="flex flex-col gap-5">
          {hoveredTable || selectedTable ? (
            (() => {
              const active = hoveredTable || selectedTable!;
              return (
                <div className="rounded-xl border border-[#c7a85c]/40 bg-[#161310] p-6 shadow-xl animate-fade-up">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.26em] text-[#c7a85c]">
                      Table {active.id} · {active.section.toUpperCase()}
                    </span>
                    <span
                      className={`text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full ${
                        active.available
                          ? 'bg-[#c7a85c]/15 text-[#e5c97d] border border-[#c7a85c]/30'
                          : 'bg-white/10 text-white/40'
                      }`}
                    >
                      {active.available ? tFloor.ready : tFloor.occupied}
                    </span>
                  </div>

                  <h4 className="font-serif text-2xl text-white mt-2">{active.name}</h4>
                  <p className="text-xs text-white/60 mt-1.5 leading-relaxed">{active.ambiance}</p>

                  {/* Capacity & Course Style — Perfectly aligned vertically & horizontally */}
                  <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                    <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3 h-20">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#c7a85c] font-medium block">{tFloor.capacity}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-md bg-[#c7a85c]/10 flex items-center justify-center shrink-0">
                          <Users size={13} className="text-[#c7a85c]" />
                        </div>
                        <span className="font-serif text-sm sm:text-base text-white tabular-nums font-medium leading-none">
                          {tFloor.upTo} {active.capacity} {tFloor.guests}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3 h-20">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#c7a85c] font-medium block">{tFloor.courseStyle}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-md bg-[#c7a85c]/10 flex items-center justify-center shrink-0">
                          <Flame size={13} className="text-[#c7a85c]" />
                        </div>
                        <span className="font-serif text-sm sm:text-base text-[#e5c97d] font-medium leading-none truncate">
                          {active.section === 'hearth' ? tFloor.tastingPass : tFloor.sevenActs}
                        </span>
                      </div>
                    </div>
                  </div>

                  {active.available && (
                    <button
                      onClick={() => onSelectTable(active)}
                      className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-lg text-[10px] uppercase tracking-[0.22em] font-medium transition-all duration-150 active:scale-95 cursor-pointer ${
                        selectedTableId === active.id
                          ? 'bg-[#c7a85c] text-[#0b0a09]'
                          : 'border border-[#c7a85c] text-[#e5c97d] hover:bg-[#c7a85c]/15'
                      }`}
                    >
                      {selectedTableId === active.id ? (
                        <>
                          <Check size={14} />
                          <span>{tFloor.selectedLabel}</span>
                        </>
                      ) : (
                        <span>{tFloor.reserveBtn} ({active.id})</span>
                      )}
                    </button>
                  )}
                </div>
              );
            })()
          ) : (
            <div className="rounded-xl border border-white/10 bg-[#161310]/50 p-8 text-center text-white/50">
              <Sparkles size={24} className="mx-auto text-[#c7a85c] mb-3 opacity-60" />
              <p className="font-serif text-lg text-white/80">Explore the Floorplan</p>
              <p className="text-xs text-white/50 mt-1 max-w-xs mx-auto leading-relaxed">
                Hover or click any table on the blueprint to preview lighting, seating view, and party capacity.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
