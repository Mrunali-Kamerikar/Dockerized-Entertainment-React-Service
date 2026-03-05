/**
 * TMDB API Service
 * Replace TMDB_API_KEY with your actual API key from https://www.themoviedb.org/settings/api
 */

export const TMDB_API_KEY = 'YOUR_TMDB_API_KEY'; // ← Replace with your TMDB API key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const TMDB_IMAGE_ORIGINAL = 'https://image.tmdb.org/t/p/original';
export const TMDB_IMAGE_W300 = 'https://image.tmdb.org/t/p/w300';

// Genre mapping
export const GENRE_MAP: Record<number, string> = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 53: 'Thriller',
  10752: 'War', 37: 'Western', 10770: 'TV Movie',
};

// Simple in-memory cache with TTL
const apiCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const cachedFetch = async (url: string): Promise<unknown> => {
  const cached = apiCache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error(`TMDB API Error: ${response.status}`);
  const data = await response.json();
  apiCache.set(url, { data, timestamp: Date.now() });
  return data;
};

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  original_language: string;
}

export interface TMDBMovieDetail extends TMDBMovie {
  genres: { id: number; name: string }[];
  runtime: number;
  tagline: string;
  budget: number;
  revenue: number;
  status: string;
}

// Fetch trending movies (week)
export const fetchTrendingMovies = async (): Promise<TMDBMovie[]> => {
  if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY') return [];
  try {
    const data = await cachedFetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`) as { results: TMDBMovie[] };
    return data.results || [];
  } catch {
    return [];
  }
};

// Search movies
export const searchMovies = async (query: string): Promise<TMDBMovie[]> => {
  if (!query.trim() || TMDB_API_KEY === 'YOUR_TMDB_API_KEY') return [];
  try {
    const data = await cachedFetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`
    ) as { results: TMDBMovie[] };
    return data.results || [];
  } catch {
    return [];
  }
};

// Fetch movie detail
export const fetchMovieDetail = async (movieId: number): Promise<TMDBMovieDetail | null> => {
  if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY') return null;
  try {
    const data = await cachedFetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`) as TMDBMovieDetail;
    return data;
  } catch {
    return null;
  }
};

// Fetch popular movies by genre
export const fetchMoviesByGenre = async (genreId: number): Promise<TMDBMovie[]> => {
  if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY') return [];
  try {
    const data = await cachedFetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
    ) as { results: TMDBMovie[] };
    return data.results || [];
  } catch {
    return [];
  }
};

// Fetch similar movies
export const fetchSimilarMovies = async (movieId: number): Promise<TMDBMovie[]> => {
  if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY') return [];
  try {
    const data = await cachedFetch(
      `${TMDB_BASE_URL}/movie/${movieId}/similar?api_key=${TMDB_API_KEY}`
    ) as { results: TMDBMovie[] };
    return data.results?.slice(0, 6) || [];
  } catch {
    return [];
  }
};

// Get full image URL
export const getImageUrl = (path: string | null, size: 'w300' | 'w500' | 'original' = 'w500'): string => {
  if (!path) return `https://placehold.co/300x450/1a1a2e/808080?text=No+Poster`;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getBackdropUrl = (path: string | null): string => {
  if (!path) return `https://placehold.co/1280x720/1a1a2e/808080?text=No+Backdrop`;
  return `https://image.tmdb.org/t/p/original${path}`;
};
