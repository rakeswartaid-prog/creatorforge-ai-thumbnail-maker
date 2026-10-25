import { CompetitorData, MarketingContentIdea } from '../types/creator';

export const UNDERSERVED_NICHES = [
  {
    title: '1. Regional & Vernacular Creators (India & South Asia)',
    audience: 'Finance, Career, Tech, and True Crime creators producing in Hinglish, Hindi, Tamil, Telugu',
    marketGap: 'Existing tools like Canva or Photoshop offer US-centric templates that fail regional Indian visual aesthetics (Devanagari typography, bold localized currency figures like ₹10 Lakh, and cultural credibility cues). Creators currently hire expensive freelance thumbnail artists (₹500 - ₹2,000 per thumbnail) with 48-hour turnarounds.',
    opportunity: 'Over 800,000 active Indian creators monetization wave. An automated tool with Devanagari bold fonts, rupee badge overlays, and Hinglish hook psychology saves them 10 hours/week.',
  },
  {
    title: '2. Short-Form Editors & Repurposing Agencies',
    audience: 'Freelance video editors managing 5–15 creator accounts across YouTube Shorts & Instagram Reels',
    marketGap: 'Most thumbnail tools are locked to 16:9 landscape. Short-form thumbnails (9:16) require a totally different psychological trigger: punchy 2-second visual question + center-safe zones for Reel covers that do not get cropped by the Instagram grid.',
    opportunity: 'Agencies gladly pay $49 - $99/mo if they can generate high-CTR 9:16 covers and 3-second retention hooks in batch for 10 clients in under 15 minutes.',
  },
  {
    title: '3. Solopreneur SaaS Builders & Tech Reviewers',
    audience: 'Indie hackers, developer educators, and B2B SaaS founders growing organic YouTube channels',
    marketGap: 'They hate generic "AI cartoon / shocked face" clickbait slop. They want clean, hyper-modern, linear-style aesthetic thumbnails with crisp code snippets, terminal accents, and intellectual curiosity hooks that maintain high authority.',
    opportunity: 'High disposable income ($20–$50/mo SaaS willingness) with an urgent need to escape 0.8% CTR on technical tutorials.',
  },
];

export const COMPETITORS: CompetitorData[] = [
  {
    name: 'Canva Pro',
    pricing: '$12.99/mo (Global) · ₹499/mo (India)',
    targetAudience: 'General social media creators, non-designers',
    coreStrength: 'Vast asset library and multi-format drag-and-drop',
    userReviewWeaknesses: [
      'Zero CTR prediction or algorithm psychology intelligence',
      'No live YouTube/Reel feed simulator to see how it looks next to competitors',
      'Templates look generic and overused across millions of channels',
      'Does not generate the spoken video hook together with the visual headline',
    ],
    ourUnfairAdvantage: 'Algorithm-first design: Built specifically for CTR with real-time Feed Preview simulator and psych-driven hook generator.',
  },
  {
    name: 'vidIQ Boost',
    pricing: '$39/mo to $99/mo',
    targetAudience: 'YouTube creators focused on SEO and tags',
    coreStrength: 'Keyword research and search volume tracking',
    userReviewWeaknesses: [
      'AI Thumbnail generator creates warped, low-res distorted imagery',
      'Very expensive ($39/mo minimum) for small or rising creators',
      'Feature bloat: creators only use 10% of the complex analytics UI',
      'Outdated canvas editor with terrible text typography controls',
    ],
    ourUnfairAdvantage: 'Focused, lightweight workflow under 60 seconds with 1080p crisp typography, at less than half the price.',
  },
  {
    name: 'TubeBuddy (Legend)',
    pricing: '$24.49/mo to $49/mo',
    targetAudience: 'Established YouTubers running A/B tests',
    coreStrength: 'Direct YouTube channel API integration for metadata',
    userReviewWeaknesses: [
      'Sluggish, legacy 2014 extension UI that slows down browser tabs',
      'Thumbnail generator is basically unusable and clunky',
      'A/B test tool takes weeks to gather statistically valid data',
      'Complex pricing tiers with restrictive limits',
    ],
    ourUnfairAdvantage: 'Zero browser lag, instant preview simulation before upload, and modern aesthetic styling.',
  },
  {
    name: 'OpusClip',
    pricing: '$15/mo to $29/mo',
    targetAudience: 'Podcasters and long-form video creators',
    coreStrength: 'Auto-cutting long videos into short clips with subtitles',
    userReviewWeaknesses: [
      'Only handles the video editing, does NOT design high-converting cover art',
      'No thumbnail customization or A/B hook packaging',
      'Auto-generated titles are often robotic and lack emotional punch',
    ],
    ourUnfairAdvantage: 'The perfect companion: OpusClip edits the video, CreatorForge packages the high-CTR cover and opening hook.',
  },
  {
    name: 'Thumbnail Blaster',
    pricing: '$97 one-time (plus aggressive upsells)',
    targetAudience: 'Affiliate marketers and beginner creators',
    coreStrength: 'Pre-made clickbait templates',
    userReviewWeaknesses: [
      'Templates look like scammy 2016 spam clickbait that harms channel trust',
      'Aggressive predatory upsells ($47/mo club, $67 agency license)',
      'Terrible customer support and frequent desktop software bugs',
    ],
    ourUnfairAdvantage: 'High-aesthetic modern templates that build long-term brand authority without spammy gimmicks.',
  },
];

export const MVP_FEATURES = [
  {
    title: '1. AI Hook & Headline Engine',
    desc: 'Generates 5 psychological opening hooks + high-CTR 3-word thumbnail headlines across 5 frameworks (Curiosity Gap, Contrarian, Extreme Challenge, Simple Blueprint, Algorithm Shift).',
    status: 'Must-Have v1 (Included in this app)',
  },
  {
    title: '2. High-CTR Canvas Studio (16:9 & 9:16)',
    desc: 'Interactive 1080p canvas with instant font pairing, thick creator strokes, neon glows, drop shadows, saturation booster (+25%), and currency/urgency badges.',
    status: 'Must-Have v1 (Included in this app)',
  },
  {
    title: '3. Real-World Feed Simulator',
    desc: 'Live preview of your thumbnail embedded inside real YouTube Home, YouTube Search, and Instagram Reels feeds next to top creators to test glanceability.',
    status: 'Must-Have v1 (Included in this app)',
  },
  {
    title: '4. Regional & Creator Badges Library',
    desc: 'Instant 1-click overlays ("₹10 LAKH", "0 TO 1M", "SHOCKING", "DON\'T DO THIS", "BEFORE/AFTER", "SECRET") styled for viral CTR.',
    status: 'Must-Have v1 (Included in this app)',
  },
  {
    title: '5. Instant 1-Click High-Res PNG Export',
    desc: 'Direct client-side 1080p PNG generation with zero watermarks for paid users or clean export for rapid testing.',
    status: 'Must-Have v1 (Included in this app)',
  },
];

export const SKIPPED_FEATURES = [
  {
    feature: 'Full Video Timeline / Video Rendering',
    why: 'Requires heavy GPU servers, months of engineering, and competes with CapCut/Premiere. Stick strictly to packaging (hooks + covers).',
  },
  {
    feature: 'Direct YouTube API Auto-Publishing',
    why: 'Google OAuth verification requires weeks of security review and audits. Users prefer downloading and uploading manually.',
  },
  {
    feature: 'Complex Multi-User Permission Hierarchies',
    why: 'Over-engineering for enterprise when v1 target is solopreneurs and 2-person creator teams.',
  },
  {
    feature: 'Custom AI Model Training from Scratch',
    why: 'Massive capex. Using Gemini 3.8 Flash via API provides superior reasoning and speed at a fraction of the cost ($0.0001 per generation).',
  },
];

export const FOUR_WEEK_PLAN = [
  {
    week: 'Week 1: Core Canvas & Export Engine',
    tasks: [
      'Build React + Canvas 16:9 & 9:16 rendering loop with DPI scaling',
      'Implement text layer controls: fonts, stroke outline, glow, angle, drag placement',
      'Add high-res PNG download and clipboard copy',
      'Validate mobile responsiveness and responsive preview scaling',
    ],
  },
  {
    week: 'Week 2: AI Hook Generator & Feed Simulator',
    tasks: [
      'Integrate Gemini 3.8 Flash API endpoint with structured JSON output',
      'Build 5 viral hook frameworks (Curiosity Gap, Contrarian, Stakes, 3-Step, Urgency)',
      'Build YouTube Home & Instagram Reel Feed Simulator component',
      'Test generation latency (<1.5s response time)',
    ],
  },
  {
    week: 'Week 3: Auth, Credits & Payment Integration',
    tasks: [
      'Implement user authentication (Magic link / Google Auth)',
      'Add Stripe (Global USD) and Razorpay / LemonSqueezy (India INR)',
      'Set up credit tracking (5 free generations, unlimited Pro plan)',
      'Design high-converting paywall trigger modal after 2nd export',
    ],
  },
  {
    week: 'Week 4: Launch Prep, Polish & Seed Creator Beta',
    tasks: [
      'Onboard 20 target YouTubers/Reel creators for private beta feedback',
      'Create 10 short-form video demonstration hooks for TikTok/Reels/Twitter',
      'Launch on Product Hunt, Indie Hackers, and r/NewTubers',
      'Instrument posthog/analytics on funnel: Signup -> Generate -> Canvas Edit -> Export',
    ],
  },
];

export const TECH_STACK_DATA = {
  recommendation: 'Next.js 15 / React 19 + TypeScript + Tailwind CSS (Web-first PWA)',
  reasoning:
    'Web-first gives immediate cross-device reach without 30% Apple/Google App Store cuts, allows rapid zero-wait deployment, and lets creators design on large desktop monitors where 85% of YouTube editing happens. Mobile PWA allows quick on-the-go Reel cover creation.',
  stackComparison: [
    {
      framework: 'Next.js / React (Recommended)',
      pros: 'Instant desktop UX, 0% app store tax via Stripe/Razorpay, SEO landing pages, fastest iteration speed',
      cons: 'Requires PWA setup for home screen mobile app feel',
      verdict: 'WINNER for bootstrapped $10k MRR goal with 1-2 people',
    },
    {
      framework: 'Flutter',
      pros: 'Single codebase for iOS & Android, slick 60fps animations',
      cons: 'Heavy web bundle size, 30% App Store fees, slower SEO growth',
      verdict: 'Better for v2 once product-market fit is proven',
    },
    {
      framework: 'React Native (Expo)',
      pros: 'Great mobile ecosystem, reusable React logic',
      cons: 'Web canvas support can be clunky, dual app review bottlenecks',
      verdict: 'Sub-optimal for desktop-centric creator workflow',
    },
  ],
  apiCosts: [
    {
      item: 'Gemini 3.8 Flash (LLM Hooks & Advice)',
      cost: '$0.075 / 1M input tokens (~$0.0001 per 5 hooks)',
      perUserMonthly: '$0.006 (assuming 60 generations/month)',
    },
    {
      item: 'Image Processing / Canvas Export',
      cost: 'Client-side HTML5 Canvas (0 server compute)',
      perUserMonthly: '$0.00',
    },
    {
      item: 'Hosting (Vercel / Cloud Run / VPS)',
      cost: '$20 - $40 / month fixed',
      perUserMonthly: '$0.04 (scaled over 1,000 active users)',
    },
    {
      item: 'Database & Auth (Supabase / Firebase)',
      cost: 'Free tier up to 50k users, then $25/mo',
      perUserMonthly: '$0.025',
    },
    {
      item: 'Total Tech Cost Per Active Paid User',
      cost: 'Extremely lean unit economics',
      perUserMonthly: '~ $0.08 / user / month (<1% of $19 subscription!)',
    },
  ],
};

export const MONETIZATION_TIERS = [
  {
    name: 'Free Starter',
    priceIndia: '₹0',
    priceGlobal: '$0',
    billing: 'Forever Free',
    credits: '5 AI Hook generations / month',
    features: [
      'Basic 16:9 Canvas Studio',
      'Standard fonts and color picker',
      'YouTube Feed Simulator (Desktop)',
      'Watermarked export in 720p',
    ],
    cta: 'Current Plan',
    highlighted: false,
  },
  {
    name: 'Creator Pro',
    priceIndia: '₹799 / mo',
    priceGlobal: '$19 / mo',
    billing: 'Billed monthly (or ₹6,499 / $149 billed yearly — save 35%)',
    credits: 'Unlimited AI Hooks & Headlines',
    features: [
      'Both 16:9 (YouTube) & 9:16 (Reels/Shorts) formats',
      'Full 1080p Ultra-HD PNG Exports (Zero watermark)',
      'Devanagari & High-Impact viral font styles',
      'All Regional & Urgency badge overlays',
      'Side-by-side Competitor Feed Simulator',
      'Commercial usage license',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
  },
  {
    name: 'Agency / Studio',
    priceIndia: '₹2,499 / mo',
    priceGlobal: '$49 / mo',
    billing: 'Billed monthly',
    credits: 'Unlimited + 5 Team seats',
    features: [
      'Everything in Creator Pro',
      '5 Team members / client workspaces',
      'Batch export mode for 10 videos at once',
      'Custom Brand Kit & Creator Headshot cutout library',
      'Priority Gemini API rendering speed',
    ],
    cta: 'Contact Studio',
    highlighted: false,
  },
];

export const MARKETING_IDEAS: MarketingContentIdea[] = [
  {
    id: 1,
    hook: 'I redesigned MrBeast’s lowest-viewed thumbnail using AI in 45 seconds.',
    format: 'Shorts / Reel / TikTok (Screen recording + voiceover)',
    targetPlatform: 'YouTube Shorts & Instagram Reels',
    angle: 'Curiosity & Case Study',
    scriptOutline: 'Show original video stats -> point out why the hook failed -> drop it in CreatorForge -> generate 3 higher-contrast variants -> simulate in feed.',
  },
  {
    id: 2,
    hook: 'Why 90% of Indian YouTubers are losing thousands in ad revenue from bad thumbnails.',
    format: 'Carousel on LinkedIn & Twitter/X thread',
    targetPlatform: 'Twitter & LinkedIn',
    angle: 'Education / Revenue loss urgency',
    scriptOutline: 'Analyze 5 top Hindi/English finance creators -> compare CTR impact of 3% vs 8% on ₹10 Lakh CPM -> show solution.',
  },
  {
    id: 3,
    hook: 'Stop using Photoshop for thumbnails in 2026. Here is what pros do instead.',
    format: '30-second fast-paced tutorial',
    targetPlatform: 'TikTok & Instagram',
    angle: 'Tool replacement / Speed hack',
    scriptOutline: 'Timer on screen: 20 minutes in Photoshop vs 48 seconds in CreatorForge with feed simulator.',
  },
  {
    id: 4,
    hook: 'The 3-word rule that doubled my YouTube CTR overnight.',
    format: 'YouTube Long-form & Shorts',
    targetPlatform: 'YouTube',
    angle: 'Secret formula / Psychology',
    scriptOutline: 'Explain glance test: mobile users spend 1.2s deciding. Show before (7 words, unreadable) vs after (3 words + urgency badge).',
  },
  {
    id: 5,
    hook: 'I tested 100 thumbnail colors so you don’t have to: Here is the winner.',
    format: 'Visual Infographic & Reel',
    targetPlatform: 'Instagram & Reddit',
    angle: 'Data-driven proof',
    scriptOutline: 'Highlight why electric amber (#F59E0B) and neon cyan consistently outperform red on dark mode YouTube apps.',
  },
  {
    id: 6,
    hook: 'Free tool that lets you preview your thumbnail INSIDE the YouTube feed before publishing.',
    format: 'Direct feature spotlight',
    targetPlatform: 'TikTok & Shorts',
    angle: 'Utility & Free hook',
    scriptOutline: 'Hook user with the feed simulator UI. Show how bad thumbnails blend in, while CreatorForge variant immediately pops out.',
  },
  {
    id: 7,
    hook: 'Roasting my subscribers’ thumbnails and fixing them with AI (Ep. 1).',
    format: 'Community engagement series',
    targetPlatform: 'YouTube & Discord',
    angle: 'Entertainment + Product placement',
    scriptOutline: 'Pick 3 submissions from Discord -> give honest critique on composition -> revamp live on CreatorForge -> share results.',
  },
  {
    id: 8,
    hook: 'How this Reel went from 1,200 views to 450,000 just by changing the 3-second hook.',
    format: 'Behind-the-scenes breakdown',
    targetPlatform: 'Reels & Twitter',
    angle: 'Growth proof',
    scriptOutline: 'Show retention graph drop-off at second 3 -> rewrite hook using Curiosity Gap formula -> show second attempt stats.',
  },
  {
    id: 9,
    hook: 'The ₹0 to ₹10 Lakh Creator Stack for 2026 (No expensive gear needed).',
    format: 'Value listicle',
    targetPlatform: 'Instagram Reels (India)',
    angle: 'Solopreneur enablement',
    scriptOutline: 'Phone camera + CapCut + Audio cleaner + CreatorForge for thumbnails & hooks. Total cost <₹1,000/mo.',
  },
  {
    id: 10,
    hook: 'I asked AI to generate 5 controversial YouTube video titles. Number 4 is crazy.',
    format: 'Viral curiosity demonstration',
    targetPlatform: 'Shorts & TikTok',
    angle: 'AI curiosity & humor',
    scriptOutline: 'Type funny prompts into CreatorForge Hook Lab -> react to the psychological hooks -> show ready-made thumbnails.',
  },
];

export const RISKS_AND_DEFENSES = [
  {
    risk: '1. Gemini/AI API Cost Spikes or Downtime',
    mitigation:
      'We use Gemini 3.8 Flash which costs a microscopic $0.0001 per query. Additionally, our server implements smart token caching and rule-based heuristic viral templates so if the API ever encounters rate limits or latency, users receive instant high-quality hooks without interruption.',
  },
  {
    risk: '2. High Churn (Creators cancel after launching their video)',
    mitigation:
      'Transition from single-video tool to weekly workflow hub: introduce "Content Calendar & Hook Planner", channel performance tracking, and offer an aggressive 40% discount on Annual plans ($149/yr or ₹6,499/yr) to lock in upfront cashflow.',
  },
  {
    risk: '3. Platform Policy / Algorithm Changes (YouTube/Meta)',
    mitigation:
      'We focus on human psychological principles (curiosity, contrast, high readability) rather than spammy hacks. Whether it is 16:9, 9:16, or future VR formats, human visual attention mechanisms never change.',
  },
  {
    risk: '4. Competition from Giants (Canva, CapCut, Adobe)',
    mitigation:
      'Never compete as a generic graphic editor. Win by being 10x deeper on creator CTR psychology: live competitor feed simulation, regional Indian vernacular typography, and pairing the spoken 3-second script hook with the visual cover.',
  },
  {
    risk: '5. Image Copyright & Asset Infringement Claims',
    mitigation:
      'All canvas rendering is 100% creator-owned. We provide royalty-free high-contrast gradients, custom vector badges, and user-uploaded asset pipelines so the creator retains full intellectual property without third-party stock photo license traps.',
  },
];
