
import React from 'react';
import { Page } from '../../types';
import Icon from '../ui/Icon';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const navItems: { page: Page; label: string; icon: string }[] = [
  { page: 'dashboard', label: 'Home', icon: 'Home' },
  { page: 'check-in', label: 'Check-in', icon: 'CheckCircle' },
  { page: 'rewards', label: 'Rewards', icon: 'Award' },
  { page: 'calendar', label: 'Calendar', icon: 'Calendar' },
  { page: 'finance', label: 'Finance', icon: 'Wallet' },
];

const NavItem: React.FC<{
  item: typeof navItems[0];
  isActive: boolean;
  onClick: () => void;
}> = ({ item, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center space-y-1 w-full transition-colors duration-200 ${
      isActive ? 'text-primary-blue' : 'text-gray-400 hover:text-primary-blue'
    }`}
  >
    <Icon name={item.icon} className="w-6 h-6" />
    <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
  </button>
);


const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-sm border-t border-gray-200 shadow-t-lg z-50">
      <div className="flex justify-around items-center h-full max-w-2xl mx-auto px-2">
        {navItems.map((item) => (
          <NavItem
            key={item.page}
            item={item}
            isActive={activePage === item.page}
            onClick={() => setActivePage(item.page)}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
