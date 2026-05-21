import type { Product } from "./product";
import { AchievementDifficulty } from "@/lib/achievement-icons";

export interface Combo {
  id: string | number;
  nombre: string;
  cta: string;
  descriptiom: string;
  price: number;
  discount: number;
  foto_url: string;
  foto_id?: string;
  created_at: string;
  products?: Product[]; // Para los detalles del combo
}

export type AdminCombo = Combo;

export interface Logro {
  id: number;
  created_at: string;
  total_task: number;
  title: string;
  description: string;
  reward: number;
  dificultad: AchievementDifficulty;
  icon: string;
}

export interface UserLogro {
  id: number;
  user_id: string;
  logro_id: number;
  progress: number;
  created_at: string;
}

export interface AchievementWithProgress extends Logro {
  user_progress: number;
  is_completed: boolean;
}
