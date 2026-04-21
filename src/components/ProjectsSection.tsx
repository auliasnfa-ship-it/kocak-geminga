import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

// (Data projects tetap sama seperti sebelumnya)
const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Platform e-commerce modern yang ada di HP bisa digunakan untuk belanja online.',
    tags: ['Shopee', 'Lazada', 'Tokopedia', 'TikTok Shop'],
    image: '🛒',
    color: 'from-blue-500/20 to-cyan-500/20',
    github: 'https://github.com/auliasnfa-ship-it/kocak-geminga.git',
    demo: 'https://www.tokopedia.com/',
  },
  {
    title: 'Learning Platform',
    description: 'Platform pembelajaran online yang mempermudah kamu dalam belajar.',
    tags: ['Ruang Guru', 'Duoligo', 'Quipper', 'Zenius'],
    image: '📚',
    color: 'from-purple-500/20 to-pink-500/20',
    github: 'https://github.com/auliasnfa-ship-it/kocak-geminga.git',
    demo: 'https://app.ruangguru.com/',
  },
  {
    title: 'Social Media Platform',
    description: 'Platform yang sangat berguna untuk social media dan sharing-sharing.',
    tags: ['WhatsApp', 'TikTok', 'Instagram', 'Facebook'],
    image: '📊',
    color: 'from-orange-500/20 to-red-500/20',
    github: 'https://github.com/auliasnfa-ship-it/kocak-geminga.git',
    demo: 'https://www.instagram.com/',
  },
  {
    title: 'AI Platform',
    description: 'Situs atau APK berbasis AI untuk mempermudah mencari informasi.',
    tags: ['ChatGPT', 'Gemini', 'GoogleAI', 'MetaAI'],
    image: '🤖',
    color: 'from-green-500/20 to-teal-500/20',
    github: 'https://github.com/auliasnfa-ship-it/kocak-geminga.git',
    demo: 'https://gemini.google.com/',
  },
  {
    title: 'Video Editing Tutorial',
    description: 'Video tutorial yang sudah tersebar di banyak platform yang dapat mempermudah pengerjaan suatu tugas.',
    tags: ['TikTok', 'Instagram', 'YouTube'],
    image: '🎬',
    color: 'from-red-500/20 to-orange-500/20',
    isContent: true,
    youtube: 'https://www.youtube.com/',
  },
  {
    title: 'Coding Tips & Tricks',
    description: 'Konten tips & tricks dalam melakukan proggaming atau coding.',
    tags: ['Instagram', 'TikTok', 'YouTube'],
    image: '💡',
    color: 'from-cyan-500/20 to-blue-500/20',
    isContent: true,
    youtube: 'https://www.youtube.com/',
  },
];

const ProjectCard = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // --- PERUBAHAN DI SINI: Dibuat lebih rendah agar gerakan lebih santai ---
  const mouseXSpring = useSpring(x, { stiffness: 80, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 80, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group h-full perspective-1000"
    >
      <div className="h-full p-6 glass rounded-2xl shadow-card hover:shadow-2xl transition-all duration-300 bg-white border border-slate-100">
        <div className={`aspect-video rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${project.color}`}>
          <motion.span 
            className="text-6xl inline-block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {project.image}
          </motion.span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {project.isContent && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium">
                Content
              </span>
            )}
            <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex gap-2 pt-2">
            {project.github && (
              <Button variant="outline" size="sm" className="rounded-full" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4 mr-1" /> Code</a>
              </Button>
            )}
            {project.demo && (
              <Button size="sm" className="rounded-full" asChild>
                <a href={project.demo} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4 mr-1" /> Demo</a>
              </Button>
            )}
            {project.youtube && (
              <Button size="sm" className="rounded-full" asChild>
                <a href={project.youtube} target="_blank" rel="noopener noreferrer"><Play className="h-4 w-4 mr-1" /> Watch</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Portfolio</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Projects &amp; Karya</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}