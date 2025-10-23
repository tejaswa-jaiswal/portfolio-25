import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      category: "AI & Machine Learning",
      skills: [
        { name: "TensorFlow", level: 90 },
        { name: "OpenCV", level: 85 },
        { name: "GenAI / LLMs", level: 88 }
      ],
      color: "from-cyan-500 to-blue-500"
    },
    {
      category: "Backend Development",
      skills: [
        { name: "Python", level: 95 },
        { name: "Django", level: 90 },
        { name: "FastAPI", level: 88 }
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      category: "Frontend & Full Stack",
      skills: [
        { name: "React / TypeScript", level: 87 },
        { name: "Tailwind CSS", level: 92 },
        { name: "RESTful APIs", level: 90 }
      ],
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">
            <span className="neon-glow-purple text-primary">Skills & Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive tech stack combining AI/ML with modern full-stack development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="glass-strong rounded-xl p-6"
            >
              <h3 className="mb-6 text-primary">{category.category}</h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground text-sm">{skill.name}</span>
                      <span className="text-primary text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ 
                          duration: 1.5, 
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3,
                          ease: "easeOut" 
                        }}
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full relative`}
                      >
                        {/* Animated glow */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ['-100%', '200%']
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: categoryIndex * 0.2 + skillIndex * 0.1 + 1
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Category accent */}
              <div className={`mt-6 h-1 rounded-full bg-gradient-to-r ${category.color} opacity-50`} />
            </motion.div>
          ))}
        </div>

        {/* Additional technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4 text-sm">Also proficient in:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['NumPy', 'Pandas', 'PostgreSQL', 'MongoDB', 'Docker', 'Git', 'AWS', 'Jupyter'].map((tech, i) => (
              <span
                key={tech}
                className="glass px-4 py-2 rounded-full text-sm text-primary border border-primary/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
