
import React, { useState } from 'react';
import BottomNav from './components/layout/BottomNav';
import DashboardScreen from './components/dashboard/DashboardScreen';
import CheckinScreen from './components/checkin/CheckinScreen';
import RewardsScreen from './components/rewards/RewardsScreen';
import CalendarScreen from './components/calendar/CalendarScreen';
import FinanceScreen from './components/finance/FinanceScreen';
import { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  
  // Lifted state for app-wide data
  const [totalTokens, setTotalTokens] = useState<number>(85);
  const [weeklyTokens, setWeeklyTokens] = useState<number>(12);
  const [streakDays, setStreakDays] = useState<number>(4); // Mock streak data
  const STREAK_TARGET = 7;

  const handlePurchase = (cost: number): boolean => {
    if (totalTokens >= cost) {
      setTotalTokens(prev => prev - cost);
      return true;
    }
    return false;
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardScreen 
                 totalTokens={totalTokens} 
                 weeklyTokens={weeklyTokens}
                 streakDays={streakDays}
               />;
      case 'check-in':
        return <CheckinScreen />;
      case 'rewards':
        return <RewardsScreen 
                 totalTokens={totalTokens} 
                 streakDays={streakDays}
                 streakTarget={STREAK_TARGET}
                 onPurchase={handlePurchase}
               />;
      case 'calendar':
        return <CalendarScreen />;
      case 'finance':
        return <FinanceScreen />;
      default:
        return <DashboardScreen 
                 totalTokens={totalTokens} 
                 weeklyTokens={weeklyTokens}
                 streakDays={streakDays}
               />;
    }
  };

  return (
    <div className="bg-background min-h-screen font-sans text-text-primary">
      <div className="container mx-auto max-w-2xl p-4 pb-24">
        {renderContent()}
      </div>
      <BottomNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
};

export default App;
