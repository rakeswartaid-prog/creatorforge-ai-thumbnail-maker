import React, { useState } from 'react';
import { Sparkles, Copy, Check, Hash, Send, MessageSquare, Flame, BookOpen, Smile, Zap } from 'lucide-react';

interface CaptionItem {
  id: string;
  style: string;
  hook: string;
  body: string;
  cta: string;
  fullCaption: string;
  hashtags: string[];
  characterCount: number;
  engagementStrategy: string;
}

interface CaptionGeneratorProps {
  onSendHookToCanvas: (hook: string) => void;
}

export const CaptionGenerator: React.FC<CaptionGeneratorProps> = ({ onSendHookToCanvas }) => {
  const [topic, setTopic] = useState('How I learned to code and landed a remote job in 6 months');
  const [tone, setTone] = useState('casual');
  const [platform, setPlatform] = useState('instagram');
  const [ctaType, setCtaType] = useState('engagement');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [captions, setCaptions] = useState<CaptionItem[]>([
    {
      id: '1',
      style: 'Witty & Relatable',
      hook: 'Plot twist: Learning to code isn\'t hard because of math. It\'s hard because you spent 3 hours naming a variable 😂',
      body: 'I used to watch 40-hour tutorial playlists and felt like a genius until I opened a blank VS Code file and panicked.\n\nThen I ditched "tutorial hell" and built 3 ugly, broken projects that actually solved my own problems.\n\nMonth 1: HTML/CSS chaos\nMonth 3: JavaScript clicks\nMonth 6: First paying remote client.\n\nStop studying like a student. Build like a tinkerer.',
      cta: 'Drop a "ROADMAP" in the comments and I\'ll DM you the exact 3 projects that got me hired! 👇',
      fullCaption: 'Plot twist: Learning to code isn\'t hard because of math. It\'s hard because you spent 3 hours naming a variable 😂\n\nI used to watch 40-hour tutorial playlists and felt like a genius until I opened a blank VS Code file and panicked.\n\nThen I ditched "tutorial hell" and built 3 ugly, broken projects that actually solved my own problems.\n\nMonth 1: HTML/CSS chaos\nMonth 3: JavaScript clicks\nMonth 6: First paying remote client.\n\nStop studying like a student. Build like a tinkerer.\n\nDrop a "ROADMAP" in the comments and I\'ll DM you the exact 3 projects that got me hired! 👇',
      hashtags: ['#CodeNewbie', '#WebDev', '#LearnToCode', '#SoftwareEngineer', '#RemoteWork', '#TechCareers'],
      characterCount: 485,
      engagementStrategy: 'Trigger keyword "ROADMAP" in comments leverages Instagram automation algorithms for 3x reach.',
    },
    {
      id: '2',
      style: 'Informative Authority & Step-by-Step',
      hook: 'The 3-stage blueprint to go from zero to a remote developer in 2026:',
      body: 'Phase 1: Build momentum with UI fundamentals (2 weeks max).\nPhase 2: Full-stack CRUD + real authentication (build something people can sign up for).\nPhase 3: Public proof of work. Document the process on Twitter & LinkedIn.\n\nYour portfolio shouldn\'t be another Netflix clone. Solve a real business problem.',
      cta: 'Save this post for your daily study reminder 📌',
      fullCaption: 'The 3-stage blueprint to go from zero to a remote developer in 2026:\n\nPhase 1: Build momentum with UI fundamentals (2 weeks max).\nPhase 2: Full-stack CRUD + real authentication (build something people can sign up for).\nPhase 3: Public proof of work. Document the process on Twitter & LinkedIn.\n\nYour portfolio shouldn\'t be another Netflix clone. Solve a real business problem.\n\nSave this post for your daily study reminder 📌',
      hashtags: ['#CodingJourney', '#DeveloperLife', '#TechEducation', '#Programmer', '#TechCommunity'],
      characterCount: 395,
      engagementStrategy: 'Clear structured bullet format drives high bookmark and save ratios.',
    },
    {
      id: '3',
      style: 'Storytelling & Vulnerable',
      hook: 'At 2 AM on a Tuesday, I almost quit tech forever.',
      body: 'I had 14 rejection emails in my inbox and imposter syndrome whispering that I started too late.\n\nWhat saved me wasn\'t another certification.\nIt was building in public and showing up every single day even when nobody was clapping.\n\n6 months later: Received my first full-time offer.\n\nIf you are struggling right now, this is your sign to push through.',
      cta: 'Tag a friend who needs to read this today. ❤️',
      fullCaption: 'At 2 AM on a Tuesday, I almost quit tech forever.\n\nI had 14 rejection emails in my inbox and imposter syndrome whispering that I started too late.\n\nWhat saved me wasn\'t another certification.\nIt was building in public and showing up every single day even when nobody was clapping.\n\n6 months later: Received my first full-time offer.\n\nIf you are struggling right now, this is your sign to push through.\n\nTag a friend who needs to read this today. ❤️',
      hashtags: ['#Motivation', '#NeverGiveUp', '#GrowthMindset', '#SelfTaughtDev', '#CareerPivot'],
      characterCount: 420,
      engagementStrategy: 'Emotional vulnerability creates high resonance and authentic DMs.',
    },
    {
      id: '4',
      style: 'Short, High-Velocity Hype',
      hook: 'Nobody cares about your resume. They care about what you can ship.',
      body: '6 months of intense focus > 4 years of passive learning.\n\nPut your head down and build in silence.',
      cta: 'Double-tap if you\'re putting in the work this year. ⚡',
      fullCaption: 'Nobody cares about your resume. They care about what you can ship.\n\n6 months of intense focus > 4 years of passive learning.\n\nPut your head down and build in silence.\n\nDouble-tap if you\'re putting in the work this year. ⚡',
      hashtags: ['#HustleHard', '#ShipIt', '#Consistency', '#BuildInPublic'],
      characterCount: 185,
      engagementStrategy: 'Short character count maximizes read completion on fast short-form feeds.',
    },
  ]);

  const [hashtagClusters, setHashtagClusters] = useState({
    highReach: ['#viral', '#trending', '#fyp', '#reels', '#explorepage'],
    nicheSpecific: ['#creatoreconomy', '#contentcreation', '#techcareers', '#learntocode', '#coding'],
    community: ['#buildinpublic', '#indiehackers', '#solopreneur', '#remotejobs', '#devlife'],
  });

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-captions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          tone,
          platform,
          ctaType,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.captions) {
          setCaptions(data.captions);
        }
        if (data.trendingHashtagClusters) {
          setHashtagClusters(data.trendingHashtagClusters);
        }
      }
    } catch (e) {
      console.error('Error generating captions:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Control Input Card */}
      <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              AI Creator Caption & Hashtag Suite
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Generates high-converting social copy with pattern-interrupt opening lines, structured line spacing, algorithmic CTAs, and clustered hashtags.
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400/90 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
            Tone-Adaptive AI
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-4">
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Content Topic or Image Subject
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. 5 AI tools that replaced my video editor..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="casual">Casual & Relatable</option>
              <option value="witty">Witty & Sarcastic</option>
              <option value="informative">Informative Authority</option>
              <option value="storytelling">Storytelling / Vulnerable</option>
              <option value="hype">Hype & High Stakes</option>
              <option value="hinglish">Hinglish / Indian Creator</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="instagram">Instagram Reels</option>
              <option value="youtube">YouTube Shorts</option>
              <option value="tiktok">TikTok</option>
              <option value="linkedin">LinkedIn / X</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">CTA Goal</label>
            <select
              value={ctaType}
              onChange={(e) => setCtaType(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="engagement">Comments / Discussion</option>
              <option value="saves">Saves / Bookmarks</option>
              <option value="shares">Shares to Story</option>
              <option value="link">Bio Link / Lead Magnet</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isLoading ? 'Writing...' : 'Generate Captions'}
            </button>
          </div>
        </div>
      </div>

      {/* Caption Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {captions.map((cap) => (
          <div
            key={cap.id}
            className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between gap-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 font-display flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {cap.style}
                </span>
                <span className="text-[11px] font-mono text-slate-400 tabular-nums">
                  {cap.characterCount} chars
                </span>
              </div>

              {/* The Hook Highlight */}
              <div className="p-3 bg-amber-400/10 border border-amber-400/20 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">
                  Scroll-Stopping First Line:
                </span>
                <p className="text-xs font-bold text-white leading-snug">
                  "{cap.hook}"
                </p>
              </div>

              {/* Body */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80">
                <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                  {cap.body}
                </p>
                <p className="text-xs font-semibold text-amber-300 mt-3 pt-2 border-t border-slate-800/80">
                  {cap.cta}
                </p>
              </div>

              {/* Hashtags Strip */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cap.hashtags.map((tag, ti) => (
                  <span
                    key={ti}
                    className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 italic">
                <strong className="text-slate-300">Algo Strategy:</strong> {cap.engagementStrategy}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => copyToClipboard(cap.fullCaption + '\n\n' + cap.hashtags.join(' '), cap.id)}
                className="flex-1 py-2 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                {copiedId === cap.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedId === cap.id ? 'Copied to Clipboard!' : 'Copy Full Caption'}
              </button>

              <button
                onClick={() => onSendHookToCanvas(cap.hook)}
                className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                title="Send opening hook to Thumbnail Canvas Studio"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                To Studio
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trending Hashtag Clusters Vault */}
      <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col gap-3">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <Hash className="w-4 h-4 text-amber-400" />
          Algorithmic 3-Tier Hashtag Vault (Copyable Clusters)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-400 block mb-1">High-Reach Broad Tags</span>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                {hashtagClusters.highReach.join(' ')}
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(hashtagClusters.highReach.join(' '), 'high')}
              className="text-[11px] text-slate-400 hover:text-white self-start flex items-center gap-1 pt-1 cursor-pointer"
            >
              {copiedId === 'high' ? 'Copied!' : 'Copy Tags'}
            </button>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-amber-400 block mb-1">Niche-Specific Discovery</span>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                {hashtagClusters.nicheSpecific.join(' ')}
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(hashtagClusters.nicheSpecific.join(' '), 'niche')}
              className="text-[11px] text-slate-400 hover:text-white self-start flex items-center gap-1 pt-1 cursor-pointer"
            >
              {copiedId === 'niche' ? 'Copied!' : 'Copy Tags'}
            </button>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-sky-400 block mb-1">Community & Targeted</span>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                {hashtagClusters.community.join(' ')}
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(hashtagClusters.community.join(' '), 'comm')}
              className="text-[11px] text-slate-400 hover:text-white self-start flex items-center gap-1 pt-1 cursor-pointer"
            >
              {copiedId === 'comm' ? 'Copied!' : 'Copy Tags'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
