/**
 * AppContext — Global state management for the AI Recommendation System
 * Handles: authentication, movie data, ratings, UI state
 */
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { MovieData, MOCK_MOVIES, MOCK_TRENDING } from '../data/mockData';
import { searchMovies, fetchTrendingMovies, GENRE_MAP } from '../services/tmdb';
import { getRecommendations, submitRating as apiSubmitRating, loginUser } from '../services/backend';

type ActiveTab = 'recommendations' | 'summary' | 'reviews' | 'qa' | 'trending';

interface AppContextType {
  // Auth
  user: { username: string; userId: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;

  // Movies
  recommendations: MovieData[];
  trendingMovies: MovieData[];
  selectedMovie: MovieData | null;
  setSelectedMovie: (movie: MovieData | null) => void;
  searchResults: MovieData[];
  isSearching: boolean;

  // UI
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeGenreFilter: string;
  setActiveGenreFilter: (g: string) => void;

  // Ratings
  userRatings: Record<number, number>;
  submitRating: (movieId: number, rating: number) => void;

  // Actions
  fetchRecommendations: (query: string) => Promise<void>;
  fetchTrending: () => Promise<void>;
  doSearch: (query: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};

// Convert TMDB raw movie to MovieData format
const tmdbToMovieData = (raw: Record<string, unknown>): MovieData => ({
  id: raw.id as number,
  tmdbId: raw.id as number,
  title: raw.title as string,
  overview: raw.overview as string,
  poster_path: raw.poster_path as string || '',
  backdrop_path: raw.backdrop_path as string || '',
  release_date: raw.release_date as string || '',
  vote_average: raw.vote_average as number || 0,
  genre_ids: raw.genre_ids as number[] || [],
  genres: (raw.genre_ids as number[] || []).map((id: number) => GENRE_MAP[id] || '').filter(Boolean),
  runtime: 120,
  tagline: '',
  aiScore: parseFloat(Math.min(10, (raw.vote_average as number || 0) * 1.05).toFixed(1)),
  aiExplanation: 'AI-curated match based on your viewing preferences and genre affinity.',
  aiScoreBreakdown: {
    similarityScore: parseFloat(((raw.vote_average as number || 0) * 0.95).toFixed(1)),
    ratingBoost: 0.3,
    genreBoost: 0.2,
    historyPenalty: 0.1,
  },
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ username: string; userId: string } | null>(null);
  const [recommendations, setRecommendations] = useState<MovieData[]>(MOCK_MOVIES);
  const [trendingMovies, setTrendingMovies] = useState<MovieData[]>(MOCK_TRENDING);
  const [selectedMovie, setSelectedMovie] = useState<MovieData | null>(null);
  const [searchResults, setSearchResults] = useState<MovieData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('recommendations');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGenreFilter, setActiveGenreFilter] = useState('All');
  const [userRatings, setUserRatings] = useState<Record<number, number>>({});
  const searchTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const login = useCallback(async (username: string, password: string) => {
    const result = await loginUser(username, password);
    setUser({ username: result.username || username, userId: result.userId || 'user_001' });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setRecommendations(MOCK_MOVIES);
    setUserRatings({});
  }, []);

  const fetchRecommendations = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      // Try backend first
      const backendResult = await getRecommendations({ query, userId: user?.userId || 'guest', limit: 12 });
      if (backendResult?.movies) {
        setRecommendations(backendResult.movies);
      } else {
        // Fallback: search TMDB
        const tmdbResults = await searchMovies(query);
        if (tmdbResults.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setRecommendations(tmdbResults.slice(0, 12).map((m: any) => tmdbToMovieData(m)));
        } else {
          // Filter mock data by query
          const filtered = MOCK_MOVIES.filter(m =>
            m.title.toLowerCase().includes(query.toLowerCase()) ||
            m.genres.some(g => g.toLowerCase().includes(query.toLowerCase()))
          );
          setRecommendations(filtered.length > 0 ? filtered : MOCK_MOVIES);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const fetchTrending = useCallback(async () => {
    setIsLoading(true);
    try {
      const tmdbResults = await fetchTrendingMovies();
      if (tmdbResults.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setTrendingMovies(tmdbResults.map((m: any) => tmdbToMovieData(m)));
      } else {
        setTrendingMovies(MOCK_TRENDING);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const doSearch = useCallback(async (query: string) => {
    if (!query.trim()) { setSearchResults([]); setIsSearching(false); return; }
    setIsSearching(true);
    clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(async () => {
      try {
        const tmdbResults = await searchMovies(query);
        if (tmdbResults.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setSearchResults(tmdbResults.slice(0, 8).map((m: any) => tmdbToMovieData(m)));
        } else {
          setSearchResults(
            MOCK_MOVIES.filter(m => m.title.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
          );
        }
      } finally {
        setIsSearching(false);
      }
    }, 400);
  }, []);

  const submitRating = useCallback(async (movieId: number, rating: number) => {
    setUserRatings(prev => ({ ...prev, [movieId]: rating }));
    await apiSubmitRating(movieId, user?.userId || 'guest', rating);
  }, [user]);

  return (
    <AppContext.Provider value={{
      user, login, logout,
      recommendations, trendingMovies, selectedMovie, setSelectedMovie,
      searchResults, isSearching,
      activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen,
      isLoading, searchQuery, setSearchQuery, activeGenreFilter, setActiveGenreFilter,
      userRatings, submitRating,
      fetchRecommendations, fetchTrending, doSearch,
    }}>
      {children}
    </AppContext.Provider>
  );
};