// src/components/HeroSection.js
import React, { useEffect, useState } from 'react';
import StarIcon from './StarIcon';

const backgrounds = [
  "/interior3.jpg",
  "/interior2.jpg",
  "/interior1.jpg",
];

const HeroSection = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prevBg) => (prevBg + 1) % backgrounds.length);
    }, 5000);

    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[80vh] overflow-hidden">
      {backgrounds.map((bg, index) => (
        <img
          key={bg}
          src={bg}
          alt={`Coffee Background ${index + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            index === currentBg ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: `translateY(${scrollPosition * 0.5}px)`,
          }}
        />
      ))}
      <img 
        src="/overlay.png"
        alt="Overlay" 
        className="absolute inset-0 h-full w-full object-cover"
        style={{ 
          mixBlendMode: 'multiply',
          transform: `translateY(${scrollPosition * 0.3}px)`,
        }}
      />
      <div 
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
        style={{
          transform: `translateY(${scrollPosition * 0.2}px)`,
        }}
      >
        <h1 
          className="text-white text-5xl md:text-7xl font-bold mb-6"
          style={{ 
            fontFamily: 'Poppins, sans-serif',
            transform: `translateY(${-scrollPosition * 0.1}px)`,
          }}
        >
          Sip Sustainably.
        </h1>
        <p 
          className="text-white text-xl md:text-2xl max-w-2xl"
          style={{
            transform: `translateY(${-scrollPosition * 0.05}px)`,
          }}
        >
          Discover our eco-friendly coffee solutions that taste great and help the planet.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
