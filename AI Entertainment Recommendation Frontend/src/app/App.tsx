/**
 * CinAI — AI-Powered Entertainment Recommendation System
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
import { RouterProvider } from 'react-router';
import { router } from './routes';
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
  return (
    <AppProvider>
      <style dangerouslySetInnerHTML={{ __html: globalStyle }} />
      <RouterProvider router={router} />
    </AppProvider>
  );
}
