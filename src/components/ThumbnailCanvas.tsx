import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ThumbnailState, TextOverlay, BadgeOverlay, PlatformFormat } from '../types/creator';
import { Download, Copy, Sparkles, RefreshCw, Layers, Sliders, Type, Tag, Check, Image as ImageIcon } from 'lucide-react';

interface ThumbnailCanvasProps {
  state: ThumbnailState;
  setState: React.Dispatch<React.SetStateAction<ThumbnailState>>;
  onOpenFeedSimulator: () => void;
}

export const ThumbnailCanvas: React.FC<ThumbnailCanvasProps> = ({
  state,
  setState,
  onOpenFeedSimulator,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeLayer, setActiveLayer] = useState<'text' | 'badges' | 'backdrop' | 'presets'>('text');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Canvas Native Dimensions
  const targetWidth = state.format === 'youtube' ? 1920 : 1080;
  const targetHeight = state.format === 'youtube' ? 1080 : 1920;

  // Render loop on HTML5 Canvas
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, targetWidth, targetHeight);
    ctx.save();

    // 1. Draw Background
    if (state.backgroundType === 'image' && state.imageUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = state.imageUrl;
      if (img.complete && img.naturalWidth !== 0) {
        // Apply image filters
        ctx.filter = `contrast(${state.contrast}%) saturate(${state.saturation}%) brightness(${state.brightness}%)`;
        // Draw covered
        const imgRatio = img.width / img.height;
        const targetRatio = targetWidth / targetHeight;
        let sWidth = img.width;
        let sHeight = img.height;
        let sx = 0;
        let sy = 0;

        if (imgRatio > targetRatio) {
          sWidth = img.height * targetRatio;
          sx = (img.width - sWidth) / 2;
        } else {
          sHeight = img.width / targetRatio;
          sy = (img.height - sHeight) / 2;
        }
        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);
        ctx.filter = 'none';
      } else {
        img.onload = () => renderCanvas();
        // Fallback gradient while loading
        drawGradient(ctx, state.gradientStart, state.gradientEnd, targetWidth, targetHeight);
      }
    } else {
      drawGradient(ctx, state.gradientStart, state.gradientEnd, targetWidth, targetHeight);
    }

    // 2. Vignette effect if enabled
    if (state.vignette) {
      const gradient = ctx.createRadialGradient(
        targetWidth / 2,
        targetHeight / 2,
        Math.min(targetWidth, targetHeight) * 0.3,
        targetWidth / 2,
        targetHeight / 2,
        Math.max(targetWidth, targetHeight) * 0.7
      );
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.65)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    }

    // 3. Optional Creator Face Silhouette Glow Frame
    if (state.showFaceOutline) {
      const faceX = targetWidth * 0.78;
      const faceY = targetHeight * 0.62;
      const radius = Math.min(targetWidth, targetHeight) * 0.3;

      ctx.save();
      ctx.shadowColor = state.faceOutlineColor;
      ctx.shadowBlur = 40;
      ctx.lineWidth = 14;
      ctx.strokeStyle = state.faceOutlineColor;
      ctx.beginPath();
      ctx.arc(faceX, faceY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // subtle inner fill hint
      ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
      ctx.fill();
      ctx.restore();

      // Label indicator
      ctx.save();
      ctx.font = '600 28px "Outfit", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 8;
      ctx.fillText('[ CREATOR FACE ZONE ]', faceX, faceY);
      ctx.restore();
    }

    // 4. Draw Badges
    state.badgeOverlays.forEach((badge) => {
      ctx.save();
      const bx = (badge.x / 100) * targetWidth;
      const by = (badge.y / 100) * targetHeight;

      ctx.translate(bx, by);
      ctx.rotate((badge.rotation * Math.PI) / 180);

      ctx.font = `800 ${badge.fontSize * 1.5}px "Outfit", sans-serif`;
      const textMetrics = ctx.measureText(badge.text);
      const paddingX = 36;
      const paddingY = 18;
      const bgW = textMetrics.width + paddingX * 2;
      const bgH = badge.fontSize * 1.5 + paddingY * 2;

      // Drop shadow for badge
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 10;

      // Draw rounded background
      ctx.fillStyle = badge.bgColor;
      roundRect(ctx, -bgW / 2, -bgH / 2, bgW, bgH, 12);
      ctx.fill();

      // Badge outline
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#FFFFFF';
      roundRect(ctx, -bgW / 2, -bgH / 2, bgW, bgH, 12);
      ctx.stroke();

      // Badge Text
      ctx.shadowColor = 'transparent';
      ctx.fillStyle = badge.textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(badge.text, 0, 2);

      ctx.restore();
    });

    // 5. Draw Text Overlays
    state.textOverlays.forEach((item) => {
      ctx.save();
      const tx = (item.x / 100) * targetWidth;
      const ty = (item.y / 100) * targetHeight;

      ctx.translate(tx, ty);
      ctx.rotate((item.rotation * Math.PI) / 180);

      const displayText = item.isUppercase ? item.text.toUpperCase() : item.text;
      ctx.font = `900 ${item.fontSize * 1.8}px "${item.fontFamily}", "Outfit", sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      // Thick Stroke (MrBeast style outline for supreme readability)
      if (item.strokeWidth > 0) {
        ctx.lineWidth = item.strokeWidth * 3.5;
        ctx.strokeStyle = item.strokeColor;
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 2;
        ctx.strokeText(displayText, 0, 0);
      }

      // Glow effect
      if (item.glowBlur > 0) {
        ctx.shadowColor = item.glowColor;
        ctx.shadowBlur = item.glowBlur * 2;
      }

      // Text fill
      ctx.fillStyle = item.fillColor;
      ctx.fillText(displayText, 0, 0);

      ctx.restore();
    });

    ctx.restore();
  }, [state, targetWidth, targetHeight]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Gradient helper
  function drawGradient(ctx: CanvasRenderingContext2D, start: string, end: string, w: number, h: number) {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, start);
    grad.addColorStop(1, end);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  // Rounded rect helper
  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // Export full 1080p PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsExporting(true);
    setTimeout(() => {
      const link = document.createElement('a');
      link.download = `creatorforge-${state.format}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      setIsExporting(false);
    }, 200);
  };

  // Copy to clipboard
  const handleCopy = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch {
      // Fallback
      handleDownload();
    }
  };

  // Update text layer helper
  const updateTextLayer = (id: string, updates: Partial<TextOverlay>) => {
    setState((prev) => ({
      ...prev,
      textOverlays: prev.textOverlays.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }));
  };

  // Quick preset loader
  const applyPreset = (type: 'finance' | 'tech' | 'challenge' | 'podcast') => {
    if (type === 'finance') {
      setState((prev) => ({
        ...prev,
        gradientStart: '#0F172A',
        gradientEnd: '#022C22',
        contrast: 110,
        saturation: 125,
        textOverlays: [
          {
            id: 'title',
            text: '₹0 TO ₹10 LAKH',
            x: 8,
            y: 18,
            fontSize: 76,
            fontFamily: 'Outfit',
            fillColor: '#FACC15',
            strokeColor: '#000000',
            strokeWidth: 8,
            glowColor: '#EAB308',
            glowBlur: 15,
            isUppercase: true,
            rotation: -3,
          },
          {
            id: 'subtitle',
            text: 'THE REAL BREAKDOWN',
            x: 10,
            y: 42,
            fontSize: 48,
            fontFamily: 'Outfit',
            fillColor: '#FFFFFF',
            strokeColor: '#0F172A',
            strokeWidth: 6,
            glowColor: '#000000',
            glowBlur: 5,
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
      }));
    } else if (type === 'challenge') {
      setState((prev) => ({
        ...prev,
        gradientStart: '#1E1B4B',
        gradientEnd: '#450A0A',
        contrast: 120,
        saturation: 130,
        textOverlays: [
          {
            id: 'title',
            text: 'I TESTED THIS FOR 30 DAYS',
            x: 8,
            y: 16,
            fontSize: 68,
            fontFamily: 'Outfit',
            fillColor: '#EF4444',
            strokeColor: '#FFFFFF',
            strokeWidth: 6,
            glowColor: '#DC2626',
            glowBlur: 20,
            isUppercase: true,
            rotation: -2,
          },
          {
            id: 'subtitle',
            text: 'NEVER AGAIN.',
            x: 10,
            y: 40,
            fontSize: 54,
            fontFamily: 'Outfit',
            fillColor: '#FFFFFF',
            strokeColor: '#000000',
            strokeWidth: 8,
            glowColor: '#000000',
            glowBlur: 0,
            isUppercase: true,
            rotation: -2,
          },
        ],
        badgeOverlays: [
          {
            id: 'b1',
            text: 'WARNING: SHOCKING',
            x: 24,
            y: 74,
            bgColor: '#EF4444',
            textColor: '#FFFFFF',
            fontSize: 22,
            rotation: -4,
          },
        ],
        showFaceOutline: true,
        faceOutlineColor: '#EF4444',
      }));
    } else if (type === 'tech') {
      setState((prev) => ({
        ...prev,
        gradientStart: '#030712',
        gradientEnd: '#1E1B4B',
        contrast: 115,
        saturation: 110,
        textOverlays: [
          {
            id: 'title',
            text: 'AI REPLACED MY JOB?',
            x: 8,
            y: 20,
            fontSize: 72,
            fontFamily: 'Outfit',
            fillColor: '#38BDF8',
            strokeColor: '#020617',
            strokeWidth: 8,
            glowColor: '#0284C7',
            glowBlur: 18,
            isUppercase: true,
            rotation: 0,
          },
          {
            id: 'subtitle',
            text: 'THE HONEST TRUTH (2026)',
            x: 9,
            y: 44,
            fontSize: 44,
            fontFamily: 'Outfit',
            fillColor: '#F8FAFC',
            strokeColor: '#0F172A',
            strokeWidth: 6,
            glowColor: '#000000',
            glowBlur: 0,
            isUppercase: true,
            rotation: 0,
          },
        ],
        badgeOverlays: [
          {
            id: 'b1',
            text: 'UNCENSORED',
            x: 20,
            y: 72,
            bgColor: '#38BDF8',
            textColor: '#082F49',
            fontSize: 22,
            rotation: 0,
          },
        ],
        showFaceOutline: false,
      }));
    } else {
      // podcast
      setState((prev) => ({
        ...prev,
        gradientStart: '#18181B',
        gradientEnd: '#27272A',
        contrast: 105,
        saturation: 100,
        textOverlays: [
          {
            id: 'title',
            text: 'HE FINALLY CONFESSED',
            x: 8,
            y: 22,
            fontSize: 66,
            fontFamily: 'Outfit',
            fillColor: '#F43F5E',
            strokeColor: '#000000',
            strokeWidth: 7,
            glowColor: '#BE123C',
            glowBlur: 10,
            isUppercase: true,
            rotation: 1,
          },
        ],
        badgeOverlays: [
          {
            id: 'b1',
            text: 'EPISODE 42',
            x: 18,
            y: 68,
            bgColor: '#F43F5E',
            textColor: '#FFFFFF',
            fontSize: 20,
            rotation: 0,
          },
        ],
      }));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Interactive Canvas & Action Bar (7 cols) */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        {/* Top Format Selector & Quick Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Format:</span>
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg">
              <button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    format: 'youtube',
                    aspectRatio: 16 / 9,
                  }))
                }
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  state.format === 'youtube'
                    ? 'bg-amber-400 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                YouTube 16:9
              </button>
              <button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    format: 'reels',
                    aspectRatio: 9 / 16,
                  }))
                }
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  state.format === 'reels'
                    ? 'bg-amber-400 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Reels/Shorts 9:16
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenFeedSimulator}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Feed Simulator
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>

            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              {isExporting ? 'Exporting...' : 'Export 1080p'}
            </button>
          </div>
        </div>

        {/* The Viewport Container */}
        <div className="relative w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-center overflow-hidden min-h-[380px] shadow-2xl">
          <div
            className="relative shadow-2xl overflow-hidden rounded-xl border border-slate-800"
            style={{
              width: state.format === 'youtube' ? '100%' : '56%',
              maxWidth: state.format === 'youtube' ? '680px' : '360px',
              aspectRatio: `${state.aspectRatio}`,
            }}
          >
            <canvas
              ref={canvasRef}
              width={targetWidth}
              height={targetHeight}
              className="w-full h-full block object-contain"
            />
          </div>

          {/* Quick Glancy Metrics Overlay */}
          <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-400 bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded border border-slate-800">
            {targetWidth}x{targetHeight} Ultra-HD · {state.format.toUpperCase()}
          </div>
        </div>

        {/* Preset Style Strips */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-xs font-semibold text-slate-400 shrink-0">Viral Presets:</span>
          <button
            onClick={() => applyPreset('finance')}
            className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg whitespace-nowrap cursor-pointer transition-colors"
          >
            ₹ Finance Guru
          </button>
          <button
            onClick={() => applyPreset('challenge')}
            className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg whitespace-nowrap cursor-pointer transition-colors"
          >
            🔥 30-Day Challenge
          </button>
          <button
            onClick={() => applyPreset('tech')}
            className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg whitespace-nowrap cursor-pointer transition-colors"
          >
            ⚡ Tech & AI Review
          </button>
          <button
            onClick={() => applyPreset('podcast')}
            className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg whitespace-nowrap cursor-pointer transition-colors"
          >
            🎙️ Confession Podcast
          </button>
        </div>
      </div>

      {/* Right Column: Customization Controls (5 cols) */}
      <div className="lg:col-span-5 flex flex-col gap-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        {/* Sub-tab navigation */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveLayer('text')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeLayer === 'text' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            Headline
          </button>
          <button
            onClick={() => setActiveLayer('badges')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeLayer === 'badges' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            Badges
          </button>
          <button
            onClick={() => setActiveLayer('backdrop')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeLayer === 'backdrop' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Color & Grading
          </button>
        </div>

        {/* Tab 1: Headline & Text Layers */}
        {activeLayer === 'text' && (
          <div className="flex flex-col gap-4">
            {state.textOverlays.map((item, index) => (
              <div key={item.id} className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/80 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                    {index === 0 ? 'Primary Headline' : 'Sub-Headline'}
                  </span>
                  <div className="flex items-center gap-2">
                    <label className="text-[11px] text-slate-400 flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.isUppercase}
                        onChange={(e) => updateTextLayer(item.id, { isUppercase: e.target.checked })}
                        className="rounded border-slate-700 text-amber-500 focus:ring-0"
                      />
                      ALL CAPS
                    </label>
                  </div>
                </div>

                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => updateTextLayer(item.id, { text: e.target.value })}
                  placeholder="Enter high-CTR headline..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400 font-semibold"
                />

                {/* Font and Colors */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Text Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={item.fillColor}
                        onChange={(e) => updateTextLayer(item.id, { fillColor: e.target.value })}
                        className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <span className="text-xs font-mono text-slate-300">{item.fillColor}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Thick Stroke</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={item.strokeColor}
                        onChange={(e) => updateTextLayer(item.id, { strokeColor: e.target.value })}
                        className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="14"
                        value={item.strokeWidth}
                        onChange={(e) => updateTextLayer(item.id, { strokeWidth: Number(e.target.value) })}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Position & Size Sliders */}
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800/60">
                  <div>
                    <span className="text-[10px] text-slate-400">Size ({item.fontSize}px)</span>
                    <input
                      type="range"
                      min="24"
                      max="120"
                      value={item.fontSize}
                      onChange={(e) => updateTextLayer(item.id, { fontSize: Number(e.target.value) })}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Y-Pos ({item.y}%)</span>
                    <input
                      type="range"
                      min="5"
                      max="85"
                      value={item.y}
                      onChange={(e) => updateTextLayer(item.id, { y: Number(e.target.value) })}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Tilt ({item.rotation}°)</span>
                    <input
                      type="range"
                      min="-15"
                      max="15"
                      value={item.rotation}
                      onChange={(e) => updateTextLayer(item.id, { rotation: Number(e.target.value) })}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Badges & Urgency Overlays */}
        {activeLayer === 'badges' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-300">1-Click High-CTR Badges</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { text: 'STOP DOING THIS!', bg: '#EF4444', textCol: '#FFFFFF' },
                  { text: '₹0 TO ₹10 LAKH', bg: '#FACC15', textCol: '#000000' },
                  { text: '0 TO 1,000,000', bg: '#10B981', textCol: '#022C22' },
                  { text: 'SHOCKING TRUTH', bg: '#DC2626', textCol: '#FFFFFF' },
                  { text: 'NEW ALGORITHM', bg: '#3B82F6', textCol: '#FFFFFF' },
                  { text: 'DON\'T MISS', bg: '#EC4899', textCol: '#FFFFFF' },
                ].map((b, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setState((prev) => ({
                        ...prev,
                        badgeOverlays: [
                          ...prev.badgeOverlays.filter((x) => x.id !== 'custom-badge'),
                          {
                            id: 'custom-badge',
                            text: b.text,
                            x: 30,
                            y: 75,
                            bgColor: b.bg,
                            textColor: b.textCol,
                            fontSize: 22,
                            rotation: -3,
                          },
                        ],
                      }));
                    }}
                    className="p-2 text-xs font-bold rounded-lg border border-slate-800 text-center transition-transform hover:scale-102 active:scale-98 cursor-pointer"
                    style={{ backgroundColor: b.bg, color: b.textCol }}
                  >
                    {b.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Face Outline Frame */}
            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Creator Face Cutout Ring</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.showFaceOutline}
                    onChange={(e) => setState((prev) => ({ ...prev, showFaceOutline: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-400"></div>
                </label>
              </div>
              <p className="text-[11px] text-slate-400">
                Draws a high-visibility neon outline guide around where your face should sit for maximum emotion.
              </p>
              {state.showFaceOutline && (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="color"
                    value={state.faceOutlineColor}
                    onChange={(e) => setState((prev) => ({ ...prev, faceOutlineColor: e.target.value }))}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <span className="text-xs font-mono text-slate-300">{state.faceOutlineColor} Neon Glow</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Backdrop, Color Grading & Filters */}
        {activeLayer === 'backdrop' && (
          <div className="flex flex-col gap-4">
            {/* Background Type Toggle */}
            <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-lg">
              <button
                onClick={() => setState((prev) => ({ ...prev, backgroundType: 'gradient' }))}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  state.backgroundType === 'gradient' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                Gradient Backdrop
              </button>
              <button
                onClick={() => setState((prev) => ({ ...prev, backgroundType: 'image' }))}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  state.backgroundType === 'image' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                Studio Photo
              </button>
            </div>

            {state.backgroundType === 'gradient' && (
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Color 1 (Left)</label>
                  <input
                    type="color"
                    value={state.gradientStart}
                    onChange={(e) => setState((prev) => ({ ...prev, gradientStart: e.target.value }))}
                    className="w-full h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Color 2 (Right)</label>
                  <input
                    type="color"
                    value={state.gradientEnd}
                    onChange={(e) => setState((prev) => ({ ...prev, gradientEnd: e.target.value }))}
                    className="w-full h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Saturation Booster (MrBeast Rule: +20% to +35%) */}
            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 flex flex-col gap-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-300">Saturation Boost (Eye-Candy)</span>
                  <span className="font-mono text-amber-400 font-bold">{state.saturation}%</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="180"
                  value={state.saturation}
                  onChange={(e) => setState((prev) => ({ ...prev, saturation: Number(e.target.value) }))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Pro-tip: Top YouTubers set saturation between 120%-135% so thumbnails pop in dark mode.
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-300">Contrast</span>
                  <span className="font-mono text-slate-400">{state.contrast}%</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="150"
                  value={state.contrast}
                  onChange={(e) => setState((prev) => ({ ...prev, contrast: Number(e.target.value) }))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                <span className="text-xs text-slate-300">Cinematic Vignette</span>
                <input
                  type="checkbox"
                  checked={state.vignette}
                  onChange={(e) => setState((prev) => ({ ...prev, vignette: e.target.checked }))}
                  className="rounded border-slate-700 text-amber-500 focus:ring-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
