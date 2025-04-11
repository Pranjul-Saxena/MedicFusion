import React from 'react';
import LandingLayout from '../landing/layout/LandingLayout';
import Card from '../landing/common/Card';

const Features = () => {
  const features = [
    {
      icon: "📅",
      title: "Appointment Scheduling",
      description: "Streamline appointment booking and management for clinics with our intuitive scheduling system.",
      details: [
        "Online booking portal for patients",
        "Automated reminders and notifications",
        "Calendar synchronization",
        "Waitlist management"
      ]
    },
    {
      icon: "🧑‍⚕️",
      title: "Role-Based Access",
      description: "Secure access tailored for doctors, receptionists, and admins with granular permission controls.",
      details: [
        "Customizable user roles",
        "HIPAA-compliant access controls",
        "Audit logging",
        "Multi-factor authentication"
      ]
    },
    {
      icon: "🔒",
      title: "Secure Patient Records",
      description: "Protect sensitive patient data with advanced security measures and HIPAA compliance.",
      details: [
        "End-to-end encryption",
        "Regular security audits",
        "Data backup and recovery",
        "Compliance monitoring"
      ]
    },
    {
      icon: "📈",
      title: "Referral Tracking",
      description: "Track referrals and improve patient outcomes with our comprehensive tracking system.",
      details: [
        "Referral workflow automation",
        "Performance analytics",
        "Communication tracking",
        "Outcome monitoring"
      ]
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Gain insights into clinic performance with real-time analytics and reporting tools.",
      details: [
        "Customizable reports",
        "Real-time metrics",
        "Trend analysis",
        "Performance benchmarking"
      ]
    },
    {
      icon: "☁️",
      title: "Cloud-Based Data Storage",
      description: "Access your data anytime, anywhere with secure cloud storage and automatic backups.",
      details: [
        "99.9% uptime guarantee",
        "Automatic backups",
        "Cross-device synchronization",
        "Scalable storage"
      ]
    }
  ];

  return (
    <LandingLayout>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for <span className="text-blue-600">Modern Healthcare</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how MedicFusion can transform your practice with our comprehensive suite of features.
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
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  
                  {/* Feature Details */}
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default Features; 