import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import {TechStackVisualization} from './components/TechStackVisulization';
import { GridBackground } from './components/GridBackground';
import { ThemeToggle } from './components/ThemeToggle';
import { Toaster } from './components/ui/sonner';
import { Brain } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Animated Grid Background */}
      <GridBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg neon-border bg-primary/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-xl neon-glow text-primary">TJ</h1>
            </div>
            <div className="hidden md:flex gap-8">
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors relative group">
                Skills
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors relative group">
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Available</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sections */}
      <Hero />
      <About />
      <TechStackVisualization />
      <Projects />
      

      {/* Footer */}
      <footer className="glass-strong border-t border-border/50 py-8 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg neon-border bg-primary/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm">
                © 2025 Tejaswa Jaiswal • Built with React, Three.js, Motion & Tailwind CSS
              </p>
            </div>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                AI Developer
              </span>
            </div>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}
