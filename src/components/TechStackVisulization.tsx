import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Database, Cpu, Code, Brain, Eye, Zap } from 'lucide-react';

interface Tech {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  x: number;
  y: number;
}

interface Connection {
  from: string;
  to: string;
}

export function TechStackVisualization() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Black-blue themed colors
  const techs: Tech[] = [
    { id: 'django', name: 'Django', icon: <Code size={32} />, color: '#0ea5e9', x: 20, y: 30 },
    { id: 'fastapi', name: 'FastAPI', icon: <Zap size={32} />, color: '#06b6d4', x: 80, y: 30 },
    { id: 'react', name: 'React', icon: <Cpu size={32} />, color: '#38bdf8', x: 50, y: 15 },
    { id: 'genai', name: 'GenAI', icon: <Brain size={32} />, color: '#3b82f6', x: 35, y: 50 },
    { id: 'sql', name: 'SQL', icon: <Database size={32} />, color: '#60a5fa', x: 65, y: 50 },
    { id: 'cv', name: 'Computer Vision', icon: <Eye size={32} />, color: '#0284c7', x: 50, y: 70 },
  ];

  // Generate random particles with blue theme
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    color: ['#06b6d4', '#0ea5e9', '#38bdf8', '#3b82f6', '#60a5fa'][Math.floor(Math.random() * 5)],
  }));

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

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
      
      {/* Glowing orbs in background - Blue themed */}
      <motion.div
        className="absolute top-20 left-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[180px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(particle.id) * 50, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative w-full h-full flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <defs>
            {techs.map(tech => (
              <linearGradient key={`gradient-${tech.id}`} id={`gradient-${tech.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: tech.color, stopOpacity: 0.9 }} />
                <stop offset="100%" style={{ stopColor: tech.color, stopOpacity: 0.3 }} />
              </linearGradient>
            ))}
          </defs>
          
          {connections.map((conn, idx) => {
            const from = getTechById(conn.from);
            const to = getTechById(conn.to);
            if (!from || !to) return null;

            const x1 = `${from.x}%`;
            const y1 = `${from.y}%`;
            const x2 = `${to.x}%`;
            const y2 = `${to.y}%`;

            return (
              <g key={`${conn.from}-${conn.to}`}>
                {/* Main line */}
                <motion.line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={`url(#gradient-${from.id})`}
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: activeNode === conn.from || activeNode === conn.to ? 1 : 0.4,
                    strokeWidth: activeNode === conn.from || activeNode === conn.to ? 3 : 2,
                  }}
                  transition={{
                    pathLength: { duration: 2, delay: idx * 0.1 },
                    opacity: { duration: 0.3 },
                    strokeWidth: { duration: 0.3 },
                  }}
                  style={{ filter: 'drop-shadow(0 0 6px currentColor)' }}
                />
                
                {/* Animated dots flowing along the line */}
                <motion.circle
                  r="3"
                  fill={from.color}
                  style={{ filter: `drop-shadow(0 0 4px ${from.color})` }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    cx: [x1, x2],
                    cy: [y1, y2],
                  }}
                  transition={{
                    duration: 3,
                    delay: idx * 0.3,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.1, 0.9, 1],
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
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: idx * 0.15,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ scale: 1.15 }}
            onHoverStart={() => setActiveNode(tech.id)}
            onHoverEnd={() => setActiveNode(null)}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${tech.color}40 0%, transparent 70%)`,
                width: '200px',
                height: '200px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: activeNode === tech.id ? [1, 1.4, 1] : [1, 1.2, 1],
                opacity: activeNode === tech.id ? [0.6, 1, 0.6] : [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: activeNode === tech.id ? 1.5 : 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.3,
              }}
            />

            {/* Rotating ring on hover */}
            {activeNode === tech.id && (
              <motion.div
                className="absolute rounded-full border-2"
                style={{
                  borderColor: tech.color,
                  width: '160px',
                  height: '160px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderStyle: 'dashed',
                }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            )}

            {/* Ripple effect on hover */}
            {activeNode === tech.id && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`ripple-${i}`}
                    className="absolute rounded-full border"
                    style={{
                      borderColor: tech.color,
                      width: '120px',
                      height: '120px',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{
                      scale: 2,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </>
            )}

            {/* Main node */}
            <div
              className="relative flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 backdrop-blur-sm transition-all duration-300"
              style={{
                borderColor: tech.color,
                backgroundColor: activeNode === tech.id ? `${tech.color}25` : `${tech.color}15`,
                boxShadow: activeNode === tech.id 
                  ? `0 0 50px ${tech.color}80, inset 0 0 30px ${tech.color}30, 0 0 100px ${tech.color}40`
                  : `0 0 30px ${tech.color}60, inset 0 0 20px ${tech.color}20`,
              }}
            >
              <motion.div 
                style={{ color: tech.color }}
                animate={activeNode === tech.id ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                } : {}}
                transition={{
                  duration: 0.5,
                  repeat: activeNode === tech.id ? Infinity : 0,
                }}
              >
                {tech.icon}
              </motion.div>
              <div 
                className="mt-2 text-sm tracking-wider uppercase transition-all duration-300"
                style={{ 
                  color: tech.color,
                  textShadow: activeNode === tech.id ? `0 0 10px ${tech.color}` : 'none',
                }}
              >
                {tech.name}
              </div>
            </div>

            {/* Particle burst effects on hover */}
            {activeNode === tech.id && (
              <>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`burst-${i}`}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: tech.color,
                      left: '50%',
                      top: '50%',
                      boxShadow: `0 0 8px ${tech.color}`,
                    }}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1.5, 0],
                      x: Math.cos((i * Math.PI * 2) / 12) * 80,
                      y: Math.sin((i * Math.PI * 2) / 12) * 80,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </>
            )}

            {/* Additional spinning particles */}
            {activeNode === tech.id && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`spin-${i}`}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: tech.color,
                      boxShadow: `0 0 6px ${tech.color}`,
                    }}
                    animate={{
                      x: Math.cos((i * Math.PI * 2) / 8 + Date.now() * 0.001) * 70,
                      y: Math.sin((i * Math.PI * 2) / 8 + Date.now() * 0.001) * 70,
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ))}
              </>
            )}
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
        <h1 className="text-5xl tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-500 bg-clip-text text-transparent" 
            style={{ fontWeight: 700, textShadow: '0 0 40px rgba(14, 165, 233, 0.3)' }}>
          Tech Stack
        </h1>
      </motion.div>

      {/* Scanline effect - Blue tinted */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(14,165,233,0.03)_50%)] bg-[length:100%_4px] animate-[scan_8s_linear_infinite]" />

     <style>
  {`
    @keyframes scan {
      0% { background-position: 0 0; }
      100% { background-position: 0 100%; }
    }
  `}
</style>
    </div>
  );
}
