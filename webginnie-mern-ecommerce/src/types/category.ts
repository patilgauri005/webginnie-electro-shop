import { ReactNode } from 'react';

export interface Category {
  id: string;
  name: string;
  icon: ReactNode; // ✅ change from LucideIcon to ReactNode
}
