import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const handleScroll = () => {
      elements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
          el.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};
