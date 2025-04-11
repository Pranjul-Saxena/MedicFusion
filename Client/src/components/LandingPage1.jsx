import React from "react";
import Navbar from "./LandingPage/NavBar";
import Hero from "./LandingPage/Hero";
import Features from "./LandingPage/Features";
import Testimonials from "./LandingPage/Testimonials";
import CTA from "./LandingPage/CTA";
import Footer from "./LandingPage/Footer";

function LandingPage1() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

export default LandingPage1;