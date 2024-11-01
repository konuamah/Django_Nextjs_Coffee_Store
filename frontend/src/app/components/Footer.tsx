// src/components/Footer.js
import React from 'react';

const Footer = () => (
    <footer className="relative">
    {/* Background Image and Overlay */}
    <div className="absolute inset-0 w-full h-full">
      <img 
        src="/coffeefarm.jpg" 
        alt="Coffee Beans Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>
    </div>
  
    {/* Footer Content */}
    <div className="relative z-10 container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-4">
          <img 
            src="/logo-white.png" 
            alt="Bean Scene Logo" 
            className="h-12"
          />
          <p className="text-gray-300 text-sm">
            Experience the perfect blend of tradition and innovation in every cup.
          </p>
          <div className="flex space-x-4">
            {/* Social Media Icons */}
            <a href="#" className="text-white hover:text-customYellow transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-customYellow transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.164 22 16.42 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-customYellow transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
  
        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-customYellow transition-colors">About Us</a></li>
            <li><a href="#" className="text-gray-300 hover:text-customYellow transition-colors">Our Menu</a></li>
            <li><a href="#" className="text-gray-300 hover:text-customYellow transition-colors">Shop</a></li>
            <li><a href="#" className="text-gray-300 hover:text-customYellow transition-colors">Blog</a></li>
            <li><a href="#" className="text-gray-300 hover:text-customYellow transition-colors">Contact</a></li>
          </ul>
        </div>
  
        {/* Opening Hours */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Opening Hours</h3>
          <ul className="space-y-2">
            <li className="text-gray-300">Monday - Friday</li>
            <li className="text-white font-medium">8:00 AM - 8:00 PM</li>
            <li className="text-gray-300">Saturday</li>
            <li className="text-white font-medium">9:00 AM - 10:00 PM</li>
            <li className="text-gray-300">Sunday</li>
            <li className="text-white font-medium">10:00 AM - 6:00 PM</li>
          </ul>
        </div>
  
        {/* Contact Information */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
          <p className="text-gray-300">123 Coffee St, Brewtown</p>
          <p className="text-gray-300">Email: info@beanscene.com</p>
          <p className="text-gray-300">Phone: (123) 456-7890</p>
        </div>
      </div>
    </div>
  </footer>
  
);

export default Footer;
