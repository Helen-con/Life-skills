
import React from 'react';
import { CheckinCategoryData, TokenEarningAction, Reward, CalendarEvent } from './types';

export const AFFIRMATIONS: { text: string, icon: string }[] = [
  { text: "Small steps still count.", icon: "🌱" },
  { text: "You made positive choices today.", icon: "✨" },
  { text: "Your communication is improving.", icon: "💬" },
  { text: "You showed real responsibility.", icon: "💪" },
  { text: "You're building great habits.", icon: "🙌" }
];

export const CHECKIN_DATA: CheckinCategoryData[] = [
  {
    title: "Social",
    keywords: [
      { id: 's1', label: "Family", icon: "Family" },
      { id: 's2', label: "Friends", icon: "Users" },
      { id: 's3', label: "Communication", icon: "MessageCircle" },
      { id: 's4', label: "Hobbies", icon: "Brush" },
    ],
  },
  {
    title: "Emotional",
    keywords: [
      { id: 'e1', label: "Calm", icon: "Wind" },
      { id: 'e2', label: "Proud", icon: "Sparkles" },
      { id: 'e3', label: "Coping", icon: "HeartHandshake" },
      { id: 'e4', label: "Asked for help", icon: "HelpCircle" },
    ],
  },
  {
    title: "Communication",
    keywords: [
      { id: 'c1', label: "Assertive Voice", icon: "Volume2" },
      { id: 'c2', label: "Listened well", icon: "Ear" },
      { id: 'c3', label: "Checked messages", icon: "Mail" },
      { id: 'c4', label: "Followed instructions", icon: "CheckSquare" },
    ],
  },
];

export const TOKEN_ACTIONS: TokenEarningAction[] = [
  { id: 't1', label: "Washing", icon: "WashingMachine", tokens: 2 },
  { id: 't2', label: "Family time", icon: "Heart", tokens: 1 },
  { id: 't3', label: "Friend time", icon: "Users", tokens: 1 },
  { id: 't4', label: "Recreational activity", icon: "Bike", tokens: 2 },
  { id: 't5', label: "Extra education", icon: "BookOpen", tokens: 3 },
  { id: 't6', label: "Tidy room", icon: "BedDouble", tokens: 3 },
  { id: 't7', label: "Cooked meal", icon: "ChefHat", tokens: 2 },
  { id: 't8', label: "Appointments", icon: "CalendarCheck", tokens: 2 },
  { id: 't9', label: "Helped someone", icon: "Handshake", tokens: 2 },
  { id: 't10', label: "Emotional regulation", icon: "BrainCircuit", tokens: 2 },
  { id: 't11', label: "Good communication", icon: "MessageSquareText", tokens: 1 },
];

export const REWARDS: Reward[] = [
    { id: 'r1', title: "Extra Curfew Hour", icon: 'Clock', cost: 'streak', description: "1hr extra on Fri/Sat" },
    { id: 'r2', title: "Choose Dinner", icon: 'Pizza', cost: 5, description: "You pick what we eat!" },
    { id: 'r3', title: "Treat", icon: 'IceCream', cost: 10, description: "A snack up to £5" },
    { id: 'r4', title: "Movie Night", icon: 'Clapperboard', cost: 15, description: "Your choice of movie" },
    { id: 'r5', title: "Skip Chore", icon: 'SkipForward', cost: 20, description: "Pass on one chore" },
    { id: 'r6', title: "Small Voucher", icon: 'Gift', cost: 30, description: "£10 for your favorite store" },
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { day: 2, type: 'routine', title: 'College' },
  { day: 3, type: 'completed', title: '3 core habits' },
  { day: 5, type: 'finance', title: 'Pocket money' },
  { day: 7, type: 'reward', title: 'Movie Night' },
  { day: 9, type: 'routine', title: 'Therapy appt' },
  { day: 10, type: 'completed', title: '3 core habits' },
  { day: 11, type: 'completed', title: '3 core habits' },
  { day: 14, type: 'routine', title: 'Dentist' },
  { day: 18, type: 'reward', title: 'Chose dinner' },
  { day: 22, type: 'finance', title: 'Savings goal check' },
  { day: 25, type: 'completed', title: '3 core habits' },
];
