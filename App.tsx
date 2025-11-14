
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

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'check-in':
        return <CheckinScreen />;
      case 'rewards':
        return <RewardsScreen />;
      case 'calendar':
        return <CalendarScreen />;
      case 'finance':
        return <FinanceScreen />;
      default:
        return <DashboardScreen />;
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
