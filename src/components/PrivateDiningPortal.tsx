import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  FileText, 
  Download, 
  Sparkles, 
  Flame, 
  Check, 
  Send, 
  Clock, 
  ArrowUpRight,
  Shield,
  Layers,
  Award
} from 'lucide-react';
import conservatoryImg from '../assets/images/luminary_conservatory_1791155233511.jpg';
import grandDiningBuyoutImg from '../assets/images/grand_dining_buyout_1792280575443.jpg';
import vaultImg from '../assets/images/luminary_private_vault_1792279234418.jpg';
import { useToast } from './ToastNotification';
import { Language } from '../lib/translations';

interface PrivateSpace {
  id: string;
  name: string;
  tagline: string;
  capacitySeated: number;
  capacityReception: number;
  description: string;
  amenities: string[];
  image: string;
}

const PRIVATE_SPACES: PrivateSpace[] = [
  {
    id: 'vault',
    name: 'The Subterranean Vault & Salon',
    tagline: 'Intimate subterranean sanctuary with historic brick arches',
    capacitySeated: 12,
    capacityReception: 18,
    description: 'An exclusive private room set beneath the historic cobblestones of Mercer Street. Features a bespoke 14-foot slab of reclaimed black walnut, dedicated private server, and separate entrance.',
    amenities: ['Dedicated Captain & Sommelier', 'Sonos Acoustic Tuning', 'Custom Calligraphy Menu Scrolls', 'Private Coat & Restroom Access'],
    image: vaultImg,
  },
  {
    id: 'conservatory',
    name: 'The Soho Glasshouse Conservatory',
    tagline: 'Dramatic cast-iron skylight & living botanical installation',
    capacitySeated: 28,
    capacityReception: 45,
    description: 'Bathed in moonlight and amber sconces, the Conservatory overlooks a private garden courtyard. Ideal for corporate milestone dinners, rehearsal celebrations, and intimate brand launches.',
    amenities: ['Private Wood-Fired Serving Hearth', 'Floral & Candle Installations', 'AV & Presentation Screen Option', 'Direct Courtyard Access'],
    image: conservatoryImg,
  },
  {
    id: 'buyout',
    name: 'Full Luminary Dining House Buyout',
    tagline: 'Complete exclusive run of 18 Mercer Street for up to 100 guests',
    capacitySeated: 65,
    capacityReception: 100,
    description: 'The ultimate culinary takeover. Chef Elias Warren and the entire culinary ensemble devote the open wood hearth and all salons exclusively to your company and guests.',
    amenities: ['Complete Exclusive Property Access', 'Bespoke 7-Act Menu Collaborated with Chef Warren', 'Custom Botanical Bar Program', 'Valet & Red Carpet Entrance'],
    image: grandDiningBuyoutImg,
  },
];

const PACKAGES = [
  {
    tier: 'The Binchotan Prestige Tasting',
    price: '$225 / guest',
    courses: '5-Course Wood-Fired Journey',
    details: 'Featuring Hokkaido uni, Brittany turbot, dry-aged Mishima wagyu, and Guanaja cacao sphere. Includes welcome botanical spritz and house mignardises.',
  },
  {
    tier: 'The Imperial Grand Hearth Feast',
    price: '$295 / guest',
    courses: '7-Act Full Sensory Exploration',
    details: 'Our flagship two-star progression with live black truffle shaved tableside, osetra caviar, and paired artisanal botanical elixirs for every guest.',
  },
  {
    tier: 'The Executive Bespoke Buyout',
    price: '$360 / guest',
    courses: 'Custom Culinary Composition',
    details: 'Personal consultation with Chef Elias Warren. Personalized embossed leather menus, parting gift boxes with house-smoked salt and binchotan chocolates.',
  },
];

interface PrivateDiningPortalProps {
  currentLanguage?: Language;
}

const PORTAL_I18N: Record<Language, {
  tag: string;
  title1: string;
  title2: string;
  downloadPdf: string;
  packagesHeading: string;
  selectPackage: string;
  selectedPackage: string;
  inquiryHeading: string;
  submitInquiry: string;
  targetDate: string;
  guestCountLabel: string;
  yourName: string;
  emailAddress: string;
  phone: string;
  specialRequests: string;
}> = {
  en: {
    tag: '06 / Private Dining & Event Prospectus',
    title1: 'Grand gatherings',
    title2: 'under live embers.',
    downloadPdf: 'Download PDF Prospectus',
    packagesHeading: 'Fixed-Price Private Dining Packages',
    selectPackage: 'Select This Package',
    selectedPackage: '✓ Package Selected',
    inquiryHeading: 'Request an Exclusive Evening',
    submitInquiry: 'Transmit Event Inquiry',
    targetDate: 'Target Date',
    guestCountLabel: 'Guest Count',
    yourName: 'Your Name',
    emailAddress: 'Email Address',
    phone: 'Phone Number',
    specialRequests: 'Special Requests & Vision',
  },
  fr: {
    tag: '06 / Salons Privés & Privatisation',
    title1: 'Grandes réceptions',
    title2: 'sous les braises.',
    downloadPdf: 'Télécharger le Dossier PDF',
    packagesHeading: 'Formules Salons Privés à Prix Fixe',
    selectPackage: 'Choisir Cette Formule',
    selectedPackage: '✓ Formule Sélectionnée',
    inquiryHeading: 'Demander une Soirée Privée',
    submitInquiry: 'Transmettre la Demande',
    targetDate: 'Date Souhaitée',
    guestCountLabel: 'Nombre de Convives',
    yourName: 'Votre Nom',
    emailAddress: 'Adresse E-mail',
    phone: 'Numéro de Téléphone',
    specialRequests: 'Demandes Spéciales & Vision',
  },
  ja: {
    tag: '06 / プライベートサロン＆貸切プラン',
    title1: '特別な集い',
    title2: '暖かな炭火のぬくもりで。',
    downloadPdf: 'PDFパンフレットを保存',
    packagesHeading: 'プライベート特別コース（定額）',
    selectPackage: 'このパッケージを選択',
    selectedPackage: '✓ パッケージ選択中',
    inquiryHeading: 'プライベートイブニングの予約・相談',
    submitInquiry: '問い合わせを送信',
    targetDate: '希望日',
    guestCountLabel: 'ご利用人数',
    yourName: 'お名前',
    emailAddress: 'メールアドレス',
    phone: 'お電話番号',
    specialRequests: 'ご要望・演出について',
  },
  it: {
    tag: '06 / Saloni Privati & Prospetto Eventi',
    title1: 'Grandi celebrazioni',
    title2: 'sotto le braci vive.',
    downloadPdf: 'Scarica Prospetto PDF',
    packagesHeading: 'Pacchetti Cene Private a Prezzo Fisso',
    selectPackage: 'Seleziona Questo Pacchetto',
    selectedPackage: '✓ Pacchetto Selezionato',
    inquiryHeading: 'Richiedi una Serata Esclusiva',
    submitInquiry: 'Invia Richiesta Evento',
    targetDate: 'Data Prevista',
    guestCountLabel: 'Numero Ospiti',
    yourName: 'Nome e Cognome',
    emailAddress: 'Indirizzo Email',
    phone: 'Numero di Telefono',
    specialRequests: 'Richieste Speciali & Visione',
  },
  ar: {
    tag: '06 / دليل الفعاليات والعشاء الخاص',
    title1: 'أمسيات كبرى',
    title2: 'تحت جمرات الموقد الحي.',
    downloadPdf: 'تحميل ملف الفعاليات PDF',
    packagesHeading: 'باقات العشاء الخاص بأسعار محددة',
    selectPackage: 'اختر هذه الباقة',
    selectedPackage: '✓ تم اختيار الباقة',
    inquiryHeading: 'طلب أمسية خاصة وحصرية',
    submitInquiry: 'إرسال طلب الفعالية',
    targetDate: 'التاريخ المستهدف',
    guestCountLabel: 'عدد الضيوف',
    yourName: 'الاسم الكريم',
    emailAddress: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    specialRequests: 'الطلبات الخاصة ورؤية الأمسية',
  },
};

export const PrivateDiningPortal: React.FC<PrivateDiningPortalProps> = ({ currentLanguage = 'en' }) => {
  const tPortal = PORTAL_I18N[currentLanguage] || PORTAL_I18N.en;
  const { showToast } = useToast();
  const [selectedSpaceId, setSelectedSpaceId] = useState('conservatory');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [eventType, setEventType] = useState('corporate');
  const [guestCount, setGuestCount] = useState(16);
  const [eventDate, setEventDate] = useState('2026-11-20');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const activeSpace = PRIVATE_SPACES.find((s) => s.id === selectedSpaceId) || PRIVATE_SPACES[0];

  const handleDownloadPDFPackage = () => {
    // Generate and trigger printable event dossier window
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      showToast('Pop-up Blocked', 'Please allow pop-ups to view and save the PDF event brochure.', 'info');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Luminary Dining House — Private Events & Buyout Dossier</title>
          <style>
            * {
              box-sizing: border-box;
              font-variant-numeric: lining-nums tabular-nums !important;
              -webkit-font-feature-settings: "lnum" 1, "tnum" 1, "onum" 0 !important;
              font-feature-settings: "lnum" 1, "tnum" 1, "onum" 0 !important;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
              color: #1a1714;
              background: #faf8f5;
              margin: 40px;
              line-height: 1.6;
              font-variant-numeric: lining-nums tabular-nums !important;
            }
            p, span, strong, div {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
              font-variant-numeric: lining-nums tabular-nums !important;
            }
            .header { text-align: center; border-bottom: 2px solid #c7a85c; padding-bottom: 20px; margin-bottom: 30px; }
            .title { font-size: 28px; letter-spacing: 4px; text-transform: uppercase; color: #111; margin: 0; font-family: 'Playfair Display', Georgia, serif !important; }
            .subtitle { font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #8e7336; margin-top: 8px; }
            .section { margin-bottom: 25px; }
            h2 { font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 6px; color: #222; font-family: 'Playfair Display', Georgia, serif !important; }
            .card { background: white; border: 1px solid #e0ded9; padding: 18px 20px; margin-bottom: 14px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
            .card h3 { margin-top: 0; margin-bottom: 8px; font-size: 16px; color: #111; font-family: 'Playfair Display', Georgia, serif !important; }
            .stat-num {
              font-variant-numeric: lining-nums tabular-nums !important;
              -webkit-font-feature-settings: "lnum" 1, "tnum" 1, "onum" 0 !important;
              font-feature-settings: "lnum" 1, "tnum" 1, "onum" 0 !important;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif !important;
              font-weight: 700;
              color: #8e7336;
              display: inline;
              vertical-align: baseline !important;
              line-height: inherit !important;
              letter-spacing: 0px;
            }
            .pricing {
              font-weight: 700;
              color: #8e7336;
              font-size: 15px;
              vertical-align: baseline !important;
              font-variant-numeric: lining-nums tabular-nums !important;
              -webkit-font-feature-settings: "lnum" 1, "tnum" 1, "onum" 0 !important;
              font-feature-settings: "lnum" 1, "tnum" 1, "onum" 0 !important;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            }
            .footer { text-align: center; font-size: 11px; color: #777; margin-top: 40px; border-top: 1px solid #ddd; padding-top: 15px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">LUMINARY</h1>
            <p class="subtitle">Private Dining & Event Prospectus · 18 Mercer Street, Soho, New York</p>
          </div>
          
          <div class="section">
            <h2>Private Rooms & Capacities</h2>
            <div class="card">
              <h3>The Subterranean Vault & Salon</h3>
              <p>Capacity: <span class="stat-num">12</span> Seated &nbsp;·&nbsp; <span class="stat-num">18</span> Reception. Historic vaulted ceiling, bespoke black walnut table, private captain.</p>
            </div>
            <div class="card">
              <h3>The Soho Glasshouse Conservatory</h3>
              <p>Capacity: <span class="stat-num">28</span> Seated &nbsp;·&nbsp; <span class="stat-num">45</span> Reception. Skylit cast-iron architecture, live wood-fired hearth pass, courtyard view.</p>
            </div>
            <div class="card">
              <h3>Full Dining House Buyout</h3>
              <p>Capacity: <span class="stat-num">65</span> Seated &nbsp;·&nbsp; <span class="stat-num">100</span> Reception. Exclusive property takeover with Chef Elias Warren.</p>
            </div>
          </div>

          <div class="section">
            <h2>Fixed-Price Private Dining Packages</h2>
            <div class="card">
              <span class="pricing">$225 per guest</span> — <strong>The Binchotan Prestige Tasting (5 Courses)</strong>
              <p>Includes Brittany turbot, Wagyu ribeye, welcome botanical spritz, and personalized menus.</p>
            </div>
            <div class="card">
              <span class="pricing">$295 per guest</span> — <strong>The Imperial Grand Hearth Feast (7 Acts)</strong>
              <p>Our complete two-Michelin-starred sensory progression with tableside black truffles and pairings.</p>
            </div>
            <div class="card">
              <span class="pricing">$360 per guest</span> — <strong>The Executive Bespoke Buyout</strong>
              <p>Tailored directly with Chef Warren, embossed leather keepsake menus, and custom chocolate gift boxes.</p>
            </div>
          </div>

          <div class="footer">
            <p>Direct Private Dining Inquiries: events@luminary.house · +1 (212) 555-0137 · 18 Mercer Street, Soho, NY 10013</p>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    showToast('Package Ready', 'PDF Private Dining Prospectus opened for print / download.', 'success');
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast(
        'Inquiry Submitted',
        `Thank you ${name}. Our Private Events Director will contact you at ${email} within 24 hours.`,
        'success'
      );
    }, 600);
  };

  return (
    <section id="private-dining" className="px-6 py-20 md:px-12 md:py-28 bg-[#0b0a09] border-t border-[var(--line)]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 border-b border-white/10 pb-8 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#c7a85c] mb-3">
              <Users size={14} className="text-[#c7a85c]" />
              <span>{tPortal.tag}</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white leading-tight">
              {tPortal.title1} <br />
              <em className="font-normal text-[#c7a85c]">{tPortal.title2}</em>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* PDF Package Download Button */}
            <button
              onClick={handleDownloadPDFPackage}
              className="btn-gold-3d flex items-center gap-2 rounded-full px-5 py-3 text-[10px] uppercase tracking-[0.2em]"
            >
              <Download size={14} />
              <span>{tPortal.downloadPdf}</span>
            </button>
          </div>
        </div>

        {/* Space Selector Tabs */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {PRIVATE_SPACES.map((space) => {
            const isSelected = selectedSpaceId === space.id;
            return (
              <button
                key={space.id}
                onClick={() => setSelectedSpaceId(space.id)}
                className={`card-3d-hover p-6 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#c7a85c] bg-[#161310] shadow-[0_8px_24px_rgba(199,168,92,0.15)]'
                    : 'border-white/10 bg-[#12100d] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#c7a85c]">
                    {space.capacitySeated} Seated · {space.capacityReception} Reception
                  </span>
                  {isSelected && <Check size={14} className="text-[#c7a85c]" />}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-white mt-2 leading-snug">
                  {space.name}
                </h3>
                <p className="text-xs text-white/50 mt-1 line-clamp-2">
                  {space.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Space Spotlight Details */}
        <div className="rounded-3xl border border-white/15 bg-[#14120f] overflow-hidden grid lg:grid-cols-[1.1fr_0.9fr] mb-14 shadow-2xl">
          <div className="p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#e5c97d] flex items-center gap-1.5 mb-2">
                <Flame size={12} className="text-[#c7a85c]" />
                <span>Selected Event Space</span>
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-white leading-tight">
                {activeSpace.name}
              </h3>
              <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed">
                {activeSpace.description}
              </p>

              {/* Amenities Pills */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-3">
                  Included Private Amenities
                </span>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {activeSpace.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-xs text-white/80">
                      <Check size={13} className="text-[#c7a85c] shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-white/40 block">Capacity</span>
                <span className="font-serif text-xl text-white">
                  {activeSpace.capacitySeated} Seated / {activeSpace.capacityReception} Standing
                </span>
              </div>

              <a
                href="#event-inquiry-form"
                className="btn-gold-3d flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.2em]"
              >
                <span>Inquire for {activeSpace.name.split(' ')[1]}</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          <div className="relative min-h-[300px] lg:min-h-[440px] bg-black">
            <img
              src={activeSpace.image}
              alt={activeSpace.name}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#e5c97d]">
                18 Mercer Street Private Residence
              </span>
              <p className="font-serif text-xl text-white mt-1">Soho Historic District</p>
            </div>
          </div>
        </div>

        {/* FIXED-PRICE MENUS BREAKDOWN */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#c7a85c] mb-3">
            <Layers size={13} />
            <span>{tPortal.packagesHeading}</span>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl text-white mb-6">
            Curated Tasting Menus for Groups
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => {
              const isSelected = selectedPackage === pkg.tier;
              return (
                <div
                  key={pkg.tier}
                  className={`card-3d-hover rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 ${
                    isSelected
                      ? 'border-[#c7a85c] bg-[#1a1612] shadow-[0_12px_32px_rgba(199,168,92,0.2)] ring-1 ring-[#c7a85c]'
                      : 'border-white/10 bg-[#12100d] hover:border-white/25'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-[0.24em] text-[#c7a85c] block font-mono">
                        {pkg.courses}
                      </span>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#e5c97d] font-medium bg-[#c7a85c]/20 border border-[#c7a85c]/40 px-2 py-0.5 rounded-full">
                          <Check size={11} className="text-[#c7a85c]" />
                          <span>Selected</span>
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-2xl text-white mt-2 leading-snug">
                      {pkg.tier}
                    </h4>
                    <p className="font-serif text-2xl text-[#e5c97d] font-bold mt-3">
                      {pkg.price}
                    </p>
                    <p className="text-xs text-white/60 mt-4 leading-relaxed">
                      {pkg.details}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPackage(pkg.tier);
                        setNotes((prev) => prev ? `${prev}\nInterested in: ${pkg.tier} (${pkg.price})` : `Interested in: ${pkg.tier} (${pkg.price})`);
                        showToast('Package Selected', `Selected ${pkg.tier}. Directing to inquiry form below.`, 'info');
                        setTimeout(() => {
                          const formElem = document.getElementById('event-inquiry-form');
                          formElem?.scrollIntoView({ behavior: 'smooth' });
                        }, 180);
                      }}
                      className={`w-full text-center rounded-xl py-3.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-150 cursor-pointer select-none ${
                        isSelected
                          ? 'bg-[#c7a85c] text-[#0b0a09] font-bold shadow-lg ring-1 ring-[#c7a85c]'
                          : 'border border-[#c7a85c]/50 bg-[#191612] text-[#e5c97d] hover:bg-[#c7a85c] hover:text-[#0b0a09]'
                      }`}
                    >
                      {isSelected ? tPortal.selectedPackage : tPortal.selectPackage}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* EVENT INQUIRY FORM */}
        <div id="event-inquiry-form" className="rounded-3xl border border-[#c7a85c]/40 bg-[#14120f] p-8 sm:p-12 shadow-2xl">
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c7a85c] block mb-2">
              Step 02 / Direct Inquiry
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl text-white leading-tight">
              {tPortal.inquiryHeading}
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mt-2">
              Our Private Dining Director will formulate a personalized proposal with bespoke floorplans and dietary menus within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center">
              <Check size={40} className="text-[#c7a85c] mb-3" />
              <h4 className="font-serif text-3xl text-white">Event Inquiry Received</h4>
              <p className="text-xs text-white/60 max-w-md mt-2 leading-relaxed">
                Thank you, {name}. A customized proposal for your {eventType} celebration ({guestCount} guests) has been submitted to Private Dining Director Ines Farrow.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-pill-3d mt-6 rounded-full border border-white/20 px-6 py-2 text-[10px] uppercase tracking-[0.2em] text-white/70"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="grid gap-6">
              <div className="grid sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="h-12 w-full rounded-xl border border-white/15 bg-[#0d0c0a] px-3.5 text-xs text-white outline-none focus:border-[#c7a85c] cursor-pointer"
                  >
                    <option value="corporate" className="bg-[#14120f]">Corporate Milestone Dinner</option>
                    <option value="birthday" className="bg-[#14120f]">Birthday / Private Celebration</option>
                    <option value="buyout" className="bg-[#14120f]">Full Restaurant Buyout</option>
                    <option value="wedding" className="bg-[#14120f]">Rehearsal / Wedding Dinner</option>
                    <option value="brand" className="bg-[#14120f]">Brand Launch / VIP Reception</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
                    {tPortal.guestCountLabel} ({guestCount})
                  </label>
                  <input
                    type="range"
                    min="6"
                    max="100"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full h-12 accent-[#c7a85c] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
                    {tPortal.targetDate}
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    min="2026-01-01"
                    className="h-12 w-full rounded-xl border border-white/15 bg-[#0d0c0a] px-3.5 text-xs text-white outline-none focus:border-[#c7a85c] cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
                    {tPortal.yourName}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lady Vivienne Sterling"
                    className="h-12 w-full rounded-xl border border-white/15 bg-[#0d0c0a] px-3.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#c7a85c]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
                    {tPortal.emailAddress}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="h-12 w-full rounded-xl border border-white/15 bg-[#0d0c0a] px-3.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#c7a85c]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
                    {tPortal.phone}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (212) 555-0100"
                    className="h-12 w-full rounded-xl border border-white/15 bg-[#0d0c0a] px-3.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#c7a85c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
                  {tPortal.specialRequests}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes on timing, preferred culinary course style, AV needs, or floral requests..."
                  className="w-full rounded-xl border border-white/15 bg-[#0d0c0a] p-3.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#c7a85c] resize-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <span className="text-[10px] text-white/40 flex items-center gap-1.5">
                  <Shield size={12} className="text-[#c7a85c]" />
                  <span>Discreet NDA and private executive dining services available.</span>
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold-3d flex items-center gap-2 rounded-xl px-7 py-3.5 text-[10px] uppercase tracking-[0.22em]"
                >
                  {isSubmitting ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>{tPortal.submitInquiry}</span>
                      <Send size={13} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
