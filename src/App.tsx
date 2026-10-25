import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ThumbnailCanvas } from './components/ThumbnailCanvas';
import { HookGenerator } from './components/HookGenerator';
import { CaptionGenerator } from './components/CaptionGenerator';
import { VideoTemplateLibrary } from './components/VideoTemplateLibrary';
import { ContentScheduler } from './components/ContentScheduler';
import { FeedSimulator } from './components/FeedSimulator';
import { StrategyBlueprintView } from './components/StrategyBlueprintView';
import { UnitEconomicsCalculator } from './components/UnitEconomicsCalculator';
import { ThumbnailState } from './types/creator';
import { Download, Sparkles, Check, ArrowRight, Zap, Target, Film, MessageSquare, Calendar, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('studio');
  const [showExportModal, setShowExportModal] = useState(false);

  // Core Thumbnail State
  const [thumbnailState, setThumbnailState] = useState<ThumbnailState>({
    format: 'youtube',
    aspectRatio: 16 / 9,
    backgroundType: 'image',
    imageUrl: '/src/assets/images/hero_creator_studio_1792892555459.jpg',
    gradientStart: '#0F172A',
    gradientEnd: '#022C22',
    gradientAngle: 135,
    contrast: 115,
    saturation: 125, // High CTR eye candy rule
    brightness: 100,
    textOverlays: [
      {
        id: 'title',
        text: '₹0 TO ₹10 LAKH',
        x: 6,
        y: 18,
        fontSize: 78,
        fontFamily: 'Outfit',
        fillColor: '#FACC15',
        strokeColor: '#000000',
        strokeWidth: 8,
        glowColor: '#EAB308',
        glowBlur: 16,
        isUppercase: true,
        rotation: -3,
      },
      {
        id: 'subtitle',
        text: 'THE REAL BREAKDOWN',
        x: 8,
        y: 42,
        fontSize: 48,
        fontFamily: 'Outfit',
        fillColor: '#FFFFFF',
        strokeColor: '#0F172A',
        strokeWidth: 6,
        glowColor: '#000000',
        glowBlur: 4,
        isUppercase: true,
        rotation: -3,
      },
    ],
    badgeOverlays: [
      {
        id: 'b1',
        text: 'STEP-BY-STEP PROOF',
        x: 28,
        y: 72,
        bgColor: '#10B981',
        textColor: '#022C22',
        fontSize: 22,
        rotation: 2,
      },
    ],
    showFaceOutline: true,
    faceOutlineColor: '#FACC15',
    vignette: true,
  });

  // Handler to apply generated headline to canvas
  const handleApplyHeadline = (headline: string, badge?: string) => {
    setThumbnailState((prev) => ({
      ...prev,
      textOverlays: prev.textOverlays.map((t, idx) =>
        idx === 0
          ? {
              ...t,
              text: headline,
            }
          : t
      ),
      badgeOverlays: badge
        ? [
            {
              id: 'badge-applied',
              text: badge,
              x: 28,
              y: 72,
              bgColor: '#FACC15',
              textColor: '#000000',
              fontSize: 22,
              rotation: -2,
            },
          ]
        : prev.badgeOverlays,
    }));
    setActiveTab('studio');
  };

  // Handler when clicking video template thumbnail button
  const handleLoadThumbnailForTemplate = (templateTitle: string, badge = 'VIRAL FORMULA') => {
    setThumbnailState((prev) => ({
      ...prev,
      textOverlays: [
        {
          id: 'title',
          text: templateTitle.slice(0, 26).toUpperCase(),
          x: 6,
          y: 20,
          fontSize: 70,
          fontFamily: 'Outfit',
          fillColor: '#38BDF8',
          strokeColor: '#020617',
          strokeWidth: 8,
          glowColor: '#0284C7',
          glowBlur: 16,
          isUppercase: true,
          rotation: -1,
        },
        {
          id: 'subtitle',
          text: 'FULL BREAKDOWN',
          x: 8,
          y: 44,
          fontSize: 44,
          fontFamily: 'Outfit',
          fillColor: '#FFFFFF',
          strokeColor: '#000000',
          strokeWidth: 6,
          glowColor: '#000000',
          glowBlur: 0,
          isUppercase: true,
          rotation: -1,
        },
      ],
      badgeOverlays: [
        {
          id: 'b-temp',
          text: badge,
          x: 26,
          y: 74,
          bgColor: '#EF4444',
          textColor: '#FFFFFF',
          fontSize: 22,
          rotation: -3,
        },
      ],
    }));
    setActiveTab('studio');
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col">
      {/* Top Bar Contract Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportClick={() => setShowExportModal(true)}
      />

      {/* Main Viewport Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-8">
        {/* TAB 1: STUDIO (Interactive Canvas + Hook Lab) */}
        {activeTab === 'studio' && (
          <div className="flex flex-col gap-8">
            <ThumbnailCanvas
              state={thumbnailState}
              setState={setThumbnailState}
              onOpenFeedSimulator={() => setActiveTab('feed-simulator')}
            />

            <div className="pt-4 border-t border-slate-800">
              <HookGenerator
                format={thumbnailState.format}
                onApplyHeadline={handleApplyHeadline}
              />
            </div>
          </div>
        )}

        {/* TAB 2: AI CAPTIONS & HASHTAGS */}
        {activeTab === 'captions' && (
          <CaptionGenerator
            onSendHookToCanvas={(hook) => handleApplyHeadline(hook, 'NEW 2026')}
          />
        )}

        {/* TAB 3: VIDEO TEMPLATE LIBRARY */}
        {activeTab === 'templates' && (
          <VideoTemplateLibrary
            onLoadThumbnailForTemplate={handleLoadThumbnailForTemplate}
          />
        )}

        {/* TAB 4: CONTENT SCHEDULER & CALENDAR */}
        {activeTab === 'scheduler' && <ContentScheduler />}

        {/* TAB 5: FEED SIMULATOR */}
        {activeTab === 'feed-simulator' && (
          <FeedSimulator
            thumbnailState={thumbnailState}
            onBackToStudio={() => setActiveTab('studio')}
          />
        )}

        {/* TAB 6: MARKET STRATEGY BLUEPRINT */}
        {activeTab === 'strategy' && <StrategyBlueprintView />}

        {/* TAB 7: UNIT ECONOMICS & MRR SIMULATOR */}
        {activeTab === 'unit-economics' && <UnitEconomicsCalculator />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white font-display">CreatorForge AI</span>
            <span>·</span>
            <span>All-in-one High-CTR Studio for YouTube & Reels Creators</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('strategy')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              $10k MRR Blueprint
            </button>
            <button
              onClick={() => setActiveTab('unit-economics')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Unit Economics
            </button>
            <span className="text-slate-500 font-mono">1080p Ultra-HD Engine</span>
          </div>
        </div>
      </footer>

      {/* Export Confirmation Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                <Download className="w-4 h-4 text-amber-400" />
                Export 1080p Master File
              </h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Your thumbnail packaging is rendered at native <strong>1920x1080 (16:9)</strong> or <strong>1080x1920 (9:16)</strong> resolution, with uncompressed color profiles and thick contrast borders.
            </p>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex flex-col gap-1.5 font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Format:</span>
                <span className="text-white font-bold">{thumbnailState.format.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Color Grading:</span>
                <span className="text-amber-400 font-bold">Saturation {thumbnailState.saturation}%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Feed Glance Test:</span>
                <span className="text-emerald-400 font-bold">Top 5% Predicted CTR</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const canvas = document.querySelector('canvas');
                  if (canvas) {
                    const link = document.createElement('a');
                    link.download = `creatorforge-${thumbnailState.format}-${Date.now()}.png`;
                    link.href = canvas.toDataURL('image/png', 1.0);
                    link.click();
                  }
                  setShowExportModal(false);
                }}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download PNG Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
