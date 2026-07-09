import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [resultMessage, setResultMessage] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus('idle');
    setResultMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus('error');
      setResultMessage(t('contact.msg_error_config'));
      setSubmitting(false);
      return;
    }
    formData.append("access_key", accessKey);

    // Honeypot field for spam prevention
    const botcheck = formData.get("botcheck");
    if (botcheck) {
      // If honeypot is filled, act like it succeeded but don't submit
      setStatus('success');
      setResultMessage(t('contact.msg_success'));
      form.reset();
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setResultMessage(t('contact.msg_success'));
        form.reset();
      } else {
        setStatus('error');
        setResultMessage(data.message || t('contact.msg_error_default'));
      }
    } catch (error) {
      setStatus('error');
      setResultMessage(t('contact.msg_error_network'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg)' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="glass-card"
        style={{ maxWidth: '600px', width: '100%' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('contact.title')}</h2>
          <p style={{ color: 'var(--text-muted)' }}>{t('contact.subtitle')}</p>
        </div>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Honeypot field (hidden from users, helps block bots) */}
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>{t('contact.form_name_label')}</label>
            <input 
              type="text" 
              name="name"
              placeholder={t('contact.form_name_placeholder')}
              required
              disabled={submitting}
              style={{
                background: '#f8fafc',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                padding: '1rem',
                color: 'var(--text)',
                outline: 'none',
                width: '100%',
                opacity: submitting ? 0.7 : 1
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>{t('contact.form_email_label')}</label>
            <input 
              type="email" 
              name="email"
              placeholder={t('contact.form_email_placeholder')}
              required
              disabled={submitting}
              style={{
                background: '#f8fafc',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                padding: '1rem',
                color: 'var(--text)',
                outline: 'none',
                width: '100%',
                opacity: submitting ? 0.7 : 1
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>{t('contact.form_message_label')}</label>
            <textarea 
              name="message"
              rows={4}
              placeholder={t('contact.form_message_placeholder')}
              required
              disabled={submitting}
              style={{
                background: '#f8fafc',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                padding: '1rem',
                color: 'var(--text)',
                outline: 'none',
                width: '100%',
                resize: 'none',
                opacity: submitting ? 0.7 : 1
              }}
            ></textarea>
          </div>

          <button 
            type="submit"
            className="btn-primary" 
            disabled={submitting}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.5rem',
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1
            }}
          >
            {submitting ? t('contact.btn_sending') : t('contact.btn_send')} <Send size={18} />
          </button>
        </form>

        <AnimatePresence>
          {status !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: status === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: `1px solid ${status === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                color: status === 'success' ? '#10b981' : '#ef4444',
                fontSize: '0.9rem'
              }}
            >
              {status === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span>{resultMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Contact;

