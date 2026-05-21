import { useUserAchievements } from '@/hooks/shop/useUserAchievements';
import { Trophy, Gift, Zap, CheckCircle2, Lock } from 'lucide-react';
import { useMemo } from 'react';
import { DIFFICULTY_COLORS, getAchievementIcon } from '@/lib/achievement-icons';
import type { AchievementWithProgress } from '@/types/combo';

export const ProfileLogros = () => {
  const { data: achievements, isLoading } = useUserAchievements();

  const sections = useMemo(() => {
    if (!achievements) return { completed: [], inProgress: [], locked: [] };

    return {
      completed: achievements.filter(a => a.is_completed),
      inProgress: achievements.filter(a => a.user_progress > 0 && !a.is_completed),
      locked: achievements.filter(a => a.user_progress === 0 && !a.is_completed)
    };
  }, [achievements]);

  if (isLoading) return null;

  return (
    <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b-8 border-black pb-4">
        <div className="relative">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
            TUS <span className="text-primary">MISIONES</span>
          </h2>
          <div className="flex items-center gap-2 mt-2 bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-widest rotate-1 w-fit">
            <Trophy size={14} className="text-secondary" />
            {sections.completed.length} DE {(achievements?.length || 0)} COMPLETADOS
          </div>
        </div>
      </div>

      {sections.completed.length > 0 && (
        <div className="space-y-6">
          <h3 className="flex items-center gap-2 text-2xl font-black uppercase italic text-emerald-600">
            <CheckCircle2 /> COMPLETADAS
          </h3>
          <div className="space-y-6">
            {sections.completed.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}

      {sections.inProgress.length > 0 && (
        <div className="space-y-6">
          <h3 className="flex items-center gap-2 text-2xl font-black uppercase italic text-amber-500">
            <Zap className="fill-amber-500" /> EN PROGRESO
          </h3>
          <div className="space-y-6">
            {sections.inProgress.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}

      {sections.locked.length > 0 && (
        <div className="space-y-6">
          <h3 className="flex items-center gap-2 text-2xl font-black uppercase italic text-gray-400">
            <Lock /> POR DESCUBRIR
          </h3>
          <div className="space-y-6">
            {sections.locked.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AchievementCard = ({ achievement }: { achievement: AchievementWithProgress }) => {
  const colors = DIFFICULTY_COLORS[achievement.dificultad];
  const progressPercent = Math.min((achievement.user_progress / achievement.total_task) * 100, 100);
  const isLocked = achievement.user_progress === 0 && !achievement.is_completed;

  return (
    <div
      className={`
        relative bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:scale-[1.02]
        ${achievement.is_completed ? 'bg-emerald-50' : ''}
        ${isLocked ? 'bg-gray-50' : ''}
      `}
    >
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex gap-4 items-center">
          <div className={`p-3 border-4 border-black ${colors.bg} ${colors.shadow} rotate-3 ${isLocked ? 'grayscale' : ''}`}>
            {getAchievementIcon(achievement.icon, 32, "text-black")}
          </div>
          <div className={isLocked ? 'opacity-70' : ''}>
            <h3 className="text-xl font-black uppercase italic leading-none mb-1">
              {achievement.title}
            </h3>
            <p className="text-xs font-bold text-black/60 uppercase tracking-tight">
              {achievement.description}
            </p>
          </div>
        </div>
        {achievement.is_completed && (
          <div className="bg-success text-black border-2 border-black p-1 rotate-12 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <CheckCircle2 size={24} />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-end text-[10px] font-black uppercase italic">
          <span>PROGRESO: {achievement.user_progress}/{achievement.total_task}</span>
          <span className="flex items-center gap-1 text-primary">
            <Gift size={12} />
            RECOMPENSA: ${achievement.reward}
          </span>
        </div>

        <div className="relative h-8 bg-gray-100 border-4 border-black overflow-hidden shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)]">
          <div
            className={`h-full transition-all duration-1000 ease-out flex items-center justify-end px-2 border-r-4 border-black
              ${achievement.is_completed ? 'bg-success' : 'bg-primary'}
            `}
            style={{ width: `${progressPercent}%` }}
          >
            {progressPercent > 10 && (
              <Zap size={14} className="text-black/30 animate-pulse" />
            )}
          </div>

          <div className={`absolute right-0 top-0 h-full w-12 border-l-4 border-black flex items-center justify-center group ${achievement.is_completed ? 'bg-secondary' : 'bg-gray-200'}`}>
            <Gift
              size={16}
              className={`transition-transform group-hover:scale-125 ${achievement.is_completed ? 'text-black animate-bounce' : 'text-black/40'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
