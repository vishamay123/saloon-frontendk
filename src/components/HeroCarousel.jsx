import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const CAROUSEL_IMAGES = [
  {
    url: `${import.meta.env.BASE_URL}assets/images/hero/1.png`,
    title: 'Style, Perfected',
    subtitle: 'PRECISION MEETS ART',
    quote: 'Detail is where the magic happens.'
  },
  {
    url: `${import.meta.env.BASE_URL}assets/images/hero/2.png`,
    title: 'Pure Bliss, Pure You',
    subtitle: 'RELAX & REJUVENATE',
    quote: 'Every strand deserves gentle care.'
  },
  {
    url: `${import.meta.env.BASE_URL}assets/images/hero/3.png`,
    title: 'Crafted With Care',
    subtitle: 'EXPERT HANDS AT WORK',
    quote: 'A team devoted to your perfect look.'
  },
  {
    url: `${import.meta.env.BASE_URL}assets/images/hero/4.png`,
    title: 'Your Journey Begins Here',
    subtitle: 'WELCOME TO LUXURY',
    quote: 'Step into elegance, every single time.'
  }
];

export default function HeroCarousel({ onExploreServices }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? CAROUSEL_IMAGES.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === CAROUSEL_IMAGES.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentStyles = [
    { headingFont: "'Bodoni Moda', serif", subtextFont: "'Crimson Pro', serif", badgeFont: "'Poppins', sans-serif", badgeTracking: '0.1em', badgeWeight: 600, headingWeight: 700, badgeColor: '#F1C40F', headingColor: '#FFFFFF', headingShadow: '0px 2px 4px rgba(0,0,0,0.5)' },
    { headingFont: "'Playfair Display', serif", subtextFont: "'Cormorant Garamond', serif", badgeFont: "'Poppins', sans-serif", badgeTracking: '2px', badgeWeight: 600, headingWeight: 700, badgeColor: '#D4AF37', headingColor: '#FDFBF7', headingShadow: 'none' },
    { headingFont: "'Cinzel', serif", subtextFont: "'Lora', serif", badgeFont: "'Montserrat', sans-serif", badgeTracking: '0.1em', badgeWeight: 600, headingWeight: 600, badgeColor: '#B8860B', headingColor: '#FFFFFF', headingShadow: 'none' },
    { headingFont: "'Libre Baskerville', serif", subtextFont: "'EB Garamond', serif", badgeFont: "'Inter', sans-serif", badgeTracking: '0.05em', badgeWeight: 500, headingWeight: 700, badgeColor: '#C9A227', headingColor: '#FFFFFF', headingShadow: 'none' }
  ][currentIndex];

  return (
    <section id="home" className="hero-carousel-section">
      <div className="hero-carousel-container">
        {CAROUSEL_IMAGES.map((slide, idx) => (
          <div 
            key={idx} 
            className={`hero-slide ${idx === currentIndex ? 'active' : ''}`}
          >
            <img 
              src={slide.url} 
              alt={slide.title} 
              className="hero-slide-image"
              loading={idx === 0 ? "eager" : "lazy"}
            />
            <div className="hero-overlay"></div>
          </div>
        ))}
      </div>

      <div className="hero-content">
        <span className="hero-subtitle animate-fade-in" style={{ fontFamily: currentStyles.badgeFont, textTransform: 'uppercase', letterSpacing: currentStyles.badgeTracking, fontWeight: currentStyles.badgeWeight, color: currentStyles.badgeColor }}>
          <Sparkles size={14} style={{ marginRight: '6px', color: currentStyles.badgeColor }} />
          {CAROUSEL_IMAGES[currentIndex].subtitle}
        </span>
        
        <h1 className="hero-title animate-fade-in" style={{ fontFamily: currentStyles.headingFont, fontWeight: currentStyles.headingWeight, color: currentStyles.headingColor, textShadow: currentStyles.headingShadow }}>
          {CAROUSEL_IMAGES[currentIndex].title}
        </h1>
        
        <p className="hero-quote animate-fade-in" style={{ fontFamily: currentStyles.subtextFont, fontStyle: 'italic', marginBottom: '24px' }}>
          "{CAROUSEL_IMAGES[currentIndex].quote}"
        </p>

        <div className="hero-buttons animate-fade-in">
          <button className="btn btn-primary" onClick={onExploreServices}>
            Explore Services
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button className="hero-arrow hero-arrow-left" onClick={handlePrev} aria-label="Previous Slide">
        <ChevronLeft size={24} />
      </button>
      <button className="hero-arrow hero-arrow-right" onClick={handleNext} aria-label="Next Slide">
        <ChevronRight size={24} />
      </button>

      {/* Bottom Slide Indicators */}
      <div className="hero-indicators">
        {CAROUSEL_IMAGES.map((_, idx) => (
          <button
            key={idx}
            className={`hero-indicator ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
