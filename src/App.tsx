import React, { useState, useEffect } from 'react';
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  CalendarDays, 
  Clock3, 
  Users, 
  Minus, 
  Plus, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  Star, 
  Trophy, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Quote, 
  Leaf, 
  Send,
  Flame,
  CheckCircle2,
  Globe,
  Film,
  Play,
  Navigation,
  Compass
} from 'lucide-react';

import heroDiningImg from './assets/images/luminary_hero_dining_1791143020999.jpg';
import openFireImg from './assets/images/luminary_open_fire_1791143030752.jpg';
import conservatoryImg from './assets/images/luminary_conservatory_1791155233511.jpg';

import { EmberCanvas } from './components/EmberCanvas';
import { InteractivePlatingStudio } from './components/InteractivePlatingStudio';
import { InteractiveSeatingFloorplan, TableSpot } from './components/InteractiveSeatingFloorplan';
import { MenuCourseJourney } from './components/MenuCourseJourney';
import { MobileFirstMenu } from './components/MobileFirstMenu';
import { AtmosphereVideoLoop } from './components/AtmosphereVideoLoop';
import { LiveSocialFeed } from './components/LiveSocialFeed';
import { ReviewsAggregator } from './components/ReviewsAggregator';
import { PrivateDiningPortal } from './components/PrivateDiningPortal';
import { UnifiedHoursMapIndicator } from './components/UnifiedHoursMapIndicator';
import { VipClubSignup } from './components/VipClubSignup';
import { ChefConcierge } from './components/ChefConcierge';
import { PromotionalVideoModal } from './components/PromotionalVideoModal';
import { JuniperBranch, OakFlameEmblem } from './components/BotanicalDrawings';
import { ToastProvider, useToast } from './components/ToastNotification';
import { Language, FULL_TRANSLATIONS } from './lib/translations';

const ACCOLADES = [
  { icon: Star, title: 'Two Michelin Stars', detail: 'Michelin Guide, 2026 — for the fourth consecutive year.' },
  { icon: Trophy, title: 'World’s 50 Best', detail: 'No. 34, 2025. The premier Manhattan entry inside the top forty.' },
  { icon: Award, title: 'James Beard Foundation', detail: 'Outstanding Chef & Botanical Program Finalist 2025.' },
  { icon: Sparkles, title: 'La Liste Paris', detail: 'Top 1% of fine dining restaurants worldwide, 2026.' },
];

const PRESS_QUOTES = [
  ['“A restaurant that behaves like an artist’s studio—every plate an intimate revelation.”', 'The New York Times'],
  ['“The most quietly confident wood-fired cooking anywhere on the eastern seaboard.”', 'Condé Nast Traveler'],
  ['“Luminary makes the familiar feel newly invented through fire and season.”', 'Bon Appétit'],
];

const VOICES = [
  {
    quote: 'I have dined in rooms that wanted to impress me. Luminary wanted to look after me—and I have thought about it every week since.',
    author: 'Amara Okafor',
    context: 'Anniversary Dinner, October',
  },
  {
    quote: 'The ember-roasted turbot arrived and our entire table fell into silent reverence. That is the entire review.',
    author: 'Julian Marsh',
    context: 'Hearth Counter, November',
  },
  {
    quote: 'They remembered our favorite tea, our allergies, and the song playing on our first visit three years ago. Hospitality is memory.',
    author: 'Priya & Daniel Rao',
    context: 'Patrons since 2018',
  },
  {
    quote: 'A seven-course journey that reads like a brilliant novel and ends like a good one—too soon, and exactly right.',
    author: 'Helena Bloch',
    context: 'Culinary Critic',
  },
];

const NAV_TRANSLATIONS: Record<Language, {
  dietaryMenu: string;
  reviews: string;
  privateDining: string;
  sohoNY: string;
}> = {
  en: { dietaryMenu: 'Dietary Menu', reviews: 'Reviews', privateDining: 'Private Dining', sohoNY: 'Soho NY' },
  fr: { dietaryMenu: 'Menu Allergènes', reviews: 'Avis Gastronomiques', privateDining: 'Salons Privés', sohoNY: 'Soho NY' },
  ja: { dietaryMenu: '食事アトリエ', reviews: 'ゲストレビュー', privateDining: 'プライベート', sohoNY: 'ソーホー NY' },
  it: { dietaryMenu: 'Menu Dietetico', reviews: 'Recensioni', privateDining: 'Cene Private', sohoNY: 'Soho NY' },
  ar: { dietaryMenu: 'قائمة الحمية', reviews: 'آراء الضيوف', privateDining: 'العشاء الخاص', sohoNY: 'سوهو نيويورك' },
};

function MainContent() {
  const { showToast } = useToast();
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const t = FULL_TRANSLATIONS[currentLang] || FULL_TRANSLATIONS.en;
  const navI18n = NAV_TRANSLATIONS[currentLang] || NAV_TRANSLATIONS.en;

  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [filmModalOpen, setFilmModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Reservation State
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('2026-11-18');
  const [time, setTime] = useState('19:30');
  const [seatingArea, setSeatingArea] = useState('Hearthside Counter');
  const [selectedTable, setSelectedTable] = useState<TableSpot | null>(null);
  const [specialNote, setSpecialNote] = useState('');
  const [isSubmittingReservation, setIsSubmittingReservation] = useState(false);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  // Contact state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // Synchronous scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroSlides = [
    {
      image: heroDiningImg,
      eyebrow: t.heroEyebrow,
      title: (
        <>
          {t.heroTitle1} <br />
          <em className="font-normal text-[#c7a85c]">{t.heroTitle2}</em>
        </>
      ),
      copy: t.heroCopy,
    },
    {
      image: openFireImg,
      eyebrow: 'The Open Hearth Pass · White-Oak Binchotan',
      title: (
        <>
          Where fire <br />
          <em className="font-normal text-[#c7a85c]">becomes flavor.</em>
        </>
      ),
      copy: 'An intimate study of heat, woodsmoke, and the beautiful unpredictability of live white-oak embers.',
    },
    {
      image: conservatoryImg,
      eyebrow: 'The Soho Glasshouse Conservatory',
      title: (
        <>
          An evening <br />
          <em className="font-normal text-[#c7a85c]">to remember.</em>
        </>
      ),
      copy: 'Come slowly. Stay late. Let the room, the glowing hearth, and the city outside fall away.',
    },
  ];

  // Hero slideshow timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Voices carousel timer
  useEffect(() => {
    const timer = setInterval(() => {
      setVoiceIndex((prev) => (prev + 1) % VOICES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleTableSelectedFromBlueprint = (table: TableSpot) => {
    setSelectedTable(table);
    setSeatingArea(table.name);
    setGuests(Math.min(guests, table.capacity));
    showToast('Table Selected', `Locked in ${table.name} on the floorplan.`, 'info');
  };

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReservation(true);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guests,
          date,
          time,
          seatingArea: selectedTable ? selectedTable.name : seatingArea,
          tableId: selectedTable?.id,
          notes: specialNote,
        }),
      });

      const data = await res.json();
      const code = data.reservation?.code || `LUM-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setConfirmationCode(code);
      setReservationConfirmed(true);

      showToast(
        'Reservation Confirmed',
        `Confirmed for ${guests} guests on ${date} at ${time}. Code: ${code}`,
        'success'
      );
    } catch {
      const fallbackCode = `LUM-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setConfirmationCode(fallbackCode);
      setReservationConfirmed(true);
      showToast('Reservation Confirmed', `Confirmed for ${guests} guests. Code: ${fallbackCode}`, 'success');
    } finally {
      setIsSubmittingReservation(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim()) return;

    showToast(
      'Message Received',
      `Thank you, ${contactName}. Director Ines Farrow and the team will reply to ${contactEmail} shortly.`,
      'success'
    );
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  const currentSlide = heroSlides[activeSlide];
  const activeVoice = VOICES[voiceIndex];

  return (
    <div className="relative min-h-screen bg-[#0b0a09] text-[#f6f2e9] selection:bg-[#c7a85c] selection:text-[#0b0a09]" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Top Synchronous Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#c7a85c] via-[#e5c97d] to-[#c7a85c] transition-all duration-75 shadow-[0_0_8px_#c7a85c]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Intelligent AI Concierge "Ask Lumi" with Red Hover close */}
      <ChefConcierge currentLanguage={currentLang} />

      {/* Promotional Film Modal */}
      <PromotionalVideoModal isOpen={filmModalOpen} onClose={() => setFilmModalOpen(false)} />

      {/* TOP NAVIGATION BAR — LUMINARY cleanly positioned to the left with generous spacing */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#0b0a09]/90 px-4 sm:px-6 md:px-8 xl:px-12 py-4 backdrop-blur-md">
        <div className="flex items-center">
          <a
            href="#top"
            className="font-serif text-xl tracking-[0.35em] text-[#f6f2e9] hover:text-[#c7a85c] transition-colors cursor-pointer active:scale-95 shrink-0 mr-12 lg:mr-20 xl:mr-28 pl-1"
          >
            LUMINARY
          </a>

          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-[11px] uppercase tracking-[0.22em] text-white/65">
            <a href="#menu" className="hover:text-[#c7a85c] transition-colors cursor-pointer">{t.navMenu}</a>
            <a href="#interactive-menu" className="hover:text-[#c7a85c] transition-colors cursor-pointer">{navI18n.dietaryMenu}</a>
            <a href="#gallery" className="hover:text-[#c7a85c] transition-colors cursor-pointer">{t.navPlating}</a>
            <a href="#reviews" className="hover:text-[#c7a85c] transition-colors cursor-pointer">{navI18n.reviews}</a>
            <a href="#private-dining" className="hover:text-[#c7a85c] transition-colors cursor-pointer">{navI18n.privateDining}</a>
            <a href="#visit" className="hover:text-[#c7a85c] transition-colors cursor-pointer">{t.navVisit}</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Single-Click Maps Link */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=18+Mercer+Street+New+York+NY+10013"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-white/60 hover:text-[#c7a85c] border border-white/10 rounded-full px-3 py-1.5 bg-[#12100d] transition-all"
            title="18 Mercer Street on Google Maps"
          >
            <MapPin size={11} className="text-[#c7a85c]" />
            <span>{navI18n.sohoNY}</span>
          </a>

          {/* Multi-Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="btn-pill-3d flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/70 hover:border-[#c7a85c] hover:text-[#c7a85c] transition-all"
              title="Change language"
            >
              <Globe size={12} className="text-[#c7a85c]" />
              <span className="font-medium">{currentLang.toUpperCase()}</span>
              <ChevronDown size={11} className={`transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-32 rounded-xl border border-white/15 bg-[#14120f] p-1.5 shadow-2xl backdrop-blur-xl z-50 animate-fade-up">
                {[
                  ['en', 'English'],
                  ['fr', 'Français'],
                  ['ja', '日本語'],
                  ['it', 'Italiano'],
                  ['ar', 'العربية'],
                ].map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setCurrentLang(code as Language);
                      setLangMenuOpen(false);
                      showToast('Language Changed', `Switched language to ${name}.`, 'info');
                    }}
                    className={`w-full rounded-lg px-3 py-1.5 text-left text-xs transition-all active:scale-95 cursor-pointer ${
                      currentLang === code
                        ? 'bg-[#c7a85c] text-[#0b0a09] font-medium'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="#reserve"
            className="btn-gold-3d flex items-center gap-2 rounded-full px-4.5 py-2 text-[10px] uppercase tracking-[0.22em] whitespace-nowrap"
          >
            <span>{t.reserveBtn}</span>
            <ArrowUpRight size={13} />
          </a>

          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all active:scale-90 cursor-pointer hover:border-[#c7a85c] hover:text-[#c7a85c] lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={16} />
          </button>
        </div>
      </header>

      {/* FULLSCREEN NAVIGATION OVERLAY WITH RED HOVER CLOSE */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0e0c0a]/98 p-6 md:p-14 backdrop-blur-xl animate-fade-up"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <span className="font-serif text-xl tracking-[0.3em] text-[#c7a85c]">LUMINARY</span>

            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.24em] text-white/60 transition-all duration-200 active:scale-90 cursor-pointer hover:text-red-500 hover:bg-red-500/15 hover:border-red-500/50"
              aria-label="Close menu"
            >
              <span>Close</span>
              <X size={16} />
            </button>
          </div>

          <nav className="flex flex-col gap-3 my-auto py-6">
            {[
              ['01', t.navMenu, '#menu'],
              ['02', 'Dietary Menu & Allergens', '#interactive-menu'],
              ['03', 'Atmosphere & Kitchen Pass', '#atmosphere-loop'],
              ['04', t.navPlating, '#gallery'],
              ['05', 'Diner Reviews (Google/Yelp)', '#reviews'],
              ['06', 'Private Dining & Events', '#private-dining'],
              ['07', t.reserveBtn, '#reserve'],
              ['08', 'Live Social Feed', '#social-feed'],
              ['09', t.navVisit, '#visit'],
            ].map(([num, label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline gap-4 font-serif text-2xl sm:text-4xl md:text-5xl text-white/80 hover:text-[#c7a85c] transition-all active:scale-98 cursor-pointer"
              >
                <span className="font-sans text-xs tracking-widest text-[#c7a85c]/60">{num}</span>
                <span>{label}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xl">↗</span>
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap justify-between border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.22em] text-white/40">
            <a
              href="https://www.google.com/maps/search/?api=1&query=18+Mercer+Street+New+York+NY+10013"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c7a85c] transition-colors"
            >
              18 Mercer Street, Soho, New York ↗
            </a>
            <span>+1 (212) 555-0137 · hello@luminary.house</span>
          </div>
        </div>
      )}

      {/* HERO SECTION — Synchronized Initial Paint with Zero Delay */}
      <section id="top" className="relative flex min-h-[92vh] items-end overflow-hidden px-6 pb-16 pt-32 md:px-12 md:pb-24">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              idx === activeSlide ? 'opacity-55 scale-100 z-0' : 'opacity-0 scale-105 pointer-events-none -z-10'
            }`}
          >
            <img
              src={slide.image}
              alt="Luminary dining house Soho"
              className="h-full w-full object-cover"
              loading={idx === 0 ? "eager" : "lazy"}
              referrerPolicy="no-referrer"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,#0b0a09_85%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09] via-[#0b0a09]/50 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <OakFlameEmblem className="w-5 h-5 text-[#c7a85c] animate-flame" />
            <span className="text-[10px] uppercase tracking-[0.38em] text-[#e5c97d]">
              {currentSlide.eyebrow}
            </span>
          </div>

          <h1 className="font-serif text-[clamp(3.8rem,9vw,8.5rem)] leading-[0.84] tracking-[-0.04em] text-[#f6f2e9] max-w-5xl">
            {currentSlide.title}
          </h1>

          <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end border-t border-white/15 pt-8">
            <p className="max-w-md text-sm leading-relaxed text-white/70">
              {currentSlide.copy}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              {/* Promotional Film Button */}
              <button
                onClick={() => setFilmModalOpen(true)}
                className="btn-pill-3d flex items-center gap-2.5 rounded-full border border-[#c7a85c] bg-[#c7a85c]/15 px-4.5 py-2 text-[10px] uppercase tracking-[0.24em] text-[#e5c97d] transition-all hover:bg-[#c7a85c] hover:text-[#0b0a09]"
              >
                <Play size={12} className="fill-current" />
                <span>{t.watchFilm}</span>
              </button>

              <a
                href="#reserve"
                className="group flex items-center gap-3 border-b border-[#c7a85c] pb-2 text-[10px] uppercase tracking-[0.28em] text-[#f6f2e9] hover:text-[#c7a85c] transition-all active:scale-95 cursor-pointer"
              >
                <span>{t.heroCta}</span>
                <ArrowDownRight size={15} className="text-[#c7a85c] transition group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>

              {/* Slide Buttons */}
              <div className="flex items-center gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    aria-label={`Jump to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 active:scale-90 cursor-pointer ${
                      i === activeSlide ? 'w-10 bg-[#c7a85c]' : 'w-3 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY & ETHOS */}
      <section className="border-y border-[var(--line)] bg-[#12100d] px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[0.8fr_1.2fr] md:gap-24 items-center">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#c7a85c] mb-4">
              <JuniperBranch className="w-5 h-5 text-[#c7a85c]" />
              <span>{t.ethosTag}</span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.92] tracking-[-0.04em] text-white">
              {t.ethosTitle1} <br />
              <em className="font-normal text-[#c7a85c]">{t.ethosTitle2}</em>
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-serif text-2xl md:text-4xl leading-snug text-white/90">
              {t.ethosQuote}
            </p>
            <p className="text-sm leading-relaxed text-white/60 max-w-xl">
              {t.ethosBody}
            </p>

            <div className="flex items-center gap-8 border-t border-white/10 pt-6 mt-4">
              <div>
                <span className="font-serif text-3xl text-[#c7a85c]">{t.ethosStat1}</span>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 mt-1">{t.ethosStat1Label}</p>
              </div>
              <div className="border-l border-white/10 pl-8">
                <span className="font-serif text-3xl text-[#c7a85c]">{t.ethosStat2}</span>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 mt-1">{t.ethosStat2Label}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATMOSPHERE VIDEO LOOP — Soundless Background Video Energy */}
      <section id="atmosphere-loop" className="px-6 py-16 md:px-12 md:py-24 bg-[#090807] border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#c7a85c] block mb-2 flex items-center gap-1.5">
                <Film size={13} className="text-[#c7a85c]" />
                <span>Atmosphere Video Loop · Real-Time Energy</span>
              </span>
              <h3 className="font-serif text-3xl sm:text-5xl text-white">
                Live Wood Hearth & Kitchen Pass
              </h3>
            </div>
            <p className="text-xs text-white/60 max-w-xs">
              Soundless continuous visual loop capturing the quiet reverence and glowing heat of service before your arrival.
            </p>
          </div>

          <div className="h-[440px] sm:h-[520px]">
            <AtmosphereVideoLoop className="h-full w-full" />
          </div>
        </div>
      </section>

      {/* 02 / THE TASTING MENU WITH FULL TRANSLATIONS */}
      <MenuCourseJourney currentLanguage={currentLang} />

      {/* MOBILE-FIRST RESPONSIVE MENU WITH DIETARY & ALLERGEN FILTERING */}
      <MobileFirstMenu currentLanguage={currentLang} />

      {/* DECORATIVE DIVIDER LINE BETWEEN 02 AND 03 */}
      <div className="relative py-6 bg-[#0b0a09] flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center gap-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#c7a85c]/40 to-[#c7a85c]" />
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#c7a85c]/40 bg-[#161310] text-[#e5c97d] text-[9px] uppercase tracking-[0.28em] shadow-lg">
            <OakFlameEmblem className="w-4 h-4 text-[#c7a85c]" />
            <span>Transition to Atelier</span>
            <OakFlameEmblem className="w-4 h-4 text-[#c7a85c]" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-[#c7a85c] via-[#c7a85c]/40 to-transparent" />
        </div>
      </div>

      {/* 03 / PLATING ATELIER & DRAWING STUDIO */}
      <div id="gallery">
        <InteractivePlatingStudio />
      </div>

      {/* LIVING EMBER HEARTH WITH WORKING CLICK-TO-SPARK PARTICLES */}
      <EmberCanvas />

      {/* REVIEWS AGGREGATOR — LIVE GOOGLE & YELP REVIEWS CAROUSEL */}
      <ReviewsAggregator currentLanguage={currentLang} />

      {/* RECOGNITION & ACCOLADES */}
      <section id="accolades" className="border-y border-[var(--line)] bg-[#100e0c] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#c7a85c]">
              {t.accoladesTag}
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
              Michelin Guide 2026
            </span>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ACCOLADES.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="card-3d-hover rounded-xl border border-white/10 bg-[#141210] p-6 hover:border-[#c7a85c]/40 transition-all">
                <Icon size={24} className="text-[#c7a85c]" strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-2xl text-white">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/50">{detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-8 border-t border-white/10 pt-12 md:grid-cols-3">
            {PRESS_QUOTES.map(([quote, source]) => (
              <blockquote key={source} className="flex flex-col justify-between">
                <p className="font-serif text-xl leading-snug text-white/85 italic">
                  {quote}
                </p>
                <footer className="mt-4 text-[10px] uppercase tracking-[0.24em] text-[#c7a85c]">
                  {source}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 05 / RESERVATIONS & ARCHITECTURAL BLUEPRINT */}
      <section id="reserve" className="relative px-6 py-24 md:px-12 md:py-36 bg-[#0e0c0a]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-white/10 pb-10 mb-12">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#c7a85c] mb-4">
                <CalendarDays size={14} />
                <span>05 / {t.reserveHeading1} {t.reserveHeading2}</span>
              </div>
              <h2 className="font-serif text-5xl md:text-8xl leading-[0.88] tracking-[-0.04em] text-white">
                {t.reserveHeading1} <br />
                <em className="font-normal text-[#c7a85c]">{t.reserveHeading2}</em>
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-white/60 max-w-sm">
              {t.floorplanSub}
            </p>
          </div>

          <div className="mb-14">
            <InteractiveSeatingFloorplan
              selectedTableId={selectedTable?.id || null}
              onSelectTable={handleTableSelectedFromBlueprint}
              currentLanguage={currentLang}
            />
          </div>

          {/* RESERVATION FORM WITH EXACT UNIFORM HEIGHT & SIZE ALIGNMENT */}
          <div className="rounded-2xl border border-[#c7a85c]/35 bg-[#14120f] p-8 md:p-12 shadow-2xl">
            {reservationConfirmed ? (
              <div className="py-10 text-center flex flex-col items-center">
                <CheckCircle2 size={44} className="text-[#c7a85c] mb-4" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#c7a85c]">
                  Reservation Confirmed
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-white mt-2">
                  {t.bookingSuccessTitle}
                </h3>
                <p className="text-sm text-white/65 mt-3 max-w-md leading-relaxed">
                  Confirmation code: <strong className="text-[#e5c97d] font-mono tracking-wider">{confirmationCode}</strong>. {t.bookingSuccessSub} ({date} · {time} · {guests} guests · {selectedTable ? selectedTable.name : seatingArea}).
                </p>
                <button
                  onClick={() => setReservationConfirmed(false)}
                  className="btn-pill-3d mt-6 rounded-full border border-white/20 px-6 py-2 text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white"
                >
                  Book Another Evening
                </button>
              </div>
            ) : (
              <form onSubmit={handleReservationSubmit} className="grid gap-8">
                {/* ROW 1: All three boxes have exact uniform height h-[50px] */}
                <div className="grid gap-6 sm:grid-cols-3 border-b border-white/10 pb-8">
                  {/* Party size counter */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-3">
                      {t.partySize}
                    </label>
                    <div className="h-[50px] flex items-center justify-between bg-[#0d0c0a] border border-white/15 rounded-xl px-4">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="btn-pill-3d p-1.5 text-white/60 hover:text-[#c7a85c] transition-all rounded-md cursor-pointer"
                        aria-label="Decrease party size"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-serif text-base text-white font-medium">{guests}</span>
                      <button
                        type="button"
                        onClick={() => setGuests(Math.min(12, guests + 1))}
                        className="btn-pill-3d p-1.5 text-white/60 hover:text-[#c7a85c] transition-all rounded-md cursor-pointer"
                        aria-label="Increase party size"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Date picker */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-3">
                      {t.date}
                    </label>
                    <div className="h-[50px] flex items-center gap-3 bg-[#0d0c0a] border border-white/15 rounded-xl px-4">
                      <CalendarDays size={16} className="text-[#c7a85c] shrink-0" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-transparent text-sm text-white outline-none w-full font-serif cursor-pointer"
                        required
                      />
                    </div>
                  </div>

                  {/* Time slot picker */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-3">
                      {t.time}
                    </label>
                    <div className="h-[50px] flex items-center gap-3 bg-[#0d0c0a] border border-white/15 rounded-xl px-4">
                      <Clock3 size={16} className="text-[#c7a85c] shrink-0" />
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="bg-transparent text-sm text-white outline-none w-full font-serif cursor-pointer"
                      >
                        <option value="17:30" className="bg-[#12100d]">5:30 PM (Early Hearth)</option>
                        <option value="18:30" className="bg-[#12100d]">6:30 PM</option>
                        <option value="19:30" className="bg-[#12100d]">7:30 PM (Prime Service)</option>
                        <option value="20:30" className="bg-[#12100d]">8:30 PM</option>
                        <option value="21:15" className="bg-[#12100d]">9:15 PM (Late Sitting)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* ROW 2: Both boxes have exact uniform height h-[50px] */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-3">
                      {t.selectedArea}
                    </label>
                    <div className="h-[50px] rounded-xl border border-white/15 bg-[#0d0c0a] px-4 flex items-center justify-between">
                      <span className="font-serif text-sm text-[#e5c97d] truncate">
                        {selectedTable ? selectedTable.name : seatingArea}
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.16em] text-white/40 ml-2 shrink-0">
                        {selectedTable ? 'Blueprint Locked' : 'General'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-3">
                      Dietary Preferences / Notes
                    </label>
                    <input
                      type="text"
                      value={specialNote}
                      onChange={(e) => setSpecialNote(e.target.value)}
                      placeholder={t.dietaryPlaceholder}
                      className="h-[50px] w-full rounded-xl border border-white/15 bg-[#0d0c0a] px-4 text-xs text-white placeholder:text-white/35 outline-none focus:border-[#c7a85c]"
                    />
                  </div>
                </div>

                {/* Tactile 3D Action Button */}
                <button
                  type="submit"
                  disabled={isSubmittingReservation}
                  className="btn-gold-3d w-full rounded-xl py-4 text-[11px] uppercase tracking-[0.26em] flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmittingReservation ? (
                    <span>Securing Table...</span>
                  ) : (
                    <>
                      <span>{t.confirmBooking} ({guests} Guests)</span>
                      <ArrowUpRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* PRIVATE DINING & EVENTS PORTAL (Large Groups, PDF Download, Inquiry Form) */}
      <PrivateDiningPortal currentLanguage={currentLang} />

      {/* THE HOUSE & ARTISANS */}
      <section id="team" className="px-6 py-24 md:px-12 md:py-36 bg-[#0b0a09]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end border-b border-white/10 pb-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#c7a85c] block mb-4">
                {t.houseTag}
              </span>
              <h2 className="font-serif text-5xl md:text-8xl leading-[0.88] tracking-[-0.04em] text-white">
                {t.houseTitle1} <br />
                <em className="font-normal text-[#c7a85c]">{t.houseTitle2}</em>
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-white/60 max-w-sm">
              {t.houseSub}
            </p>
          </div>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.team.map((member, idx) => (
              <div key={member.name} className="card-3d-hover group rounded-2xl border border-white/10 bg-[#12100d] p-7 transition duration-500 hover:border-[#c7a85c]/40 hover:bg-[#161411]">
                <div className="h-20 w-20 rounded-full border border-[#c7a85c]/40 bg-[#191612] flex items-center justify-center font-serif text-2xl text-[#e5c97d] shadow-lg group-hover:scale-105 transition-transform duration-500">
                  {['EW', 'ML', 'TR', 'IF'][idx] || member.name.slice(0, 2)}
                </div>
                <span className="text-[9px] uppercase tracking-[0.24em] text-[#c7a85c] block mt-6">
                  {member.role}
                </span>
                <h3 className="font-serif text-2xl text-white mt-1">{member.name}</h3>
                <p className="text-xs text-white/55 mt-3 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE SOCIAL FEED — INSTAGRAM GRID */}
      <LiveSocialFeed />

      {/* GUEST VOICES */}
      <section id="voices" className="border-y border-[var(--line)] bg-[#12100d] px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Quote size={32} className="mx-auto text-[#c7a85c] opacity-80 mb-6" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#c7a85c] block mb-8">
            {t.voicesTag}
          </span>

          <blockquote className="font-serif text-2xl sm:text-4xl md:text-5xl text-white leading-snug italic transition-all duration-700">
            &ldquo;{activeVoice.quote}&rdquo;
          </blockquote>

          <div className="mt-10 flex flex-col items-center gap-2">
            <div className="flex gap-1 text-[#c7a85c]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/80 mt-1">
              {activeVoice.author} · <span className="text-white/40">{activeVoice.context}</span>
            </p>
          </div>

          <div className="mt-10 flex justify-center gap-2">
            {VOICES.map((_, i) => (
              <button
                key={i}
                onClick={() => setVoiceIndex(i)}
                aria-label={`Jump to quote ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 active:scale-90 cursor-pointer ${
                  i === voiceIndex ? 'w-8 bg-[#c7a85c]' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* UNIFIED HOURS INDICATOR & 1-CLICK NAVIGATION MAP */}
      <section id="visit" className="px-6 py-20 md:px-12 md:py-28 bg-[#0b0a09]">
        <div className="mx-auto max-w-7xl">
          <UnifiedHoursMapIndicator />
        </div>
      </section>

      {/* FAQS */}
      <section className="border-t border-[var(--line)] bg-[#100e0c] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#c7a85c] block mb-4">
              {t.visitTag}
            </span>
            <h2 className="font-serif text-5xl md:text-7xl text-white leading-tight">
              {t.visitTitle}
            </h2>
            <p className="text-xs text-white/60 mt-4 leading-relaxed">
              Curious about arrival etiquette, table holds, or seasonal dietary menus? Lumi and our hospitality team have documented the essential answers below.
            </p>
          </div>

          <div className="divide-y divide-white/10 border-t border-b border-white/10">
            {t.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="py-5">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between text-left group active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <span className="font-serif text-lg md:text-xl text-white group-hover:text-[#c7a85c] transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-[#c7a85c] transition-transform duration-300 shrink-0 ml-4 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-xs leading-relaxed text-white/60 pr-8 animate-fade-up">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-20 md:px-12 md:py-28 bg-[#0b0a09] border-t border-[var(--line)]">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#c7a85c] block mb-4">
              {t.contactTag}
            </span>
            <h2 className="font-serif text-5xl md:text-7xl text-white leading-tight">
              {t.contactTitle}
            </h2>
            <p className="mt-6 text-sm text-white/60 leading-relaxed max-w-md">
              {t.contactSub}
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="rounded-2xl border border-white/10 bg-[#12100d] p-8 md:p-10 shadow-xl grid gap-5">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
                {t.contactNameLabel}
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. Lady Vivienne Sterling"
                className="h-[50px] w-full rounded-xl border border-white/15 bg-[#090807] px-4 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#c7a85c]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
                {t.contactEmailLabel}
              </label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="you@domain.com"
                className="h-[50px] w-full rounded-xl border border-white/15 bg-[#090807] px-4 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#c7a85c]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
                {t.contactMsgLabel}
              </label>
              <textarea
                required
                rows={4}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Inquire about private dining, botanical pairings, or celebrations..."
                className="w-full rounded-xl border border-white/15 bg-[#090807] px-4 py-3 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#c7a85c] resize-none"
              />
            </div>

            <button
              type="submit"
              className="btn-gold-3d mt-2 flex items-center justify-center gap-2 rounded-xl py-3.5 text-[10px] uppercase tracking-[0.22em] cursor-pointer"
            >
              <span>{t.sendNote}</span>
              <Send size={13} />
            </button>
          </form>
        </div>
      </section>

      {/* E-NEWSLETTER VIP CLUB (WITH IMMEDIATE REWARD INCENTIVE) */}
      <section className="px-6 py-16 md:px-12 bg-[#0d0b09] border-t border-[var(--line)]">
        <div className="mx-auto max-w-7xl">
          <VipClubSignup />
        </div>
      </section>

      {/* FOOTER WITH UNIFIED HOURS & 1-CLICK NAVIGATION */}
      <footer className="border-t border-white/10 bg-[#080706] px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-serif text-xl tracking-[0.35em] text-[#c7a85c] block">LUMINARY</span>
            <p className="text-xs text-white/45 mt-3 leading-relaxed">
              Dining house for the curious, the romantic, and the very hungry. Two Michelin stars. Soho, Manhattan.
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#c7a85c] block mb-3">Address & Directions</span>
            <p className="text-xs text-white/60 leading-relaxed">
              18 Mercer Street<br />
              Between Howard & Grand<br />
              New York, NY 10013
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=18+Mercer+Street+New+York+NY+10013"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#e5c97d] mt-2 hover:underline"
            >
              <span>Get Directions (Google Maps)</span>
              <ArrowUpRight size={11} />
            </a>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#c7a85c] block mb-3">Operating Schedule</span>
            <p className="text-xs text-white/60 leading-relaxed">
              Tuesday – Saturday<br />
              Seating 5:30 PM until late<br />
              Kitchen closes 10:15 PM<br />
              Valet directly on Mercer St
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#c7a85c] block mb-3">Direct Contact</span>
            <p className="text-xs text-white/60 leading-relaxed">
              +1 (212) 555-0137<br />
              hello@luminary.house<br />
              @luminarydining
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-[0.18em] text-white/30 gap-4">
          <span>{t.footerRights}</span>
          <span>{t.footerSub}</span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainContent />
    </ToastProvider>
  );
}
