import React from 'react';
import Card from '../ui/Card';

const ProgressRing: React.FC = () => {
    const progress = 75; // Mock percentage
    const radius = 50;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Card>
      <h2 className="text-xl font-bold font-display mb-4 text-text-primary">Weekly Progress</h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
             <svg
                height={radius * 2}
                width={radius * 2}
                >
                <circle
                    stroke="#E5E7EB"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke="#2563EB"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset, strokeLinecap: 'round' }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="transform -rotate-90 origin-center"
                />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    className="text-2xl font-bold fill-current text-primary-blue"
                >
                    {`${progress}%`}
                </text>
            </svg>
          </div>
          <div className="flex-1 text-center md:text-left">
              <p className="text-text-secondary">
              This week you’ve earned <span className="font-bold text-text-primary">12 tokens</span> and <span className="font-bold text-text-primary">3 daily completions</span>. That’s real progress.
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <p>✓ Education Attendance: 100%</p>
                <p>✓ Curfew Success: 80%</p>
                <p>✓ Healthy Meals: 90%</p>
              </div>
          </div>
      </div>
    </Card>
  );
};

export default ProgressRing;
