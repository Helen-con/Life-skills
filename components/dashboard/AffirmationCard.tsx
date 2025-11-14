import React from 'react';
import { AFFIRMATIONS } from '../../constants';
import Card from '../ui/Card';

const AffirmationCard: React.FC = () => {
  // Get a new affirmation each day, or randomly for now
  const affirmation = React.useMemo(() => AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)], []);

  return (
    <Card className="bg-gradient-to-br from-blue-100 to-purple-100 border-none">
      <div className="flex items-center space-x-4">
        <div className="text-3xl">{affirmation.icon}</div>
        <div>
          <p className="font-medium text-text-primary">{affirmation.text}</p>
        </div>
      </div>
    </Card>
  );
};

export default AffirmationCard;
