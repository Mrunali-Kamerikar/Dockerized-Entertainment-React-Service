import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Wifi, WifiOff, X } from 'lucide-react';
import { TMDB_API_KEY } from '../services/tmdb';

export const DataSourceIndicator: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  const usingMockData = TMDB_API_KEY === 'YOUR_TMDB_API_KEY';

  useEffect(() => {
    // Auto-hide after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 9999,
            background: usingMockData 
              ? 'linear-gradient(135deg, rgba(255,193,7,0.15), rgba(255,152,0,0.15))' 
              : 'linear-gradient(135deg, rgba(76,175,80,0.15), rgba(56,142,60,0.15))',
            border: usingMockData 
              ? '1px solid rgba(255,193,7,0.3)' 
              : '1px solid rgba(76,175,80,0.3)',
            borderRadius: 12,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            maxWidth: 320,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          {usingMockData ? (
            <Database size={18} color="#FFC107" />
          ) : (
            <Wifi size={18} color="#4CAF50" />
          )}
          
          <div style={{ flex: 1 }}>
            <p style={{ 
              margin: 0, 
              fontSize: '0.8rem', 
              fontWeight: 600,
              color: usingMockData ? '#FFC107' : '#4CAF50',
            }}>
              {usingMockData ? 'Mock Data Mode' : 'Live TMDB Data'}
            </p>
            <p style={{ 
              margin: 0, 
              fontSize: '0.72rem', 
              color: '#999',
              lineHeight: 1.4,
            }}>
              {usingMockData 
                ? 'Using sample movies for demo' 
                : 'Connected to TMDB API'}
            </p>
          </div>

          <button
            onClick={() => setDismissed(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#666',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
