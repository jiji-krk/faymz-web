import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import ThreeWheel from './components/ThreeWheel';
import Concept from './components/Concept';
import Contact from './components/Contact';
import { motion } from 'framer-motion';

import PromoSection from './components/PromoSection';

function App() {
  const { t } = useTranslation();

  return (
    <div className="app">
      <Navbar />

      <section id="home" className="section" style={{ paddingTop: '8rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '0', maxWidth: '800px' }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ fontSize: '5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '3rem' }}
          >
            {t('hero.title_part1')} <span className="gradient-text">{t('hero.title_highlight')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              fontSize: '1.2rem',
              color: 'var(--text-muted)',
              textAlign: 'left',
              maxWidth: '620px',
              margin: '0 auto 2.5rem auto',
              lineHeight: '1.6'
            }}
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ marginBottom: '3rem' }}
          >
            <button className="btn-primary">{t('hero.cta')}</button>
          </motion.div>
        </div>

        <ThreeWheel />
      </section>

      <PromoSection />
      <Concept />
      <Contact />

      <footer style={{ padding: '4rem 2rem', borderTop: '1px solid var(--glass-border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <p>{t('footer.copyright')}</p>
      </footer>
    </div>
  );
}

export default App;
