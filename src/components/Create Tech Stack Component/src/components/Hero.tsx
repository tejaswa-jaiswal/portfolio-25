import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { NeuralNetwork3D } from './NeuralNetwork3D';
import { ConnectedTechStack } from './ConnectedTechStack';

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
          <h1 className="mb-6 text-4xl md:text-6xl">
            <span className="text-foreground">Tejaswa Jaiswal</span>
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
          className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg md:text-xl"
        >
          I build intelligent systems that bridge code and cognition.
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

        {/* Connected Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16"
        >
          <ConnectedTechStack />
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
