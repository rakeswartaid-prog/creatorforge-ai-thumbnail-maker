import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini if key is provided
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API: Generate viral hooks and thumbnail concepts
app.post('/api/generate-hooks', async (req, res) => {
  try {
    const { topic, niche, platform = 'youtube', audience = 'global', language = 'english' } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    if (ai) {
      const prompt = `You are a viral YouTube and short-form video content strategist like Paddy Galloway, MrBeast, and Colin & Samir.
Generate 5 viral hooks and thumbnail visual concepts for:
Topic: "${topic}"
Niche: ${niche || 'General Creator'}
Platform: ${platform} (YouTube 16:9 or Instagram Reels/Shorts 9:16)
Audience: ${audience} (${language})

Respond ONLY in strict JSON format matching this schema:
{
  "hooks": [
    {
      "id": "1",
      "framework": "Curiosity Gap",
      "hookText": "The 3-second opening spoken line",
      "thumbnailHeadline": "SHORT BOLD 2-4 WORD THUMBNAIL TEXT",
      "ctrScore": 92,
      "emotionalTrigger": "Curiosity & Urgency",
      "visualDescription": "What the creator should show visually on screen or thumbnail",
      "colorPalette": ["#FF0055", "#00F5D4", "#0A0A0A"],
      "recommendedBadge": "DON'T MISS"
    }
  ],
  "retentionStrategy": "Key retention tip for the first 15 seconds",
  "ctrAdvice": "Thumbnail design advice to maximize click-through rate"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText);
        return res.json(parsed);
      }
    }

    // High quality intelligent heuristic fallback if Gemini is not available or rate limited
    const defaultHooks = getHeuristicHooks(topic, niche, platform, language);
    return res.json(defaultHooks);
  } catch (error: any) {
    console.error('Error generating hooks:', error);
    // Graceful fallback so user is never blocked
    const fallback = getHeuristicHooks(req.body?.topic || 'Creator Growth', req.body?.niche, req.body?.platform, req.body?.language);
    return res.json(fallback);
  }
});

// API: Analyze existing hook or thumbnail text
app.post('/api/analyze-hook', async (req, res) => {
  try {
    const { text, targetPlatform = 'youtube' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (ai) {
      const prompt = `Analyze this video hook or thumbnail text for CTR and engagement: "${text}" on ${targetPlatform}.
Return JSON only:
{
  "overallScore": 88,
  "curiosity": 85,
  "clarity": 90,
  "urgency": 75,
  "strengths": ["Clear value proposition", "Emotional hook"],
  "weaknesses": ["Could be slightly shorter"],
  "improvedVariations": [
    "Variation 1: punchier version",
    "Variation 2: high curiosity version",
    "Variation 3: contrarian version"
  ],
  "estimatedCtrBoost": "+2.8% CTR"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      if (response.text) {
        return res.json(JSON.parse(response.text));
      }
    }

    // Heuristic analysis fallback
    const wordCount = text.trim().split(/\s+/).length;
    const hasNumbers = /\d+/.test(text);
    const hasCuriosityWords = /(secret|why|how|never|mistake|stop|hack|truth|million|rupee|₹|\$)/i.test(text);
    const score = Math.min(95, Math.max(65, (wordCount <= 6 ? 20 : 10) + (hasNumbers ? 20 : 10) + (hasCuriosityWords ? 30 : 15) + 30));

    return res.json({
      overallScore: score,
      curiosity: hasCuriosityWords ? 88 : 72,
      clarity: wordCount <= 7 ? 92 : 78,
      urgency: hasNumbers ? 84 : 70,
      strengths: [
        wordCount <= 6 ? 'Punchy & easily readable on mobile screens' : 'Descriptive context',
        hasNumbers ? 'Contains concrete quantified figures' : 'Direct creator tone',
      ],
      weaknesses: [
        wordCount > 6 ? 'Thumbnail text works best under 5 words for mobile glanceability' : 'Add higher contrast badge',
      ],
      improvedVariations: [
        `STOP DOING THIS: ${text.slice(0, 20)}...`,
        `The ${hasNumbers ? '' : '1 '}Hidden Truth About ${text.slice(0, 22)}`,
        `How I Fixed ${text.slice(0, 25)} (In 30 Days)`,
      ],
      estimatedCtrBoost: `+${((score - 60) * 0.1).toFixed(1)}% CTR`,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// API: Generate AI Captions and Hashtags
app.post('/api/generate-captions', async (req, res) => {
  try {
    const { topic, tone = 'casual', platform = 'instagram', ctaType = 'engagement', targetAudience = 'global' } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    if (ai) {
      const prompt = `You are an elite social media copywriter and growth marketer.
Generate 4 distinct high-converting social media caption options with relevant hashtag sets for:
Content Topic / Subject: "${topic}"
Tone: ${tone} (e.g. witty, informative, casual, hype, storytelling, hinglish)
Platform: ${platform} (Instagram Reels, YouTube Shorts, TikTok, LinkedIn)
Call To Action Goal: ${ctaType}
Audience: ${targetAudience}

Respond ONLY in strict JSON format:
{
  "captions": [
    {
      "id": "1",
      "style": "The Witty Pattern Interrupt",
      "hook": "First line of the caption that stops scrolling",
      "body": "Formatted caption body with readable line breaks and natural emoji placement",
      "cta": "Specific call to action question",
      "fullCaption": "Combined hook + body + cta",
      "hashtags": ["#creator", "#contentstrategy", "#reelsgrowth", "#viralreels", "#socialmediatips"],
      "characterCount": 240,
      "engagementStrategy": "Why this works for the algorithm"
    }
  ],
  "trendingHashtagClusters": {
    "highReach": ["#viral", "#trending", "#fyp"],
    "nicheSpecific": ["#creatoreconomy", "#videocreator", "#youtubetips"],
    "community": ["#buildinpublic", "#indiehackers", "#indiancreators"]
  }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      if (response.text) {
        return res.json(JSON.parse(response.text));
      }
    }

    // High quality intelligent heuristic fallback
    const fallbackCaptions = getHeuristicCaptions(topic, tone, platform, ctaType);
    return res.json(fallbackCaptions);
  } catch (error: any) {
    console.error('Error generating captions:', error);
    const fallback = getHeuristicCaptions(req.body?.topic || 'Creator Growth', req.body?.tone, req.body?.platform, req.body?.ctaType);
    return res.json(fallback);
  }
});

// Heuristic fallback for captions
function getHeuristicCaptions(topic: string, tone = 'casual', platform = 'instagram', ctaType = 'engagement') {
  const isHinglish = tone.includes('hinglish') || tone.includes('indian');
  
  return {
    captions: [
      {
        id: '1',
        style: 'Witty & Relatable',
        hook: isHinglish ? `Plot twist: ${topic} utna complicated nahi hai jitna sab batate hain 😂` : `Plot twist: ${topic} is 10x easier than the gurus want you to believe.`,
        body: `I used to spend 4 hours overcomplicating this every single week.\n\nThen I stripped away 80% of the fluff and focused on just ONE variable.\n\nThe result? Faster output, higher retention, and zero creative burnout.`,
        cta: `Drop a "SAVE" if you need this reminder later this week! 👇`,
        fullCaption: `${isHinglish ? `Plot twist: ${topic} utna complicated nahi hai jitna sab batate hain 😂` : `Plot twist: ${topic} is 10x easier than the gurus want you to believe.`}\n\nI used to spend 4 hours overcomplicating this every single week.\n\nThen I stripped away 80% of the fluff and focused on just ONE variable.\n\nThe result? Faster output, higher retention, and zero creative burnout.\n\nDrop a "SAVE" if you need this reminder later this week! 👇`,
        hashtags: ['#CreatorEconomy', '#ContentStrategy', '#ReelsGrowth', '#ViralTips', '#CreatorTools'],
        characterCount: 290,
        engagementStrategy: 'Humorous contrast creates instant relatability and high save rate.',
      },
      {
        id: '2',
        style: 'Informative & Authority Breakdown',
        hook: `The 3 non-negotiable rules for ${topic} in 2026:`,
        body: `1. Stop optimizing for algorithms. Optimize for human curiosity.\n2. Visual contrast wins the first 1.2 seconds of attention.\n3. Never leave your viewer hanging—pay off the headline within 10 seconds.`,
        cta: `Which of these 3 are you implementing first? Tell me below!`,
        fullCaption: `The 3 non-negotiable rules for ${topic} in 2026:\n\n1. Stop optimizing for algorithms. Optimize for human curiosity.\n2. Visual contrast wins the first 1.2 seconds of attention.\n3. Never leave your viewer hanging—pay off the headline within 10 seconds.\n\nWhich of these 3 are you implementing first? Tell me below!`,
        hashtags: ['#SocialMediaTips', '#GrowthHacking', '#ContentCreator', '#YouTubeTips', '#MarketingStrategy'],
        characterCount: 320,
        engagementStrategy: 'Numbered list drives comment discussions and profile authority.',
      },
      {
        id: '3',
        style: 'Storytelling / Behind-The-Scenes',
        hook: `6 months ago, I was completely stuck on ${topic}.`,
        body: `My views were flatlining and I almost deleted the entire project.\n\nHere is the exact pivot that changed everything:\nInstead of copying the top 1%, I reverse-engineered what their audience was complaining about in the comments.\n\nThe lesson: Listen to the unmet needs.`,
        cta: `Share this with a fellow creator who is building right now. 🚀`,
        fullCaption: `6 months ago, I was completely stuck on ${topic}.\n\nMy views were flatlining and I almost deleted the entire project.\n\nHere is the exact pivot that changed everything:\nInstead of copying the top 1%, I reverse-engineered what their audience was complaining about in the comments.\n\nThe lesson: Listen to the unmet needs.\n\nShare this with a fellow creator who is building right now. 🚀`,
        hashtags: ['#BuildInPublic', '#Solopreneur', '#CreatorJourney', '#IndieHacker', '#NeverGiveUp'],
        characterCount: 380,
        engagementStrategy: 'Vulnerability and tangible transformation foster genuine follower loyalty.',
      },
      {
        id: '4',
        style: 'Short & Punchy (High-Velocity)',
        hook: `Don't scroll past this if you care about ${topic}.`,
        body: `Most people quit 2 weeks before their breakthrough.\n\nKeep iterating your packaging. Your best video hasn't been uploaded yet.`,
        cta: `Double-tap if you agree. ❤️`,
        fullCaption: `Don't scroll past this if you care about ${topic}.\n\nMost people quit 2 weeks before their breakthrough.\n\nKeep iterating your packaging. Your best video hasn't been uploaded yet.\n\nDouble-tap if you agree. ❤️`,
        hashtags: ['#DailyMotivation', '#CreatorMindset', '#Shorts', '#Reels', '#Trending'],
        characterCount: 190,
        engagementStrategy: 'Short character count maximizes read-through completion rate on mobile feeds.',
      },
    ],
    trendingHashtagClusters: {
      highReach: ['#viral', '#reels', '#trending', '#explorepage', '#fyp'],
      nicheSpecific: ['#creatoreconomy', '#contentcreation', '#youtubetips', '#digitalcreator', '#videoeditor'],
      community: ['#solopreneur', '#buildinpublic', '#indiancreators', '#growthmindset', '#creativebusiness'],
    },
  };
}

// Helper for heuristic viral hooks
function getHeuristicHooks(topic: string, niche = 'creator', platform = 'youtube', language = 'english') {
  const isIndia = language.toLowerCase().includes('hindi') || language.toLowerCase().includes('hinglish');
  const cleanTopic = topic.trim();

  return {
    hooks: [
      {
        id: '1',
        framework: 'Curiosity Gap',
        hookText: isIndia
          ? `99% log ${cleanTopic} me ye galti karte hain, aur unka channel grow nahi hota.`
          : `Almost everyone is completely wrong about ${cleanTopic}, and it’s costing you views.`,
        thumbnailHeadline: isIndia ? 'BIGGEST MISTAKE!' : 'YOU WERE LIED TO',
        ctrScore: 94,
        emotionalTrigger: 'Fear of Missing Out / Invalidation',
        visualDescription: 'Split screen: Left side in red "BEFORE" showing zero views, Right side in green "AFTER" with massive analytics spike.',
        colorPalette: ['#EF4444', '#10B981', '#0F172A'],
        recommendedBadge: 'STOP DOING THIS',
      },
      {
        id: '2',
        framework: 'Contrarian / Unpopular Truth',
        hookText: isIndia
          ? `Top creators ye baat kabhi reveal nahi karenge regarding ${cleanTopic}.`
          : `I stopped doing what every guru says about ${cleanTopic}, and this happened.`,
        thumbnailHeadline: 'THE SECRET REVEALED',
        ctrScore: 91,
        emotionalTrigger: 'Insider Knowledge & Skepticism',
        visualDescription: 'Close-up creator face with shocked expression pointing at a blurred out document or analytics graph.',
        colorPalette: ['#F59E0B', '#3B82F6', '#1E1B4B'],
        recommendedBadge: 'TOP SECRET',
      },
      {
        id: '3',
        framework: 'High Stakes / Extreme Challenge',
        hookText: isIndia
          ? `Maine 30 din me ${cleanTopic} try kiya taaki aapko pata chale actual reality.`
          : `I tested ${cleanTopic} for 30 days straight so you don’t have to waste your time.`,
        thumbnailHeadline: isIndia ? '₹0 TO ₹10 LAKH' : 'I TESTED IT FOR 30 DAYS',
        ctrScore: 89,
        emotionalTrigger: 'Social Proof & Radical Transparency',
        visualDescription: 'Calendar grid with checkmarks and an arrow pointing to a dramatic final result badge.',
        colorPalette: ['#06B6D4', '#8B5CF6', '#020617'],
        recommendedBadge: '30-DAY PROOF',
      },
      {
        id: '4',
        framework: 'Simple 3-Step Blueprint',
        hookText: isIndia
          ? `Agar aapko ${cleanTopic} master karna hai, to bas ye 3 rules follow karo.`
          : `If you want to master ${cleanTopic} in 2026, you only need this exact 3-step formula.`,
        thumbnailHeadline: 'JUST 3 RULES',
        ctrScore: 87,
        emotionalTrigger: 'Simplicity & Actionable Clarity',
        visualDescription: 'Three numbered cards: 1, 2, 3 with bright neon borders and clean typography.',
        colorPalette: ['#10B981', '#6366F1', '#111827'],
        recommendedBadge: 'EASY FORMULA',
      },
      {
        id: '5',
        framework: 'Immediate Urgency / The 2026 Shift',
        hookText: isIndia
          ? `YouTube aur Instagram ka algorithm badal chuka hai for ${cleanTopic}. Ab ye karo.`
          : `The algorithm just changed everything for ${cleanTopic}. Do this before it’s too late.`,
        thumbnailHeadline: 'ALGORITHM SHIFT!',
        ctrScore: 93,
        emotionalTrigger: 'Urgency & Algorithm Adaptability',
        visualDescription: 'Large warning symbol or neon exclamation with upward trending green trajectory line.',
        colorPalette: ['#EC4899', '#F97316', '#18181B'],
        recommendedBadge: 'CRITICAL UPDATE',
      },
    ],
    retentionStrategy: 'Deliver the answer to the curiosity gap in the first 12 seconds, then introduce an even higher stake question for the second half of the video.',
    ctrAdvice: 'Keep thumbnail text under 4 words. Use high-contrast complementary colors (e.g. Amber text on Dark Navy background) and high emotion facial expressions.',
  };
}

// Development or production middleware
const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
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

app.listen(port, '0.0.0.0', () => {
  console.log(`CreatorForge App running at http://0.0.0.0:${port}`);
});
