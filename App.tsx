<<<<<<< HEAD
import React, { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged, 
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  onSnapshot, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit,
  serverTimestamp,
  where
} from 'firebase/firestore';
import { 
  Home, Heart, Plus, Gift, DollarSign, LogOut, 
  BookOpen, Moon, Coffee, Check, 
  Utensils, Calendar as CalendarIcon, Smile, CheckCircle, Award,
  ChevronRight, ChevronDown, Star, ShoppingBag,
  Map, Lock, UserCheck, Trophy, Bell, Users, ArrowRight,
  ExternalLink, Briefcase, Key, Zap, List, Grid, LogIn
} from 'lucide-react';

// --- CONSTANTS & MOCK DATA ---

const TOKEN_ACTIONS = {
  'phone_off': { label: "Phone Off (Sleep) 🌙", value: 5, color: 'bg-indigo-100' },
  'meeting': { label: "Attended Meeting 🤝", value: 5, color: 'bg-teal-100' },
  'wash_ind': { label: "Washing done 🧺", value: 2, color: 'bg-blue-100' },
  'family_time': { label: "Family Time 👨‍👩‍👧", value: 1, color: 'bg-pink-100' },
  'friend_time': { label: "Friends 👯‍♀️", value: 1, color: 'bg-purple-100' },
  'recreation': { label: "Fun Activity 🎨", value: 2, color: 'bg-orange-100' },
  'extra_study': { label: "Study Session 📚", value: 3, color: 'bg-yellow-100' },
  'tidy_room': { label: "Tidy Room 🧹", value: 3, color: 'bg-green-100' },
  'cook_meal': { label: "Cooked Meal 🍳", value: 2, color: 'bg-red-100' },
  'appointment': { label: "Appointment 🏥", value: 2, color: 'bg-cyan-100' },
  'self_care': { label: "Self Care 🧖‍♀️", value: 2, color: 'bg-rose-100' },
};

const DEFAULT_REWARDS = [
  { id: 'r1', name: "Choose Dinner 🍕", description: "You pick the menu!", token_cost: 8 },
  { id: 'r5', name: "£5 Shopping Voucher 🛍️", description: "Save up for something nice.", token_cost: 30 },
  { id: 'r6', name: "£10 Housing Pot 🏠", description: "Invest in your future pad!", token_cost: 60 },
  { id: 'r-streak', name: "30m Extra Curfew 🌙", description: "Fri/Sat bonus for 7-day streak!", token_cost: 0, is_streak_reward: true },
];

const PREP_IDEAS = [
  { title: "Overnight Oats 🍓", desc: "Oats + Milk + Fruit in a jar. Leave in fridge!", time: "5 mins" },
  { title: "Chicken Wraps 🌯", desc: "Cook chicken batch, use all week for lunch.", time: "20 mins" },
  { title: "Veggie Pasta 🍝", desc: "Roast tray of veggies, mix with pasta sauce.", time: "30 mins" },
  { title: "Fruit Pots 🥝", desc: "Chop melon/grapes into grab-and-go tubs.", time: "10 mins" },
];

const MASTERY_CATEGORIES = {
  kitchen: { label: "Cooking Queen 🍳", color: "bg-orange-400", max: 10 },
  money: { label: "Money Master 💸", color: "bg-green-400", max: 10 },
  routine: { label: "Routine Rock 📅", color: "bg-blue-400", max: 10 },
  self: { label: "Self-Care Star ✨", color: "bg-pink-400", max: 10 },
};

const LEARNING_GUIDES = [
  { id: 'l1', title: "Housing 101 🏠", desc: "Tenancy agreements, bills & moving out.", icon: Key, color: 'bg-sky-100 text-sky-600' },
  { id: 'l2', title: "Money Moves 💸", desc: "Budgeting, saving & paying rent.", icon: DollarSign, color: 'bg-green-100 text-green-600' },
  { id: 'l3', title: "Job Hunt 💼", desc: "CVs, interviews & workplace skills.", icon: Briefcase, color: 'bg-purple-100 text-purple-600' },
  { id: 'l4', title: "Wellbeing 🧠", desc: "Managing stress & finding support.", icon: Heart, color: 'bg-pink-100 text-pink-600' },
];

// --- UTILS ---
const getTodayDateString = () => new Date().toISOString().split('T')[0];

// --- CONTEXTS ---
const AppContext = createContext(null);

// --- MAIN COMPONENT ---
export default function App() {
  const [mode, setMode] = useState('loading');
  const [appSection, setAppSection] = useState('landing');
  const [familyId, setFamilyId] = useState(null); // Shared ID for data syncing
  const [user, setUser] = useState(null);
  const [data, setData] = useState({
    habitDays: {},
    tokenEvents: [],
    tokenWallet: { balance: 0, lifetime_earned: 0 },
    meals: { mon: '', tue: '', wed: '', thu: '', fri: '', sat: '', sun: '' },
    budget: { savings: 15.50, goal: 100, history: [] },
    mastery: { kitchen: 2, money: 1, routine: 3, self: 2 },
    evidenceLog: [],
    rewards: DEFAULT_REWARDS,
    notifications: [],
    appointments: [], 
  });

  // --- INITIALIZATION ---
  useEffect(() => {
    let isMounted = true;
    
    // HARDCODED CONFIGURATION
    const firebaseConfig = {
      apiKey: "AIzaSyBJrHP7owYIaVtJeVuq35YMycOd7CZZdT8",
      authDomain: "flutter-ai-playground-e9352.firebaseapp.com",
      projectId: "flutter-ai-playground-e9352",
      storageBucket: "flutter-ai-playground-e9352.firebasestorage.app",
      messagingSenderId: "555553437378",
      appId: "1:555553437378:web:fc555c6c5cadbf39572d5b"
    };

    // If we have a family ID, we connect to THAT specific data pot
    const connectToData = async (uid, fid) => {
        try {
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            const appId = 'katies-portfolio-v1'; // Static app ID for data path
            
            // Use Family ID if provided, otherwise fallback to User ID (Demo mode)
            const targetId = fid || uid; 
            setupLiveData(db, targetId, appId);
            setMode('firebase');
        } catch (err) {
            console.error("Connection error:", err);
            setupDemoMode();
        }
    };

    const initAuth = async () => {
      try {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        await setPersistence(auth, browserLocalPersistence);
        
        onAuthStateChanged(auth, async (fbUser) => {
           if (!isMounted) return;
           if (fbUser) {
             setUser(fbUser);
             // Wait for Family ID to be entered on Landing Page before connecting data
             if (familyId) {
                 connectToData(fbUser.uid, familyId);
             } else {
                 setMode('landing'); // Show landing to ask for ID
             }
           } else {
             signInAnonymously(auth).catch(() => setupDemoMode());
           }
        });
      } catch (err) { 
        console.error("Init Error:", err);
        setupDemoMode(); 
      }
    };

    initAuth();
    return () => { isMounted = false; };
  }, [familyId]);

  const setupDemoMode = () => {
    setMode('demo');
    setUser({ uid: 'demo-user', displayName: 'Katie' });
    const today = new Date();
    setData(prev => ({
      ...prev,
      tokenWallet: { balance: 24, lifetime_earned: 80 },
      tokenEvents: [
        { id: 'e1', label: 'Did washing independently', value: 2, date: new Date() }
      ],
      evidenceLog: [
        { id: 'ev1', category: 'kitchen', note: "Cooked pasta sauce from scratch!", date: new Date() }
      ],
      appointments: [
        { id: 'apt1', title: 'Housing Meeting', date: today.toISOString().split('T')[0], time: '14:00', type: 'pro' }
      ]
    }));
  };

  const setupLiveData = (db, userId, appId) => {
    // We use the Family ID as the "User ID" in the path to share data
    const userPath = `artifacts/${appId}/users/${userId}`;
    
    const safeSnapshot = (ref, field) => {
        onSnapshot(ref, (snap) => {
            if (field === 'tokenWallet' && snap.exists()) {
                setData(prev => ({ ...prev, tokenWallet: snap.data() }));
            } else if (field !== 'tokenWallet') {
                const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                // Special handling for coreHabitDays which is an object map
                if (field === 'coreHabitDays') {
                    const habits = {};
                    snap.forEach(d => habits[d.id] = d.data());
                    setData(prev => ({ ...prev, habitDays: habits }));
                } else {
                    setData(prev => ({ ...prev, [field]: items }));
                }
            }
        }, (error) => {
            console.log(`Snapshot error for ${field}:`, error);
        });
    };

    safeSnapshot(collection(db, userPath, 'coreHabitDays'), 'coreHabitDays');
    safeSnapshot(doc(db, userPath, 'tokenWallet', 'main'), 'tokenWallet');
    
    // Simple queries without complex ordering to avoid index errors in dev
    safeSnapshot(collection(db, userPath, 'notifications'), 'notifications');
    safeSnapshot(collection(db, userPath, 'appointments'), 'appointments');
    safeSnapshot(collection(db, userPath, 'evidenceLog'), 'evidenceLog');
  };

  // --- ACTIONS ---
  const toggleHabit = (habitKey) => {
    const today = getTodayDateString();
    const current = data.habitDays[today] || {};
    const updatedDay = { ...current, [habitKey]: !current[habitKey] };
    setData(prev => ({ ...prev, habitDays: { ...prev.habitDays, [today]: updatedDay } }));
    
    // In a real app, we'd write to Firebase here:
    // if (mode === 'firebase') setDoc(doc(db, ...), updatedDay);
  };

  const addToken = (key) => {
    const action = TOKEN_ACTIONS[key];
    setData(prev => ({
      ...prev,
      tokenWallet: { ...prev.tokenWallet, balance: prev.tokenWallet.balance + action.value } 
    }));
  };

  const updateMeal = (day, val) => {
    setData(prev => ({ ...prev, meals: { ...prev.meals, [day]: val } }));
  };

  const updateSavings = (amount) => {
    setData(prev => ({ 
      ...prev, 
      budget: { ...prev.budget, savings: prev.budget.savings + amount } 
    }));
  };

  const addEvidence = (category, note, rewardTokens) => {
    const newLevel = Math.min((data.mastery[category] || 0) + 1, MASTERY_CATEGORIES[category].max);
    const newBalance = data.tokenWallet.balance + (rewardTokens || 0);
    const newLog = { id: Date.now(), category, note, date: new Date(), tokens: rewardTokens };

    setData(prev => ({
      ...prev,
      mastery: { ...prev.mastery, [category]: newLevel },
      tokenWallet: { ...prev.tokenWallet, balance: newBalance },
      evidenceLog: [newLog, ...prev.evidenceLog]
    }));
  };

  const grantReward = (reward) => {
    const newNotification = {
      id: Date.now(),
      text: `Your carer granted you: ${reward.name} 🎉`,
      date: new Date(),
      isRead: false
    };
    
    const newLog = { 
      id: Date.now() + 1, 
      category: 'self', 
      note: `Reward Granted: ${reward.name}`, 
      date: new Date(), 
      tokens: 0 
    };

    setData(prev => ({
      ...prev,
      notifications: [newNotification, ...prev.notifications],
      evidenceLog: [newLog, ...prev.evidenceLog]
    }));
  };

  const addAppointment = (title, date, time) => {
    const newApt = { id: Date.now(), title, date, time, type: 'user' };
    setData(prev => ({ ...prev, appointments: [...prev.appointments, newApt] }));
  };

  const clearNotifications = () => {
    setData(prev => ({ ...prev, notifications: [] }));
  };

  if (mode === 'loading') return <LoadingScreen />;

  return (
    <AppContext.Provider value={{ 
      user, data, toggleHabit, addToken, updateMeal, updateSavings, addEvidence, grantReward, clearNotifications, addAppointment,
      appSection, setAppSection, setFamilyId
    }}>
      <div className={`max-w-md mx-auto min-h-screen pb-24 font-sans text-slate-700 transition-colors duration-500 ${appSection === 'carer' ? 'bg-slate-100' : 'bg-gradient-to-br from-sky-50 via-white to-pink-50'}`}>
        {mode === 'landing' ? <LandingPage /> : (
          <>
            <Header />
            <MainRouter />
            <BottomNav />
          </>
        )}
      </div>
    </AppContext.Provider>
  );
}

// --- COMPONENTS ---

const LoadingScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50">
    <div className="w-12 h-12 border-4 border-sky-200 border-t-pink-400 rounded-full animate-spin mb-4"></div>
    <p className="text-sky-400 font-medium">Loading...</p>
  </div>
);

const LandingPage = () => {
  const { setAppSection, setFamilyId } = useContext(AppContext);
  const [code, setCode] = useState('');
  
  const handleLogin = (e) => {
      e.preventDefault();
      if(code.trim().length > 0) {
          // This ID will be used as the data path, allowing multiple devices to sync
          setFamilyId(code.trim().toLowerCase());
      }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-pink-100 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-sky-100 rounded-full blur-3xl -z-10"></div>

      <div className="mb-8">
        <div className="bg-white p-4 rounded-3xl shadow-lg inline-block mb-4 rotate-3">
          <Home size={48} className="text-sky-500" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
          Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-pink-400">Independence</span>
        </h1>
        <p className="text-slate-500 text-sm max-w-xs mx-auto mb-6">
          Enter your family ID to access your shared space.
        </p>
        
        <form onSubmit={handleLogin} className="w-full max-w-xs mx-auto mb-8 relative">
            <input 
                type="text" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter Family ID (e.g. katie1)" 
                className="w-full p-4 pr-12 rounded-2xl border-2 border-sky-100 outline-none focus:border-sky-400 transition-colors text-center font-bold text-lg"
            />
            <button type="submit" className="absolute right-2 top-2 bg-sky-500 text-white p-2 rounded-xl shadow-md hover:bg-sky-600">
                <LogIn size={20} />
            </button>
        </form>
      </div>
    </div>
  );
};

// Header, Router, Dashboard, etc. components remain largely the same, 
// just ensuring they are rendered only after login (mode !== landing)

const Header = () => {
  const { appSection, setAppSection, setFamilyId } = useContext(AppContext);
  
  return (
    <header className="px-6 pt-6 pb-2 flex justify-between items-center bg-transparent">
      <div>
        <h1 className="text-xl font-extrabold text-sky-500 tracking-tight">
          {appSection === 'carer' ? "Carer" : "Katie's"} <span className="text-pink-400">{appSection === 'carer' ? "Hub" : "World"}</span> {appSection === 'carer' ? "🛡️" : "🌸"}
        </h1>
      </div>
      <div className="flex gap-2">
          {appSection === 'landing' ? null : (
             <button onClick={() => appSection === 'katie' ? setAppSection('carer') : setAppSection('katie')} className="text-xs font-bold text-slate-400 hover:text-sky-500 flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
               {appSection === 'katie' ? 'Carer View' : 'Katie View'}
             </button>
          )}
          <button onClick={() => window.location.reload()} className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
            <LogOut size={12} />
          </button>
      </div>
    </header>
  );
};

const MainRouter = () => {
  const { appSection } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('home');
  
  useEffect(() => {
    window.setActiveTab = setActiveTab;
    return () => delete window.setActiveTab;
  }, []);

  // If we just logged in, default to Katie view first, but LandingPage handles routing to specific sections? 
  // Actually, let's default to Dashboard if logged in.
  
  if (appSection === 'carer') return <CarerView />;

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return <Dashboard />;
      case 'path': return <IndependencePathView />;
      case 'calendar': return <CalendarView />;
      case 'lifestyle': return <HealthyLifestyleView />;
      case 'rewards': return <RewardsView />;
      default: return <Dashboard />;
    }
  };

  return <main className="p-4 animate-fade-in">{renderContent()}</main>;
};

// 1. DASHBOARD
const Dashboard = () => {
  const { data, toggleHabit, clearNotifications } = useContext(AppContext);
  const today = getTodayDateString();
  const habits = data.habitDays[today] || {};
  const streakCount = 3;
  const unreadCount = data.notifications.length;

  return (
    <div className="space-y-6">
      {unreadCount > 0 && (
        <div onClick={clearNotifications} className="bg-amber-100 text-amber-800 p-3 rounded-xl flex items-center justify-between shadow-sm cursor-pointer animate-pulse">
          <div className="flex items-center gap-2"><Bell size={18} className="fill-amber-800" /><span className="text-xs font-bold">You have {unreadCount} new notification{unreadCount > 1 ? 's' : ''}!</span></div>
          <span className="text-[10px] underline">Dismiss</span>
        </div>
      )}

      <div className="bg-white p-5 rounded-3xl shadow-sm border-2 border-pink-100 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 bg-pink-50 w-20 h-20 rounded-full z-0"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Star size={18} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">Daily Vibe</span>
          </div>
          <p className="text-lg font-medium text-slate-600 italic leading-relaxed">"Your effort today is building a stronger tomorrow. ✨"</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-3 px-1">
          <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">Daily Goals 🎯</h2>
          <span className="text-xs font-bold text-sky-500 bg-sky-50 px-2 py-1 rounded-lg">🔥 {streakCount} Day Streak</span>
        </div>
        <div className="space-y-3">
          <HabitCard label="Education" sub="School/College" icon={BookOpen} color="sky" active={habits.attended_education} onClick={() => toggleHabit('attended_education')} />
          <HabitCard label="Curfew" sub="Home on time" icon={Moon} color="indigo" active={habits.met_curfew} onClick={() => toggleHabit('met_curfew')} />
          <HabitCard label="Healthy Eat" sub="3 meals + water" icon={Utensils} color="pink" active={habits.healthy_meals} onClick={() => toggleHabit('healthy_meals')} />
        </div>
        <div className="mt-3 bg-indigo-50 border border-indigo-100 p-3 rounded-xl flex items-center gap-3">
          <Moon size={20} className="text-indigo-500" />
          <p className="text-xs text-indigo-800 font-medium"><span className="font-bold">Goal:</span> Hit a 7-day streak to unlock <span className="underline">30 mins Extra Curfew</span> this weekend! 🌙</p>
        </div>
      </div>
=======

import React, { useState } from 'react';
import BottomNav from './components/layout/BottomNav';
import DashboardScreen from './components/dashboard/DashboardScreen';
import CheckinScreen from './components/checkin/CheckinScreen';
import RewardsScreen from './components/rewards/RewardsScreen';
import CalendarScreen from './components/calendar/CalendarScreen';
import FinanceScreen from './components/finance/FinanceScreen';
import { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'check-in':
        return <CheckinScreen />;
      case 'rewards':
        return <RewardsScreen />;
      case 'calendar':
        return <CalendarScreen />;
      case 'finance':
        return <FinanceScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="bg-background min-h-screen font-sans text-text-primary">
      <div className="container mx-auto max-w-2xl p-4 pb-24">
        {renderContent()}
      </div>
      <BottomNav activePage={activePage} setActivePage={setActivePage} />
>>>>>>> c78b83e18910b82c000b22abfa50a12cb7e5d160
    </div>
  );
};

<<<<<<< HEAD
const HabitCard = ({ label, sub, icon: Icon, active, onClick, color }) => {
  const colors = { sky: active ? 'bg-sky-100 border-sky-300' : 'bg-white border-slate-100', indigo: active ? 'bg-indigo-100 border-indigo-300' : 'bg-white border-slate-100', pink: active ? 'bg-pink-100 border-pink-300' : 'bg-white border-slate-100' };
  const iconColors = { sky: active ? 'text-sky-600' : 'text-slate-300', indigo: active ? 'text-indigo-600' : 'text-slate-300', pink: active ? 'text-pink-600' : 'text-slate-300' };
  return (
    <button onClick={onClick} className={`w-full flex items-center p-4 rounded-2xl border-2 transition-all duration-300 active:scale-95 ${colors[color]} shadow-sm`}>
      <div className={`mr-4 ${iconColors[color]} transition-colors`}><Icon size={28} /></div>
      <div className="flex-grow text-left"><h3 className={`font-bold text-base ${active ? 'text-slate-800' : 'text-slate-500'}`}>{label}</h3><p className="text-xs text-slate-400">{sub}</p></div>
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${active ? 'bg-white border-transparent' : 'border-slate-200'}`}>{active && <Check size={14} className="text-green-500" strokeWidth={4} />}</div>
    </button>
  );
};

// 2. INDEPENDENCE PATH VIEW
const IndependencePathView = () => {
  const { data } = useContext(AppContext);
  const [view, setView] = useState('tracker'); 

  return (
    <div className="pb-20">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-extrabold text-slate-700 flex items-center justify-center gap-2">My Path 🏠</h2>
        <p className="text-sm text-slate-400">Level up your skills for independence!</p>
      </div>

      <div className="flex p-1 bg-white rounded-xl mb-6 shadow-sm border border-slate-100">
        <button onClick={() => setView('tracker')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${view === 'tracker' ? 'bg-sky-100 text-sky-600' : 'text-slate-400'}`}>Skill Tracker 📊</button>
        <button onClick={() => setView('guide')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${view === 'guide' ? 'bg-purple-100 text-purple-600' : 'text-slate-400'}`}>Indep. Guide 📖</button>
      </div>

      {view === 'tracker' ? (
        <div className="space-y-5">
          {Object.entries(MASTERY_CATEGORIES).map(([key, cat]) => {
            const level = data.mastery[key] || 0;
            const pct = (level / cat.max) * 100;
            return (
              <div key={key} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-slate-700">{cat.label}</h3>
                  <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded-md text-slate-500">Lvl {level}/{cat.max}</span>
                </div>
                <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden"><div className={`absolute top-0 left-0 h-full ${cat.color} transition-all duration-1000`} style={{ width: `${pct}%` }}></div></div>
                <p className="text-[10px] text-slate-400 mt-2 text-right italic">{level === cat.max ? "Mastered! 🏆" : "Keep gathering evidence!"}</p>
              </div>
            );
          })}
          <div className="mt-8 bg-sky-50 p-4 rounded-2xl border border-sky-100">
            <h4 className="font-bold text-sky-700 mb-2 text-sm">Recent Evidence 📸</h4>
            <div className="space-y-2">
              {data.evidenceLog.length > 0 ? data.evidenceLog.slice(0, 3).map((log) => (
                <div key={log.id} className="bg-white p-2 rounded-xl text-xs flex justify-between items-center">
                  <span className="text-slate-600">{log.note}</span>
                  {log.tokens > 0 && <span className="text-amber-500 font-bold">+{log.tokens} 🟡</span>}
                </div>
              )) : <p className="text-xs text-sky-400 italic">No evidence logged yet.</p>}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {LEARNING_GUIDES.map(guide => (
            <div key={guide.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className={`p-3 rounded-xl ${guide.color}`}><guide.icon size={24} /></div>
              <div>
                <h3 className="font-bold text-slate-700">{guide.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{guide.desc}</p>
                <button className="mt-2 text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">Read More...</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 3. CALENDAR VIEW
const CalendarView = () => {
  const { data, addAppointment } = useContext(AppContext);
  const [viewMode, setViewMode] = useState('list'); 
  const [showForm, setShowForm] = useState(false);
  const [aptTitle, setAptTitle] = useState('');
  const [aptDate, setAptDate] = useState(getTodayDateString());
  const [aptTime, setAptTime] = useState('12:00');

  const today = new Date();
  
  const handleAdd = (e) => {
    e.preventDefault();
    addAppointment(aptTitle, aptDate, aptTime);
    setShowForm(false);
    setAptTitle('');
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; 
  };

  const renderMonthView = () => {
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const startDay = getFirstDayOfMonth(currentYear, currentMonth);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const empties = Array.from({ length: startDay }, (_, i) => i);

    return (
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-700">{today.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</h3>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['M','T','W','T','F','S','S'].map(d => <span key={d} className="text-xs font-bold text-slate-300">{d}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {empties.map(i => <div key={`empty-${i}`} className="h-10"></div>)}
          {daysArray.map(day => {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasApt = data.appointments.some(a => a.date === dateStr);
            const hasAchieve = data.evidenceLog.some(e => e.date.toISOString().split('T')[0] === dateStr);
            
            return (
              <div key={day} className={`h-10 rounded-lg flex flex-col items-center justify-center text-xs font-medium ${dateStr === getTodayDateString() ? 'bg-sky-100 text-sky-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                {day}
                <div className="flex gap-0.5 mt-0.5">
                  {hasApt && <div className="w-1 h-1 bg-blue-500 rounded-full"></div>}
                  {hasAchieve && <div className="w-1 h-1 bg-amber-400 rounded-full"></div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d);
    }

    return (
      <div className="space-y-3">
        {dates.map((date, i) => {
          const dateStr = date.toISOString().split('T')[0];
          const apts = data.appointments.filter(a => a.date === dateStr);
          
          return (
            <div key={i} className={`bg-white p-4 rounded-2xl border ${i===0 ? 'border-sky-200 bg-sky-50' : 'border-slate-100'} shadow-sm`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-bold uppercase text-slate-400">{date.toLocaleDateString('en-GB', { weekday: 'short' })}</span>
                  <h4 className="text-lg font-bold text-slate-700">{date.getDate()} {date.toLocaleDateString('en-GB', { month: 'short' })}</h4>
                </div>
              </div>
              {apts.length > 0 ? (
                <div className="space-y-2">
                  {apts.map(apt => (
                    <div key={apt.id} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${apt.type === 'pro' ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
                      <span className="font-bold text-slate-600">{apt.time}</span>
                      <span className="text-slate-500 truncate">{apt.title}</span>
                    </div>
                  ))}
                </div>
              ) : <p className="text-xs text-slate-300 italic">No events</p>}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="pb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2">My Calendar 📅</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-sky-500 text-white p-2 rounded-full shadow-md hover:bg-sky-600 transition-colors"><Plus size={20} /></button>
      </div>

      <div className="flex bg-white p-1 rounded-xl mb-6 shadow-sm border border-slate-100">
        <button onClick={() => setViewMode('list')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${viewMode === 'list' ? 'bg-sky-100 text-sky-600' : 'text-slate-400'}`}>
          <List size={16} /> Agenda
        </button>
        <button onClick={() => setViewMode('month')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${viewMode === 'month' ? 'bg-sky-100 text-sky-600' : 'text-slate-400'}`}>
          <Grid size={16} /> Month
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-4 rounded-2xl shadow-md border border-sky-100 mb-6 animate-fade-in">
          <h3 className="text-sm font-bold text-slate-600 mb-3">Add Appointment</h3>
          <input type="text" value={aptTitle} onChange={e => setAptTitle(e.target.value)} placeholder="Event Title" className="w-full p-2 mb-2 bg-slate-50 rounded-lg text-sm outline-none" required />
          <div className="flex gap-2 mb-3">
            <input type="date" value={aptDate} onChange={e => setAptDate(e.target.value)} className="flex-1 p-2 bg-slate-50 rounded-lg text-sm outline-none" required />
            <input type="time" value={aptTime} onChange={e => setAptTime(e.target.value)} className="flex-1 p-2 bg-slate-50 rounded-lg text-sm outline-none" required />
          </div>
          <button type="submit" className="w-full bg-sky-500 text-white font-bold py-2 rounded-lg text-sm">Add Event</button>
        </form>
      )}

      {viewMode === 'list' ? renderListView() : renderMonthView()}
    </div>
  );
};

// 4. HEALTHY LIFESTYLE VIEW
const HealthyLifestyleView = () => {
  const { data, updateMeal } = useContext(AppContext);
  const [tab, setTab] = useState('planner'); 

  return (
    <div className="pb-20">
      <h2 className="text-xl font-bold text-slate-700 mb-4 flex items-center gap-2">Healthy Lifestyle 🥑</h2>
      
      <button 
        onClick={() => window.open("https://www.bbcgoodfood.com/recipes/collection/student-recipes", "_blank")}
        className="w-full bg-orange-100 p-4 rounded-2xl border border-orange-200 mb-6 flex items-center justify-between group hover:bg-orange-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl text-orange-500 shadow-sm"><Utensils size={20} /></div>
          <div><h3 className="font-bold text-orange-800 text-sm">Tasty & Simple Recipes</h3><p className="text-xs text-orange-600">Click to view student meals! 🍜</p></div>
        </div>
        <ExternalLink size={18} className="text-orange-400 group-hover:scale-110 transition-transform" />
      </button>

      <div className="flex p-1 bg-white rounded-xl mb-6 shadow-sm border border-slate-100">
        <button onClick={() => setTab('planner')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'planner' ? 'bg-green-100 text-green-600' : 'text-slate-400'}`}>Meal Planner 📅</button>
        <button onClick={() => setTab('prep')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'prep' ? 'bg-orange-100 text-orange-600' : 'text-slate-400'}`}>Prep Ideas 🔪</button>
      </div>
      
      {tab === 'planner' ? (
        <div className="space-y-3">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="bg-sky-50 text-sky-500 font-bold text-xs w-10 h-10 flex items-center justify-center rounded-xl">{day}</div>
              <input type="text" placeholder="What's for dinner?" value={data.meals[day.toLowerCase()] || ''} onChange={(e) => updateMeal(day.toLowerCase(), e.target.value)} className="flex-grow bg-transparent text-sm text-slate-700 placeholder-slate-300 outline-none" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {PREP_IDEAS.map((idea, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-orange-50 shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 bg-orange-100 w-16 h-16 rounded-bl-full opacity-50"></div>
              <h3 className="font-bold text-slate-700">{idea.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{idea.desc}</p>
              <div className="mt-3 inline-flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg"><span className="text-xs font-bold text-slate-500">⏱️ {idea.time}</span></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 5. REWARDS VIEW
const RewardsView = () => {
  const { data } = useContext(AppContext);
  return (
    <div className="pb-20">
      <div className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center border border-amber-100 mb-6 sticky top-0 z-10">
        <span className="font-bold text-slate-500 uppercase text-xs tracking-wider">Your Stash</span>
        <div className="flex items-center gap-2"><Award className="text-amber-400 fill-amber-400" size={24} /><span className="text-3xl font-black text-slate-700">{data.tokenWallet.balance}</span></div>
      </div>
      <h2 className="text-xl font-bold text-slate-700 mb-4">Rewards Store 🛍️</h2>
      <div className="space-y-3">
        {data.rewards.map(r => (
          <div key={r.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${r.is_streak_reward ? 'bg-green-100 text-green-500' : 'bg-pink-100 text-pink-500'}`}><Gift size={24} /></div>
            <div className="flex-grow"><h3 className="font-bold text-slate-700 text-sm">{r.name}</h3><p className="text-xs text-slate-400 mt-0.5">{r.description}</p></div>
            <button disabled={data.tokenWallet.balance < r.token_cost} className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${data.tokenWallet.balance >= r.token_cost ? 'bg-sky-500 text-white hover:bg-sky-600 shadow-md shadow-sky-200' : 'bg-slate-100 text-slate-400'}`}>{r.token_cost === 0 ? 'Unlock' : r.token_cost}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// 6. CARER VIEW
const CarerView = () => {
  const { addEvidence, grantReward, data } = useContext(AppContext);
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('kitchen');
  const [tokens, setTokens] = useState(0);
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note) return;
    addEvidence(category, note, parseInt(tokens));
    setMsg("Evidence logged & rewards sent!");
    setNote('');
    setTokens(0);
    setTimeout(() => setMsg(''), 3000);
  };

  const handleInstantReward = (reward) => {
    grantReward(reward);
    setMsg(`Granted: ${reward.name}. Notification sent! 🔔`);
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="pb-20 p-4">
      <div className="bg-slate-800 text-white p-4 rounded-2xl mb-6 shadow-lg">
        <h2 className="font-bold text-lg flex items-center gap-2"><UserCheck size={20} /> Carer Hub</h2>
        <p className="text-xs text-slate-400 mt-1">Log evidence of independence skills and instantly grant rewards to Katie.</p>
      </div>

      {msg && <div className="bg-green-100 text-green-800 p-3 rounded-xl mb-4 text-sm font-bold text-center shadow-sm">{msg}</div>}

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4 mb-6">
        <h3 className="font-bold text-slate-700 flex items-center gap-2"><Gift size={18} className="text-pink-500"/> Grant Rewards</h3>
        <div className="grid grid-cols-2 gap-2">
          {data.rewards.map(r => (
            <button key={r.id} onClick={() => handleInstantReward(r)} className="text-left bg-slate-50 p-3 rounded-xl border border-slate-200 hover:bg-pink-50 hover:border-pink-200 transition-colors">
              <p className="font-bold text-xs text-slate-700">{r.name}</p>
              <p className="text-[10px] text-slate-400 mt-1">Send Notification</p>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h3 className="font-bold text-slate-700">Add Evidence Log 📝</h3>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Skill Category</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(MASTERY_CATEGORIES).map(([key, cat]) => (
              <button key={key} type="button" onClick={() => setCategory(key)} className={`text-xs py-2 px-3 rounded-lg border font-medium text-left ${category === key ? 'bg-slate-800 text-white border-slate-800' : 'bg-white border-slate-200 text-slate-500'}`}>{cat.label}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Evidence Note</label>
          <input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="e.g., Cooked a full meal without help..." className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-slate-400" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Bonus Tokens (Optional)</label>
          <div className="flex gap-2">
            {[0, 2, 5, 10].map(val => (
              <button key={val} type="button" onClick={() => setTokens(val)} className={`flex-1 py-2 rounded-lg font-bold text-sm border ${tokens === val ? 'bg-amber-100 border-amber-300 text-amber-600' : 'bg-white border-slate-200 text-slate-400'}`}>+{val}</button>
            ))}
          </div>
        </div>
        <button type="submit" className="w-full bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-900 transition-colors">Save to Tracker</button>
      </form>
    </div>
  );
};

// --- BOTTOM NAV ---
const BottomNav = () => {
  const { appSection } = useContext(AppContext);
  const [active, setActive] = useState('home');
  const handleNav = (tab) => { setActive(tab); if(window.setActiveTab) window.setActiveTab(tab); };

  if (appSection === 'carer') return null; 

  const NavItem = ({ id, icon: Icon, label, special }) => (
    <button onClick={() => handleNav(id)} className={`flex flex-col items-center justify-center w-full py-2 transition-colors ${active === id ? 'text-pink-500' : 'text-slate-300'}`}>
      {special ? <div className="bg-sky-500 text-white p-3 rounded-2xl -mt-8 shadow-lg border-4 border-white hover:scale-105 transition-transform"><Icon size={24} /></div> : <Icon size={24} strokeWidth={active === id ? 2.5 : 2} />}
      <span className="text-[10px] font-bold mt-1">{label}</span>
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-100 max-w-md mx-auto flex justify-between px-4 pb-safe z-30 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
      <NavItem id="home" icon={Home} label="Home" />
      <NavItem id="path" icon={Map} label="Path" />
      <NavItem id="calendar" icon={CalendarIcon} label="Calendar" />
      <NavItem id="lifestyle" icon={Heart} label="Health" />
      <NavItem id="rewards" icon={Gift} label="Shop" />
    </div>
  );
};
=======
export default App;
>>>>>>> c78b83e18910b82c000b22abfa50a12cb7e5d160
