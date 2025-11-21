
import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

const icons: { [key: string]: React.ReactNode } = {
  Home: <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  CheckCircle: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></>,
  Award: <><circle cx="12" cy="8" r="7" /><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" /></>,
  Calendar: <><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></>,
  Wallet: <><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></>,
  Family: <><path d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><path d="M3 10h18" /><path d="M7 15h.01" /><path d="M12 15h.01" /><path d="M17 15h.01" /></>,
  Users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  MessageCircle: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
  Brush: <path d="M10 21.35 2.65 14a6 6 0 0 1 0-8.5 6 6 0 0 1 8.5 0l.15.15" /><path d="m21.5 6.5-1 1-2-2-1 1-1-1-2-2-1 1-1-1-2-2-1 1-1-1-2-2-1 1 .15.15.15" />,
  Wind: <><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /><path d="M12.6 19.4A2 2 0 1 0 14 16H2" /></>,
  Sparkles: <path d="M9.9 2.2 11 0l1.1 2.2 2.2 1.1-2.2 1.1-1.1 2.2L11 4.4 9.9 3.3Z" /><path d="m20 11-2.2.1-1.1 2.2-1.1-2.2L13.4 11l2.2-.1 1.1-2.2 1.1 2.2Z" /><path d="m3.3 11 1.1 2.2 1.1-2.2L7.7 11l-2.2-.1-1.1-2.2-1.1 2.2Z" />,
  HeartHandshake: <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.82 2.94 0l.06-.06L12 11l2.96-2.96c.82-.82 2.13-.82 2.94 0l.06.06a2.17 2.17 0 0 0 0-3.08Z" /></>,
  HelpCircle: <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" x2="12.01" y1="17" y2="17" /></>,
  Volume2: <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />,
  Ear: <><path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 6a6.5 6.5 0 0 0-7 0" /><path d="M12 10a3 3 0 1 1 6 0 3 3 0 0 1-6 0v0Z" /></>,
  Mail: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
  CheckSquare: <><rect width="18" height="18" x="3" y="3" rx="2" /><path d="m9 12 2 2 4-4" /></>,
  WashingMachine: <><rect width="20" height="20" x="2" y="2" rx="4" /><path d="M14 6h2" /><path d="M12 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z" /></>,
  Heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
  Bike: <><circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" /><path d="M15 6a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v4l-3 3" /><path d="M9 9h5" /><path d="m14 14-3 3" /></>,
  BookOpen: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z" /></>,
  BedDouble: <><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" /><path d="M4 10V6" /><path d="M8 10V6" /><path d="M12 10V6" /><path d="M16 10V6" /><path d="M20 10V6" /><path d="M22 18v2" /><path d="M2 18v2" /></>,
  ChefHat: <><path d="M10 21.35 2.65 14a6 6 0 0 1 0-8.5 6 6 0 0 1 8.5 0l.15.15" /><path d="M13 18V6.5" /><path d="M14 6.5a4.5 4.5 0 0 0-5 4.5V18" /></>,
  CalendarCheck: <><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="m9 16 2 2 4-4" /></>,
  Handshake: <><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.07 2.83" /><path d="M12.5 10.5 8 6" /><path d="m7 7-4 4" /><path d="m8 11 4 4" /></>,
  BrainCircuit: <><path d="M12 2a5.3 5.3 0 0 0-5.22 4" /><circle cx="4" cy="11" r="1" /><circle cx="12" cy="11" r="1" /><circle cx="20" cy="11"r="1" /><path d="M20 8a5.3 5.3 0 0 0-5.22-4" /><path d="M4.08 11a5.3 5.3 0 0 0 4 4.8" /><path d="M12.08 11a5.3 5.3 0 0 0 4 4.8" /><path d="M20.08 11a5.3 5.3 0 0 0-4 4.8" /><path d="M4.08 11a5.3 5.3 0 0 1 4-4.8" /><path d="M12.08 11a5.3 5.3 0 0 1 4-4.8" /><path d="M20.08 11a5.3 5.3 0 0 1-4-4.8" /><path d="M8 16a1 1 0 0 1-1 1" /><path d="M8 16a1 1 0 0 0-1-1" /><path d="M16 16a1 1 0 0 1-1 1" /><path d="M16 16a1 1 0 0 0-1-1" /><path d="M8.08 6a1 1 0 0 1-1 1" /><path d="M8.08 6a1 1 0 0 0-1-1" /><path d="M16.08 6a1 1 0 0 1-1 1" /><path d="M16.08 6a1 1 0 0 0-1-1" /></>,
  MessageSquareText: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M13 8H7" /><path d="M17 12H7" /></>,
  Clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  Pizza: <><path d="M15 11h.01" /><path d="M11 15h.01" /><path d="M15 15h.01" /><path d="M21.17 8.83a2 2 0 0 0-2.83-2.83l-1.41 1.41a1 1 0 1 0 1.41 1.41L21.17 8.83Z" /><path d="M2 12a1 1 0 1 0 0 2h20a1 1 0 1 0 0-2H2Z" /><path d="M12 2C6.5 2 2 6.5 2 12v2h20v-2c0-5.5-4.5-10-10-10Z" /></>,
  IceCream: <><path d="m7 11 4.08 4.08a2 2 0 0 0 2.83 0L18 11" /><path d="M17.5 11a5.5 5.5 0 0 0-11 0" /></>,
  Clapperboard: <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" /><path d="m20.2 6-1 2.9-10.4-3.1L12 3l8.2 3z" /><path d="M2.9 14.1 22 9l-1.6 4.8c-.3 1-1.3 1.6-2.4 1.2l-13.5-4c-1-2.9-1.6-1.3-1.2-2.4z" />,
  SkipForward: <polygon points="5 4 15 12 5 20 5 4" /><line x1="19" x2="19" y1="5" y2="19" />,
  Gift: <><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13" /><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" /><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 5a4.8 8 0 0 1 4.5-2 2.5 2.5 0 0 1 0 5" /></>,
  Plus: <line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" />,
  Minus: <line x1="5" x2="19" y1="12" y2="12" />,
  Target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
  DollarSign: <line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  Moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  School: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>,
  Smartphone: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></>
};

const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icons[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

export default Icon;
