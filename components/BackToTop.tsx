'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      id="back-to-top"
      className={visible ? 'visible' : ''}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}
