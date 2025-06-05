import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 transform -skew-y-6 origin-top-left" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Empowering Clinics.
              <br />
              <span className="text-blue-100">Enhancing Care.</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-lg">
              A next-gen SaaS solution to manage your healthcare practice seamlessly.
              Streamline operations, improve patient care, and grow your practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button variant="secondary" size="large">
                  Get Started
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" size="large" className="text-white border-white hover:bg-white/10">
                  Request Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="relative">
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
              
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-sky-400 rounded-full opacity-20 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-32 transform translate-y-1/2"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero; 