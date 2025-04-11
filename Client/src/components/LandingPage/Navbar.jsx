import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-xl font-bold text-blue-600">MedicFusion</div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li><a href="#home" className="hover:text-blue-600">Home</a></li>
            <li><a href="#features" className="hover:text-blue-600">Features</a></li>
            <li><a href="#pricing" className="hover:text-blue-600">Pricing</a></li>
            <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
            <li><a href="#login" className="hover:text-blue-600">Login</a></li>
          </ul>

          {/* Mobile Menu (Hamburger) */}
          <button className="md:hidden text-blue-600">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;