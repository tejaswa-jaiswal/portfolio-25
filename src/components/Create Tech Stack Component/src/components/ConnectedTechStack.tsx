import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface TechNode {
  id: string;
  name: string;
  x: number;
  y: number;
  icon?: string;
}

interface Connection {
  from: string;
  to: string;
}

export function ConnectedTechStack() {
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      const width = Math.min(window.innerWidth * 0.9, 800);
      const height = Math.min(width * 0.5, 400);
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Define tech stack nodes in a network layout
  const nodes: TechNode[] = [
    { id: 'genai', name: 'GenAI', x: 0.5, y: 0.15 },
    { id: 'cv', name: 'Computer Vision', x: 0.15, y: 0.4 },
    { id: 'ml', name: 'ML', x: 0.85, y: 0.4 },
    { id: 'python', name: 'Python', x: 0.5, y: 0.5 },
    { id: 'react', name: 'React', x: 0.2, y: 0.75 },
    { id: 'django', name: 'Django', x: 0.5, y: 0.85 },
    { id: 'fastapi', name: 'FastAPI', x: 0.8, y: 0.75 },
    { id: 'sql', name: 'SQL', x: 0.65, y: 0.65 },
  ];

  // Define connections between nodes
  const connections: Connection[] = [
    { from: 'python', to: 'genai' },
    { from: 'python', to: 'cv' },
    { from: 'python', to: 'ml' },
    { from: 'python', to: 'django' },
    { from: 'python', to: 'fastapi' },
    { from: 'genai', to: 'cv' },
    { from: 'genai', to: 'ml' },
    { from: 'django', to: 'sql' },
    { from: 'fastapi', to: 'sql' },
    { from: 'react', to: 'django' },
    { from: 'react', to: 'fastapi' },
  ];

  const getNodePosition = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };
    return {
      x: node.x * dimensions.width,
      y: node.y * dimensions.height,
    };
  };

  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="overflow-visible"
        style={{ maxWidth: '100%' }}
      >
        {/* Render connections */}
        {connections.map((conn, idx) => {
          const from = getNodePosition(conn.from);
          const to = getNodePosition(conn.to);
          const length = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));

          return (
            <motion.line
              key={`${conn.from}-${conn.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary/30 animate-pulse-slow"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{
                pathLength: { duration: 1.5, delay: idx * 0.1 },
                opacity: { duration: 0.5, delay: idx * 0.1 },
              }}
              strokeDasharray={length}
              strokeDashoffset={length}
              style={{
                strokeDashoffset: 0,
                animation: `dash 2s linear ${idx * 0.1}s forwards`,
              }}
            />
          );
        })}

        {/* Render nodes */}
        {nodes.map((node, idx) => {
          const pos = getNodePosition(node.id);
          return (
            <g key={node.id}>
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r="6"
                fill="currentColor"
                className="text-primary animate-glow"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
              />
              <motion.foreignObject
                x={pos.x - 50}
                y={pos.y + 12}
                width="100"
                height="40"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
              >
                <div className="flex justify-center">
                  <div className="glass px-3 py-1 rounded-lg text-foreground/90 whitespace-nowrap text-center text-sm">
                    {node.name}
                  </div>
                </div>
              </motion.foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
