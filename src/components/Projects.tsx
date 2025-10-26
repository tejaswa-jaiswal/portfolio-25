import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
  {
    title: "Mobile Price Prediction",
    description: "Machine learning project that predicts mobile prices using EDA, feature engineering, and deep learning models for accurate classification.",
    tags: ["EDA", "ML", "DL", "Regex", "NumPy", "Pandas", "Matplotlib"],
    color: "from-cyan-500 to-blue-500",
    metric: "Predictive Analytics",
    github: "github.com/tejaswa-jaiswal/mobile-price-prediction",
  },
  {
    title: "Captcha Prediction",
    description: "Deep learning-based system that uses OpenCV and CNN to recognize and decode complex CAPTCHA images with data preprocessing and cleaning.",
    tags: ["OpenCV", "CNN", "Data Cleaning"],
    color: "from-purple-500 to-pink-500",
    metric: "Computer Vision",
    github: "github.com/tejaswa-jaiswal/captcha-prediction",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce website with Django backend, REST APIs, and integrated payment gateway for seamless online shopping.",
    tags: ["Django", "API", "Payment Gateway"],
    color: "from-green-500 to-teal-500",
    metric: "Full Stack",
    github: "github.com/tejaswa-jaiswal/ecommerce-",
  },
  {
    title: "HobbyVerse",
    description: "Real-time web application that connects people with similar interests using Django and WebSockets for live chat and community building.",
    tags: ["Django", "WebSockets", "Real-Time Chat"],
    color: "from-blue-500 to-indigo-500",
    metric: "Social Platform",
    github: "github.com/tejaswa-jaiswal/hobbyverse",
  },
  {
    title: "Attendance System",
    description: "Smart attendance tracking system designed for accuracy and ease of use, featuring database integration and real-time updates.",
    tags: ["Python", "Database", "Automation"],
    color: "from-orange-500 to-red-500",
    metric: "Automation",
    github: "github.com/tejaswa-jaiswal/Attendance-System",
  },
  {
    title: "Hospital Management System",
    description: "Comprehensive web-based solution to manage patient records, appointments, and staff operations efficiently using Django.",
    tags: ["Django", "SQL", "Web App"],
    color: "from-pink-500 to-purple-500",
    metric: "Management System",
    github: "github.com/tejaswa-jaiswal/Hospital-management-system",
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
  {/* GitHub link */}
  <a
    href={`https://${project.github}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-primary transition-colors"
  >
    <Github className="w-4 h-4" />
  </a>

  {/* External link (optional, if you add project.demo later) */}
  <a
    href={project.demo || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-primary transition-colors"
  >
    <ExternalLink className="w-4 h-4" />
  </a>
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
