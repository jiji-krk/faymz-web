import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import promoImg from '../assets/image.png';

const PromoSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section style={{ padding: '4rem 2rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            {t('promo.title_part1')}<span className="gradient-text">{t('promo.title_highlight')}</span>{t('promo.title_part2')}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            {t('promo.subtitle')}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-primary">{t('promo.btn')}</button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ position: 'relative' }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '120%',
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            opacity: 0.05,
            zIndex: 0
          }}></div>
          <img
            src={promoImg}
            alt="Faymz App Promo"
            style={{
              width: '100%',
              borderRadius: '32px',
              boxShadow: '0 20px 60px rgba(15, 23, 42, 0.1)',
              position: 'relative',
              zIndex: 1
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSection;
