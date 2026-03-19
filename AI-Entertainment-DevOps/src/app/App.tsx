/**
 * CineVerse — AI-Powered Entertainment Recommendation System
 *
 * Tech Stack: React + TypeScript + Tailwind CSS + Motion
 * APIs: TMDB API (movie data), Backend REST API (/login, /recommend, /summary, /review, /rate)
 *
 * Setup:
 *   1. Get a TMDB API key at https://www.themoviedb.org/settings/api
 *   2. Set it in /src/app/services/tmdb.ts (TMDB_API_KEY)
 *   3. Set your backend URL in /src/app/services/backend.ts (BACKEND_URL)
 *   4. The app works with full mock data without any API keys
 */
import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { TMDB_API_KEY } from './services/tmdb';
import { AppProvider } from './context/AppContext';
import '../styles/fonts.css';

// Global dark theme styles
const globalStyle = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: #141414;
    color: #ffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #E50914; }
  input::placeholder { color: #555; }
  button { font-family: inherit; }
  a { color: inherit; text-decoration: none; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .animate-spin { animation: spin 0.8s linear infinite; }
`;

export default function App() {
  useEffect(() => {
    // Display initialization message
    const usingMockData = TMDB_API_KEY === 'YOUR_TMDB_API_KEY';
    
    console.log(
      `%c🎬 CineVerse %c${usingMockData ? '📦 MOCK DATA MODE' : '🌐 LIVE API MODE'}`,
      'background: #E50914; color: white; padding: 8px 12px; border-radius: 4px; font-weight: bold; font-size: 14px;',
      `background: ${usingMockData ? '#FFC107' : '#4CAF50'}; color: white; padding: 8px 12px; border-radius: 4px; font-weight: bold; font-size: 14px; margin-left: 8px;`
    );
    
    if (usingMockData) {
      console.log(
        '%c✅ App initialized with mock data - All features work without API keys!',
        'color: #FFC107; font-size: 12px; font-weight: bold;'
      );
      console.log(
        '%cℹ️  To use live TMDB data, set your API key in /src/app/services/tmdb.ts',
        'color: #888; font-size: 11px;'
      );
    } else {
      console.log(
        '%c✅ App connected to TMDB API - Loading live movie data',
        'color: #4CAF50; font-size: 12px; font-weight: bold;'
      );
    }
    
    console.log(
      '%c💡 This app works for all collaborators - no environment setup required!',
      'color: #03A9F4; font-size: 11px; font-weight: bold;'
    );
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyle }} />
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </>
  );
}