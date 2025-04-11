import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const CTA = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-blue-600">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Clinic?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join hundreds of healthcare professionals who have already streamlined their practice with MedicFusion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="secondary" size="large">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="large" className="text-white border-white hover:bg-white/10">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-blue-100">Active Clinics</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">10K+</div>
            <div className="text-blue-100">Healthcare Professionals</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">1M+</div>
            <div className="text-blue-100">Patients Managed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA; 