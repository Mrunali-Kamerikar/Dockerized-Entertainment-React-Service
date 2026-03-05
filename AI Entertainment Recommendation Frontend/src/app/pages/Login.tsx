import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Brain, Film, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router';

// Particle animation on canvas
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      radius: number; opacity: number; color: string;
    }

    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.05,
      color: Math.random() > 0.7 ? '#E50914' : '#ffffff',
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(229,9,20,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />;
};

export const Login: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) { setError('Please enter your username'); return; }
    if (!password.trim()) { setError('Please enter your password'); return; }
    setError('');
    setIsLoading(true);
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemo = async () => {
    setIsLoading(true);
    await login('CinemaFan', 'demo');
    navigate('/dashboard');
  };

  return (
    <div
      style={{
        minHeight: '100vh', background: '#0a0a0a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Animated background */}
      <ParticleBackground />

      {/* Radial gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(229,9,20,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Film strip decoration */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 6,
        background: 'repeating-linear-gradient(90deg, #E50914 0px, #E50914 40px, transparent 40px, transparent 50px)',
        opacity: 0.6,
      }} />

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          background: 'rgba(20,20,20,0.95)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20,
          padding: '40px 40px',
          width: '100%', maxWidth: 400,
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(229,9,20,0.1)',
          zIndex: 10, position: 'relative',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: 'linear-gradient(135deg, #E50914, #b30000)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(229,9,20,0.4)',
            }}>
              <Brain size={28} color="#fff" />
            </div>
            <div>
              <h1 style={{
                color: '#fff', margin: 0,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '2rem', letterSpacing: '0.1em',
              }}>
                <span style={{ color: '#E50914' }}>CIN</span>AI
              </h1>
              <p style={{ color: '#555', fontSize: '0.72rem', margin: 0, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                AI Entertainment Guide
              </p>
            </div>
          </motion.div>
        </div>

        <h2 style={{ color: '#fff', margin: '0 0 6px', textAlign: 'center', fontSize: '1.15rem' }}>
          Welcome Back
        </h2>
        <p style={{ color: '#555', fontSize: '0.82rem', textAlign: 'center', margin: '0 0 28px' }}>
          Sign in to get personalized AI recommendations
        </p>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{
              background: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.3)',
              borderRadius: 8, padding: '10px 14px', marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <AlertCircle size={14} color="#E50914" />
            <p style={{ color: '#E50914', margin: 0, fontSize: '0.8rem' }}>{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Username */}
          <div>
            <label style={{ color: '#888', fontSize: '0.78rem', display: 'block', marginBottom: 6 }}>
              Username
            </label>
            <motion.div
              animate={{ boxShadow: focusedField === 'username' ? '0 0 0 2px rgba(229,9,20,0.35)' : '0 0 0 1px rgba(255,255,255,0.08)' }}
              style={{ borderRadius: 10, overflow: 'hidden' }}
            >
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your username"
                autoComplete="username"
                style={{
                  width: '100%', padding: '12px 14px',
                  background: 'rgba(255,255,255,0.05)', border: 'none',
                  color: '#fff', fontSize: '0.9rem', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </motion.div>
          </div>

          {/* Password */}
          <div>
            <label style={{ color: '#888', fontSize: '0.78rem', display: 'block', marginBottom: 6 }}>
              Password
            </label>
            <motion.div
              animate={{ boxShadow: focusedField === 'password' ? '0 0 0 2px rgba(229,9,20,0.35)' : '0 0 0 1px rgba(255,255,255,0.08)' }}
              style={{ borderRadius: 10, overflow: 'hidden', display: 'flex', alignItems: 'center' }}
            >
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your password"
                autoComplete="current-password"
                style={{
                  flex: 1, padding: '12px 14px',
                  background: 'rgba(255,255,255,0.05)', border: 'none',
                  color: '#fff', fontSize: '0.9rem', outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                style={{
                  background: 'rgba(255,255,255,0.05)', border: 'none',
                  padding: '12px 14px', cursor: 'pointer', color: '#666',
                  display: 'flex', alignItems: 'center',
                }}
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </motion.div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            style={{
              background: isLoading ? '#333' : 'linear-gradient(135deg, #E50914, #b30000)',
              border: 'none', borderRadius: 10, padding: '13px',
              color: '#fff', fontWeight: 700, fontSize: '0.95rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              marginTop: 4, boxShadow: isLoading ? 'none' : '0 4px 16px rgba(229,9,20,0.35)',
              transition: 'all 0.2s',
            }}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Brain size={16} /> Sign In
              </>
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#1a1a1a' }} />
          <span style={{ color: '#444', fontSize: '0.75rem' }}>or</span>
          <div style={{ flex: 1, height: 1, background: '#1a1a1a' }} />
        </div>

        {/* Demo button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDemo}
          style={{
            width: '100%', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10, padding: '11px',
            color: '#aaa', fontWeight: 600, fontSize: '0.88rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <Film size={15} /> Try Demo Account
        </motion.button>

        {/* Features preview */}
        <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {['🤖 AI Recommendations', '🎬 TMDB Powered', '⭐ Smart Ratings'].map(f => (
            <span key={f} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid #1a1a1a',
              borderRadius: 20, padding: '4px 10px', color: '#555', fontSize: '0.7rem',
            }}>
              {f}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Floating film icons */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{
            duration: 3 + i * 0.7,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 30}%`,
            color: '#E50914',
            fontSize: i % 2 === 0 ? '2rem' : '1.5rem',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {['🎬', '🎭', '🍿', '🎦', '⭐', '🎞️'][i]}
        </motion.div>
      ))}
    </div>
  );
};
