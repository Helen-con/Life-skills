
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
        ? 'bg-primary-blue text-white border-primary-blue shadow-sm'
        : 'bg-white text-text-secondary border-gray-200 hover:border-primary-blue'
    }`}
  >
    <Icon name={keyword.icon} className="w-5 h-5" />
    <span className="font-medium">{keyword.label}</span>
  </button>
);

const NonNegotiableItem: React.FC<{
  label: string;
  icon: string;
  isChecked: boolean;
  onToggle: () => void;
}> = ({ label, icon, isChecked, onToggle }) => (
  <div 
    onClick={onToggle}
    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
      isChecked 
        ? 'bg-primary-pink/10 border-primary-pink' 
        : 'bg-gray-50 border-transparent hover:border-gray-200'
    }`}
  >
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-full ${isChecked ? 'bg-primary-pink text-white' : 'bg-gray-200 text-gray-500'}`}>
        <Icon name={icon} className="w-5 h-5" />
      </div>
      <span className={`font-medium ${isChecked ? 'text-text-primary font-bold' : 'text-text-secondary'}`}>{label}</span>
    </div>
    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
      isChecked ? 'bg-primary-pink border-primary-pink' : 'border-gray-300'
    }`}>
      {isChecked && <Icon name="CheckCircle" className="w-4 h-4 text-white" />}
    </div>
  </div>
);

const CheckinScreen: React.FC = () => {
    const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set());
    const [nonNegotiables, setNonNegotiables] = useState({
      curfew: false,
      education: false,
      phone: false
    });

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

    const toggleNonNegotiable = (key: keyof typeof nonNegotiables) => {
      setNonNegotiables(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    };

    const allNonNegotiablesMet = Object.values(nonNegotiables).every(Boolean);

  return (
    <div className="space-y-6 pb-8">
      <h1 className="font-display text-3xl font-bold text-text-primary">
        Daily Check-in
      </h1>
      <p className="text-text-secondary">How are things going? Select any that apply. You'll earn tokens for checking in!</p>
      
      <Card className="border-l-4 border-primary-pink">
        <h2 className="text-xl font-bold font-display mb-2 text-text-primary">Non-Negotiables</h2>
        <p className="text-sm text-text-secondary mb-4">
          Hit these 3 targets for 7 days to earn <span className="font-bold text-primary-pink">1hr extra curfew</span>!
        </p>
        <div className="space-y-3">
          <NonNegotiableItem 
            label="Curfew Met" 
            icon="Moon" 
            isChecked={nonNegotiables.curfew} 
            onToggle={() => toggleNonNegotiable('curfew')} 
          />
          <NonNegotiableItem 
            label="Education Attended" 
            icon="School" 
            isChecked={nonNegotiables.education} 
            onToggle={() => toggleNonNegotiable('education')} 
          />
          <NonNegotiableItem 
            label="Phone Off (Sleep)" 
            icon="Smartphone" 
            isChecked={nonNegotiables.phone} 
            onToggle={() => toggleNonNegotiable('phone')} 
          />
        </div>
        {allNonNegotiablesMet && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center text-sm font-medium animate-bounce">
            ✨ Perfect day! Streak counts towards your reward! ✨
          </div>
        )}
      </Card>

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

      <button className="w-full bg-primary-pink text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg shadow-pink-300/50 hover:bg-secondary-pink transition-colors">
          Submit Check-in (+2 Tokens)
      </button>
    </div>
  );
};

export default CheckinScreen;
