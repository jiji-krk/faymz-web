import { motion } from 'framer-motion';
import { Users, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Concept = () => {
  const { t } = useTranslation();

  return (
    <section id="concept" className="section" style={{ background: 'var(--bg-alt)' }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: '1200px', width: '100%' }}
      >
        <h2 style={{ fontSize: '3.5rem', marginBottom: '3rem', textAlign: 'center' }}>
          {t('concept.title_part1')} <span className="gradient-text">{t('concept.title_highlight')}</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div className="glass-card">
            <div style={{ background: 'var(--accent)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#fff' }}>
              <Video size={28} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t('concept.card1_title')}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {t('concept.card1_desc')}
            </p>
          </div>

          <div className="glass-card">
            <div style={{ background: 'var(--accent-gold)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#fff' }}>
              <Users size={28} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t('concept.card2_title')}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {t('concept.card2_desc')}
            </p>
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default Concept;
