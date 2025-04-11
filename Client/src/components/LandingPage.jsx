import React from 'react';
import LandingLayout from './landing/layout/LandingLayout';
import Hero from './landing/sections/Hero';
import Features from './landing/sections/Features';
import Testimonials from './landing/sections/Testimonials';
import CTA from './landing/sections/CTA';

const LandingPage = () => {
  return (
    <LandingLayout>
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
    </LandingLayout>
  );
};

export default LandingPage;