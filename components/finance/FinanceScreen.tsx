import React, { useState } from 'react';
import Card from '../ui/Card';
import Icon from '../ui/Icon';

const FinanceCalculator: React.FC<{
    title: string,
    icon: string,
    children: React.ReactNode,
    description: string
}> = ({ title, icon, children, description }) => {
    return (
        <Card>
            <div className="flex items-start space-x-4">
                <div className="bg-reward-amber/20 p-3 rounded-full mt-1">
                    <Icon name={icon} className="w-6 h-6 text-reward-amber" />
                </div>
                <div>
                    <h2 className="text-xl font-bold font-display text-text-primary">{title}</h2>
                    <p className="text-text-secondary mb-4">{description}</p>
                    {children}
                </div>
            </div>
        </Card>
    );
};

const FinanceScreen: React.FC = () => {
    // State for calculators
    const [weeklyIncome, setWeeklyIncome] = useState(20);
    const [weeklySpending, setWeeklySpending] = useState(12);

    const [savingsGoal, setSavingsGoal] = useState(100);
    const [currentSavings, setCurrentSavings] = useState(30);

    const [itemCost, setItemCost] = useState(50);
    const [availableMoney, setAvailableMoney] = useState(40);
  
    return (
    <div className="space-y-6">
        <h1 className="font-display text-3xl font-bold text-text-primary">
            Finance Tools
        </h1>
        <p className="text-text-secondary">“Let’s work this out together. You’re doing great with your money understanding!”</p>
        
        <FinanceCalculator 
            title="Weekly Money"
            icon="Wallet"
            description="See what's left after your spending."
        >
            <div className="space-y-2">
                <label className="flex items-center">
                    <span className="w-24">Income: £</span>
                    <input type="number" value={weeklyIncome} onChange={e => setWeeklyIncome(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
                </label>
                <label className="flex items-center">
                    <span className="w-24">Spending: £</span>
                    <input type="number" value={weeklySpending} onChange={e => setWeeklySpending(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
                </label>
                <div className="pt-2 text-lg font-bold">Leftover: <span className="text-secondary-green">£{weeklyIncome - weeklySpending}</span></div>
            </div>
        </FinanceCalculator>

        <FinanceCalculator 
            title="Savings Goal"
            icon="Target"
            description="Track how close you are to your goal."
        >
             <div className="space-y-2">
                <label className="flex items-center">
                    <span className="w-24">Goal: £</span>
                    <input type="number" value={savingsGoal} onChange={e => setSavingsGoal(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
                </label>
                <label className="flex items-center">
                    <span className="w-24">Saved: £</span>
                    <input type="number" value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
                </label>
                <div className="pt-2 text-lg font-bold">Still to save: <span className="text-reward-amber">£{Math.max(0, savingsGoal - currentSavings)}</span></div>
            </div>
        </FinanceCalculator>
        
        <FinanceCalculator 
            title="Can I Afford It?"
            icon="DollarSign"
            description="Check if you have enough for something you want."
        >
             <div className="space-y-2">
                <label className="flex items-center">
                    <span className="w-24">Item Cost: £</span>
                    <input type="number" value={itemCost} onChange={e => setItemCost(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
                </label>
                <label className="flex items-center">
                    <span className="w-24">You Have: £</span>
                    <input type="number" value={availableMoney} onChange={e => setAvailableMoney(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
                </label>
                <div className="pt-2 text-lg font-bold">
                    {availableMoney >= itemCost 
                        ? <span className="text-secondary-green">Yes, you can afford it!</span>
                        : <span className="text-reward-amber">Not yet, you need £{itemCost - availableMoney} more.</span>
                    }
                </div>
            </div>
        </FinanceCalculator>
    </div>
    );
};

export default FinanceScreen;
