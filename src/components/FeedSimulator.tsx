import React, { useState } from 'react';
import { ThumbnailState } from '../types/creator';
import { Eye, Smartphone, Monitor, Instagram, Youtube, Sparkles, CheckCircle2 } from 'lucide-react';

interface FeedSimulatorProps {
  thumbnailState: ThumbnailState;
  onBackToStudio: () => void;
}

export const FeedSimulator: React.FC<FeedSimulatorProps> = ({ thumbnailState, onBackToStudio }) => {
  const [platformView, setPlatformView] = useState<'yt-desktop' | 'yt-mobile' | 'instagram'>('yt-mobile');
  const [simulateEyeBlur, setSimulateEyeBlur] = useState(false);

  // Mock competitor videos for realistic context
  const competitors = [
    {
      id: 'comp1',
      title: 'How I Built a $10,000/Month Business With Zero Employees',
      channel: 'Creator Economy Lab',
      views: '482K views',
      time: '3 days ago',
      duration: '14:28',
      bgGradient: 'from-blue-900 to-indigo-950',
      badgeText: 'CASE STUDY',
    },
    {
      id: 'comp2',
      title: 'Stop Wasting Time on YouTube Shorts (Do This Instead)',
      channel: 'Growth Hacking Daily',
      views: '890K views',
      time: '1 week ago',
      duration: '08:45',
      bgGradient: 'from-neutral-900 to-red-950',
      badgeText: 'ALGORITHM',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Controller Bar */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
            <Eye className="w-5 h-5 text-amber-400" />
            Real-World Feed Simulator & Glanceability Test
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Viewers spend 1.2 seconds glancing at feed cards before clicking. Test if your thumbnail dominates attention.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Platform switches */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setPlatformView('yt-mobile')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                platformView === 'yt-mobile' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              YouTube Mobile (80% Views)
            </button>
            <button
              onClick={() => setPlatformView('yt-desktop')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                platformView === 'yt-desktop' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              YouTube Desktop
            </button>
            <button
              onClick={() => setPlatformView('instagram')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                platformView === 'instagram' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Instagram className="w-3.5 h-3.5" />
              Reels / Explore
            </button>
          </div>

          {/* Eye Glance Blur toggle */}
          <button
            onClick={() => setSimulateEyeBlur(!simulateEyeBlur)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer border ${
              simulateEyeBlur
                ? 'bg-purple-600 text-white border-purple-500'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {simulateEyeBlur ? 'Disable Glance Blur' : '⚡ 1.2s Glance Blur Test'}
          </button>
        </div>
      </div>

      {/* Simulated Feed Viewport */}
      <div className={`p-6 bg-slate-950 border border-slate-800 rounded-2xl ${simulateEyeBlur ? 'filter blur-[1.5px]' : ''}`}>
        {/* YOUTUBE MOBILE FEED */}
        {platformView === 'yt-mobile' && (
          <div className="max-w-md mx-auto bg-[#0F0F0F] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* Mock YouTube Mobile Top Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-[#0F0F0F]">
              <div className="flex items-center gap-1.5">
                <Youtube className="w-6 h-6 text-red-600 fill-current" />
                <span className="font-bold text-base tracking-tight text-white font-display">YouTube</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-slate-700" />
            </div>

            {/* FEED ITEM 1: YOUR THUMBNAIL */}
            <div className="p-3 border-b border-neutral-800">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border-2 border-amber-400 shadow-lg">
                {/* Embedded live preview of user canvas */}
                <div
                  className="w-full h-full flex flex-col justify-between p-4"
                  style={{
                    background: `linear-gradient(135deg, ${thumbnailState.gradientStart}, ${thumbnailState.gradientEnd})`,
                    filter: `contrast(${thumbnailState.contrast}%) saturate(${thumbnailState.saturation}%)`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    {thumbnailState.badgeOverlays[0] && (
                      <span
                        className="px-2.5 py-1 text-xs font-black rounded"
                        style={{
                          backgroundColor: thumbnailState.badgeOverlays[0].bgColor,
                          color: thumbnailState.badgeOverlays[0].textColor,
                        }}
                      >
                        {thumbnailState.badgeOverlays[0].text}
                      </span>
                    )}
                    <span className="text-[10px] font-mono bg-black/80 text-amber-400 px-1.5 py-0.5 rounded border border-amber-400/40">
                      YOUR DRAFT
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-amber-400 leading-tight uppercase drop-shadow-md">
                      {thumbnailState.textOverlays[0]?.text || 'YOUR VIRAL HEADLINE'}
                    </h3>
                    {thumbnailState.textOverlays[1] && (
                      <p className="text-xs font-bold text-white uppercase drop-shadow">
                        {thumbnailState.textOverlays[1].text}
                      </p>
                    )}
                  </div>
                </div>

                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                  12:44
                </span>
              </div>

              {/* Title and metadata */}
              <div className="flex items-start gap-3 mt-3">
                <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center font-bold text-slate-950 text-xs shrink-0">
                  YOU
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white leading-snug">
                    {thumbnailState.textOverlays[0]?.text || 'Your Next Masterpiece'} — (Full Guide)
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Your Channel Name · 12K views · 2 hours ago
                  </p>
                </div>
              </div>
            </div>

            {/* FEED ITEM 2: REAL COMPETITOR CARD */}
            {competitors.map((comp) => (
              <div key={comp.id} className="p-3 border-b border-neutral-800 opacity-90">
                <div className={`relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br ${comp.bgGradient} flex items-center justify-center p-4`}>
                  <span className="text-lg font-black text-white/90 text-center uppercase tracking-wide">
                    {comp.badgeText}: COMPETITOR CARD
                  </span>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                    {comp.duration}
                  </span>
                </div>
                <div className="flex items-start gap-3 mt-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-700 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white leading-snug">{comp.title}</h4>
                    <p className="text-xs text-neutral-400 mt-1">
                      {comp.channel} · {comp.views} · {comp.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* YOUTUBE DESKTOP GRID */}
        {platformView === 'yt-desktop' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Your Thumbnail */}
            <div className="flex flex-col gap-2">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border-2 border-amber-400 shadow-xl">
                <div
                  className="w-full h-full flex flex-col justify-between p-4"
                  style={{
                    background: `linear-gradient(135deg, ${thumbnailState.gradientStart}, ${thumbnailState.gradientEnd})`,
                    filter: `contrast(${thumbnailState.contrast}%) saturate(${thumbnailState.saturation}%)`,
                  }}
                >
                  <span
                    className="self-start px-2 py-0.5 text-xs font-black rounded"
                    style={{
                      backgroundColor: thumbnailState.badgeOverlays[0]?.bgColor || '#FACC15',
                      color: thumbnailState.badgeOverlays[0]?.textColor || '#000',
                    }}
                  >
                    {thumbnailState.badgeOverlays[0]?.text || 'FEATURED'}
                  </span>
                  <h3 className="text-xl font-black text-amber-400 leading-tight uppercase drop-shadow-md">
                    {thumbnailState.textOverlays[0]?.text || 'VIRAL HEADLINE'}
                  </h3>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                  11:20
                </span>
              </div>
              <div className="flex items-start gap-2.5 mt-1">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                  YOU
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white leading-snug">
                    {thumbnailState.textOverlays[0]?.text || 'Your High-CTR Video'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">Your Channel · 24K views · Just now</p>
                </div>
              </div>
            </div>

            {/* Competitor Cards */}
            {competitors.map((c) => (
              <div key={c.id} className="flex flex-col gap-2 opacity-80">
                <div className={`relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br ${c.bgGradient} flex items-center justify-center p-3`}>
                  <span className="text-sm font-bold text-neutral-300 uppercase">{c.badgeText}</span>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                    {c.duration}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 mt-1">
                  <div className="w-8 h-8 rounded-full bg-neutral-700 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white leading-snug">{c.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {c.channel} · {c.views} · {c.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* INSTAGRAM REELS 9:16 FEED */}
        {platformView === 'instagram' && (
          <div className="max-w-xs mx-auto bg-black rounded-3xl border border-slate-800 overflow-hidden shadow-2xl p-2">
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-amber-400 flex flex-col justify-between p-5">
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: `linear-gradient(180deg, ${thumbnailState.gradientStart}, ${thumbnailState.gradientEnd})`,
                  filter: `contrast(${thumbnailState.contrast}%) saturate(${thumbnailState.saturation}%)`,
                }}
              />
              <div className="relative z-10 flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-amber-400 bg-black/60 px-2 py-0.5 rounded">
                  Reel Cover Preview
                </span>
                <span className="text-xs text-white">❤️ 42.8k</span>
              </div>

              <div className="relative z-10 text-center">
                <span className="inline-block px-3 py-1 bg-red-600 text-white font-black text-xs rounded mb-2">
                  {thumbnailState.badgeOverlays[0]?.text || 'MUST WATCH'}
                </span>
                <h3 className="text-2xl font-black text-white uppercase drop-shadow-lg leading-tight">
                  {thumbnailState.textOverlays[0]?.text || '3-SECOND HOOK'}
                </h3>
              </div>

              <div className="relative z-10 text-xs text-neutral-300 bg-black/50 p-2 rounded-lg">
                @creator · Reel Sound Original · Audio
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTR Diagnostic Report */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Mobile Safe Zone</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Duration timestamps (bottom right) won't obscure your text or badges.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contrast Delta</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Thick text stroke guarantees legibility against dark and light YouTube themes.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Glance Benchmark</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Predicted Click-Through Rate: <span className="text-amber-400 font-bold">8.4% - 11.2%</span> (Top 5% in category).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
