import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Brain, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { SearchBar } from '../components/SearchBar';
import { MovieModal } from '../components/MovieModal';
import { RecommendationsTab } from '../components/tabs/RecommendationsTab';
import { SummaryTab } from '../components/tabs/SummaryTab';
import { ReviewsTab } from '../components/tabs/ReviewsTab';
import { QATab } from '../components/tabs/QATab';
import { TrendingTab } from '../components/tabs/TrendingTab';
import { LoadingOverlay } from '../components/LoadingSpinner';

type Tab = 'recommendations' | 'summary' | 'reviews' | 'qa' | 'trending';

const TAB_CONFIG: { key: Tab; label: string; icon: string }[] = [
  { key: 'recommendations', label: 'Recommendations', icon: '✦' },
  { key: 'summary', label: 'Summary', icon: '📋' },
  { key: 'reviews', label: 'Reviews', icon: '⭐' },
  { key: 'qa', label: 'Q&A', icon: '🤖' },
  { key: 'trending', label: 'Trending', icon: '🔥' },
];

export const Dashboard: React.FC = () => {
  const {
    user, activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen,
    selectedMovie, isLoading, fetchRecommendations, searchQuery,
  } = useApp();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  if (!user) return null;

  const sidebarWidth = isSidebarOpen ? 256 : 64;

  return (
    <div style={{ minHeight: '100vh', background: '#141414', display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <motion.main
        animate={{ marginLeft: sidebarWidth }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        {/* Top Header */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 20,
          background: 'rgba(20,20,20,0.95)',
          borderBottom: '1px solid #1a1a1a',
          backdropFilter: 'blur(12px)',
          padding: '0 24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 64 }}>
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#888', display: 'flex', padding: 4,
              }}
            >
              <Menu size={20} />
            </button>

            {/* Search bar */}
            <div style={{ flex: 1, maxWidth: 680 }}>
              <SearchBar />
            </div>

            {/* User greeting */}
            <div className="hidden md:flex items-center gap-10 ml-auto">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sparkles size={14} color="#E50914" />
                <span style={{ color: '#666', fontSize: '0.78rem' }}>
                  AI-powered for <span style={{ color: '#ccc' }}>{user?.username}</span>
                </span>
              </div>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'linear-gradient(135deg, #E50914, #ff4444)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                cursor: 'pointer',
              }}>
                {user?.username?.[0]?.toUpperCase() || 'U'}
              </div>
            </div>
          </div>

          {/* Tab navigation */}
          <div style={{
            display: 'flex', gap: 0, overflowX: 'auto',
            scrollbarWidth: 'none', msOverflowStyle: 'none',
          }}>
            {TAB_CONFIG.map(tab => {
              const isActive = activeTab === tab.key;
              return (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  whileHover={{ y: -1 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '12px 18px', flexShrink: 0,
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: isActive ? '#fff' : '#666',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.85rem',
                    borderBottom: `2px solid ${isActive ? '#E50914' : 'transparent'}`,
                    marginBottom: -1,
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ fontSize: '0.8rem' }}>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </motion.button>
              );
            })}

            {/* AI fetch button */}
            {activeTab === 'recommendations' && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => fetchRecommendations(searchQuery || 'popular movies')}
                style={{
                  marginLeft: 'auto', marginBottom: 6, marginTop: 6,
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'rgba(229,9,20,0.12)', border: '1px solid rgba(229,9,20,0.25)',
                  borderRadius: 8, padding: '6px 14px', cursor: 'pointer',
                  color: '#E50914', fontSize: '0.78rem', fontWeight: 600, flexShrink: 0,
                }}
              >
                <Brain size={13} /> Refresh AI
              </motion.button>
            )}
          </div>
        </header>

        {/* Page content */}
        <div style={{ flex: 1, padding: '28px 24px', maxWidth: 1400, width: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'recommendations' && <RecommendationsTab />}
              {activeTab === 'summary' && <SummaryTab />}
              {activeTab === 'reviews' && <ReviewsTab />}
              {activeTab === 'qa' && <QATab />}
              {activeTab === 'trending' && <TrendingTab />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid #1a1a1a', padding: '16px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Brain size={13} color="#E50914" />
            <span style={{ color: '#444', fontSize: '0.72rem' }}>
              CinAI — AI Entertainment Recommendation System
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {['TMDB API', 'Powered by AI', 'v1.0.0'].map(t => (
              <span key={t} style={{ color: '#333', fontSize: '0.68rem' }}>{t}</span>
            ))}
          </div>
        </footer>
      </motion.main>

      {/* Movie Modal - always rendered, uses AnimatePresence internally */}
      <AnimatePresence>
        {selectedMovie && <MovieModal key="modal" />}
      </AnimatePresence>

      {/* Global loading overlay */}
      {isLoading && <LoadingOverlay text="AI is fetching recommendations..." />}
    </div>
  );
};