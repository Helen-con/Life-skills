
import React from 'react';
import AffirmationCard from './AffirmationCard';
import StreakTracker from './StreakTracker';
import TokenWallet from './TokenWallet';
import ProgressRing from './ProgressRing';
import Card from '../ui/Card';
import Icon from '../ui/Icon';
import { TOKEN_ACTIONS } from '../../constants';

interface DashboardScreenProps {
  totalTokens: number;
  weeklyTokens: number;
  streakDays: number;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ totalTokens, weeklyTokens, streakDays }) => {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-text-primary">
        Hello Katie!
      </h1>
      <AffirmationCard />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StreakTracker streakDays={streakDays} />
        <TokenWallet totalTokens={totalTokens} weeklyTokens={weeklyTokens} />
      </div>
      <ProgressRing />
       <Card>
        <h2 className="text-xl font-bold font-display mb-4 text-text-primary">Ways to Earn Tokens</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {TOKEN_ACTIONS.map((action) => (
            <div key={action.id} className="flex flex-col items-center justify-center text-center bg-gray-50 p-3 rounded-2xl space-y-2 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="bg-primary-blue/10 p-2.5 rounded-full">
                <Icon name={action.icon} className="w-5 h-5 text-primary-blue" />
              </div>
              <span className="font-medium text-text-secondary text-xs">{action.label}</span>
              <div className="bg-reward-amber/20 text-reward-amber font-bold text-xs px-2 py-0.5 rounded-full">
                +{action.tokens}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardScreen;
