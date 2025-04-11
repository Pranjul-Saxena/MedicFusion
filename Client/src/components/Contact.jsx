import React from "react";
import LandingLayout from "./landing/layout/LandingLayout";

const Contact = () => {
  return (
    <LandingLayout>
      <section className="py-20 bg-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Side: Contact Info */}
          <div className="text-gray-700 space-y-6">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Get in Touch</h2>
            <p className="text-lg">
              Have questions or need assistance? We're here to help! Reach out to us via email, phone, or visit our office.
            </p>

            {/* Contact Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-blue-600 text-2xl">📧</span>
                <div>
                  <p className="font-bold">Email</p>
                  <p>support@medicfusion.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-blue-600 text-2xl">📞</span>
                <div>
                  <p className="font-bold">Phone</p>
                  <p>+91 8269515349</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-blue-600 text-2xl">📍</span>
                <div>
                  <p className="font-bold">Address</p>
                  <p>S-21, Sai City, Mangaliya, Indore, Madhya Pradesh (India)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white p-8 rounded-md shadow-lg">
            <h3 className="text-2xl font-bold text-blue-600 mb-6">Send Us a Message</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="How can we assist you?"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </LandingLayout>
  );
};

export default Contact;