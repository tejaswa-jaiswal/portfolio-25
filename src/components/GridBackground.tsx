export function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated grid */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 128, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 128, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}
      />
      
      {/* Gradient overlays - Light mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-purple-50/30 to-cyan-100/50 dark:from-purple-900/20 dark:via-transparent dark:to-cyan-900/20" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-100/20 to-transparent dark:via-blue-900/10" />
      
      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <style>{`
        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }
      `}</style>
    </div>
  );
}
