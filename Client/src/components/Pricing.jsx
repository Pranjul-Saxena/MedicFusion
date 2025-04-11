import React from "react";
import LandingLayout from "./landing/layout/LandingLayout";

const Pricing = () => {
  const plans = [
    {
      name: "Free Trial",
      price: "₹0",
      features: [
        "1 Doctor Account",
        "Limited Patient Management",
        "Basic Support",
      ],
      cta: "Start Trial",
      isPopular: false,
    },
    {
      name: "Standard",
      price: "₹1499",
      features: [
        "Upto 3 Doctor Accounts",
        "Full Appointment System",
        "Referral Tracking",
        "Email Support",
      ],
      cta: "Get Started",
      isPopular: true,
    },
    {
      name: "Premium",
      price: "₹4999",
      features: [
        "Unlimited Doctor Accounts",
        "Advanced Analytics",
        "Dedicated Support",
        "Role-Based Access Control",
      ],
      cta: "Contact Us",
      isPopular: false,
    },
  ];

  return (
    <LandingLayout>
      <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-12">Simple, Scalable Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl shadow-xl ${
                plan.isPopular ? "bg-blue-100 border-2 border-blue-500" : "bg-white"
              } hover:scale-105 transition-transform`}
            >
              {/* Plan Name */}
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>

              {/* Price */}
              <p className="text-4xl font-bold text-blue-600 mb-6">{plan.price}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-gray-700">
                    <span>✅</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-full text-white font-bold ${
                  plan.isPopular
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-600 hover:bg-gray-700"
                }`}
              >
                {plan.cta}
              </button>

              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="mt-4 px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded-full w-fit mx-auto">
                  Most Popular
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    </LandingLayout>
  );
};

export default Pricing;