import { useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Brain, Flame, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TrendingRow } from '../TrendingRow';
import { MovieCard } from '../MovieCard';
import { LoadingSpinner } from '../LoadingSpinner';
import { MOCK_MOVIES } from '../../data/mockData';

export const TrendingTab: React.FC = () => {
  const { trendingMovies, fetchTrending, isLoading } = useApp();

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Categorize trending movies
  const topTen = trendingMovies.slice(0, 10);
  const actionAdventure = MOCK_MOVIES.filter(m => m.genres.includes('Action') || m.genres.includes('Adventure'));
  const sciFi = MOCK_MOVIES.filter(m => m.genres.includes('Sci-Fi'));
  const topRated = [...MOCK_MOVIES].sort((a, b) => b.vote_average - a.vote_average).slice(0, 8);

  return (
    <div>
      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, rgba(229,9,20,0.1), rgba(255,68,68,0.05), transparent)',
          border: '1px solid rgba(229,9,20,0.15)',
          borderRadius: 14, padding: '20px 24px', marginBottom: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'rgba(229,9,20,0.15)', border: '1px solid rgba(229,9,20,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Flame size={24} color="#E50914" />
          </div>
          <div>
            <h2 style={{ color: '#fff', margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Trending Now</h2>
            <p style={{ color: '#666', margin: 0, fontSize: '0.8rem' }}>
              Updated weekly · Powered by TMDB & AI analysis
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { icon: TrendingUp, label: 'This Week', value: '10 films', color: '#4BCBEB' },
            { icon: Brain, label: 'AI Picks', value: `${trendingMovies.length} curated`, color: '#E50914' },
            { icon: Award, label: 'Top Rated', value: '8.5+ score', color: '#F7B731' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <stat.icon size={16} color={stat.color} style={{ marginBottom: 4, display: 'block', margin: '0 auto 4px' }} />
              <p style={{ color: '#fff', margin: 0, fontSize: '0.8rem', fontWeight: 700 }}>{stat.value}</p>
              <p style={{ color: '#555', margin: 0, fontSize: '0.7rem' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <LoadingSpinner size="lg" text="Fetching trending movies..." />
        </div>
      ) : (
        <div>
          {/* Top 10 row with numbers */}
          <TrendingRow title="Top 10 This Week" movies={topTen} showRank />

          {/* Grid of top rated */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Award size={18} color="#F7B731" />
              <h3 style={{ color: '#fff', margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>
                Highest Rated
              </h3>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
              gap: 14,
            }}>
              {topRated.slice(0, 8).map((movie, i) => (
                <MovieCard key={movie.id} movie={movie} index={i} />
              ))}
            </div>
          </div>

          {/* Action & Adventure row */}
          <TrendingRow title="Action & Adventure" movies={actionAdventure} />

          {/* Sci-Fi row */}
          <TrendingRow title="Sci-Fi Universe" movies={sciFi} />
        </div>
      )}
    </div>
  );
};
