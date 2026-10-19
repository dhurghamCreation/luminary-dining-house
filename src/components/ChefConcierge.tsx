import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, Compass, Heart, ArrowUpRight, MessageSquareText } from 'lucide-react';
import { Language } from '../lib/translations';

interface ChatMessage {
  id: string;
  sender: 'lumi' | 'guest';
  text: string;
  actionLink?: { text: string; href: string };
  time?: string;
}

interface ChefConciergeProps {
  currentLanguage?: Language;
}

const QUICK_PROMPTS = [
  'What is the meaning and story behind the name "Luminary"?',
  'Tell me about Chef Elias Warren and the wood-hearth philosophy.',
  'How do you accommodate celiac, vegan, or allergy requirements?',
  'What is the dress code, valet, and arrival etiquette?',
  'What is the non-alcoholic botanical pairing?',
];

function getDynamicLumiResponse(userQuery: string): string {
  const q = userQuery.toLowerCase().trim();

  // 1. Compliments, Acclaim & Typos (e.g. "this is great", "this is grat", "amazing", "love this", "brilliant", "superb")
  if (
    q.includes('great') ||
    q.includes('grat') ||
    q.includes('gret') ||
    q.includes('gr8') ||
    q.includes('amazing') ||
    q.includes('amazin') ||
    q.includes('wonderful') ||
    q.includes('fantastic') ||
    q.includes('brilliant') ||
    q.includes('brillant') ||
    q.includes('superb') ||
    q.includes('love') ||
    q.includes('cool') ||
    q.includes('nice') ||
    q.includes('awesome') ||
    q.includes('awsome') ||
    q.includes('perfect') ||
    q.includes('beautiful') ||
    q.includes('beautifull') ||
    q.includes('impressive') ||
    q.includes('excellent') ||
    q.includes('delicious') ||
    q.includes('delish') ||
    q.includes('masterpiece') ||
    q.includes('stunner') ||
    q.includes('stunning') ||
    q.includes('favorite') ||
    q.includes('favourite') ||
    q.includes('splendid') ||
    q.includes('wow')
  ) {
    return 'Thank you so much! Our kitchen brigade and hospitality team pour boundless passion into every single facet of Luminary—from our glowing white-oak hearth and seasonal Hudson Valley produce to our hand-thrown ceramics. We are deeply honored by your warm words. Would you like me to reserve a table at the hearth pass or tell you more about tonight’s courses?';
  }

  // 2. Gratitude & Courtesy
  if (q.includes('thank') || q.includes('thanks') || q.includes('appreciate') || q.includes('merci') || q.includes('grazie') || q.includes('arigato')) {
    return 'You are most warmly welcome. Providing effortless, transportive hospitality is our highest craft. Please let me know whenever you would like to explore our tasting progression or arrange a memorable evening for you and your guests.';
  }

  // 3. Greetings & Identity
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('good evening') || q.includes('who are you') || q.includes('your name') || q.includes('what are you')) {
    return 'Good evening. I am Lumi, your personal dining concierge for Luminary at 18 Mercer Street. I am at your service to navigate our seven-course wood-fired tasting, explore dietary accommodations, describe our sourcing ethos, or secure an intimate table.';
  }

  // 4. Restaurant Name & Philosophy
  if (q.includes('name') || q.includes('meaning') || q.includes('called') || q.includes('why luminary')) {
    return 'The name "Luminary" signifies lighting the path of gastronomy through the pure illumination of live white-oak fire. We believe cooking is at its highest when stripped of artificial intervention—relying solely on elemental flame, tidal sea salt, and patient seasonal harvesting.';
  }

  // 5. Chef & Culinary Team
  if (q.includes('chef') || q.includes('elias') || q.includes('warren') || q.includes('who cooks') || q.includes('pastry') || q.includes('mara')) {
    return 'Our culinary program is led by Executive Chef Elias Warren, whose twelve years of apprenticeship in Kyoto and San Sebastián forged a style that trusts white-oak embers over machinery. Desserts are crafted by Head Pastry Chef Mara Lindqvist, balancing single-plantation Guanaja cacao with floral woodsmoke.';
  }

  // 6. Dietary & Allergies
  if (q.includes('vegan') || q.includes('vegetar') || q.includes('celiac') || q.includes('gluten') || q.includes('allerg') || q.includes('diet') || q.includes('nut') || q.includes('dairy')) {
    return 'With 48 hours notice, our kitchen provides parallel seven-course tasting menus for vegan, celiac (gluten-free), dairy-free, and pescatarian patrons with zero compromise in hearth technique or luxury. Our pass features a dedicated allergy-isolated station with separate white-oak grates.';
  }

  // 7. Menu & Tasting Courses
  if (q.includes('menu') || q.includes('course') || q.includes('food') || q.includes('eat') || q.includes('dish') || q.includes('tasting')) {
    return 'Our tasting menu comprises seven unhurried acts ($185): starting with live Hokkaido Sea Urchin & Royal Osetra, moving to Brittany Turbot charred over white-oak binchotan coals, hand-pinched Black Truffle Agnolotti, 60-day dry-aged Mishima Wagyu, and finishing with our Guanaja 70% Cacao Sphere.';
  }

  // 8. Drinks & Pairings
  if (q.includes('drink') || q.includes('pairing') || q.includes('hydrosol') || q.includes('botanical') || q.includes('beverage') || q.includes('wine') || q.includes('cellar') || q.includes('sommelier')) {
    return 'We feature our acclaimed Artisanal Botanical Hydrosol Pairing ($85)—a non-alcoholic sensory exploration of sparkling purple shiso, roasted pine needle teas, smoked sunchoke barley decoctions, and Geisha cold brews—alongside our historic 900-bottle cellar curated by Sommelier Julien Laurent.';
  }

  // 9. Dress Code
  if (q.includes('dress') || q.includes('wear') || q.includes('attire') || q.includes('suit') || q.includes('jacket') || q.includes('casual')) {
    return 'Our dress code is effortless evening elegance. Tailored jackets and evening finery are welcome and celebrated, but never compulsory. We invite you to join us comfortably, gracefully, and ready for an intimate evening.';
  }

  // 10. Hours & Service
  if (q.includes('hour') || q.includes('open') || q.includes('time') || q.includes('schedule') || q.includes('when') || q.includes('close')) {
    return 'We welcome patrons Tuesday through Saturday, seating from 5:30 PM until 10:15 PM, with the dining room remaining open until late. We are closed Sundays and Mondays for farm foraging across the Hudson Valley.';
  }

  // 11. Location, Address & Valet
  if (q.includes('valet') || q.includes('park') || q.includes('address') || q.includes('where') || q.includes('location') || q.includes('soho')) {
    return 'Luminary is situated at 18 Mercer Street, nestled between Howard and Grand Streets in the historic cast-iron district of Soho, New York. We provide complimentary white-glove valet parking directly at our entrance starting at 5:30 PM.';
  }

  // 12. Pricing & Cost
  if (q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('bill') || q.includes('check')) {
    return 'The seven-course wood-fired tasting menu is $185 per guest. The Artisanal Botanical Hydrosol pairing is an optional $85. An inclusive hospitality charge of 20% is applied to honor our culinary artisans.';
  }

  // 13. Reservations
  if (q.includes('reserve') || q.includes('book') || q.includes('table') || q.includes('seat') || q.includes('reservation')) {
    return 'Reservations may be requested up to 30 days in advance. You can select your preferred table—including the front-row Hearth Counter or Soho Window Banquettes—directly using our interactive architectural floorplan on this site.';
  }

  // 14. Private Dining & Buyouts
  if (q.includes('private') || q.includes('event') || q.includes('group') || q.includes('party') || q.includes('buyout') || q.includes('vault') || q.includes('conservatory')) {
    return 'Our Subterranean Vault accommodates up to 12 seated guests, while the Glasshouse Conservatory hosts up to 28 seated diners (45 reception). Full house buyouts are available for up to 65 seated patrons (100 reception) with custom menus crafted by Chef Warren.';
  }

  // 15. Natural Eloquent Maître d' Response
  return 'At Luminary, every detail of the evening is orchestrated around elemental fire, pristine seasonal harvest, and unhurried hospitality. Whether you wish to explore our seven-course binchotan menu, reserve a private room in our subterranean vault, or learn about our allergy-safe pass, I am here to assist your journey.';
}

export const ChefConcierge: React.FC<ChefConciergeProps> = ({ currentLanguage = 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'lumi',
      text: 'Good evening and welcome. I am Lumi, your personal Head Concierge at Luminary. Whether you seek the philosophy behind our name, our seven-course wood-fired tasting, or special dietary preparations, I am delighted to assist you with absolute discretion and care.',
      time: 'Just now',
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSend = async (userText: string) => {
    if (!userText.trim()) return;

    const guestMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'guest',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, guestMsg]);
    setInput('');
    setIsTyping(true);

    let lumiReply = '';
    let actionLink: { text: string; href: string } | undefined;

    const lower = userText.toLowerCase();
    if (lower.includes('reserve') || lower.includes('book') || lower.includes('table')) {
      actionLink = { text: 'Select Table on Floorplan', href: '#reserve' };
    } else if (lower.includes('menu') || lower.includes('course') || lower.includes('tasting')) {
      actionLink = { text: 'View Seven Acts Menu', href: '#interactive-menu' };
    } else if (lower.includes('draw') || lower.includes('plate') || lower.includes('sketch')) {
      actionLink = { text: 'Open Plating Atelier', href: '#gallery' };
    } else if (lower.includes('private') || lower.includes('event') || lower.includes('buyout')) {
      actionLink = { text: 'View Private Dining Portal', href: '#private-dining' };
    }

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userText, language: currentLanguage }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          lumiReply = data.reply;
        }
      }
    } catch {
      // Handled by dynamic fallback below
    }

    // Guarantee that an articulate, diverse, non-repetitive reply is always returned
    if (!lumiReply) {
      lumiReply = getDynamicLumiResponse(userText);
    }

    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        sender: 'lumi',
        text: lumiReply,
        actionLink,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Concierge Button — Icon remains brilliantly visible and glowing on hover */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full border border-[#c7a85c] bg-[#14120f]/95 px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-[#e5c97d] shadow-2xl backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer hover:border-[#ffe18d] hover:bg-[#231e18] hover:shadow-[0_0_24px_rgba(199,168,92,0.45)]"
        aria-label="Open Lumi dining concierge"
      >
        <Sparkles size={15} className="text-[#e5c97d] group-hover:text-[#fff5cf] group-hover:scale-115 transition-all duration-200 shrink-0" />
        <span className="font-medium text-[#e5c97d] group-hover:text-[#fff5cf] transition-colors duration-200">Ask Lumi</span>
      </button>

      {/* Concierge Window Drawer */}
      {isOpen && (
        <aside
          className="fixed bottom-20 right-6 z-50 flex w-[min(420px,calc(100vw-2.5rem))] flex-col rounded-2xl border border-[#c7a85c]/45 bg-[#13110e]/98 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden backdrop-blur-2xl animate-fade-up"
          aria-label="Dining concierge chat"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 p-4 bg-[#1a1714]">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full border border-[#c7a85c] bg-[#c7a85c]/20 flex items-center justify-center shadow-inner">
                <Sparkles size={16} className="text-[#c7a85c]" />
              </div>
              <div>
                <h4 className="font-serif text-base text-white">Lumi · Head Concierge</h4>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#c7a85c]">
                  Live · 18 Mercer Street, Soho
                </p>
              </div>
            </div>

            {/* Red hover close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 transition-all duration-200 active:scale-90 cursor-pointer hover:text-red-500 hover:bg-red-500/20 hover:border-red-500/50"
              aria-label="Close concierge"
            >
              <X size={15} />
            </button>
          </div>

          {/* Quick prompt chips */}
          <div className="flex gap-2 overflow-x-auto p-3 border-b border-white/10 bg-[#0f0e0c] scrollbar-none text-[10px]">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap rounded-full border border-white/15 bg-[#181512] px-3 py-1 text-white/75 hover:border-[#c7a85c] hover:text-[#e5c97d] transition-all cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 max-h-[380px] min-h-[260px] overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'guest' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    msg.sender === 'guest'
                      ? 'bg-[#c7a85c] text-[#0b0a09] font-medium rounded-tr-none shadow-md'
                      : 'border border-white/10 bg-[#1a1714] text-white/90 rounded-tl-none shadow-md'
                  }`}
                >
                  <p>{msg.text}</p>

                  {msg.actionLink && (
                    <a
                      href={msg.actionLink.href}
                      onClick={() => setIsOpen(false)}
                      className="mt-3 flex items-center gap-1.5 font-medium text-[10px] uppercase tracking-wider text-[#e5c97d] underline hover:text-white"
                    >
                      <span>{msg.actionLink.text}</span>
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
                {msg.time && (
                  <span className="text-[9px] text-white/35 mt-1 px-1">{msg.time}</span>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-white/50 p-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c7a85c] animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#c7a85c] animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#c7a85c] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] uppercase tracking-widest text-[#c7a85c] ml-1">
                  Lumi is consulting the culinary records...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2 border-t border-white/10 p-3 bg-[#161310]"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Lumi anything about Luminary..."
              className="flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder:text-white/35 outline-none font-sans"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="btn-gold-3d flex h-8 w-8 items-center justify-center rounded-full disabled:opacity-40 disabled:pointer-events-none"
              aria-label="Send message"
            >
              <Send size={13} />
            </button>
          </form>
        </aside>
      )}
    </>
  );
};
