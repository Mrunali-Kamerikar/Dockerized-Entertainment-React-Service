# CineVerse - Architecture & Component Guide

## 🏗️ System Architecture

### Overview

CineVerse is a Netflix-style movie recommendation platform built with:
- **React** (with TypeScript)
- **React Router** (Data Mode for routing)
- **Motion** (Framer Motion) for animations
- **Tailwind CSS v4** for styling
- **TMDB API** for movie data (with intelligent fallback)
- **Google Gemini AI** for chatbot functionality

---

## 📁 Project Structure

```
/src
  /app
    /components          # Reusable UI components
      /tabs             # Tab-specific components
      /ui               # Shadcn UI components
      MovieCard.tsx     # Unified movie card component
      MovieGrid.tsx     # Grid layout with loading/empty states
      MovieCardSkeleton.tsx  # Loading placeholder
      EmptyState.tsx    # Empty/error state UI
      ChatBot.tsx       # AI chatbot interface
      ...
    /context
      AppContext.tsx    # Global app state management
    /data
      mockData.ts       # Data type definitions
      industryMovies.ts # Static 20-movie dataset
      expandedMockData.ts  # Additional sample data
    /pages
      Dashboard.tsx     # Main app dashboard
      Login.tsx         # Login page
    /services
      tmdb.ts          # TMDB API integration
      geminiService.ts # Google Gemini AI service
      dataLoader.ts    # Smart data loading with fallback
      backend.ts       # Backend API stubs
    routes.tsx         # React Router configuration
    App.tsx            # App entry point
  /styles
    index.css          # Global styles
    theme.css          # Tailwind theme customization
```

---

## 🎯 Core Components

### 1. MovieCard Component

**Purpose**: Universal movie card with consistent structure

**Location**: `/src/app/components/MovieCard.tsx`

**Features**:
- ✅ Responsive poster with loading spinner
- ✅ Fallback UI for missing/failed images
- ✅ AI Score badge
- ✅ User rating badge
- ✅ Hover effects with interactive controls
- ✅ Genre tags and metadata
- ✅ Industry classification tag

**Props**:
```typescript
interface MovieCardProps {
  movie: MovieData;
  index?: number;  // For staggered animations
}
```

**Loading States**:
1. **Initial**: Spinner animation
2. **Success**: Image fades in
3. **Error**: Film emoji with title

**Hover Behavior**:
- Gradient overlay appears
- Star rating controls visible
- "Details" button shown
- Poster scales up slightly

---

### 2. MovieGrid Component

**Purpose**: Consistent grid layout with built-in states

**Location**: `/src/app/components/MovieGrid.tsx`

**Features**:
- ✅ Responsive grid (2-6 columns)
- ✅ Loading state with skeletons
- ✅ Empty state handling
- ✅ Error state display
- ✅ Fade-in animation

**Props**:
```typescript
interface MovieGridProps {
  movies: MovieData[];
  isLoading?: boolean;
  emptyStateType?: 'search' | 'nodata' | 'error';
  emptyStateMessage?: string;
  skeletonCount?: number;  // Default: 12
  columns?: {
    sm?: number;  // Mobile
    md?: number;  // Tablet
    lg?: number;  // Desktop
    xl?: number;  // Large desktop
  };
}
```

**Usage Example**:
```tsx
<MovieGrid
  movies={filteredMovies}
  isLoading={isLoading}
  emptyStateType="search"
  emptyStateMessage="No movies found for this genre"
  skeletonCount={12}
/>
```

---

### 3. MovieCardSkeleton Component

**Purpose**: Loading placeholder that mimics MovieCard structure

**Location**: `/src/app/components/MovieCardSkeleton.tsx`

**Features**:
- ✅ Matches MovieCard dimensions
- ✅ Animated gradient shimmer
- ✅ Pulsing opacity
- ✅ Staggered animation delays

**Visual Elements**:
- Poster placeholder (2/3 aspect ratio)
- AI score badge placeholder
- Title bar placeholder
- Genre tags placeholders
- Industry tag placeholder

---

### 4. EmptyState Component

**Purpose**: Informative empty/error states

**Location**: `/src/app/components/EmptyState.tsx`

**Variants**:

**1. Search** (`type="search"`):
- Icon: 🔍 Search
- Title: "No Results Found"
- Message: Suggests adjusting search or browsing categories

**2. No Data** (`type="nodata"`):
- Icon: 📈 Trending Up
- Title: "No Content Available"
- Message: No movies in category at the moment

**3. Error** (`type="error"`):
- Icon: 🎬 Film
- Title: "Something Went Wrong"
- Message: Suggests trying again later

**4. Loading** (`type="loading"`):
- Icon: ✨ Sparkles
- Title: "Loading Content"
- Message: Fetching latest movies

**Props**:
```typescript
interface EmptyStateProps {
  type?: 'search' | 'nodata' | 'error' | 'loading';
  title?: string;  // Override default
  message?: string;  // Override default
  icon?: React.ReactNode;  // Custom icon
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

---

### 5. ChatBot Component

**Purpose**: AI-powered movie assistant

**Location**: `/src/app/components/ChatBot.tsx`

**States**:

**1. Closed**: 
- Floating button (bottom-right)
- Pulsing animation
- Click to open

**2. Open**:
- Full chat interface
- Message history
- Input field
- Suggestion chips (initial state)

**3. Typing**:
- Animated dots indicator
- "thinking..." text
- Input disabled

**4. Error**:
- Red error message bubble
- Helpful suggestions
- Fallback guidance

**5. Success**:
- AI response with formatted text
- Optional movie cards (if mentioned)
- Timestamp

**Message Types**:
```typescript
interface Message {
  id: string;
  type: 'user' | 'bot' | 'error';
  text: string;
  timestamp: Date;
  movies?: MovieData[];  // Optional embedded movies
}
```

**Error Handling**:
- Graceful degradation if Gemini API fails
- Helpful error messages
- Suggestions for alternative actions
- Never crashes or freezes

---

## 🔄 Data Flow

### 1. Data Loading Strategy

```
App Start
  ↓
dataLoader.loadMovieData()
  ↓
Try TMDB API (with timeout)
  ↓
Success?
  YES → Load TMDB movies
  NO  → Load industryMovies.ts (20 movies)
  ↓
Update AppContext
  ↓
Components Re-render
```

### 2. AppContext State

**Location**: `/src/app/context/AppContext.tsx`

**Global State**:
```typescript
{
  user: User | null;
  allMovies: MovieData[];
  recommendations: MovieData[];
  trendingMovies: MovieData[];
  selectedMovie: MovieData | null;
  searchQuery: string;
  activeTab: Tab;
  activeGenreFilter: string;
  userRatings: Record<number, number>;
  isSidebarOpen: boolean;
  isLoading: boolean;
  dataSource: 'tmdb' | 'mock';
}
```

**Key Functions**:
- `setSelectedMovie(movie)` - Open movie modal
- `submitRating(id, rating)` - Save user rating
- `setSearchQuery(query)` - Update search
- `setActiveTab(tab)` - Change tab
- `setActiveGenreFilter(genre)` - Filter by genre
- `fetchRecommendations()` - Get AI recommendations
- `fetchTrending()` - Get trending movies
- `reloadMovies()` - Force reload with cache clear

---

## 🎨 Styling System

### Tailwind CSS v4

**Theme Colors**:
- Background: `#141414`
- Card Background: `#181818`
- Primary (Netflix Red): `#E50914`
- Text: `#fff`, `#888`, `#666`

**Custom Classes**:
```css
/* Loading spinner */
.animate-spin

/* Grid columns (responsive) */
.grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6
```

### Motion Animations

**Common Patterns**:

**1. Fade In**:
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4 }}
```

**2. Staggered Grid**:
```tsx
transition={{ delay: index * 0.06 }}
```

**3. Hover Scale**:
```tsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

**4. Skeleton Pulse**:
```tsx
animate={{ opacity: [0.3, 0.6, 0.3] }}
transition={{ duration: 1.5, repeat: Infinity }}
```

---

## 🛡️ Error Handling

### 1. Image Loading

**Problem**: TMDB posters may fail to load
**Solution**: 3-tier fallback system

```
TMDB Image URL
  ↓ (fails)
Placeholder Image
  ↓ (fails)
Film Emoji + Title
```

### 2. API Failures

**Problem**: TMDB or Gemini API unavailable
**Solution**: Automatic fallback to local data

**TMDB Failure**:
```typescript
try {
  const tmdbMovies = await fetchFromTMDB();
  return tmdbMovies;
} catch {
  return ALL_INDUSTRY_MOVIES;  // 20 static movies
}
```

**Gemini Failure**:
```typescript
try {
  const response = await askGemini(query);
  return response;
} catch {
  return "⚠️ I'm having trouble connecting...";
}
```

### 3. Empty States

**Problem**: No content to display
**Solution**: EmptyState component with helpful message

```tsx
{filteredMovies.length === 0 && (
  <EmptyState
    type="search"
    message="Try adjusting filters"
  />
)}
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile */
@media (max-width: 767px) {
  grid-cols-2
  sidebar: collapsed
  chatbot: full-width
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  grid-cols-3
  sidebar: visible
}

/* Desktop */
@media (min-width: 1024px) {
  grid-cols-4-6
  sidebar: always visible
}
```

### Mobile Optimizations

- **Sidebar**: Collapsible with hamburger menu
- **Search**: Full-width on mobile
- **Movie Grid**: 2 columns minimum
- **Chatbot**: Adapts to screen size
- **Modal**: Full-screen on small devices

---

## 🔐 Data Consistency

### Static Data Source

**File**: `/src/app/data/industryMovies.ts`

**Purpose**: 
- Ensures all users see same baseline content
- No dependency on external APIs for core functionality
- Reliable fallback when TMDB is unavailable

**Content**:
- 4 Hollywood movies
- 4 Bollywood movies
- 3 Tollywood movies
- 4 Anime movies
- 4 K-Drama movies
- **Total: 20 movies**

**Data Structure**:
```typescript
export interface MovieData {
  id: number;
  tmdbId?: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  genres: string[];
  runtime?: number;
  tagline?: string;
  aiScore: number;
  aiExplanation: string;
  aiScoreBreakdown?: AIScoreBreakdown;
  industry?: string;
  popularity?: number;
  cast?: string[];
}
```

---

## 🚀 Performance

### Optimization Strategies

**1. Lazy Loading**:
- Images load on demand with loading states
- Skeleton loaders prevent layout shift

**2. Memoization**:
- Poster URLs memoized with `useMemo`
- Expensive calculations cached

**3. Virtual Scrolling**:
- Large lists rendered efficiently
- Only visible items in DOM

**4. Code Splitting**:
- Routes lazy loaded
- Components bundled separately

**5. Debouncing**:
- Search queries debounced (300ms)
- Prevents excessive API calls

---

## 🧪 Testing Checklist

### Component Testing

- [ ] MovieCard renders with all movie data types
- [ ] MovieCard handles missing poster gracefully
- [ ] MovieGrid shows loading skeletons
- [ ] MovieGrid displays empty state when no movies
- [ ] ChatBot opens and closes smoothly
- [ ] ChatBot handles API errors
- [ ] EmptyState shows correct variant
- [ ] All animations run smoothly

### Integration Testing

- [ ] Login flow works
- [ ] Dashboard loads movies
- [ ] Search filters movies correctly
- [ ] Genre filters apply properly
- [ ] Movie modal opens with details
- [ ] Ratings persist in localStorage
- [ ] Tab navigation works
- [ ] Sidebar toggles on mobile

### Cross-Browser Testing

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

---

## 📝 Development Guidelines

### Adding New Features

**1. Use Existing Components**:
```tsx
// ✅ Good
import { MovieGrid } from '../components/MovieGrid';

// ❌ Bad - creating duplicate
const MyCustomGrid = () => { /* ... */ }
```

**2. Handle All States**:
```tsx
// ✅ Good
{isLoading && <LoadingState />}
{error && <ErrorState />}
{!data.length && <EmptyState />}
{data.length > 0 && <DataView />}

// ❌ Bad - missing states
{data.map(item => <Item />)}
```

**3. Add Proper TypeScript Types**:
```tsx
// ✅ Good
interface Props {
  movie: MovieData;
  onSelect: (id: number) => void;
}

// ❌ Bad - using any
interface Props {
  movie: any;
  onSelect: any;
}
```

**4. Include Responsive Design**:
```tsx
// ✅ Good
className="grid-cols-2 md:grid-cols-4 lg:grid-cols-6"

// ❌ Bad - fixed layout
className="grid-cols-6"
```

---

## 🎯 Key Takeaways

1. **Consistency**: All movie cards use `MovieCard` component
2. **Reliability**: Fallback data ensures app always works
3. **User Experience**: Loading and empty states everywhere
4. **Error Handling**: Graceful degradation, never crash
5. **Responsive**: Mobile-first, adapts to all screens
6. **Performance**: Optimized loading and rendering
7. **Maintainability**: Reusable components, clear structure

---

**Last Updated**: March 18, 2026
**Version**: 2.0.0
