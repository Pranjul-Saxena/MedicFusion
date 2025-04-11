import React from 'react';
import Card from '../common/Card';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "MedicFusion has revolutionized our clinic's workflow. It's incredibly user-friendly and has saved us countless hours.",
      author: "Dr. John Doe",
      role: "Clinic Owner",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The patient management features are excellent. Our staff adapted to it quickly and it has improved our efficiency significantly.",
      author: "Dr. Jane Smith",
      role: "General Practitioner",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "The support team is fantastic! They are always available to help and answer any questions. It has been a great experience.",
      author: "Dr. Emily Wilson",
      role: "Pediatrician",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-blue-600">Clients</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what healthcare professionals have to say about MedicFusion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              variant="default"
              className="group hover:shadow-xl transition-all duration-300"
            >
              <div className="p-8">
                {/* Quote */}
                <div className="relative mb-8">
                  <svg
                    className="absolute -top-4 -left-4 w-8 h-8 text-blue-100"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-600 italic text-lg leading-relaxed">
                    {testimonial.quote}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 