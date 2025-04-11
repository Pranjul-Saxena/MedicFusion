import React from "react";
import LandingLayout from "../landing/layout/LandingLayout";

const Features = () => {
  const features = [
    {
      icon: "📅",
      title: "Appointment Scheduling",
      description: "Streamline appointment booking and management for clinics.",
    },
    {
      icon: "🧑‍⚕️",
      title: "Role-Based Access",
      description: "Secure access tailored for doctors, receptionists, and admins.",
    },
    {
      icon: "🔒",
      title: "Secure Patient Records",
      description: "Protect sensitive patient data with advanced security measures.",
    },
    {
      icon: "📈",
      title: "Referral Tracking",
      description: "Track referrals and improve patient outcomes seamlessly.",
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Gain insights into clinic performance with real-time analytics.",
    },
    {
      icon: "☁️",
      title: "Cloud-Based Data Storage",
      description: "Access your data anytime, anywhere with cloud storage.",
    },
  ];

  return (
    <LandingLayout>
      <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">Why Choose MedicFusion?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-xl shadow-md hover:scale-105 transition-transform"
            >
              {/* Icon */}
              <div className="flex justify-center items-center w-12 h-12 bg-blue-100 rounded-full text-blue-600 text-2xl mb-4">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>

              {/* Description */}
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </LandingLayout>
  );
};

export default Features;



// import React from "react";

// const Features = () => {
//   const features = [
//     { icon: "📅", title: "Appointment Management", desc: "Streamline scheduling for patients and staff." },
//     { icon: "👥", title: "Role-Based Access", desc: "Secure access tailored for doctors and receptionists." },
//     { icon: "🔒", title: "Secure Data Handling", desc: "Protect sensitive patient information with ease." },
//     { icon: "🔗", title: "Referral Tracking", desc: "Track referrals and improve patient outcomes." },
//   ];

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <div key={index} className="shadow-xl rounded-2xl p-6 bg-white text-center">
//               <span className="text-4xl text-blue-600">{feature.icon}</span>
//               <h3 className="text-xl font-bold mt-4">{feature.title}</h3>
//               <p className="text-gray-600 mt-2">{feature.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;