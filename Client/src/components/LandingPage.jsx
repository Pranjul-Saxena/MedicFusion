import React from 'react';
import LandingLayout from './landing/layout/LandingLayout';
import Hero from './landing/sections/Hero';
import Features from './landing/sections/Features';
import Testimonials from './landing/sections/Testimonials';
import CTA from './landing/sections/CTA';
import Card from './landing/common/Card';

const LandingPage = () => {
  const features = [
    {
      icon: "📅",
      title: "Appointment Scheduling",
      description: "Streamline appointment booking and management for clinics with our intuitive scheduling system.",
    },
    {
      icon: "🧑‍⚕️",
      title: "Role-Based Access",
      description: "Secure access tailored for doctors, receptionists, and admins with granular permission controls.",
    },
    {
      icon: "🔒",
      title: "Secure Patient Records",
      description: "Protect sensitive patient data with advanced security measures and HIPAA compliance.",
    },
    {
      icon: "📈",
      title: "Referral Tracking",
      description: "Track referrals and improve patient outcomes with our comprehensive tracking system.",
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Gain insights into clinic performance with real-time analytics and reporting tools.",
    },
    {
      icon: "☁️",
      title: "Cloud-Based Data Storage",
      description: "Access your data anytime, anywhere with secure cloud storage and automatic backups.",
    },
  ];
  return (
    <LandingLayout>
      <Hero />
      {/*<Features /> */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">MedicFusion</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive healthcare management solution is designed to streamline your practice and enhance patient care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                variant="elevated"
                className="group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="p-8">
                  {/* Icon Container */}
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Testimonials />
      <CTA />
    </LandingLayout>
  );
};

export default LandingPage;