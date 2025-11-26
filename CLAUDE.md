# CLAUDE.md - AI Assistant Guide

## Project Overview

**Katie's Life Skills & Rewards Portfolio** is a React-based web application designed to help track life skills, habits, and rewards. It's a personal development and gamification app that allows users to earn tokens through positive behaviors and redeem them for rewards.

### Project Purpose
- Track daily check-ins across social, emotional, and communication domains
- Gamify positive behaviors with a token-based reward system
- Maintain streaks to encourage consistency
- Visualize progress through calendar and dashboard views
- Manage finance tracking and goal setting

## Technology Stack

### Core Technologies
- **Framework**: React 19.2.0
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS (via CDN)
- **Runtime**: Node.js
- **Package Manager**: npm

### Development Tools
- **Type Checking**: TypeScript with strict mode disabled
- **Module System**: ESNext with bundler resolution
- **JSX**: react-jsx transform
- **Dev Server**: Vite dev server on port 3000

## Project Structure

```
/
├── components/           # All React components organized by feature
│   ├── calendar/        # Calendar-related components
│   ├── checkin/         # Check-in screen components
│   ├── dashboard/       # Dashboard widgets and cards
│   ├── finance/         # Finance tracking components
│   ├── layout/          # Layout components (nav, etc.)
│   ├── rewards/         # Rewards screen components
│   └── ui/              # Reusable UI primitives
├── App.tsx              # Root application component
├── index.tsx            # Application entry point
├── types.ts             # TypeScript type definitions
├── constants.tsx        # Application constants and static data
├── index.css            # Global CSS styles
├── index.html           # HTML entry point with Tailwind config
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## Architecture & Patterns

### Component Organization

Components are organized by **feature/domain** rather than by type:

- **Feature-based folders**: `dashboard/`, `checkin/`, `calendar/`, `finance/`, `rewards/`
- **Shared UI components**: `ui/` for reusable primitives (Card, Icon)
- **Layout components**: `layout/` for structural elements (BottomNav)

### State Management

**Lifted State Pattern** - State is managed in `App.tsx` and passed down:

```typescript
// Primary app state (in App.tsx:14-18)
const [activePage, setActivePage] = useState<Page>('dashboard');
const [totalTokens, setTotalTokens] = useState<number>(85);
const [weeklyTokens, setWeeklyTokens] = useState<number>(12);
const [streakDays, setStreakDays] = useState<number>(4);
```

**No External State Management**: The app uses React's built-in `useState` without Redux, Zustand, or Context API.

**Callback Props**: Actions like `handlePurchase` are passed down to child components.

### Navigation

**Client-Side Navigation** via conditional rendering:
- Uses a `Page` type union: `'dashboard' | 'check-in' | 'rewards' | 'calendar' | 'finance'`
- Bottom navigation sets active page state
- `App.tsx` renders appropriate screen based on `activePage`

### Data Flow

```
App.tsx (state container)
  ├─> DashboardScreen (display only)
  ├─> CheckinScreen (local state for check-ins)
  ├─> RewardsScreen (receives state + callbacks)
  ├─> CalendarScreen (display only)
  └─> FinanceScreen (local state for finance tracking)
```

## Key Files & Conventions

### Types (`types.ts`)

All TypeScript interfaces are centralized in `types.ts`:
- `Page`: Navigation page type
- `CheckinKeyword`: Individual check-in item
- `CheckinCategoryData`: Grouped check-in categories
- `TokenEarningAction`: Actions that earn tokens
- `Reward`: Redeemable reward items
- `CalendarEvent`: Calendar event entries

### Constants (`constants.tsx`)

Static data exported as constants:
- `AFFIRMATIONS`: Daily affirmation messages with icons
- `CHECKIN_DATA`: Check-in categories and keywords
- `TOKEN_ACTIONS`: All available token-earning activities
- `REWARDS`: Available rewards with costs
- `CALENDAR_EVENTS`: Sample calendar events

### Icon System (`components/ui/Icon.tsx`)

**Custom SVG Icon Component**:
- Icons are defined as path data in an object literal
- Icon names reference lucide-react-style icons
- Usage: `<Icon name="Heart" className="w-6 h-6" />`
- Fallback: Renders a circle if icon name not found

### Styling Approach

**Tailwind CSS via CDN**:
- Configured inline in `index.html:14-40`
- Custom color palette with baby blue/pink theme
- Custom font families: Inter (sans) + Poppins (display)
- Extended border radius values

**Color Palette**:
```javascript
'primary-blue': '#A2D2FF'      // Baby Blue
'primary-pink': '#FFC8DD'       // Baby Pink
'secondary-pink': '#FFAFCC'     // Darker Pink
'secondary-green': '#10B981'    // Finance/Success
'reward-amber': '#F59E0B'       // Rewards
'background': '#F8FAFC'         // App background
'text-primary': '#4A5568'       // Main text
'text-secondary': '#718096'     // Secondary text
```

**CSS Convention**:
- Utility-first Tailwind classes
- No CSS modules or styled-components
- Minimal global CSS in `index.css`
- Responsive classes: `md:`, `sm:` prefixes

### Import Patterns

**Path Aliases** configured in `tsconfig.json:21-24` and `vite.config.ts:18-20`:
```typescript
'@/*': ['./*']  // Maps @ to project root
```

**Relative Imports** are preferred in current codebase:
```typescript
import Card from '../ui/Card';
import Icon from '../ui/Icon';
import { TOKEN_ACTIONS } from '../../constants';
```

## Component Conventions

### Functional Components

All components use **React Function Components** with TypeScript:

```typescript
interface ComponentProps {
  prop: type;
}

const Component: React.FC<ComponentProps> = ({ prop }) => {
  return <div>{prop}</div>;
};

export default Component;
```

### Props Pattern

- Define explicit interfaces for component props
- Use destructuring in function parameters
- Default values via destructuring defaults: `{ className = '' }`
- Export component as default export

### File Naming

- **Components**: PascalCase (e.g., `DashboardScreen.tsx`, `TokenWallet.tsx`)
- **Configuration**: camelCase (e.g., `vite.config.ts`, `tsconfig.json`)
- **Constants/Types**: camelCase (e.g., `types.ts`, `constants.tsx`)

## Development Workflow

### Running the Application

```bash
npm install          # Install dependencies
npm run dev          # Start dev server on http://0.0.0.0:3000
npm run build        # Build for production
npm run preview      # Preview production build
```

### Environment Variables

The app expects `GEMINI_API_KEY` in `.env.local` (referenced in `README.md:18`):
```bash
# .env.local
GEMINI_API_KEY=your_api_key_here
```

This is exposed via `vite.config.ts:14-15`:
```typescript
'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
```

### Git Workflow

**Current Branch**: `claude/claude-md-mifvt3p31kppepnc-01A6PWAaJWNcucBgFW8GE3Lk`

**Recent Commits Focus**:
- React/Vite project initialization
- UI component refactoring
- StrictMode and root initialization simplification

## AI Assistant Guidelines

### When Adding Features

1. **Read existing code first** - Always read relevant files before suggesting changes
2. **Follow existing patterns** - Match the component structure and state management approach
3. **Update types** - Add new interfaces to `types.ts`
4. **Update constants** - Add static data to `constants.tsx`
5. **Match styling** - Use Tailwind classes with the existing color palette
6. **Maintain organization** - Add components to appropriate feature folders

### When Modifying State

- State lives in `App.tsx` for cross-cutting concerns
- Local state is acceptable for feature-specific data
- Pass callbacks down for state mutations
- Avoid introducing external state management libraries

### When Adding UI Components

- Place reusable primitives in `components/ui/`
- Feature-specific components go in their domain folder
- Use the `Card` component for container layouts
- Use the `Icon` component for all icons (add to `Icon.tsx` if needed)
- Follow Tailwind utility class patterns

### When Working with Types

- Add all interfaces to `types.ts`
- Export types that are shared across multiple components
- Use TypeScript union types for string literals (e.g., `Page` type)
- Prefer interfaces over type aliases for object shapes

### Code Style Preferences

- **Formatting**: 2-space indentation
- **Imports**: Group by external → internal → relative
- **Props**: Destructure in function parameters
- **Boolean props**: No explicit `= true`, use presence/absence
- **Empty fragments**: Use `<></>` over `<React.Fragment>`
- **Comments**: Minimal; code should be self-documenting

### Testing Considerations

**Note**: No testing framework is currently configured. If adding tests:
- Consider Vitest (pairs well with Vite)
- Add test files alongside components: `Component.test.tsx`
- Update `package.json` scripts

### Security Notes

- API keys should be in `.env.local` (gitignored)
- No sensitive data in constants or committed files
- Validate user input in production implementations

### Performance Considerations

- React 19 used without StrictMode (removed in recent commit)
- Vite provides fast HMR during development
- No memoization (`useMemo`, `useCallback`) currently used
- Consider adding for expensive computations or large lists

## Common Tasks

### Adding a New Page

1. Create a new screen component in `components/{feature}/`
2. Add page type to `Page` union in `types.ts:2`
3. Import screen in `App.tsx`
4. Add case to `renderContent()` switch statement in `App.tsx:28-56`
5. Update `BottomNav` to include navigation button

### Adding a New Icon

1. Find SVG path data (lucide-react is the style reference)
2. Add entry to `icons` object in `components/ui/Icon.tsx:9-50`
3. Use with `<Icon name="NewIcon" />`

### Adding a New Reward/Action

1. Add data to `REWARDS` or `TOKEN_ACTIONS` in `constants.tsx`
2. Ensure item has required fields per interface in `types.ts`
3. Component will automatically render new items

### Modifying Color Scheme

1. Update Tailwind config in `index.html:14-40`
2. Use new color classes in components
3. Maintain accessibility (contrast ratios)

## Known Limitations & TODOs

- **No Persistence**: State resets on refresh (consider localStorage/backend)
- **Mock Data**: Calendar events and some features use hardcoded data
- **No Backend**: Pure frontend app, no API integration yet
- **No Authentication**: App assumes single user
- **Limited Responsiveness**: Designed mobile-first but test on various screens
- **Icon Set**: Limited custom icons; may need expansion
- **Accessibility**: No ARIA labels or screen reader optimization

## External Resources

- **AI Studio App**: https://ai.studio/apps/drive/1J9pH8DaFrJdUQbSMjulqqkfOWD4G6txt
- **Vite Docs**: https://vitejs.dev/
- **React 19 Docs**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs/

---

**Last Updated**: 2025-11-26
**Maintained By**: AI Assistant (Claude)
**For**: Helen-con/Life-skills repository
