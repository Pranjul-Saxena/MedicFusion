import React from "react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-sky-500 to-blue-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Empowering Clinics. Enhancing Care.</h1>
        <p className="text-xl mb-8">A next-gen SaaS solution to manage your healthcare practice seamlessly.</p>
        <div className="space-x-4">
          <button className="rounded-full px-6 py-2 bg-white text-blue-600 hover:bg-blue-50">
            Get Started
          </button>
          <button className="rounded-full px-6 py-2 bg-transparent border-2 border-white hover:bg-white hover:text-blue-600">
            Request Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;