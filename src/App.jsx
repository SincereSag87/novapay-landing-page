import { useEffect } from 'react';
import Navigation from './components/Navigation.jsx';
import {
  CardSection,
  FinalCta,
  FinaleSection,
  Footer,
  Hero,
  InsightsSection,
  InternationalSection,
  SavingsSection,
  SecuritySection,
  SocialProofSection,
  SpendingSection,
  TrustSection,
} from './components/Sections.jsx';

function App() {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <TrustSection />
        <SpendingSection />
        <CardSection />
        <InternationalSection />
        <InsightsSection />
        <SavingsSection />
        <SecuritySection />
        <SocialProofSection />
        <FinaleSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

export default App;
