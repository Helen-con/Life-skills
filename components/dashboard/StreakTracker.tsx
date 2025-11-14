import React from 'react';
import Card from '../ui/Card';
import Icon from '../ui/Icon';

const StreakTracker: React.FC = () => {
  // FIX: Explicitly type mock data as number to avoid literal type comparison error.
  const streakDays: number = 4; // Mock data
  const totalDays: number = 7;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold font-display text-text-primary">Daily Streak</h2>
        <div className="flex items-center space-x-1 text-reward-amber">
            <Icon name="Award" className="w-5 h-5" />
            <span className="font-semibold">Reward</span>
        </div>
      </div>
      <p className="text-sm text-text-secondary mb-4">Complete 3 core habits daily to earn a reward.</p>
      
      <div className="flex justify-center items-center space-x-2 my-4">
        {Array.from({ length: totalDays }).map((_, index) => (
          <div
            key={index}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${index < streakDays ? 'bg-secondary-green' : 'bg-gray-200'}`}
          >
           {index < streakDays && <Icon name="CheckCircle" className="w-4 h-4 text-white" />}
          </div>
        ))}
      </div>
       <div className="mt-4 text-center">
         <p className="font-semibold text-text-primary">{streakDays} / {totalDays} days completed</p>
         {streakDays === totalDays && (
             <p className="text-sm text-reward-amber mt-2 font-medium animate-pulse">🎉 Streak complete! Curfew extension unlocked! 🎉</p>
         )}
      </div>
    </Card>
  );
};

export default StreakTracker;