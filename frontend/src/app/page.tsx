"use client";

import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import SustainableApproachSection from './components/SustainableSection';
import HeroSection from './components/HeroSection';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';

// Background images for the page
const backgrounds = [
  "/interior3.jpg",
  "/interior2.jpg",
  "/interior1.jpg",
];

export default function Page() {
  const [currentBg, setCurrentBg] = useState(0); // State for tracking current background index
  const [scrollPosition, setScrollPosition] = useState(0); // State for tracking scroll position

  useEffect(() => {
    // Change background image every 5 seconds
    const timer = setInterval(() => {
      setCurrentBg((prevBg) => (prevBg + 1) % backgrounds.length);
    }, 5000);

    // Handle scroll position updates
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to clear timer and remove event listener
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <SustainableApproachSection />
      <VideoSection />
      <Footer />
    </>
  );
}
