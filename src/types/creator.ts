export type PlatformFormat = 'youtube' | 'reels';

export interface TextOverlay {
  id: string;
  text: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  fontSize: number;
  fontFamily: string;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  glowColor: string;
  glowBlur: number;
  isUppercase: boolean;
  rotation: number;
}

export interface BadgeOverlay {
  id: string;
  text: string;
  x: number;
  y: number;
  bgColor: string;
  textColor: string;
  fontSize: number;
  rotation: number;
}

export interface ThumbnailState {
  format: PlatformFormat;
  aspectRatio: number; // 16/9 or 9/16
  backgroundType: 'image' | 'gradient' | 'solid';
  imageUrl: string;
  gradientStart: string;
  gradientEnd: string;
  gradientAngle: number;
  contrast: number; // 100 default
  saturation: number; // 100 default, creators often use 125
  brightness: number; // 100 default
  textOverlays: TextOverlay[];
  badgeOverlays: BadgeOverlay[];
  showFaceOutline: boolean;
  faceOutlineColor: string;
  vignette: boolean;
}

export interface ViralHook {
  id: string;
  framework: string;
  hookText: string;
  thumbnailHeadline: string;
  ctrScore: number;
  emotionalTrigger: string;
  visualDescription: string;
  colorPalette: string[];
  recommendedBadge: string;
}

export interface CompetitorData {
  name: string;
  pricing: string;
  targetAudience: string;
  coreStrength: string;
  userReviewWeaknesses: string[];
  ourUnfairAdvantage: string;
}

export interface MarketingContentIdea {
  id: number;
  hook: string;
  format: string;
  targetPlatform: string;
  angle: string;
  scriptOutline: string;
}
