import React from 'react';
import LandingLayout from '../landing/layout/LandingLayout';
import Card from '../landing/common/Card';
import Button from '../landing/common/Button';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "49",
      description: "Perfect for small clinics just getting started",
      features: [
        "Up to 5 users",
        "Basic appointment scheduling",
        "Patient records management",
        "Email support",
        "Basic analytics"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "99",
      description: "Ideal for growing healthcare practices",
      features: [
        "Up to 20 users",
        "Advanced scheduling",
        "Comprehensive patient management",
        "Priority support",
        "Advanced analytics",
        "Custom reporting",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "199",
      description: "For large healthcare organizations",
      features: [
        "Unlimited users",
        "Custom workflows",
        "Enterprise security",
        "24/7 support",
        "Custom integrations",
        "Dedicated account manager",
        "Training sessions"
      ],
      popular: false
    }
  ];

  return (
    <LandingLayout>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent <span className="text-blue-600">Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your healthcare practice. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                variant={plan.popular ? "elevated" : "default"}
                className={`relative ${plan.popular ? 'border-2 border-blue-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-tl-lg rounded-br-lg text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    size="large"
                    className="w-full"
                  >
                    Start Free Trial
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card variant="flat" className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Can I change plans later?
                </h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </p>
              </Card>
              <Card variant="flat" className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Is there a contract?
                </h3>
                <p className="text-gray-600">
                  No, all plans are month-to-month with no long-term commitment. You can cancel anytime.
                </p>
              </Card>
              <Card variant="flat" className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and bank transfers for annual plans.
                </p>
              </Card>
              <Card variant="flat" className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Do you offer discounts for non-profits?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer special pricing for non-profit healthcare organizations. Contact our sales team for details.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default Pricing; 