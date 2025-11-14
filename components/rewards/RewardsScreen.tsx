import React from 'react';
import Card from '../ui/Card';
import Icon from '../ui/Icon';
import { REWARDS } from '../../constants';
import { Reward } from '../../types';

const RewardCard: React.FC<{ reward: Reward, availableTokens: number }> = ({ reward, availableTokens }) => {
    const isStreakReward = reward.cost === 'streak';
    // Let's assume streak reward is unlocked. For others, check tokens.
    const canAfford = isStreakReward || availableTokens >= (reward.cost as number);

    return (
        <Card className={`flex flex-col items-center text-center p-6 space-y-3 transition-all duration-300 ${!canAfford ? 'opacity-50 bg-gray-50' : 'hover:shadow-xl hover:-translate-y-1'}`}>
            <div className={`p-4 rounded-full ${isStreakReward ? 'bg-reward-amber/20' : 'bg-primary-blue/10'}`}>
                <Icon name={reward.icon} className={`w-8 h-8 ${isStreakReward ? 'text-reward-amber' : 'text-primary-blue'}`} />
            </div>
            <h3 className="font-display font-bold text-lg text-text-primary">{reward.title}</h3>
            <p className="text-sm text-text-secondary flex-grow">{reward.description}</p>
            <button 
                disabled={!canAfford}
                className={`w-full font-bold py-2 px-4 rounded-xl text-white transition-colors ${
                    isStreakReward 
                        ? 'bg-reward-amber' 
                        : canAfford ? 'bg-secondary-green hover:bg-secondary-green/90' : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
                {isStreakReward ? 'Unlocked!' : `${reward.cost} Tokens`}
            </button>
        </Card>
    )
}


const RewardsScreen: React.FC = () => {
    const availableTokens = 85; // Mock data from wallet

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-text-primary">
        Rewards Store
      </h1>
      <Card className="text-center">
        <p className="text-lg text-text-secondary">You have</p>
        <p className="font-display font-bold text-5xl text-primary-blue my-2">{availableTokens}</p>
        <p className="text-lg text-text-secondary">tokens to spend!</p>
      </Card>
      
      <div className="grid grid-cols-2 gap-4 md:gap-6">
          {REWARDS.map(reward => (
              <RewardCard key={reward.id} reward={reward} availableTokens={availableTokens} />
          ))}
      </div>
    </div>
  );
};

export default RewardsScreen;
