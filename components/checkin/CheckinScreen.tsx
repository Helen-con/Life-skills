import React, { useState } from 'react';
import Card from '../ui/Card';
import Icon from '../ui/Icon';
import { CHECKIN_DATA } from '../../constants';
import { CheckinKeyword } from '../../types';

const CheckinChip: React.FC<{
  keyword: CheckinKeyword;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ keyword, isSelected, onSelect }) => (
  <button
    onClick={onSelect}
    className={`flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all duration-200 ${
      isSelected
        ? 'bg-primary-blue text-white border-primary-blue'
        : 'bg-white text-text-secondary border-gray-200 hover:border-primary-blue'
    }`}
  >
    <Icon name={keyword.icon} className="w-5 h-5" />
    <span className="font-medium">{keyword.label}</span>
  </button>
);


const CheckinScreen: React.FC = () => {
    const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set());

    const toggleKeyword = (id: string) => {
        setSelectedKeywords(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-text-primary">
        Daily Check-in
      </h1>
      <p className="text-text-secondary">How are things going? Select any that apply. You'll earn tokens for checking in!</p>
      
      {CHECKIN_DATA.map(category => (
          <Card key={category.title}>
              <h2 className="text-xl font-bold font-display mb-4 text-text-primary">{category.title}</h2>
              <div className="flex flex-wrap gap-3">
                  {category.keywords.map(keyword => (
                      <CheckinChip 
                        key={keyword.id}
                        keyword={keyword}
                        isSelected={selectedKeywords.has(keyword.id)}
                        onSelect={() => toggleKeyword(keyword.id)}
                      />
                  ))}
              </div>
          </Card>
      ))}

      <button className="w-full bg-secondary-green text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg hover:bg-secondary-green/90 transition-colors">
          Submit Check-in (+2 Tokens)
      </button>
    </div>
  );
};

export default CheckinScreen;
