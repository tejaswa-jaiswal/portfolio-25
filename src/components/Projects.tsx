import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "AI-Powered Document Analyzer",
      description: "GenAI application using LLMs to extract insights from documents, featuring intelligent summarization and Q&A capabilities.",
      tags: ["OpenAI", "FastAPI", "React"],
      color: "from-cyan-500 to-blue-500",
      metric: "LLM Integration"
    },
    {
      title: "Computer Vision App",
      description: "Real-time object detection and tracking system built with OpenCV and TensorFlow for surveillance and analytics.",
      tags: ["TensorFlow", "OpenCV", "Python"],
      color: "from-purple-500 to-pink-500",
      metric: "Real-time Detection"
    },
    {
      title: "E-Commerce Platform",
      description: "Full-stack shopping platform with recommendation engine, payment integration, and admin dashboard.",
      tags: ["Django", "React", "PostgreSQL"],
      color: "from-green-500 to-teal-500",
      metric: "Full Stack"
    },
    {
      title: "ML Model API Service",
      description: "FastAPI-based microservice deploying multiple ML models with authentication, caching, and monitoring.",
      tags: ["FastAPI", "Docker", "Redis"],
      color: "from-orange-500 to-red-500",
      metric: "Production Ready"
    },
    {
      title: "Chat Application with AI",
      description: "Real-time messaging app integrated with AI chatbot capabilities using modern websockets and GenAI tools.",
      tags: ["React", "Django", "WebSockets"],
      color: "from-blue-500 to-indigo-500",
      metric: "AI-Enhanced"
    },
    {
      title: "Data Analytics Dashboard",
      description: "Interactive dashboard for visualizing ML model performance metrics with real-time updates and insights.",
      tags: ["React", "FastAPI", "Plotly"],
      color: "from-pink-500 to-purple-500",
      metric: "Interactive Viz"
    }
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto w-full" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">
            <span className="neon-glow-purple text-primary">AI Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Production-grade machine learning systems solving real-world problems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isInView }: { 
  project: any; 
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-strong rounded-xl overflow-hidden group relative"
    >
      {/* Gradient header */}
      <div className={`h-2 bg-gradient-to-r ${project.color}`} />
      
      <div className="p-6">
        {/* Title with icon */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <Sparkles className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag: string) => (
            <span 
              key={tag}
              className="px-3 py-1 glass text-xs text-primary rounded-full border border-primary/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Metric badge */}
        <div className="flex items-center justify-between">
          <div className={`px-3 py-1 rounded-lg text-xs bg-gradient-to-r ${project.color} text-white`}>
            {project.metric}
          </div>
          
          {/* Action buttons */}
          <motion.div 
            className="flex gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-4 h-4" />
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 pointer-events-none`}
        animate={{ opacity: isHovered ? 0.05 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
