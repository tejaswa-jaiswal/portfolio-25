import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Zap, Target, Database } from 'lucide-react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Building intelligent models with TensorFlow, PyTorch, and OpenCV for computer vision and NLP",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Zap,
      title: "Full Stack Development",
      description: "Crafting robust applications with React, Django, and FastAPI",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Generative AI",
      description: "Leveraging LLMs and GenAI tools to create innovative solutions",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Database,
      title: "Production Systems",
      description: "Deploying scalable ML pipelines and APIs that deliver real value",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto w-full" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">
            <span className="neon-glow-purple text-primary">About Me</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            I'm an AI Developer and Full Stack Engineer passionate about creating intelligent systems that solve real-world problems. 
            My expertise spans machine learning, computer vision, and generative AI, combined with robust full-stack development skills. 
            I thrive at the intersection of cutting-edge AI research and practical software engineering, building scalable solutions 
            that make a meaningful impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-strong rounded-xl p-6 relative overflow-hidden group"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg mb-4 neon-border bg-primary/5">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
              </motion.div>
            );
          })}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '20+', label: 'Projects Completed' },
            { value: '5+', label: 'AI Models Deployed' },
            { value: 'Full Stack', label: 'Development' },
            { value: 'GenAI', label: 'Specialist' }
          ].map((stat, i) => (
            <div key={i} className="glass text-center p-6 rounded-lg">
              <div className="text-3xl mb-2 neon-glow text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
