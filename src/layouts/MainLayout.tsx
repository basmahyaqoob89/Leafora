import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    document.title = pathname === '/report' ? 'Herbarium Report — Leafora' : 'Leafora — Plant Care, Clarified';
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return (
    <>
      <Navbar />
      <main id="main-content"><Outlet /></main>
      <Footer />
    </>
  );
}
