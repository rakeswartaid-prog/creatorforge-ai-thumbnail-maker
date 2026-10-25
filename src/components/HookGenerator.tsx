import React, { useState } from 'react';
import { ViralHook, PlatformFormat } from '../types/creator';
import { Sparkles, ArrowRight, Copy, Check, TrendingUp, Lightbulb, Zap, ShieldAlert } from 'lucide-react';

interface HookGeneratorProps {
  onApplyHeadline: (headline: string, badge?: string) => void;
  format: PlatformFormat;
}

export const HookGenerator: React.FC<HookGeneratorProps> = ({ onApplyHeadline, format }) => {
  const [topic, setTopic] = useState('How I Scaled from ₹0 to ₹10 Lakhs (Or $0 to $10,000)');
  const [niche, setNiche] = useState('Finance & Wealth');
  const [language, setLanguage] = useState<'english' | 'hinglish'>('english');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [result, setResult] = useState<{
    hooks: ViralHook[];
    retentionStrategy: string;
    ctrAdvice: string;
  }>({
    hooks: [
      {
        id: '1',
        framework: 'Curiosity Gap',
        hookText: '99% of people get this completely backwards, and it is costing you thousands every single month.',
        thumbnailHeadline: 'YOU WERE LIED TO',
        ctrScore: 94,
        emotionalTrigger: 'Curiosity & Fear of Missing Out',
        visualDescription: 'Split screen: Left side in red "BEFORE" showing zero views, Right side in green "AFTER" with massive analytics spike.',
        colorPalette: ['#EF4444', '#10B981', '#0F172A'],
        recommendedBadge: 'DON\'T MISS',
      },
      {
        id: '2',
        framework: 'Contrarian Truth',
        hookText: 'I stopped doing what every YouTube guru told me, and that was the exact moment my channel exploded.',
        thumbnailHeadline: 'THE SECRET REVEALED',
        ctrScore: 91,
        emotionalTrigger: 'Disruption & Skepticism',
        visualDescription: 'Extreme close up with shocked expression pointing at a blurred out confidential metric sheet.',
        colorPalette: ['#F59E0B', '#3B82F6', '#1E1B4B'],
        recommendedBadge: 'TOP SECRET',
      },
      {
        id: '3',
        framework: 'High Stakes / Extreme Challenge',
        hookText: 'I tested this exact strategy for 30 days straight so you don’t have to waste your time.',
        thumbnailHeadline: '₹0 TO ₹10 LAKH',
        ctrScore: 89,
        emotionalTrigger: 'Social Proof & Transparency',
        visualDescription: 'Calendar grid with green checkmarks and high-contrast currency badge.',
        colorPalette: ['#06B6D4', '#8B5CF6', '#020617'],
        recommendedBadge: '30-DAY PROOF',
      },
      {
        id: '4',
        framework: 'Simple 3-Step Blueprint',
        hookText: 'If you want to master this in 2026, you honestly only need to memorize these 3 golden rules.',
        thumbnailHeadline: 'JUST 3 RULES',
        ctrScore: 88,
        emotionalTrigger: 'Simplicity & Actionable Clarity',
        visualDescription: 'Three clean numbered points with vibrant amber accent cards.',
        colorPalette: ['#10B981', '#6366F1', '#111827'],
        recommendedBadge: 'EASY FORMULA',
      },
      {
        id: '5',
        framework: 'Immediate Urgency (2026 Shift)',
        hookText: 'The algorithm just updated everything for creators. Do this before your reach drops to zero.',
        thumbnailHeadline: 'ALGORITHM SHIFT!',
        ctrScore: 93,
        emotionalTrigger: 'Urgency & Algorithm Adaptability',
        visualDescription: 'Neon warning badge with rising exponential green curve in background.',
        colorPalette: ['#EC4899', '#F97316', '#18181B'],
        recommendedBadge: 'CRITICAL UPDATE',
      },
    ],
    retentionStrategy:
      'Answer the immediate curiosity gap within the first 12 seconds, then introduce a secondary higher stake question for the second half of the video.',
    ctrAdvice:
      'Keep thumbnail text under 4 words. Use high-contrast complementary colors (e.g. Amber text on Dark Navy background) and high emotion facial expressions.',
  });

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-hooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          niche,
          platform: format,
          audience: language === 'hinglish' ? 'India' : 'Global',
          language,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.hooks) {
          setResult(data);
        }
      }
    } catch (e) {
      console.error('Error generating hooks:', e);
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
      {/* Header input card */}
      <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              AI Viral Hook & Packaging Lab
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Generates the 3-second opening spoken line + high-CTR thumbnail headline across 5 psychological frameworks.
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400/90 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
            Gemini 3.8 Flash Powered
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-5">
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Video / Reel Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. How to get your first 1,000 subscribers without ads"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="md:col-span-3">
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Niche</label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option>Finance & Wealth</option>
              <option>Tech, AI & Coding</option>
              <option>Career & Solopreneurship</option>
              <option>Fitness & Self-Improvement</option>
              <option>Gaming & Entertainment</option>
              <option>True Crime & Documentaries</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Audience Tone</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'english' | 'hinglish')}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="english">Global English</option>
              <option value="hinglish">India (Hinglish)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isLoading ? 'Synthesizing...' : 'Generate Hooks'}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Hooks Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {result.hooks.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between gap-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 font-mono">
                  {item.framework}
                </span>
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tabular-nums">
                  {item.ctrScore} Predicted CTR
                </span>
              </div>

              {/* Spoken Hook */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">
                  First 3-Second Spoken Line:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed italic">
                  "{item.hookText}"
                </p>
              </div>

              {/* Thumbnail Headline */}
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">
                  Thumbnail Headline:
                </span>
                <div className="px-3 py-2 bg-amber-400/10 border border-amber-400/30 rounded-lg flex items-center justify-between">
                  <span className="text-sm font-extrabold text-amber-400 font-display">
                    {item.thumbnailHeadline}
                  </span>
                  <span className="text-[10px] bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                    {item.recommendedBadge}
                  </span>
                </div>
              </div>

              {/* Psychology trigger note */}
              <p className="text-[11px] text-slate-400">
                Trigger: <span className="text-slate-300">{item.emotionalTrigger}</span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
              <button
                onClick={() => onApplyHeadline(item.thumbnailHeadline, item.recommendedBadge)}
                className="flex-1 py-1.5 px-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-sm"
              >
                Apply to Canvas <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => copyToClipboard(`Spoken Hook: "${item.hookText}"\nThumbnail: ${item.thumbnailHeadline}`, item.id)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
                title="Copy Hook Script"
              >
                {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Retention Advice Callout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
              Retention Strategy (First 15s)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.retentionStrategy}
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
              Thumbnail Glanceability Rule
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.ctrAdvice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
