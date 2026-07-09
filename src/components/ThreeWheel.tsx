import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Music, Briefcase, Star, Trophy, Camera, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import rouletteImg from '../assets/roulette.png';

const categories = [
  { id: 'entrepreneur', icon: <Briefcase size={20} />, color: '#0F172A' },
  { id: 'talents', icon: <Star size={20} />, color: '#D4AF37' },
  { id: 'sport', icon: <Trophy size={20} />, color: '#0F172A' },
  { id: 'musique', icon: <Music size={20} />, color: '#D4AF37' },
  { id: 'influence', icon: <Camera size={20} />, color: '#0F172A' },
  { id: 'autre', icon: <Sparkles size={20} />, color: '#D4AF37' },
];

const ThreeWheel: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCatId, setSelectedCatId] = useState(categories[0].id);
  const [isSpinning, setIsSpinning] = useState(false);
  const controls = useAnimation();

  const handleSpin = async () => {
    if (isSpinning) return;
    setIsSpinning(true);
    await controls.start({
      rotate: [0, 3600],
      transition: { duration: 4, ease: [0.45, 0.05, 0.55, 0.95] }
    });
    controls.start({
      rotate: [0, 360],
      transition: { duration: 40, repeat: Infinity, ease: "linear" }
    });
    setIsSpinning(false);
  };

  const selectedCat = categories.find(c => c.id === selectedCatId) || categories[0];

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1rem', background: 'var(--bg)' }}>

      {/* Wheel Section - overflow hidden clips the zoomed image edges */}
      <div style={{ position: 'relative', width: 'min(500px, 90vw)', height: 'min(500px, 90vw)', marginBottom: '4rem', overflow: 'hidden', borderRadius: '50%' }}>
        {/* The Animated Wheel Wrapper */}
        <motion.div
          onClick={handleSpin}
          animate={controls}
          initial={{ rotate: 0 }}
          transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" } }}
          style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1, cursor: 'pointer' }}
        >
          <img
            src={rouletteImg}
            alt="Roulette Faymz"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transform: 'scale(1.12)'
            }}
          />
        </motion.div>
      </div>

      {/* Title After Roulette */}
      <h3 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem', textAlign: 'center', color: 'var(--accent)' }}>
        {t('wheel.title')}
      </h3>

      {/* Categories Grid */}
      <div style={{ maxWidth: '800px', width: '90%', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                background: selectedCatId === cat.id ? 'var(--accent)' : 'var(--bg-alt)',
                color: selectedCatId === cat.id ? '#fff' : 'var(--text)',
                border: `1px solid ${selectedCatId === cat.id ? 'var(--accent)' : 'var(--glass-border)'}`,
                fontWeight: 600,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              {cat.icon}
              {t(`wheel.cats.${cat.id}`)}
            </button>
          ))}
        </div>

        {/* Dynamic Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card"
            style={{ padding: '2.5rem', textAlign: 'left', borderLeft: `6px solid ${selectedCat.color}` }}
          >
            <div style={{ color: selectedCat.color, marginBottom: '1rem' }}>{selectedCat.icon}</div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}>{t('wheel.prefix')}{t(`wheel.cats.${selectedCat.id}`)}</h2>
            <p 
              style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: '1.7', fontWeight: 400 }}
              dangerouslySetInnerHTML={{ __html: t(`wheel.cats.${selectedCat.id}_desc`) }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThreeWheel;
