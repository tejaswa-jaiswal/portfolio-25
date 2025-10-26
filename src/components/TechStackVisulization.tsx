import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Database, Cpu, Code, Brain, Eye, Zap } from 'lucide-react';

interface Tech {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  x: number; // percent 0-100
  y: number; // percent 0-100
}

interface Connection {
  from: string;
  to: string;
}

export function TechStackVisualization() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // measure container so we can convert % -> px
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
      console.log('TechStack container rect:', rect);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Tech nodes
  const techs: Tech[] = [
    { id: 'django', name: 'Django', icon: <Code size={32} />, color: '#c55822', x: 20, y: 30 },
    { id: 'fastapi', name: 'FastAPI', icon: <Zap size={32} />, color: '#f97316', x: 80, y: 30 },
    { id: 'react', name: 'React', icon: <Cpu size={32} />, color: '#38bdf8', x: 50, y: 15 },
    { id: 'genai', name: 'GenAI', icon: <Brain size={32} />, color: '#10b981', x: 35, y: 50 },
    { id: 'sql', name: 'SQL', icon: <Database size={32} />, color: '#f59e0b', x: 65, y: 50 },
    { id: 'cv', name: 'Computer Vision', icon: <Eye size={32} />, color: '#0ea5e9', x: 50, y: 70 },
  ];

  const connections: Connection[] = [
    { from: 'django', to: 'react' },
    { from: 'fastapi', to: 'react' },
    { from: 'django', to: 'sql' },
    { from: 'fastapi', to: 'sql' },
    { from: 'django', to: 'genai' },
    { from: 'fastapi', to: 'genai' },
    { from: 'genai', to: 'cv' },
    { from: 'sql', to: 'cv' },
    { from: 'react', to: 'genai' },
    { from: 'react', to: 'sql' },
  ];

  const getTechById = (id: string) => techs.find(t => t.id === id);
  const px = (percent: number, axis: 'x' | 'y') =>
    axis === 'x'
      ? size.width ? (percent / 100) * size.width : 0
      : size.height ? (percent / 100) * size.height : 0;

  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    color: ['#06b6d4', '#0ea5e9', '#38bdf8', '#3b82f6', '#60a5fa'][Math.floor(Math.random() * 5)],
  }));

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        background: 'black',
        overflow: 'hidden',
      }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      {/* Glows */}
      <motion.div className="absolute top-20 left-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" animate={{ scale: [1.3, 1, 1.3], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[180px]" animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />

      {/* Floating particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: `${p.x}%`,
            top: `${p.y}%`,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
            zIndex: 0,
          }}
          animate={{ y: [0, -100, 0], x: [0, Math.sin(p.id) * 50, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Main content */}
      <div className="relative w-full h-full flex items-center justify-center" style={{ zIndex: 10 }}>
        {/* SVG Connections */}
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none', zIndex: 0 }}>
          <defs>
            {techs.map(tech => (
              <linearGradient key={`gradient-${tech.id}`} id={`gradient-${tech.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: tech.color, stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: tech.color, stopOpacity: 0.3 }} />
              </linearGradient>
            ))}
          </defs>

          {connections.map((conn, idx) => {
            const from = getTechById(conn.from);
            const to = getTechById(conn.to);
            if (!from || !to) return null;

            const x1 = px(from.x, 'x');
            const y1 = px(from.y, 'y');
            const x2 = px(to.x, 'x');
            const y2 = px(to.y, 'y');
            const isActive = activeNode === conn.from || activeNode === conn.to;

            return (
              <g key={`${conn.from}-${conn.to}`}>
                <motion.line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={`url(#gradient-${from.id})`}
                  strokeWidth={isActive ? 3 : 1.8}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: isActive ? 1 : 0.5,
                    filter: isActive
                      ? `drop-shadow(0 0 10px ${from.color})`
                      : `drop-shadow(0 0 6px ${from.color}60)`,
                  }}
                  transition={{
                    pathLength: { duration: 1.5, delay: idx * 0.05 },
                    opacity: { duration: 0.4 },
                  }}
                />

                <motion.circle
                  r={3}
                  fill={from.color}
                  style={{ filter: `drop-shadow(0 0 4px ${from.color})` }}
                  animate={{
                    cx: [x1, x2],
                    cy: [y1, y2],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 3 + idx * 0.3,
                    repeat: Infinity,
                    ease: 'linear',
                    times: [0, 0.2, 0.8, 1],
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Tech nodes */}
        {techs.map((tech, idx) => (
          <motion.div
            key={tech.id}
            className="absolute cursor-pointer group"
            style={{
              left: `${tech.x}%`,
              top: `${tech.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.12, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.15 }}
            onHoverStart={() => setActiveNode(tech.id)}
            onHoverEnd={() => setActiveNode(null)}
          >
            <motion.div
              className="relative flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 backdrop-blur-sm transition-all duration-300"
              style={{
                borderColor: tech.color,
                backgroundColor: activeNode === tech.id ? `${tech.color}25` : `${tech.color}15`,
                boxShadow: activeNode === tech.id
                  ? `0 0 40px ${tech.color}80, inset 0 0 20px ${tech.color}30`
                  : `0 0 20px ${tech.color}60, inset 0 0 10px ${tech.color}20`,
              }}
              animate={{
                rotate: activeNode === tech.id ? [0, 5, -5, 0] : 0,
                scale: activeNode === tech.id ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Outer glow pulse */}
              <motion.div
                style={{
                  position: 'absolute',
                  width: '120%',
                  height: '120%',
                  borderRadius: '9999px',
                  border: `2px solid ${tech.color}`,
                  opacity: activeNode === tech.id ? 0.4 : 0,
                  filter: `blur(4px)`,
                }}
                animate={{
                  scale: activeNode === tech.id ? [1, 1.3, 1] : 1,
                  opacity: activeNode === tech.id ? [0.3, 0.5, 0.3] : 0,
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div style={{ color: tech.color }}>{tech.icon}</div>
              <div className="mt-2 text-xs tracking-wider uppercase" style={{ color: tech.color }}>
                {tech.name}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Title */}
      <motion.div
        className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <h1
          className="text-5xl tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-500 bg-clip-text text-transparent"
          style={{ textShadow: '0 0 40px rgba(14, 165, 233, 0.3)' }}
        >
          Tech Stack
        </h1>
      </motion.div>

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(14,165,233,0.03)_50%)] bg-[length:100%_4px] animate-[scan_8s_linear_infinite]"
        style={{ zIndex: 5 }}
      />
      <style>{`
        @keyframes scan {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
      `}</style>
    </div>
  );
}
