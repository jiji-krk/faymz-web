import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--glass-border)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img src={logo} alt="Faymz Logo" style={{ height: '45px', width: 'auto' }} />
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-1px' }}>
          FAYMZ<span style={{ color: 'var(--accent-gold)' }}>.</span>
        </h1>
      </div>
      
      <div style={{ display: 'flex', gap: '2rem' }}>
        <a href="#home" style={{ textDecoration: 'none', color: 'var(--text)', fontWeight: 500, fontSize: '0.9rem' }}>ACCUEIL</a>
        <a href="#concept" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.9rem' }}>CONCEPT</a>
        <a href="#contact" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.9rem' }}>NOUS CONTACTER</a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
