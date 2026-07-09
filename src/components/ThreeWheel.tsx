import React, { useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Music, Briefcase, Star, Trophy, Camera, Sparkles } from 'lucide-react';
import rouletteImg from '../assets/roulette.png';

const categories = [
  {
    id: 'entrepreneur',
    label: 'Entrepreneurs',
    icon: <Briefcase size={20} />,
    color: '#0F172A',
    details: <>Fondateurs, business angels, investisseurs, experts et mentors stratégiques.<br /><br />Exemple d'expérience inédite : Session « Pitch & Feedback » ou masterclass sur la levée de fonds avec un business angel renommé ou un entrepreneur à succès, pour bénéficier de conseils sur-mesure et d'un regard critique sur votre projet.</>
  },
  {
    id: 'talents',
    label: 'Talents',
    icon: <Star size={20} />,
    color: '#D4AF37',
    details: <>Acteurs, humoristes, artistes et autres profils créatifs de la scène et de l'écran.<br /><br />Exemple d'expérience inédite : Un « mini-show privé » avec un humoriste.</>
  },
  {
    id: 'sport',
    label: 'Sport',
    icon: <Trophy size={20} />,
    color: '#0F172A',
    details: <>Athlètes professionnels, coachs de haut niveau et figures emblématiques du sport.<br /><br />Exemple d'expérience inédite : Entraînement tactique avec un footballeur pro.</>
  },
  {
    id: 'musique',
    label: 'Musique',
    icon: <Music size={20} />,
    color: '#D4AF37',
    details: <>Chanteurs, musiciens, producteurs et professionnels de l'industrie musicale.<br /><br />Exemple d'expérience inédite : Session VIP en studio avec un artiste pour découvrir les coulisses d'un enregistrement, écouter des maquettes exclusives etc...</>
  },
  {
    id: 'influence',
    label: 'Influence',
    icon: <Camera size={20} />,
    color: '#0F172A',
    details: <>Créateurs de contenu, influenceurs digitaux et personnalités publiques des réseaux sociaux.<br /><br />Exemple d'expérience inédite : Atelier immersion pour percer les secrets de la création de contenu. Pour les marques, Faymz peut être l'occasion pour vous de présenter un produit ou initier une collaboration stratégique.</>
  },
  {
    id: 'autre',
    label: 'Autre',
    icon: <Sparkles size={20} />,
    color: '#D4AF37',
    details: <>Des expériences entièrement sur-mesure pour donner vie à des moments d'exception.</>
  },
];

const ThreeWheel: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState(categories[0]);
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
        Explorez les univers Faymz
      </h3>

      {/* Categories Grid */}
      <div style={{ maxWidth: '800px', width: '90%', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                background: selectedCat.id === cat.id ? 'var(--accent)' : 'var(--bg-alt)',
                color: selectedCat.id === cat.id ? '#fff' : 'var(--text)',
                border: `1px solid ${selectedCat.id === cat.id ? 'var(--accent)' : 'var(--glass-border)'}`,
                fontWeight: 600,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              {cat.icon}
              {cat.label}
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
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}>Faymz x {selectedCat.label}</h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: '1.7', fontWeight: 400 }}>
              {selectedCat.details}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThreeWheel;
