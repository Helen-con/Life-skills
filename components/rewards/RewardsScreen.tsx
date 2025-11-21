
import React, { useState } from 'react';
import Card from '../ui/Card';
import Icon from '../ui/Icon';
import { REWARDS } from '../../constants';
import { Reward } from '../../types';

interface RewardsScreenProps {
    totalTokens: number;
    streakDays: number;
    streakTarget: number;
    onPurchase: (cost: number) => boolean;
}

const ConfirmationModal = ({ reward, onClose }: { reward: Reward, onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
    <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-xl animate-[scaleIn_0.2s_ease-out]">
      <div className="bg-primary-pink/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
        <Icon name={reward.icon} className="w-8 h-8 text-primary-pink" />
      </div>
      <div>
        <h3 className="text-xl font-bold font-display text-text-primary">Reward Redeemed!</h3>
        <p className="text-text-secondary mt-2">
            You've redeemed <span className="font-bold text-text-primary">{reward.title}</span>.
        </p>
        <p className="text-sm text-text-secondary mt-1">Enjoy it, you earned it!</p>
      </div>
      <button 
        onClick={onClose}
        className="w-full bg-primary-blue text-white font-bold py-3 rounded-xl hover:bg-blue-400 transition-colors shadow-lg shadow-blue-200"
      >
        Awesome!
      </button>
    </div>
  </div>
);

const RewardCard: React.FC<{ 
    reward: Reward, 
    totalTokens: number,
    streakDays: number,
    streakTarget: number,
    onPurchase: (reward: Reward) => void 
}> = ({ reward, totalTokens, streakDays, streakTarget, onPurchase }) => {
    const [isPressed, setIsPressed] = useState(false);
    const isStreakReward = reward.cost === 'streak';
    
    // Determine status
    let canAfford = false;
    let buttonText = '';
    let statusClass = '';
    let isUnlocked = false;

    if (isStreakReward) {
        isUnlocked = streakDays >= streakTarget;
        canAfford = false; // Streak rewards are status-based
        buttonText = isUnlocked ? 'Active (Unlocked)' : `Locked (${streakDays}/${streakTarget} Days)`;
        statusClass = isUnlocked ? 'bg-primary-pink text-white cursor-default shadow-lg shadow-pink-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed';
    } else {
        const cost = reward.cost as number;
        canAfford = totalTokens >= cost;
        buttonText = `${cost} Tokens`;
        statusClass = canAfford ? 'bg-primary-pink hover:bg-secondary-pink text-white shadow-lg shadow-pink-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed';
    }

    const handlePress = () => {
        if (!isStreakReward && canAfford) {
            setIsPressed(true);
            // Short delay to show the animation before the modal triggers
            setTimeout(() => {
                setIsPressed(false);
                onPurchase(reward);
            }, 150);
        }
    };

    return (
        <Card className={`flex flex-col items-center text-center p-6 space-y-3 transition-all duration-300 ${
            !canAfford && !isStreakReward 
                ? 'opacity-75' 
                : 'hover:shadow-md hover:-translate-y-0.5'
        } ${isUnlocked ? 'ring-2 ring-primary-pink ring-offset-2 shadow-pink-100' : ''} ${isPressed ? 'scale-95' : ''}`}>
            <div className={`p-4 rounded-full transition-all duration-700 ${isUnlocked ? 'bg-primary-pink/20 scale-110' : 'bg-primary-blue/20'} ${isUnlocked ? 'animate-[pulse_3s_ease-in-out_infinite]' : ''}`}>
                <Icon name={reward.icon} className={`w-8 h-8 ${isStreakReward ? 'text-primary-pink' : 'text-primary-blue'}`} />
            </div>
            <h3 className="font-display font-bold text-lg text-text-primary">{reward.title}</h3>
            <p className="text-sm text-text-secondary flex-grow">{reward.description}</p>
            <button 
                disabled={!canAfford && !isStreakReward} 
                onClick={handlePress}
                className={`w-full font-bold py-2 px-4 rounded-xl transition-all duration-200 ${statusClass} ${isPressed ? 'scale-95 brightness-90' : ''}`}
            >
                {buttonText}
            </button>
        </Card>
    )
}


const RewardsScreen: React.FC<RewardsScreenProps> = ({ totalTokens, streakDays, streakTarget, onPurchase }) => {
    const [redeemedReward, setRedeemedReward] = useState<Reward | null>(null);

    const handlePurchaseClick = (reward: Reward) => {
        if (typeof reward.cost === 'number') {
            const success = onPurchase(reward.cost);
            if (success) {
                setRedeemedReward(reward);
            }
        }
    };

  return (
    <div className="space-y-6 relative pb-8">
      <h1 className="font-display text-3xl font-bold text-text-primary">
        Rewards Store
      </h1>
      <Card className="text-center bg-gradient-to-r from-blue-50 to-pink-50 border-blue-100">
        <p className="text-lg text-text-secondary">You have</p>
        <p className="font-display font-bold text-5xl text-primary-blue my-2 drop-shadow-sm">{totalTokens}</p>
        <p className="text-lg text-text-secondary">tokens to spend!</p>
      </Card>
      
      <div className="grid grid-cols-2 gap-4 md:gap-6">
          {REWARDS.map(reward => (
              <RewardCard 
                key={reward.id} 
                reward={reward} 
                totalTokens={totalTokens}
                streakDays={streakDays}
                streakTarget={streakTarget}
                onPurchase={handlePurchaseClick}
              />
          ))}
      </div>

      {redeemedReward && (
          <ConfirmationModal 
            reward={redeemedReward} 
            onClose={() => setRedeemedReward(null)} 
          />
      )}
    </div>
  );
};

export default RewardsScreen;
