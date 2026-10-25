import React, { useState } from 'react';
import { Film, Download, Check, Play, Edit3, ArrowRight, Clock, Video, Sparkles, Sliders } from 'lucide-react';

export interface VideoTemplate {
  id: string;
  title: string;
  platform: 'reels' | 'shorts' | 'tiktok' | 'youtube';
  contentType: 'vlog' | 'tutorial' | 'review' | 'podcast' | 'challenge';
  duration: string;
  pacingBpm: string;
  hookLine: string;
  description: string;
  beats: {
    time: string;
    action: string;
    onScreenText: string;
    cameraAngle: string;
  }[];
  audioVibe: string;
}

interface VideoTemplateLibraryProps {
  onLoadThumbnailForTemplate: (title: string, badge: string) => void;
}

export const VideoTemplateLibrary: React.FC<VideoTemplateLibraryProps> = ({ onLoadThumbnailForTemplate }) => {
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<VideoTemplate | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Template collection
  const templates: VideoTemplate[] = [
    {
      id: 't1',
      title: 'The 3-Step "Stop Doing This" Tutorial',
      platform: 'reels',
      contentType: 'tutorial',
      duration: '35 seconds',
      pacingBpm: '120-128 BPM (Punchy Lo-fi / Electro)',
      hookLine: 'Stop doing this if you want [DESIRED OUTCOME] in 2026.',
      description: 'The highest retention tutorial structure on Instagram Reels. Hooks with fear of error, delivers 3 rapid value steps, and loops seamlessly.',
      audioVibe: 'Crisp electronic beat with rhythmic pauses at each step transition',
      beats: [
        {
          time: '0:00 - 0:03',
          action: 'Pattern interrupt: Hands waving in front of lens with serious face',
          onScreenText: 'STOP DOING THIS ❌',
          cameraAngle: 'Tight selfie crop (Eye level)',
        },
        {
          time: '0:03 - 0:10',
          action: 'Screen recording / B-roll of the common mistake in action',
          onScreenText: 'MISTAKE #1: OVERCOMPLICATING',
          cameraAngle: 'Over-the-shoulder / Screen capture',
        },
        {
          time: '0:10 - 0:24',
          action: 'Fast 3-point fix with snappy sound effects (whoosh/snap)',
          onScreenText: 'STEP 1: [QUICK FIX] ⚡',
          cameraAngle: 'Medium shot holding product/laptop',
        },
        {
          time: '0:24 - 0:32',
          action: 'Show the final clean result or analytics dashboard',
          onScreenText: 'BEFORE VS AFTER 📈',
          cameraAngle: 'Split screen or punch-in zoom',
        },
        {
          time: '0:32 - 0:35',
          action: 'Seamless loop sentence pointing down at caption',
          onScreenText: 'Read caption for template 👇',
          cameraAngle: 'Eye-level pointing down',
        },
      ],
    },
    {
      id: 't2',
      title: 'The Honest "Is It Worth It?" Tech Review',
      platform: 'shorts',
      contentType: 'review',
      duration: '45 seconds',
      pacingBpm: '95-105 BPM (Chill Hip-hop / Ambient Tech)',
      hookLine: 'I spent [MONEY] on this so you don\'t have to.',
      description: 'Ideal for gadgets, SaaS tools, cameras, and consumer goods. Builds rapid trust by highlighting 1 critical flaw before giving the verdict.',
      audioVibe: 'Clean minimalist bassline with tactile product foley sounds',
      beats: [
        {
          time: '0:00 - 0:03',
          action: 'Holding product right against the lens, dramatic studio lighting',
          onScreenText: 'IS IT WORTH IT? 🤔',
          cameraAngle: 'Macro close-up, dramatic slow push',
        },
        {
          time: '0:03 - 0:12',
          action: 'The 2 best features that blew you away (crisp B-roll)',
          onScreenText: 'THE PROS: SPEED & BUILD',
          cameraAngle: 'B-roll panning across ports/details',
        },
        {
          time: '0:12 - 0:26',
          action: 'The brutal flaw or catch that nobody talks about in reviews',
          onScreenText: 'THE DIRTY SECRET ⚠️',
          cameraAngle: 'Talking head with skeptical expression',
        },
        {
          time: '0:26 - 0:38',
          action: 'Side-by-side comparison with the cheaper alternative',
          onScreenText: 'BUY THIS INSTEAD FOR 50% LESS',
          cameraAngle: 'Two hands holding competing items',
        },
        {
          time: '0:38 - 0:45',
          action: 'Final score out of 10 and recommendation',
          onScreenText: 'VERDICT: 8.5/10 ⭐',
          cameraAngle: 'Direct to camera with final sign-off',
        },
      ],
    },
    {
      id: 't3',
      title: 'Aesthetic "Day in the Life" Solopreneur Vlog',
      platform: 'tiktok',
      contentType: 'vlog',
      duration: '55 seconds',
      pacingBpm: '85 BPM (Warm Indie Lo-fi / Vinyl crackle)',
      hookLine: 'What a realistic 12-hour day looks like running a 1-person business.',
      description: 'Cinematic, aspirational yet grounded day-in-the-life template that builds high parasocial attachment and community loyalty.',
      audioVibe: 'Warm acoustic guitar with soft coffee-shop morning ambience',
      beats: [
        {
          time: '0:00 - 0:04',
          action: 'Pouring morning espresso or opening studio blinds',
          onScreenText: '6:30 AM · DAY 142 AS A FOUNDER',
          cameraAngle: 'Tripod low-angle wide shot',
        },
        {
          time: '0:04 - 0:16',
          action: 'Deep work montage: Keyboard typing, whiteboard architecture',
          onScreenText: 'BLOCK 1: 3 HOURS DEEP WORK',
          cameraAngle: 'Over-the-shoulder, natural window light',
        },
        {
          time: '0:16 - 0:28',
          action: 'The mid-day slump or challenge faced today',
          onScreenText: 'SERVER DOWN / BUG CRISIS ☕',
          cameraAngle: 'Close-up grimace / screen blur',
        },
        {
          time: '0:28 - 0:42',
          action: 'The win of the day: Shipping the update or hitting revenue',
          onScreenText: 'WE HIT ₹5 LAKH THIS MONTH 🎉',
          cameraAngle: 'Laptop screen celebratory punch-in',
        },
        {
          time: '0:42 - 0:55',
          action: 'Evening wind-down & 1 reflection question for audience',
          onScreenText: 'What are you building this week?',
          cameraAngle: 'Walking vlog or warm desk lamp aesthetic',
        },
      ],
    },
    {
      id: 't4',
      title: 'The High-Stakes 30-Day Challenge',
      platform: 'youtube',
      contentType: 'challenge',
      duration: '8 - 12 minutes (Long-form Structure)',
      pacingBpm: 'Dynamic Orchestral / Modern Synthwave',
      hookLine: 'I did [EXTREME THING] for 30 days straight to see if it actually works.',
      description: 'The golden formula for 500k+ YouTube views. Follows the Hero\'s Journey: Day 1 arrogance, Day 7 suffering, Day 20 pivot, Day 30 victory.',
      audioVibe: 'Cinematic tension building to an uplifting climax',
      beats: [
        {
          time: '0:00 - 0:45',
          action: 'Day 30 teaser preview + the wager/rules of the challenge',
          onScreenText: 'DAY 1 VS DAY 30',
          cameraAngle: 'Fast-paced documentary edit with countdown',
        },
        {
          time: '0:45 - 2:30',
          action: 'The Setup: Why you are doing this and setting the baseline stats',
          onScreenText: 'THE BASELINE MEASUREMENTS',
          cameraAngle: 'Studio breakdown with whiteboard stats',
        },
        {
          time: '2:30 - 5:00',
          action: 'The Dip: Days 5 to 14 where everything goes wrong and fatigue hits',
          onScreenText: 'I WANTED TO QUIT HERE 💀',
          cameraAngle: 'Raw vlog camera, unscripted exhaustion',
        },
        {
          time: '5:00 - 8:30',
          action: 'The Breakthrough: The small adjustment that changed the trajectory',
          onScreenText: 'THE CRITICAL TURNING POINT',
          cameraAngle: 'Split screen tracking progressive data',
        },
        {
          time: '8:30 - 11:00',
          action: 'Final reveal of results, medical/financial proof, and advice',
          onScreenText: 'THE 30-DAY PROOF',
          cameraAngle: 'Hero wide shot with side-by-side comparison',
        },
      ],
    },
    {
      id: 't5',
      title: 'High-Energy Podcast Micro-Clip',
      platform: 'shorts',
      contentType: 'podcast',
      duration: '30 seconds',
      pacingBpm: 'No music or subtle low-frequency drone (voice-focused)',
      hookLine: 'This single sentence completely changed how I think about money.',
      description: 'Dynamic two-camera setup with kinetic word-by-word subtitles and high-contrast color pop.',
      audioVibe: 'Broadcast-quality voice clarity with punchy sub-bass hits on key words',
      beats: [
        {
          time: '0:00 - 0:03',
          action: 'Speaker leans into microphone with intense eye contact',
          onScreenText: 'LISTEN TO THIS VERY CAREFULLY 🎙️',
          cameraAngle: 'Tight 50mm portrait lens',
        },
        {
          time: '0:03 - 0:18',
          action: 'The controversial insight spoken without hesitation',
          onScreenText: 'THE SYSTEM IS RIGGED',
          cameraAngle: 'Camera A (Speaker)',
        },
        {
          time: '0:18 - 0:24',
          action: 'Cut to host\'s stunned / nodding reaction',
          onScreenText: 'MIND = BLOWN 🤯',
          cameraAngle: 'Camera B (Listener reaction)',
        },
        {
          time: '0:24 - 0:30',
          action: 'Punchline delivery and episode title badge',
          onScreenText: 'FULL EPISODE 42 ON YOUTUBE',
          cameraAngle: 'Wide studio view',
        },
      ],
    },
  ];

  // Filter logic
  const filteredTemplates = templates.filter((t) => {
    const matchPlatform = platformFilter === 'all' || t.platform === platformFilter;
    const matchType = typeFilter === 'all' || t.contentType === typeFilter;
    return matchPlatform && matchType;
  });

  // Download Storyboard Script
  const handleDownloadStoryboard = (template: VideoTemplate) => {
    const exportData = {
      templateTitle: template.title,
      platform: template.platform,
      contentType: template.contentType,
      duration: template.duration,
      pacingAudio: template.audioVibe,
      openingHook: template.hookLine,
      timelineBeats: template.beats,
      generatedBy: 'CreatorForge Video Studio',
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-storyboard.json`;
    a.click();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header & Filter Controls */}
      <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
            <Film className="w-5 h-5 text-amber-400" />
            Viral Video Template & Storyboard Library
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Production-ready video outlines with beat-by-beat timeline timings, B-roll instructions, and matching thumbnail hooks.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Platform Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            {['all', 'reels', 'shorts', 'tiktok', 'youtube'].map((p) => (
              <button
                key={p}
                onClick={() => setPlatformFilter(p)}
                className={`px-2.5 py-1 rounded capitalize font-medium cursor-pointer transition-colors ${
                  platformFilter === p ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Content Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="all">All Content Types</option>
            <option value="tutorial">Tutorial / How-To</option>
            <option value="review">Product & Tech Review</option>
            <option value="vlog">Aesthetic Vlog</option>
            <option value="challenge">30-Day Challenge</option>
            <option value="podcast">Podcast Clip</option>
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between gap-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
                  {template.platform.toUpperCase()} · {template.contentType.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {template.duration}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white font-display leading-snug">
                  {template.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {template.description}
                </p>
              </div>

              {/* Hook Preview */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Opening Hook:</span>
                <p className="text-xs font-semibold text-amber-300 italic">"{template.hookLine}"</p>
              </div>

              {/* Beats summary */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Timeline Breakdown ({template.beats.length} Beats):
                </span>
                {template.beats.slice(0, 3).map((b, bi) => (
                  <div key={bi} className="flex items-center justify-between text-[11px] p-1.5 bg-slate-950/60 rounded border border-slate-800/60">
                    <span className="font-mono text-amber-400/80">{b.time}</span>
                    <span className="text-slate-300 truncate max-w-[180px]">{b.onScreenText}</span>
                  </div>
                ))}
                {template.beats.length > 3 && (
                  <span className="text-[10px] text-slate-500 block text-right">
                    +{template.beats.length - 3} more structural beats
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => setSelectedTemplate(template)}
                className="flex-1 py-2 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5" />
                Customize & View
              </button>

              <button
                onClick={() => handleDownloadStoryboard(template)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer"
                title="Download JSON Script Guide"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Template Detail & Customizer Drawer / Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 flex flex-col gap-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase font-bold">
                  {selectedTemplate.platform} · {selectedTemplate.contentType}
                </span>
                <h3 className="text-lg font-bold text-white font-display">
                  {selectedTemplate.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-slate-800 rounded cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {/* Pacing & Audio Recommendation */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Audio Pacing & BPM</span>
                <span className="font-semibold text-white">{selectedTemplate.pacingBpm}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Recommended Vibe</span>
                <span className="font-semibold text-amber-300">{selectedTemplate.audioVibe}</span>
              </div>
            </div>

            {/* Complete Storyboard Beats */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Beat-by-Beat Video Storyboard
              </h4>
              <div className="space-y-2.5">
                {selectedTemplate.beats.map((beat, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-amber-400">{beat.time}</span>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        Camera: {beat.cameraAngle}
                      </span>
                    </div>
                    <div className="text-xs text-slate-200">
                      <strong>Action:</strong> {beat.action}
                    </div>
                    <div className="text-xs text-amber-300 bg-amber-400/5 px-2 py-1 rounded border border-amber-400/20">
                      <strong>On-Screen Text:</strong> {beat.onScreenText}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  onLoadThumbnailForTemplate(selectedTemplate.title, 'NEW 2026');
                  setSelectedTemplate(null);
                }}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                Design Matching Thumbnail in Studio
              </button>

              <button
                onClick={() => handleDownloadStoryboard(selectedTemplate)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {downloadSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
                {downloadSuccess ? 'Downloaded!' : 'Download Script (.json)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
