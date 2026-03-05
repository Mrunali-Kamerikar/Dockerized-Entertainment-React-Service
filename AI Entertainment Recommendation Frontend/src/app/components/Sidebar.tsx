import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Film, Brain, TrendingUp, History, LogOut, ChevronLeft, ChevronRight,
  User, Star, Settings, Bell
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GenreChart, GenreProgress } from './GenreChart';
import { MOCK_HISTORY } from '../data/mockData';
import { useNavigate } from 'react-router';

export const Sidebar: React.FC = () => {
  const { user, logout, isSidebarOpen, setIsSidebarOpen, activeTab, setActiveTab } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { icon: Brain, label: 'Recommendations', tab: 'recommendations' as const },
    { icon: Film, label: 'Summary', tab: 'summary' as const },
    { icon: Star, label: 'Reviews', tab: 'reviews' as const },
    { icon: Bell, label: 'Q&A', tab: 'qa' as const },
    { icon: TrendingUp, label: 'Trending', tab: 'trending' as const },
  ];

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 lg:hidden"
            style={{ background: 'rgba(0,0,0,0.7)' }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 256 : 64 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{
          height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 30,
          background: '#0d0d0d',
          borderRight: '1px solid #1a1a1a',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Logo */}
        <div style={{
          padding: isSidebarOpen ? '20px 20px 16px' : '20px 0 16px',
          display: 'flex', alignItems: 'center',
          justifyContent: isSidebarOpen ? 'space-between' : 'center',
          borderBottom: '1px solid #1a1a1a',
          flexShrink: 0,
        }}>
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <div style={{
                  background: '#E50914', borderRadius: 6,
                  width: 28, height: 28,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Brain size={16} color="#fff" />
                </div>
                <div>
                  <span style={{
                    color: '#E50914', fontWeight: 800, fontSize: '1.1rem',
                    fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em',
                  }}>CINAI</span>
                  <span style={{ color: '#555', fontSize: '0.65rem', display: 'block', lineHeight: 1 }}>
                    AI Powered
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid #222',
              borderRadius: 8, width: 28, height: 28,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#888', flexShrink: 0,
            }}
          >
            {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </motion.button>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'thin', scrollbarColor: '#1a1a1a transparent' }}>
          {/* User Profile */}
          <div style={{
            padding: isSidebarOpen ? '16px 20px' : '16px 0',
            display: 'flex', alignItems: 'center', gap: 10,
            justifyContent: isSidebarOpen ? 'flex-start' : 'center',
            borderBottom: '1px solid #1a1a1a',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #E50914, #ff4444)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: '0.9rem',
              flexShrink: 0,
            }}>
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                  <p style={{ color: '#fff', margin: 0, fontSize: '0.85rem', fontWeight: 600 }}>
                    {user?.username || 'User'}
                  </p>
                  <p style={{ color: '#555', margin: 0, fontSize: '0.72rem' }}>Premium Member</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <nav style={{ padding: isSidebarOpen ? '12px 12px' : '12px 8px' }}>
            <p style={{
              color: '#333', fontSize: '0.65rem', textTransform: 'uppercase',
              letterSpacing: '0.08em', padding: '4px 8px', margin: '0 0 4px',
              display: isSidebarOpen ? 'block' : 'none',
            }}>
              Navigation
            </p>
            {navItems.map(item => {
              const isActive = activeTab === item.tab;
              return (
                <motion.button
                  key={item.tab}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab(item.tab)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    gap: 10, padding: isSidebarOpen ? '10px 12px' : '10px 0',
                    justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                    background: isActive ? 'rgba(229,9,20,0.12)' : 'transparent',
                    border: isActive ? '1px solid rgba(229,9,20,0.2)' : '1px solid transparent',
                    borderRadius: 8, cursor: 'pointer',
                    marginBottom: 2, transition: 'all 0.15s',
                  }}
                  title={!isSidebarOpen ? item.label : undefined}
                >
                  <item.icon
                    size={16}
                    color={isActive ? '#E50914' : '#666'}
                    style={{ flexShrink: 0 }}
                  />
                  <AnimatePresence mode="wait">
                    {isSidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{
                          color: isActive ? '#fff' : '#888',
                          fontSize: '0.85rem',
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </nav>

          {/* Genre Chart (collapsed when sidebar is narrow) */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ padding: '0 20px 16px', borderTop: '1px solid #1a1a1a', paddingTop: 16 }}
              >
                <GenreChart />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Watch History */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ padding: '0 20px 16px', borderTop: '1px solid #1a1a1a', paddingTop: 16 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <History size={13} color="#555" />
                  <p style={{ color: '#555', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
                    Recent History
                  </p>
                </div>
                {MOCK_HISTORY.slice(0, 4).map(item => (
                  <div key={item.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: 8,
                  }}>
                    <div style={{ minWidth: 0 }}>
                      <p style={{
                        color: '#ccc', margin: 0, fontSize: '0.78rem',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 140,
                      }}>
                        {item.title}
                      </p>
                      <p style={{ color: '#444', margin: 0, fontSize: '0.68rem' }}>{item.date}</p>
                    </div>
                    <span style={{ color: '#F5C518', fontSize: '0.72rem', flexShrink: 0 }}>
                      ★ {item.rating}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Genre Learning Progress */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ padding: '0 20px 16px', borderTop: '1px solid #1a1a1a', paddingTop: 16 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  <Brain size={13} color="#E50914" />
                  <p style={{ color: '#555', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
                    AI Learning Progress
                  </p>
                </div>
                <GenreProgress />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom actions */}
        <div style={{
          padding: isSidebarOpen ? '12px 12px' : '12px 8px',
          borderTop: '1px solid #1a1a1a', flexShrink: 0,
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          <motion.button
            whileHover={{ x: 2 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: isSidebarOpen ? '10px 12px' : '10px 0',
              justifyContent: isSidebarOpen ? 'flex-start' : 'center',
              background: 'transparent', border: '1px solid transparent',
              borderRadius: 8, cursor: 'pointer',
            }}
            title={!isSidebarOpen ? 'Settings' : undefined}
          >
            <Settings size={16} color="#555" style={{ flexShrink: 0 }} />
            {isSidebarOpen && <span style={{ color: '#666', fontSize: '0.85rem' }}>Settings</span>}
          </motion.button>
          <motion.button
            whileHover={{ x: 2, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: isSidebarOpen ? '10px 12px' : '10px 0',
              justifyContent: isSidebarOpen ? 'flex-start' : 'center',
              background: 'rgba(229,9,20,0.05)', border: '1px solid rgba(229,9,20,0.12)',
              borderRadius: 8, cursor: 'pointer',
            }}
            title={!isSidebarOpen ? 'Logout' : undefined}
          >
            <LogOut size={16} color="#E50914" style={{ flexShrink: 0 }} />
            {isSidebarOpen && <span style={{ color: '#E50914', fontSize: '0.85rem' }}>Logout</span>}
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
};