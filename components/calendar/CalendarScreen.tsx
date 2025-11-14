import React from 'react';
import { CALENDAR_EVENTS } from '../../constants';

const CalendarScreen: React.FC = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday

    const colorClasses = {
        routine: 'bg-primary-blue/20 text-primary-blue',
        completed: 'bg-secondary-green/20 text-secondary-green',
        finance: 'bg-reward-amber/20 text-reward-amber',
        reward: 'bg-brand-purple/20 text-brand-purple',
    };

    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDayOfMonth });

    return (
    <div className="space-y-6">
        <h1 className="font-display text-3xl font-bold text-text-primary">
            Calendar
        </h1>
        <div className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <button>&lt;</button>
                <h2 className="font-bold font-display text-xl">{today.toLocaleString('default', { month: 'long' })} {year}</h2>
                <button>&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center font-semibold text-text-secondary text-sm">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-1 mt-2">
                {emptyDays.map((_, index) => <div key={`empty-${index}`}></div>)}
                {calendarDays.map(day => {
                    const events = CALENDAR_EVENTS.filter(e => e.day === day);
                    return (
                        <div key={day} className="h-24 md:h-32 p-1 border border-gray-100 rounded-lg flex flex-col">
                            <span className="font-semibold text-sm">{day}</span>
                            <div className="flex-grow space-y-1 overflow-y-auto text-xs">
                                {events.map(event => (
                                    <div key={event.title} className={`${colorClasses[event.type]} p-1 rounded font-medium`}>
                                        {event.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
            {Object.entries(colorClasses).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full ${value.split(' ')[0]}`}></div>
                    <span className="capitalize text-sm text-text-secondary">{key}</span>
                </div>
            ))}
        </div>
    </div>
    );
};

export default CalendarScreen;
