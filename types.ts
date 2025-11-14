
export type Page = 'dashboard' | 'check-in' | 'rewards' | 'calendar' | 'finance';

export interface CheckinKeyword {
  id: string;
  label: string;
  icon: string;
}

export interface CheckinCategoryData {
  title: string;
  keywords: CheckinKeyword[];
}

export interface TokenEarningAction {
  id: string;
  label: string;
  icon: string;
  tokens: number;
}

export interface Reward {
  id: string;
  title: string;
  icon: string;
  cost: number | 'streak';
  description: string;
}

export interface CalendarEvent {
  day: number;
  type: 'routine' | 'completed' | 'finance' | 'reward';
  title: string;
}
