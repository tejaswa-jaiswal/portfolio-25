import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronDown, Cpu } from 'lucide-react';
import { NeuralNetwork3D } from './NeuralNetwork3D';

export function Hero() {
  const [text, setText] = useState('');
  const fullText = "AI Developer | Full Stack Engineer";
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden">
      {/* 3D Neural Network Background */}
      <div className="absolute inset-0 opacity-40">
        <NeuralNetwork3D />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-6 text-4xl md:text-6xl relative inline-block leading-tight">
            {/* Soft blurred gradient glow behind the name (decorative) */}
            <span aria-hidden className="absolute inset-0 -z-10 rounded-xl opacity-30 blur-3xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 transform scale-105" />

            {/* Name with gradient text and strong weight */}
            <span className="font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-400 to-pink-400 font-extrabold tracking-tight">
              Tejaswa Jaiswal
            </span>

            {/* Animated accent underline (respects reduced-motion) */}
            <span className="block h-1 w-28 rounded-full mt-4 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-90 motion-safe:animate-pulse motion-reduce:opacity-80" />

            {/* Decorative sparkle (SVG) */}
            <svg
              aria-hidden
              className="absolute -top-3 -right-6 w-5 h-5 text-pink-300 opacity-90"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2c.8 2.5 2.9 3.7 5.5 4.2-2.6.5-4.7 1.7-5.5 4.2-.8-2.5-2.9-3.7-5.5-4.2C9.1 5.7 11.2 4.5 12 2z" fill="currentColor" />
            </svg>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="mb-8 text-2xl md:text-4xl">
            <span className="neon-glow text-primary">{text}</span>
            <span className={`inline-block w-1 h-8 md:h-10 bg-primary ml-2 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
          </h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-muted-foreground mb-8 max-w-2xl mx-auto text-primary text-lg md:text-xl"
        >
        I don’t steal frontend… maybe I do, but I call it innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <button 
            onClick={scrollToNext}
            className="px-8 py-4 neon-border rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300"
          >
            Explore Projects
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 glass rounded-lg text-foreground hover:bg-accent transition-all duration-300"
          >
            Connect
          </button>
        </motion.div>

        {/* Tech stack indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 flex gap-4 justify-center flex-wrap"
        >
          {['Python', 'TensorFlow', 'React', 'Django', 'GenAI'].map((tech, i) => (
            <div
              key={tech}
              className="glass px-4 py-2 rounded-lg text-sm text-foreground/80"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {tech}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-10"
        onClick={scrollToNext}
        whileHover={{ y: 5 }}
      >
        <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
      </motion.div>
    </section>
  );
}
