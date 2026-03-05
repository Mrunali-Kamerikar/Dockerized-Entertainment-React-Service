import { motion } from 'motion/react';
import { Brain, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MovieCard } from '../MovieCard';
import { TagFilters } from '../TagFilters';
import { LoadingSpinner } from '../LoadingSpinner';

export const RecommendationsTab: React.FC = () => {
  const { recommendations, isLoading, activeGenreFilter, user } = useApp();

  // Filter by genre
  const filtered = activeGenreFilter === 'All'
    ? recommendations
    : recommendations.filter(m => m.genres.includes(activeGenreFilter));

  return (
    <div>
      {/* Personalized header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, rgba(229,9,20,0.08), transparent)',
          border: '1px solid rgba(229,9,20,0.15)',
          borderRadius: 12, padding: '16px 20px', marginBottom: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            background: 'rgba(229,9,20,0.15)', borderRadius: 8,
            width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Sparkles size={20} color="#E50914" />
          </div>
          <div>
            <h2 style={{ color: '#fff', margin: 0, fontSize: '1rem', fontWeight: 700 }}>
              Recommended for {user?.username || 'You'}
            </h2>
            <p style={{ color: '#666', margin: 0, fontSize: '0.78rem' }}>
              Based on your genre preferences · Sci-Fi · Thriller · Action
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Brain size={14} color="#E50914" />
          <span style={{ color: '#888', fontSize: '0.78rem' }}>
            {filtered.length} AI-curated matches
          </span>
        </div>
      </motion.div>

      {/* Genre Tag Filters */}
      <div style={{ marginBottom: 20 }}>
        <TagFilters />
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <LoadingSpinner size="lg" text="AI is generating recommendations..." />
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <Brain size={40} color="#333" style={{ margin: '0 auto 16px', display: 'block' }} />
          <p style={{ color: '#555', fontSize: '0.9rem' }}>No recommendations found for this genre.</p>
          <p style={{ color: '#444', fontSize: '0.8rem' }}>Try a different filter or search query.</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 16,
          }}
        >
          {filtered.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} />
          ))}
        </motion.div>
      )}
    </div>
  );
};
