import React from 'react';
import Card from '../ui/Card';
import Icon from '../ui/Icon';

const TokenWallet: React.FC = () => {
    const weeklyTokens = 12;
    const totalTokens = 85;

  return (
    <Card className="bg-primary-blue text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold font-display">Token Wallet</h2>
        <Icon name="Wallet" className="w-6 h-6" />
      </div>
      <div className="text-center">
        <p className="text-4xl font-bold font-display">{totalTokens}</p>
        <p className="text-sm opacity-80">Total Tokens Available</p>
      </div>
      <div className="mt-4 pt-4 border-t border-white/20 text-center">
          <p className="text-sm"><span className="font-bold">{weeklyTokens}</span> tokens earned this week</p>
      </div>
    </Card>
  );
};

export default TokenWallet;
