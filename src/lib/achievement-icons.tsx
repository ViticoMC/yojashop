import React from 'react';
import { 
  Trophy, Medal, Award, Crown, Star, Flame, Rocket, Gem, 
  Gift, Target, Zap, ShoppingBag, Bike, Clock3, MapPinned, 
  Pizza, Wallet, ShieldCheck, Sparkles, PartyPopper,
  type LucideIcon
} from 'lucide-react';

export const ACHIEVEMENT_ICONS: Record<string, LucideIcon> = {
  Trophy,
  Medal,
  Award,
  Crown,
  Star,
  Flame,
  Rocket,
  Gem,
  Gift,
  Target,
  Zap,
  ShoppingBag,
  Bike,
  Clock3,
  MapPinned,
  Pizza,
  Wallet,
  ShieldCheck,
  Sparkles,
  PartyPopper,
};

export const DIFFICULTY_COLORS = {
  low: {
    bg: 'bg-emerald-400',
    border: 'border-emerald-600',
    text: 'text-emerald-900',
    accent: 'emerald',
    shadow: 'shadow-[4px_4px_0px_0px_rgba(5,150,105,1)]'
  },
  mid: {
    bg: 'bg-amber-400',
    border: 'border-amber-600',
    text: 'text-amber-900',
    accent: 'amber',
    shadow: 'shadow-[4px_4px_0px_0px_rgba(217,119,6,1)]'
  },
  high: {
    bg: 'bg-rose-400',
    border: 'border-rose-600',
    text: 'text-rose-900',
    accent: 'rose',
    shadow: 'shadow-[4px_4px_0px_0px_rgba(225,29,72,1)]'
  }
} as const;

export type AchievementDifficulty = keyof typeof DIFFICULTY_COLORS;

export const getAchievementIcon = (iconName: string, size = 24, className = "") => {
  const Icon = ACHIEVEMENT_ICONS[iconName] || Trophy;
  return <Icon size={size} className={className} />;
};
