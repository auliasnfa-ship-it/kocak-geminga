import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Target, Heart, Briefcase, Calendar, Quote } from 'lucide-react';

const bioData = [
  {
    title: 'Profil Pribadi',
    desc: 'Lahir pada 21 April 2011 di Aceh Besar. Saat ini saya menjalani masa remaja dengan fokus mengembangkan diri.',
    quote: 'Mimpi adalah kompas hidup.',
    icon: Calendar,
    color: 'from-orange-400 to-red-500'
  },
  {
    title: 'Pendidikan',
    desc: 'Siswa kelas X-11 di MAN 1 Banda Aceh. Sedang menempuh jalur persiapan untuk sekolah kedinasan.',
    quote: 'Belajar adalah investasi terbaik.',
    icon: BookOpen,
    color: 'from-blue-400 to-indigo-600'
  },
  {
    title: 'Cita-Cita',
    desc: 'Bercita-cita menjadi perwira polisi untuk mengabdi pada negara dan menjaga keamanan masyarakat.',
    quote: 'Disiplin adalah kunci sukses.',
    icon: Target,
    color: 'from-red-400 to-rose-600'
  },
  {
    title: 'Hobi',
    desc: 'Sangat menyukai olahraga badminton untuk melatih ketangkasan, kesehatan, dan sportivitas.',
    quote: 'Tubuh kuat, jiwa sehat.',
    icon: Heart,
    color: 'from-pink-400 to-purple-600'
  },
];

export default function AboutSection() {
  const [cards, setCards] = useState(bioData);

  const shiftCard = () => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const movedCard = newCards.shift();
      newCards.push(movedCard);
      return newCards;
    });
  };

  const activeCard = cards[0];

  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">About Me</h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Layout Utama: Flex Row untuk Desktop, Column untuk Mobile */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
          
          {/* Sisi Kiri: Kata Motivasi (Dynamic) */}
          <motion.div 
            key={activeCard.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 max-w-sm text-center md:text-left"
          >
            <Quote className="h-10 w-10 text-primary mx-auto md:mx-0 mb-6 opacity-50" />
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-4">
              {activeCard.title}
            </h3>
            <p className="text-2xl md:text-3xl font-medium italic text-foreground leading-snug">
              "{activeCard.quote}"
            </p>
          </motion.div>

          {/* Sisi Kanan: Tumpukan Kartu */}
          <div className="relative w-full max-w-[350px] h-[350px]">
            <AnimatePresence mode="popLayout">
              {cards.map((item, index) => {
                const isTop = index === 0;
                return (
                  <motion.div
                    key={item.title}
                    style={{ zIndex: cards.length - index }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{
                      scale: 1 - index * 0.05,
                      y: index * 15,
                      opacity: isTop ? 1 : 0.6,
                    }}
                    exit={{ x: 300, opacity: 0, rotate: 20 }}
                    drag={isTop ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => {
                      if (info.offset.x > 100 || info.offset.x < -100) {
                        shiftCard();
                      }
                    }}
                    className={`absolute inset-0 p-8 rounded-[2rem] glass border border-white/10 shadow-2xl flex flex-col justify-center bg-white/5 backdrop-blur-md cursor-grab active:cursor-grabbing`}
                  >
                    <div className={`p-4 rounded-2xl bg-gradient-to-br w-fit mb-6 shadow-md ${item.color} text-white`}>
                      <item.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-16 text-center text-muted-foreground text-sm animate-pulse">
          ← Geser kartu ke samping →
        </p>
      </div>
    </section>
  );
}