import { useEffect, useRef } from 'react';
import HeroSection from '../sections/HeroSection';
import OurStory from '../sections/OurStory';
import ModelCoverage from '../sections/ModelCoverage';
import HowItWorks from '../sections/HowItWorks';
import Observatory from '../sections/Observatory';
import ClosingSection from '../sections/ClosingSection';

export default function HomePage() {
  const home = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = home.current?.querySelectorAll('.reveal');
    const reveal = (element: Element) => element.classList.add('show');
    if (!('IntersectionObserver' in window)) {
      elements?.forEach(reveal);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        reveal(target);
        observer.unobserve(target);
      }
    }, { threshold: .1 });
    elements?.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={home}>
      <HeroSection />
      <OurStory />
      <ModelCoverage />
      <HowItWorks />
      <Observatory />
      <ClosingSection />
    </div>
  );
}
