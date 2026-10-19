import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  Award,
  ExternalLink 
} from 'lucide-react';
import { Language } from '../lib/translations';

interface Review {
  id: string;
  author: string;
  avatarInitials: string;
  rating: number;
  source: 'google' | 'yelp' | 'opentable' | 'michelin';
  sourceLabel: string;
  date: string;
  headline: string;
  quote: string;
  category: 'all' | 'food' | 'service' | 'ambiance';
  verifiedVisit: string;
}

const REVIEWS_DATA: Review[] = [
  {
    id: 'r1',
    author: 'Chef Thomas K.',
    avatarInitials: 'TK',
    rating: 5,
    source: 'google',
    sourceLabel: 'Google Review · Local Guide Level 8',
    date: '3 weeks ago',
    headline: 'The most extraordinary wood-fire cooking in Manhattan',
    quote: 'The Brittany turbot over binchotan embers was nothing short of a religious experience. Chef Elias Warren controls heat like a master watchmaker. Service was attentive without ever being intrusive.',
    category: 'food',
    verifiedVisit: 'Dinner for 2 · Hearth Counter',
  },
  {
    id: 'r2',
    author: 'Elena Rostova',
    avatarInitials: 'ER',
    rating: 5,
    source: 'yelp',
    sourceLabel: 'Yelp Elite 2026',
    date: '1 month ago',
    headline: 'Flawless 10th anniversary celebration',
    quote: 'From the moment the doors parted on Mercer Street into the candlelit room, we felt transported. They greeted us by name and surprised us with personalized botanical menu scrolls. Luminary deserves a third star.',
    category: 'service',
    verifiedVisit: 'Anniversary Celebration · Private Salon',
  },
  {
    id: 'r3',
    author: 'Marcus Vance',
    avatarInitials: 'MV',
    rating: 5,
    source: 'opentable',
    sourceLabel: 'OpenTable Diner’s Choice VIP',
    date: '2 weeks ago',
    headline: 'The atmosphere is unmatched',
    quote: 'The Soho cast-iron brickwork paired with the amber glow of the live hearth creates an ambiance you just cannot find anywhere else in New York. The botanical pairing was refreshing and immensely sophisticated.',
    category: 'ambiance',
    verifiedVisit: 'Dinner for 4 · Window Banquette',
  },
  {
    id: 'r4',
    author: 'Dr. Soraya Hadad',
    avatarInitials: 'SH',
    rating: 5,
    source: 'google',
    sourceLabel: 'Google Review · Verified Patron',
    date: '4 days ago',
    headline: 'Incredible celiac & allergy accommodation',
    quote: 'I have severe celiac disease and dining at two-star level is usually stressful. Luminary had a dedicated allergen plan ready for my table. Every single course was sublime and completely worry-free.',
    category: 'food',
    verifiedVisit: 'Tasting Journey · Table 6',
  },
  {
    id: 'r5',
    author: 'Julian & Claire B.',
    avatarInitials: 'JB',
    rating: 5,
    source: 'michelin',
    sourceLabel: 'Michelin Guide Reader Submission',
    date: 'Last month',
    headline: 'A masterclass in culinary restraint',
    quote: 'No foam for the sake of foam. Pure elemental reverence for live oak wood, wild ocean catch, and unhurried time. The 70% Guanaja chocolate sphere with smoked olive oil finished the night like poetry.',
    category: 'food',
    verifiedVisit: 'Autumn Tasting Menu',
  },
];

interface ReviewsAggregatorProps {
  currentLanguage?: Language;
}

const REVIEWS_I18N: Record<Language, {
  tag: string;
  title1: string;
  title2: string;
  all: string;
  food: string;
  service: string;
  ambiance: string;
}> = {
  en: {
    tag: 'Verified Diner Reviews & Ratings',
    title1: 'Honored by Diners &',
    title2: 'Culinary Critics',
    all: 'All Reviews',
    food: 'Hearth & Tasting',
    service: 'Hospitality',
    ambiance: 'Soho Atmosphere',
  },
  fr: {
    tag: 'Avis et Notes Vérifiés des Convives',
    title1: 'Honoré par les Convives &',
    title2: 'Critiques Culinaires',
    all: 'Tous les Avis',
    food: 'Foyer & Dégustation',
    service: 'Hospitalité',
    ambiance: 'Ambiance Soho',
  },
  ja: {
    tag: '認証済みゲストレビュー＆評価',
    title1: 'ゲストと批評家に愛されて',
    title2: 'ミシュラン＆メディアの賛辞',
    all: 'すべてのレビュー',
    food: '薪火とコース',
    service: 'おもてなし',
    ambiance: '空間・音響',
  },
  it: {
    tag: 'Recensioni e Valutazioni Verificate',
    title1: 'Onorato dagli Ospiti &',
    title2: 'Critici Gastronomici',
    all: 'Tutte le Recensioni',
    food: 'Braci & Degustazione',
    service: 'Ospitalità',
    ambiance: 'Atmosfera Soho',
  },
  ar: {
    tag: 'آراء وتقييمات الضيوف الموثقة',
    title1: 'محل فخر واعتزاز ضيوفنا',
    title2: 'ونقاد فنون الطهي',
    all: 'جميع الآراء',
    food: 'الموقد والتذوق',
    service: 'الضيافة',
    ambiance: 'أجواء سوهو',
  },
};

export const ReviewsAggregator: React.FC<ReviewsAggregatorProps> = ({ currentLanguage = 'en' }) => {
  const tReviews = REVIEWS_I18N[currentLanguage] || REVIEWS_I18N.en;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterCategory, setFilterCategory] = useState<'all' | 'food' | 'service' | 'ambiance'>('all');
  const [isPaused, setIsPaused] = useState(false);

  const filteredReviews = REVIEWS_DATA.filter(
    (r) => filterCategory === 'all' || r.category === filterCategory
  );

  const safeIndex = currentIndex % (filteredReviews.length || 1);
  const activeReview = filteredReviews[safeIndex] || REVIEWS_DATA[0];

  // Auto carousel rotation
  useEffect(() => {
    if (isPaused || filteredReviews.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredReviews.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, filteredReviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredReviews.length);
  };

  return (
    <section id="reviews" className="px-6 py-20 md:px-12 md:py-28 bg-[#0b0a09] border-t border-[var(--line)]">
      <div className="mx-auto max-w-7xl">
        {/* Header with Trust Aggregate Scores */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-8 border-b border-white/10 pb-8 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#c7a85c] mb-3">
              <Star size={14} className="fill-[#c7a85c] text-[#c7a85c]" />
              <span>{tReviews.tag}</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-white leading-tight">
              {tReviews.title1} <br />
              <em className="font-normal text-[#c7a85c]">{tReviews.title2}</em>
            </h2>
          </div>

          {/* Social Proof Badges */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Google Badge */}
            <div className="rounded-xl border border-white/15 bg-[#14120f] px-4 py-3 flex items-center gap-3">
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-white flex items-center gap-1.5">
                  4.9
                  <span className="flex text-[#c7a85c]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={11} className="fill-current" />
                    ))}
                  </span>
                </span>
                <span className="text-[9px] uppercase tracking-wider text-white/50 mt-0.5">
                  Google · 428 Reviews
                </span>
              </div>
            </div>

            {/* Yelp Badge */}
            <div className="rounded-xl border border-white/15 bg-[#14120f] px-4 py-3 flex items-center gap-3">
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-white flex items-center gap-1.5">
                  4.8
                  <span className="flex text-red-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={11} className="fill-current" />
                    ))}
                  </span>
                </span>
                <span className="text-[9px] uppercase tracking-wider text-white/50 mt-0.5">
                  Yelp · 312 Reviews
                </span>
              </div>
            </div>

            {/* OpenTable Badge */}
            <div className="rounded-xl border border-[#c7a85c]/30 bg-[#161310] px-4 py-3 flex items-center gap-2.5">
              <Award size={20} className="text-[#c7a85c]" />
              <div className="flex flex-col">
                <span className="text-xs font-serif text-white font-medium">Diner’s Choice 2026</span>
                <span className="text-[9px] uppercase tracking-wider text-[#e5c97d]">Top 10 Romantic NYC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-8 text-[10px] uppercase tracking-[0.18em]">
          {(
            [
              ['all', tReviews.all],
              ['food', tReviews.food],
              ['service', tReviews.service],
              ['ambiance', tReviews.ambiance],
            ] as const
          ).map(([cat, label]) => (
            <button
              key={cat}
              onClick={() => {
                setFilterCategory(cat);
                setCurrentIndex(0);
              }}
              className={`btn-pill-3d px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#c7a85c] text-[#0b0a09] font-medium'
                  : 'bg-[#14120f] border border-white/15 text-white/60 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* CAROUSEL CARD */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-3xl border border-[#c7a85c]/35 bg-[#14120f] p-8 sm:p-12 shadow-2xl overflow-hidden card-3d-hover"
        >
          <Quote size={56} className="absolute right-8 top-8 text-[#c7a85c]/10 pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Rating Stars & Source */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex text-[#c7a85c]">
                {Array.from({ length: activeReview.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-current" />
                ))}
              </div>
              <span className="h-3 w-px bg-white/20" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#e5c97d] font-mono">
                {activeReview.sourceLabel}
              </span>
              <span className="h-3 w-px bg-white/20" />
              <span className="text-[10px] text-white/40">{activeReview.date}</span>
            </div>

            {/* Headline */}
            <h3 className="font-serif text-2xl sm:text-4xl text-white mt-4 leading-snug">
              &ldquo;{activeReview.headline}&rdquo;
            </h3>

            {/* Quote Body */}
            <p className="mt-4 text-sm sm:text-base text-white/75 leading-relaxed font-sans">
              {activeReview.quote}
            </p>

            {/* Author info & verified visit */}
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#c7a85c] to-[#e5c97d] p-0.5">
                  <div className="h-full w-full rounded-full bg-[#0b0a09] flex items-center justify-center font-serif text-sm text-[#e5c97d] font-bold">
                    {activeReview.avatarInitials}
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-base text-white font-medium flex items-center gap-1.5">
                    <span>{activeReview.author}</span>
                    <span title="Verified Diner" className="inline-flex">
                      <CheckCircle2 size={13} className="text-emerald-400" />
                    </span>
                  </h4>
                  <span className="text-[10px] uppercase tracking-wider text-white/40">
                    {activeReview.verifiedVisit}
                  </span>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="btn-pill-3d flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:border-[#c7a85c] hover:text-[#c7a85c] transition-all cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  className="btn-pill-3d flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:border-[#c7a85c] hover:text-[#c7a85c] transition-all cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="mt-8 flex justify-center gap-2">
            {filteredReviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 active:scale-90 cursor-pointer ${
                  i === safeIndex ? 'w-8 bg-[#c7a85c]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
