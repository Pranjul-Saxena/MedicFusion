import React from "react";

const Testimonials = () => {
  const testimonials = [
    { name: "Dr. Jane Doe", title: "Clinic Owner", quote: "MedicFusion has transformed how we manage our clinic." },
    { name: "John Smith", title: "Receptionist", quote: "The appointment system is intuitive and saves us hours daily." },
    { name: "Emily Johnson", title: "Doctor", quote: "Role-based access ensures privacy and efficiency." },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="shadow-lg rounded-2xl p-6 bg-gray-50 text-center">
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              <h3 className="text-xl font-bold mt-4">{testimonial.name}</h3>
              <p className="text-gray-500">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;