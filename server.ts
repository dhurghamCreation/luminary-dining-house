import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '25mb' }));

interface ReservationRecord {
  id: string;
  code: string;
  guests: number;
  date: string;
  time: string;
  seatingArea: string;
  tableId?: string;
  notes?: string;
  createdAt: string;
}

interface PlatingStudyRecord {
  id: string;
  title: string;
  author: string;
  imageData: string;
  createdAt: string;
}

const reservationsDB: ReservationRecord[] = [];
const platingStudiesDB: PlatingStudyRecord[] = [];

// Helper to get Gemini client with env key
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  try {
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to create GoogleGenAI client:', err);
    return null;
  }
}

const LUMI_SYSTEM_INSTRUCTION = `You are Lumi, the aristocratic, immensely articulate, and warm Head Concierge at Luminary — a Two Michelin-Starred wood-fired dining house at 18 Mercer Street in Soho, Manhattan, New York.

Persona & Voice:
- You speak with noble warmth, poetic precision, and genuine culinary knowledge.
- You address guests with dignified hospitality.
- Never repeat the same generic opening ("At Luminary, every service..."). Instead, answer the guest's specific question directly with detail.

Key Facts:
- Name Meaning: "Luminary" signifies lighting the path of gastronomy through the pure, elemental illumination of live white-oak fire, earth, tidal salt, and patience.
- Executive Chef: Elias Warren (12 years mastering wood-hearth technique in Kyoto and San Sebastián).
- Head Pastry Chef: Mara Lindqvist (Copenhagen trained, crafting desserts where floral acidity balances rich single-plantation cacao).
- Tasting Menu: 7 acts ($185 per person). Live Hokkaido sea urchin, Mercer oysters, Brittany turbot over binchotan, hand-pinched black truffle agnolotti, 60-day dry-aged ribeye, and Valrhona Guanaja 70% cacao sphere with smoked arbequina olive oil.
- Beverages: Zero-alcohol Artisanal Botanical Hydrosols ($85) and mountain herb infusions (green shiso, bergamot, roasted pine needles, smoked sunchoke barley, Geisha cold brew). (We do NOT offer or promote alcoholic wine).
- Seating: Hearthside Counter (direct view of live embers and pass), Main Dining Salon, Mercer Arched Street Windows, and the Private Garden Vault.
- Hours: Tuesday through Saturday, seating 5:30 PM until 10:15 PM. Closed Sundays and Mondays.
- Dress Code: Effortless evening elegance. Tailored jackets welcome but never compulsory.
- Dietary: Dedicated parallel tasting menus for vegetarian, vegan, celiac (gluten-free), and pescatarian guests with 48h notice.
- Valet: Complimentary white-glove valet directly at 18 Mercer Street from 5:30 PM.

Keep answers concise (2 to 4 sentences), articulate, and helpful.`;

// Rich, multi-intent concierge intelligence engine
function getSmartConciergeReply(userQuery: string, language: string = 'en'): string {
  const q = userQuery.toLowerCase().trim();

  // 1. Compliments & Positive Feedback (e.g. "this is great", "this is grat", "amazing", "love this")
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
    q.includes('stunning') ||
    q.includes('splendid') ||
    q.includes('wow')
  ) {
    return 'Thank you immensely! Our kitchen brigade and hospitality captains pour boundless passion into every single facet of Luminary—from our glowing white-oak hearth to each hand-thrown ceramic plate. We are deeply honored by your appreciation. May I assist in reserving a seat at the pass or sharing details of tonight’s tasting acts?';
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
  if (q.includes('name') || q.includes('why luminary') || q.includes('meaning') || q.includes('called') || q.includes('concept')) {
    return 'The name "Luminary" originates from our reverence for the ancient light of the culinary hearth—the primordial flame around which human gathering first began. We illuminate the purest essence of every ingredient through live white-oak binchotan fire, coastal salt, and unhurried time.';
  }

  // 5. Chef & Culinary Team
  if (q.includes('chef') || q.includes('elias') || q.includes('cook') || q.includes('who makes') || q.includes('pastry') || q.includes('mara')) {
    return 'Our kitchen is directed by Executive Chef Elias Warren, whose twelve years in Kyoto and San Sebastián forged a style that trusts white-oak embers and wild ingredients over mechanical intervention. Our pastry studies are conceived by Mara Lindqvist, balancing single-plantation Guanaja cacao with delicate woodsmoke.';
  }

  // 6. Menu & Tasting Courses
  if (q.includes('menu') || q.includes('dish') || q.includes('eat') || q.includes('food') || q.includes('tonight') || q.includes('course') || q.includes('tasting')) {
    return 'Our current autumn/winter menu comprises seven unhurried acts ($185): beginning with live Hokkaido Sea Urchin & Royal Osetra, moving to Brittany Turbot charred over white-oak binchotan, hand-pinched Black Truffle Agnolotti, 60-Day Dry-Aged Mishima Wagyu, and finishing with our Guanaja 70% Cacao Sphere with smoked olive oil.';
  }

  // 7. Drinks, Hydrosols & Wine Program
  if (q.includes('drink') || q.includes('pairing') || q.includes('beverage') || q.includes('hydrosol') || q.includes('botanical') || q.includes('wine') || q.includes('sommelier') || q.includes('cellar')) {
    return 'We feature our acclaimed Artisanal Botanical Pairing ($85)—an exploration of sparkling purple shiso hydrosols, roasted pine needle teas, and smoked sunchoke barley decoctions—alongside a 900-bottle historic wine cellar curated by Sommelier Julien Laurent with rare low-intervention vintages.';
  }

  // 8. Dietary, Vegan, Gluten-Free & Allergies
  if (q.includes('vegan') || q.includes('vegetar') || q.includes('plant') || q.includes('celiac') || q.includes('gluten') || q.includes('allerg') || q.includes('diet') || q.includes('nut') || q.includes('dairy')) {
    return 'With 48 hours advance notice, our kitchen provides dedicated, parallel tasting menus for vegetarian, vegan, celiac (gluten-free), and pescatarian guests with zero compromise in luxury or hearth technique. Our pass features a dedicated allergy-isolated station with separate white-oak grates.';
  }

  // 9. Hours & Schedule
  if (q.includes('hour') || q.includes('open') || q.includes('time') || q.includes('when') || q.includes('schedule') || q.includes('close')) {
    return 'Luminary receives guests Tuesday through Saturday, seating from 5:30 PM until 10:15 PM. The dining room remains open until late. We are closed Sundays and Mondays for farm foraging across the Hudson Valley.';
  }

  // 10. Dress Code & Etiquette
  if (q.includes('dress') || q.includes('wear') || q.includes('jacket') || q.includes('suit') || q.includes('casual') || q.includes('attire')) {
    return 'Our dress code is effortless evening elegance. Tailored jackets and evening wear are welcome, but never compulsory. Come as you are, comfortably, gracefully, and beautifully.';
  }

  // 11. Location, Address & Valet
  if (q.includes('where') || q.includes('address') || q.includes('location') || q.includes('directions') || q.includes('soho') || q.includes('valet') || q.includes('parking')) {
    return 'Luminary is located at 18 Mercer Street, nestled between Howard and Grand Streets in the historic cast-iron district of Soho, New York. We provide complimentary white-glove valet parking directly at our entrance starting at 5:30 PM.';
  }

  // 12. Pricing & Payments
  if (q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('bill') || q.includes('check')) {
    return 'The seven-course wood-fired tasting menu is $185 per guest. Our Artisanal Botanical Hydrosol pairing is an optional $85. An inclusive hospitality charge of 20% is applied to honor our culinary team.';
  }

  // 13. Reservations & Booking
  if (q.includes('reserve') || q.includes('book') || q.includes('table') || q.includes('reservation') || q.includes('seat')) {
    return 'Reservations may be requested up to 30 days in advance. You can select your preferred table—including the front-row Hearth Counter or Soho Window Banquettes—directly using our interactive architectural floorplan on this site.';
  }

  // 14. Private Dining & Buyouts
  if (q.includes('private') || q.includes('event') || q.includes('buyout') || q.includes('vault') || q.includes('party') || q.includes('conservatory')) {
    return 'Our Subterranean Vault accommodates up to 12 seated guests for intimate celebrations. The Soho Glasshouse Conservatory accommodates up to 28 seated (45 reception), and exclusive full dining house buyouts are available for up to 65 seated guests (100 reception) with customized menus crafted with Chef Elias Warren.';
  }

  // 15. Intelligent general response reflecting high-end maître d' presence
  return `At Luminary, every detail of the evening is orchestrated around elemental fire, pristine seasonal harvest, and unhurried hospitality. Whether you wish to explore our seven-course binchotan menu, reserve a private room in our subterranean vault, or learn about our allergy-safe pass, I am here to assist your journey.`;
}

// 1. Concierge API Endpoint
app.post('/api/concierge', async (req: Request, res: Response) => {
  const { query, language = 'en' } = req.body;

  if (!query || typeof query !== 'string') {
    res.status(400).json({ error: 'Query parameter is required' });
    return;
  }

  const ai = getGeminiClient();
  if (ai) {
    const candidateModels = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-1.5-flash'];
    const langPrompt = language !== 'en' ? `\nPlease respond fluently and eloquently in language code: ${language}.` : '';

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: `${LUMI_SYSTEM_INSTRUCTION}${langPrompt}\n\nGuest Query: "${query}"`,
          config: {
            temperature: 0.7,
          },
        });

        if (response && response.text) {
          res.json({ reply: response.text, source: 'ai' });
          return;
        }
      } catch {
        // Silently continue to next candidate model or fallback engine
      }
    }
  }

  const fallbackText = getSmartConciergeReply(query, language);
  res.json({ reply: fallbackText, source: 'curated' });
});

// 2. Reservation API Endpoint
app.post('/api/reservations', (req: Request, res: Response) => {
  const { guests, date, time, seatingArea, tableId, notes } = req.body;

  if (!guests || !date || !time) {
    res.status(400).json({ error: 'Missing required reservation fields' });
    return;
  }

  const id = `res_${Date.now()}`;
  const code = `LUM-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  const record: ReservationRecord = {
    id,
    code,
    guests: Number(guests),
    date: String(date),
    time: String(time),
    seatingArea: seatingArea || 'Main Dining Salon',
    tableId,
    notes,
    createdAt: new Date().toISOString(),
  };

  reservationsDB.push(record);

  res.status(201).json({
    success: true,
    reservation: record,
    message: `Table confirmed at Luminary on ${date} at ${time}. Confirmation code: ${code}.`,
  });
});

app.get('/api/reservations', (_req: Request, res: Response) => {
  res.json({ reservations: reservationsDB });
});

// 3. Plating Studies API Endpoint
app.post('/api/plating-studies', (req: Request, res: Response) => {
  const { title, author, imageData } = req.body;

  if (!imageData) {
    res.status(400).json({ error: 'Image data is required' });
    return;
  }

  const study: PlatingStudyRecord = {
    id: `study_${Date.now()}`,
    title: title || 'Culinary Study in Wood & Salt',
    author: author || 'Guest of Luminary',
    imageData,
    createdAt: new Date().toISOString(),
  };

  platingStudiesDB.unshift(study);
  if (platingStudiesDB.length > 50) platingStudiesDB.pop();

  res.status(201).json({
    success: true,
    study,
    message: 'Plating study preserved in the Luminary digital atelier.',
  });
});

app.get('/api/plating-studies', (_req: Request, res: Response) => {
  res.json({ studies: platingStudiesDB });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[Luminary Dining House] Full-Stack server operational on port ${PORT}`);
  });
}

startServer();
