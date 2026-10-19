import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Leaf, 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  ArrowUpRight,
  Info,
  Layers,
  ChevronDown,
  Wheat,
  Nut,
  Milk,
  HeartHandshake
} from 'lucide-react';
import { Language, FULL_TRANSLATIONS } from '../lib/translations';

export interface MenuItem {
  id: string;
  name: string;
  category: 'tasting' | 'starters' | 'mains' | 'pastry' | 'botanicals';
  categoryLabel: string;
  tagline: string;
  description: string;
  ingredients: string[];
  price: string;
  dietary: {
    glutenFree: boolean;
    vegan: boolean;
    dairyFree: boolean;
    nutFree: boolean;
  };
  spiceLevel: 0 | 1 | 2 | 3; // 0 = mild/none, 1 = gentle warmth, 2 = vibrant heat, 3 = bold ember spice
  hearthTemp?: string;
  pairingNote: string;
  caloriesApprox?: string;
  isHouseFavorite?: boolean;
}

const MENU_DATA: MenuItem[] = [
  {
    id: 'm1',
    name: 'Hokkaido Sea Urchin & Royal Osetra',
    category: 'tasting',
    categoryLabel: 'Tasting Experience · Act I',
    tagline: 'Chilled oceanic brine meets warm toasted kombu brioche',
    description: 'Fresh live Hokkaido sea urchin nestled over gentle yuzu-infused dashi gelee, crowned with aged Royal Osetra sturgeon caviar and smoked kelp oil.',
    ingredients: ['Hokkaido Uni', 'Royal Osetra Caviar', 'Yuzu Dashi Gelee', 'Smoked Sea Kelp', 'Toasted Brioche'],
    price: '$38 (included in Tasting)',
    dietary: { glutenFree: false, vegan: false, dairyFree: true, nutFree: true },
    spiceLevel: 0,
    hearthTemp: 'Chilled / 4°C',
    pairingNote: 'Sparkling Green Shiso Hydrosol',
    caloriesApprox: '210 kcal',
    isHouseFavorite: true,
  },
  {
    id: 'm2',
    name: 'Charred Brittany Turbot Fillet',
    category: 'mains',
    categoryLabel: 'Wood-Fired Signature Mains',
    tagline: 'Seared directly on white-oak binchotan coals',
    description: 'Wild Brittany turbot fillet kissed by 420°C binchotan flames, served with caramelized Tokyo turnip puree, smoked trout roe, and white verjus reduction.',
    ingredients: ['Brittany Turbot', 'Tokyo Turnip', 'Golden Trout Roe', 'White Verjus', 'Binchotan Ash Butter'],
    price: '$58',
    dietary: { glutenFree: true, vegan: false, dairyFree: false, nutFree: true },
    spiceLevel: 1,
    hearthTemp: 'Direct Coals / 420°C',
    pairingNote: 'Wood-Smoked Sunchoke & Barley Tea',
    caloriesApprox: '420 kcal',
    isHouseFavorite: true,
  },
  {
    id: 'm3',
    name: 'Glazed Maitake & Pine Needle Broth',
    category: 'starters',
    categoryLabel: 'Raw Bar & Wood-Fired Starters',
    tagline: '100% Forest-foraged plant-based umami',
    description: 'Wild mountain maitake cluster seared on iron skewers over embers, suspended in a 24-hour roasted pine needle and charred shallot consommé.',
    ingredients: ['Hudson Valley Maitake', 'Hudson Pine Needles', 'Charred Shallot', 'Fermented Koji', 'Mountain Thyme'],
    price: '$28',
    dietary: { glutenFree: true, vegan: true, dairyFree: true, nutFree: true },
    spiceLevel: 0,
    hearthTemp: 'Ember Skewers / 280°C',
    pairingNote: 'Mountain Spruce Tip Decoction',
    caloriesApprox: '140 kcal',
  },
  {
    id: 'm4',
    name: 'Ember-Smoked Heritage Beetroot Tartare',
    category: 'starters',
    categoryLabel: 'Raw Bar & Wood-Fired Starters',
    tagline: 'Slow-roasted inside glowing oak ash for 4 hours',
    description: 'Red and golden chioggia beets roasted underground in white oak ashes, hand-diced with pickled mustard seed, smoked blackberry vinegar, and hazelnut cream.',
    ingredients: ['Ash-Roasted Beets', 'Blackberry Vinegar', 'Mustard Seed', 'Hazelnut Cream', 'Wild Chervil'],
    price: '$26',
    dietary: { glutenFree: true, vegan: true, dairyFree: true, nutFree: false },
    spiceLevel: 1,
    hearthTemp: 'Ash Buried / 180°C',
    pairingNote: 'Fermented Blackberry & Shiso Elixir',
    caloriesApprox: '185 kcal',
  },
  {
    id: 'm5',
    name: '60-Day Dry-Aged Mishima Wagyu Ribeye',
    category: 'mains',
    categoryLabel: 'Wood-Fired Signature Mains',
    tagline: 'Caramelized crust with buttery marrow core',
    description: 'A5 Mishima Reserve beef seared over applewood embers and basted in aged tallow, accompanied by black garlic demi-glace and grilled baby leeks.',
    ingredients: ['Mishima Wagyu', 'Black Garlic Demi-Glace', 'Charred Leeks', 'Marrow Tallow', 'Maldon Flakes'],
    price: '$72',
    dietary: { glutenFree: true, vegan: false, dairyFree: true, nutFree: true },
    spiceLevel: 1,
    hearthTemp: 'Cast Iron Pass / 360°C',
    pairingNote: 'Roasted Cocoa Nib & Roasted Hojicha Infusion',
    caloriesApprox: '580 kcal',
    isHouseFavorite: true,
  },
  {
    id: 'm6',
    name: 'Hand-Pinched Black Truffle Agnolotti',
    category: 'tasting',
    categoryLabel: 'Tasting Experience · Act IV',
    tagline: 'Silky pasta pockets bursting with molten sheep curd',
    description: 'Hand-formed pasta parcels filled with sheep milk ricotta and 36-month aged mountain parmesan, bathed in cultured brown butter with freshly shaved Norcia winter truffles.',
    ingredients: ['Egg Pasta Dough', 'Sheep Milk Ricotta', 'Norcia Black Truffle', 'Cultured Brown Butter', 'Aged Balsamic'],
    price: '$46',
    dietary: { glutenFree: false, vegan: false, dairyFree: false, nutFree: true },
    spiceLevel: 0,
    hearthTemp: 'Copper Sauté / 190°C',
    pairingNote: 'Smoked White Grape Must & Verjus Spritz',
    caloriesApprox: '380 kcal',
  },
  {
    id: 'm7',
    name: 'Wood-Charred Octopus & Ember Harissa',
    category: 'starters',
    categoryLabel: 'Raw Bar & Wood-Fired Starters',
    tagline: 'Tender Galician octopus with gentle aromatic chili heat',
    description: 'Galician octopus braised in sea brine, crisped on the binchotan grate, draped in house-made smoked paprika harissa and fingerling potato chips.',
    ingredients: ['Galician Octopus', 'Smoked Pepper Harissa', 'Crispy Fingerling', 'Meyer Lemon Aioli', 'Coriander Blossom'],
    price: '$34',
    dietary: { glutenFree: true, vegan: false, dairyFree: false, nutFree: true },
    spiceLevel: 2,
    hearthTemp: 'Iron Grate / 380°C',
    pairingNote: 'Citrus Peel & Bergamot Botanical Tonic',
    caloriesApprox: '320 kcal',
  },
  {
    id: 'm8',
    name: 'Wild Fire-Roasted King Oyster Mushrooms',
    category: 'mains',
    categoryLabel: 'Wood-Fired Signature Mains',
    tagline: 'Hearty meat-like texture with roasted chestnut glaze',
    description: 'Scored king oyster mushrooms basted in caramelized tamari and roasted yeast, served over smoked parsnip puree and crispy leek threads.',
    ingredients: ['King Oyster Mushrooms', 'Aged Tamari', 'Smoked Parsnip', 'Toasted Pumpkin Seed', 'Herb Oil'],
    price: '$38',
    dietary: { glutenFree: true, vegan: true, dairyFree: true, nutFree: true },
    spiceLevel: 1,
    hearthTemp: 'Ember Roaster / 310°C',
    pairingNote: 'Toasted Buckwheat & Cedar Needle Tea',
    caloriesApprox: '240 kcal',
  },
  {
    id: 'm9',
    name: 'Valrhona Guanaja 70% Cacao Sphere',
    category: 'pastry',
    categoryLabel: 'Pastry & Fire-Kissed Desserts',
    tagline: 'Smoked olive oil, sea salt flakes, and molten dark ganache',
    description: 'Single-plantation dark chocolate dome filled with whipped smoked mascarpone, bitter orange confit, poured over tableside with warm salted caramel dashi.',
    ingredients: ['Valrhona 70% Guanaja', 'Smoked Arbequina Oil', 'Bitter Seville Orange', 'Flaked Fleur de Sel', 'Smoked Caramel'],
    price: '$24',
    dietary: { glutenFree: true, vegan: false, dairyFree: false, nutFree: true },
    spiceLevel: 0,
    hearthTemp: 'Chilled & Molten Tableside',
    pairingNote: 'Cold-Brewed Geisha Coffee with Cardamom Smoke',
    caloriesApprox: '390 kcal',
    isHouseFavorite: true,
  },
  {
    id: 'm10',
    name: 'Roasted Fig Tart & Rosemary Smoked Gelato',
    category: 'pastry',
    categoryLabel: 'Pastry & Fire-Kissed Desserts',
    tagline: 'Caramelized mission figs over buckwheat sablé crust',
    description: 'Black Mission figs caramelized with wild clover honey, paired with goat milk gelato smoked gently with fresh rosemary branches.',
    ingredients: ['Mission Figs', 'Buckwheat Crust', 'Wild Clover Honey', 'Smoked Goat Milk Gelato', 'Crispy Rosemary'],
    price: '$22',
    dietary: { glutenFree: false, vegan: false, dairyFree: false, nutFree: true },
    spiceLevel: 0,
    hearthTemp: 'Wood Hearth Oven / 240°C',
    pairingNote: 'Warm Spiced Pear & Lemon Verbena Nectar',
    caloriesApprox: '310 kcal',
  },
  {
    id: 'm11',
    name: 'Sparkling Shiso & Bergamot Elixir',
    category: 'botanicals',
    categoryLabel: 'Artisanal Botanical Elixirs',
    tagline: 'Cold-pressed Kyoto purple shiso with sparkling mountain spring water',
    description: 'Crisp, aromatic effervescence with Calabrian bergamot zest and a touch of wild mountain honey, served in chilled crystal flutes.',
    ingredients: ['Kyoto Purple Shiso', 'Calabrian Bergamot', 'Adirondack Mineral Water', 'Wild Heather Honey'],
    price: '$18',
    dietary: { glutenFree: true, vegan: true, dairyFree: true, nutFree: true },
    spiceLevel: 0,
    hearthTemp: 'Zero-Proof / 2°C',
    pairingNote: 'Ideal pairing for Act I & II seafood',
    caloriesApprox: '45 kcal',
  },
  {
    id: 'm12',
    name: 'Wood-Smoked Sunchoke & Roasted Barley Tea',
    category: 'botanicals',
    categoryLabel: 'Artisanal Botanical Elixirs',
    tagline: 'Deep savory roast with caramel nutty finish',
    description: 'Sunchoke roots smoked over white oak shavings for 8 hours, decocted with heirloom roasted barley and lightly infused with dried Japanese persimmon.',
    ingredients: ['Oak-Smoked Sunchoke', 'Heirloom Roasted Barley', 'Dried Hoshigaki Persimmon', 'Sweet Woodruff'],
    price: '$16',
    dietary: { glutenFree: false, vegan: true, dairyFree: true, nutFree: true },
    spiceLevel: 0,
    hearthTemp: 'Warm Brew / 68°C',
    pairingNote: 'Complements Turbot and Dry-Aged Beef',
    caloriesApprox: '35 kcal',
  },
];

type CategoryFilter = 'all' | 'tasting' | 'starters' | 'mains' | 'pastry' | 'botanicals';

interface MobileFirstMenuProps {
  currentLanguage?: Language;
}

export const MobileFirstMenu: React.FC<MobileFirstMenuProps> = ({ currentLanguage = 'en' }) => {
  const t = FULL_TRANSLATIONS[currentLanguage] || FULL_TRANSLATIONS.en;

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  
  // Dietary toggles
  const [filterGlutenFree, setFilterGlutenFree] = useState(false);
  const [filterVegan, setFilterVegan] = useState(false);
  const [filterDairyFree, setFilterDairyFree] = useState(false);
  const [filterNutFree, setFilterNutFree] = useState(false);
  const [maxSpice, setMaxSpice] = useState<number | null>(null);

  // Active expanded item for mobile details
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // Filter logic
  const filteredDishes = useMemo(() => {
    return MENU_DATA.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Dietary filters
      if (filterGlutenFree && !item.dietary.glutenFree) return false;
      if (filterVegan && !item.dietary.vegan) return false;
      if (filterDairyFree && !item.dietary.dairyFree) return false;
      if (filterNutFree && !item.dietary.nutFree) return false;

      // Spice level filter
      if (maxSpice !== null && item.spiceLevel > maxSpice) return false;

      // Search query filter (matches name, tagline, description, ingredients)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesTag = item.tagline.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngr = item.ingredients.some(ing => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesTag && !matchesDesc && !matchesIngr) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, filterGlutenFree, filterVegan, filterDairyFree, filterNutFree, maxSpice, searchQuery]);

  const activeFiltersCount = 
    (filterGlutenFree ? 1 : 0) + 
    (filterVegan ? 1 : 0) + 
    (filterDairyFree ? 1 : 0) + 
    (filterNutFree ? 1 : 0) + 
    (maxSpice !== null ? 1 : 0);

  const resetAllFilters = () => {
    setFilterGlutenFree(false);
    setFilterVegan(false);
    setFilterDairyFree(false);
    setFilterNutFree(false);
    setMaxSpice(null);
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <section id="interactive-menu" className="relative px-6 pt-10 pb-20 md:pt-14 md:pb-28 bg-[#0b0a09] border-t border-[var(--line)]">
      <div className="mx-auto max-w-7xl">
        {/* Header & Mobile-First Tag — Both sides raised and strictly aligned at the top level */}
        <div className="grid md:grid-cols-2 gap-8 items-start border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#c7a85c] mb-2.5">
              <Flame size={14} className="text-[#c7a85c]" />
              <span>Mobile-First Digital Menu · Live Updates</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white leading-[1.08]">
              Culinary Repertoire & <br />
              <em className="font-normal text-[#c7a85c]">Dietary Atelier</em>
            </h2>
          </div>

          <div className="flex flex-col justify-start md:pt-0.5">
            <div className="flex items-center gap-2 text-[10px] text-[#e5c97d] mb-2.5">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck size={13} className="text-emerald-400" />
                <span>Dedicated Allergy-Safe Pass</span>
              </span>
              <span className="text-white/30">·</span>
              <span className="text-white/50">Updated Daily for Peak Season</span>
            </div>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
              Instant, searchable, responsive menu with single-click dietary filters. Our hearth accommodates celiac, plant-based, and bespoke allergies with zero compromise in luxury.
            </p>
          </div>
        </div>

        {/* CONTROLS BAR: Search & Category Tabs */}
        <div className="mt-8 space-y-4">
          {/* Search bar & quick reset */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by dish, ingredient (e.g. turbot, caviar, truffle, fig)..."
                className="w-full h-11 pl-11 pr-4 rounded-xl border border-white/15 bg-[#14120f] text-xs text-white placeholder:text-white/35 outline-none focus:border-[#c7a85c] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs px-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Active filters counter & reset */}
            {activeFiltersCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="btn-pill-3d self-start sm:self-auto text-[10px] uppercase tracking-[0.16em] text-[#e5c97d] hover:text-white border border-[#c7a85c]/40 bg-[#161310] px-3.5 py-2 rounded-lg flex items-center gap-1.5"
              >
                <span>Reset {activeFiltersCount} Filter{activeFiltersCount > 1 ? 's' : ''}</span>
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-[11px] uppercase tracking-[0.16em]">
            {[
              ['all', 'All Courses (12)'],
              ['tasting', '7-Act Tasting'],
              ['starters', 'Starters & Raw Bar'],
              ['mains', 'Wood-Fired Mains'],
              ['pastry', 'Pastry & Sweets'],
              ['botanicals', 'Botanical Elixirs'],
            ].map(([cat, label]) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as CategoryFilter)}
                className={`btn-pill-3d px-4 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#c7a85c] text-[#0b0a09] font-medium shadow-md'
                    : 'bg-[#14120f] border border-white/15 text-white/70 hover:border-white/30 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* DIETARY & ALLERGEN FILTER BUTTONS */}
          <div className="rounded-2xl border border-white/10 bg-[#12100d] p-4 sm:p-5 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#c7a85c] flex items-center gap-1.5 font-medium">
                <SlidersHorizontal size={13} />
                <span>Single-Click Dietary & Allergen Filters</span>
              </span>
              <span className="text-[10px] text-white/40">
                Showing {filteredDishes.length} dish{filteredDishes.length === 1 ? '' : 'es'}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {/* Gluten Free */}
              <button
                onClick={() => setFilterGlutenFree(!filterGlutenFree)}
                className={`btn-pill-3d flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                  filterGlutenFree
                    ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-medium'
                    : 'bg-[#191613] border border-white/15 text-white/70 hover:border-white/30'
                }`}
              >
                <Wheat size={13} className={filterGlutenFree ? 'text-emerald-400' : 'text-white/40'} />
                <span>Gluten-Free (GF)</span>
                {filterGlutenFree && <Check size={12} className="text-emerald-400" />}
              </button>

              {/* Vegan */}
              <button
                onClick={() => setFilterVegan(!filterVegan)}
                className={`btn-pill-3d flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                  filterVegan
                    ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-medium'
                    : 'bg-[#191613] border border-white/15 text-white/70 hover:border-white/30'
                }`}
              >
                <Leaf size={13} className={filterVegan ? 'text-emerald-400' : 'text-white/40'} />
                <span>100% Plant-Based (VG)</span>
                {filterVegan && <Check size={12} className="text-emerald-400" />}
              </button>

              {/* Dairy Free */}
              <button
                onClick={() => setFilterDairyFree(!filterDairyFree)}
                className={`btn-pill-3d flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                  filterDairyFree
                    ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-medium'
                    : 'bg-[#191613] border border-white/15 text-white/70 hover:border-white/30'
                }`}
              >
                <Milk size={13} className={filterDairyFree ? 'text-emerald-400' : 'text-white/40'} />
                <span>Dairy-Free (DF)</span>
                {filterDairyFree && <Check size={12} className="text-emerald-400" />}
              </button>

              {/* Nut Free */}
              <button
                onClick={() => setFilterNutFree(!filterNutFree)}
                className={`btn-pill-3d flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                  filterNutFree
                    ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-medium'
                    : 'bg-[#191613] border border-white/15 text-white/70 hover:border-white/30'
                }`}
              >
                <Nut size={13} className={filterNutFree ? 'text-emerald-400' : 'text-white/40'} />
                <span>Nut-Allergy Safe (NF)</span>
                {filterNutFree && <Check size={12} className="text-emerald-400" />}
              </button>

              {/* Spice Filter */}
              <div className="flex items-center gap-1 pl-2 border-l border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-white/40 mr-1">Spice:</span>
                {[
                  { level: 0, label: 'Mild Only' },
                  { level: 1, label: 'Warm (1🌶️)' },
                  { level: 2, label: 'Bold (2🌶️)' },
                ].map(({ level, label }) => (
                  <button
                    key={level}
                    onClick={() => setMaxSpice(maxSpice === level ? null : level)}
                    className={`btn-pill-3d px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                      maxSpice === level
                        ? 'bg-[#c7a85c] text-[#0b0a09] font-medium'
                        : 'bg-[#191613] text-white/60 hover:text-white border border-white/10'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DISHES GRID: Responsive Mobile Cards */}
        {filteredDishes.length === 0 ? (
          <div className="mt-12 text-center py-16 rounded-2xl border border-white/10 bg-[#12100d] p-8">
            <Leaf size={32} className="mx-auto text-[#c7a85c]/60 mb-3" />
            <h3 className="font-serif text-2xl text-white">No dishes match your specific combination</h3>
            <p className="text-xs text-white/50 mt-2 max-w-md mx-auto">
              Our culinary hearth can customize almost every course for your dietary requirements. Speak directly with Lumi or our Maître d'.
            </p>
            <button
              onClick={resetAllFilters}
              className="btn-gold-3d mt-5 rounded-full px-5 py-2 text-[10px] uppercase tracking-[0.2em]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDishes.map((dish) => {
              const isExpanded = expandedItemId === dish.id;

              return (
                <div
                  key={dish.id}
                  className="card-3d-hover group rounded-2xl border border-white/10 bg-[#14120f] p-5 sm:p-6 transition-all hover:border-[#c7a85c]/50 hover:bg-[#181512] flex flex-col justify-between h-[430px]"
                >
                  <div className="h-[295px] flex flex-col justify-start">
                    {/* Top Badges — Strictly Aligned Height */}
                    <div className="h-7 shrink-0 flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-3">
                      <span className="text-[9px] uppercase tracking-[0.22em] text-[#c7a85c] font-medium truncate">
                        {dish.categoryLabel}
                      </span>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {dish.isHouseFavorite && (
                          <span className="rounded-full bg-[#c7a85c]/20 border border-[#c7a85c]/40 px-2 py-0.5 text-[8px] uppercase tracking-wider text-[#e5c97d]">
                            Signature
                          </span>
                        )}
                        <span className="font-serif text-sm text-white font-medium">
                          {dish.price}
                        </span>
                      </div>
                    </div>

                    {/* Title — Strictly Aligned 2-line Height */}
                    <div className="h-14 shrink-0 flex items-start">
                      <h3 className="font-serif text-xl sm:text-2xl text-white group-hover:text-[#e5c97d] transition-colors leading-snug line-clamp-2">
                        {dish.name}
                      </h3>
                    </div>

                    {/* Tagline — Strictly Aligned 1-line Height */}
                    <div className="h-5 shrink-0 flex items-center mt-1">
                      <p className="text-xs text-white/60 italic leading-relaxed truncate">
                        {dish.tagline}
                      </p>
                    </div>

                    {/* Detailed description — Strictly Aligned 3-line Height */}
                    <div className="h-16 shrink-0 mt-2 overflow-hidden">
                      <p className="text-xs text-white/75 leading-relaxed line-clamp-3">
                        {dish.description}
                      </p>
                    </div>

                    {/* Ingredients tags — Strictly Aligned Height */}
                    <div className="h-11 shrink-0 mt-2.5 overflow-hidden flex flex-wrap content-start gap-1.5">
                      {dish.ingredients.map((ing) => (
                        <span
                          key={ing}
                          className="rounded-md bg-[#1d1915] border border-white/5 px-2 py-0.5 text-[10px] text-white/60"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer details & pairings — Perfectly aligned horizontal line across all cards */}
                  <div className="h-[95px] shrink-0 border-t border-white/10 pt-3 flex flex-col justify-between">
                    {/* Pairing & Hearth note */}
                    <div className="h-5 flex items-center justify-between text-[10px] text-white/50">
                      <span className="flex items-center gap-1 text-[#e5c97d] truncate max-w-[200px]">
                        <Leaf size={11} className="shrink-0" />
                        <span className="truncate">{dish.pairingNote}</span>
                      </span>
                      {dish.hearthTemp && (
                        <span className="flex items-center gap-1 text-white/40 shrink-0">
                          <Flame size={11} className="text-[#c7a85c]" />
                          <span>{dish.hearthTemp}</span>
                        </span>
                      )}
                    </div>

                    {/* Dietary Indicators & Action */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5">
                        {dish.dietary.glutenFree && (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-mono" title="Gluten-Free">
                            GF
                          </span>
                        )}
                        {dish.dietary.vegan && (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-mono" title="Vegan">
                            VG
                          </span>
                        )}
                        {dish.dietary.dairyFree && (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-blue-950/70 border border-blue-500/40 text-blue-300 font-mono" title="Dairy-Free">
                            DF
                          </span>
                        )}
                        {dish.dietary.nutFree && (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-500/40 text-amber-300 font-mono" title="Nut-Free">
                            NF
                          </span>
                        )}
                        {dish.spiceLevel > 0 && (
                          <span className="text-[10px]" title={`Spice: Level ${dish.spiceLevel}`}>
                            {'🌶️'.repeat(dish.spiceLevel)}
                          </span>
                        )}
                      </div>

                      <a
                        href="#reserve"
                        className="btn-gold-3d flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] uppercase tracking-[0.16em]"
                      >
                        <span>Reserve</span>
                        <ArrowUpRight size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
