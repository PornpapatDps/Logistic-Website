import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#003366] text-white p-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
      {/* Brand Information */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold hover:text-yellow-400 transition">BBrownie Logistics</h1>
        <p className="text-lg font-semibold">&copy; 2024 BBrownie Logistics. All Rights Reserved.</p>
      </div>

      {/* Contact Information */}
      <div className="space-y-2">
        <p><a href="tel:+2341234567890" className="hover:text-yellow-400 transition">Contact: +234 123 456 7890</a></p>
        <p>
          <a href="mailto:BBrownieLogistics@gmail.com" className="hover:text-yellow-400 transition">
            Email: <span className="text-yellow-400">BBrownieLogistics@gmail.com</span>
          </a>
        </p>
        <p>
          <a href="https://www.google.com/maps?q=123+Fake+Street,+Lagos,+Nigeria" 
             className="hover:text-yellow-400 transition">
            Address: 123 Fake Street, Lagos, Nigeria
          </a>
        </p>
      </div>

      {/* Social Media Links */}
      <div className="space-y-4">
        <p className="text-xl font-semibold">Follow Us</p>
        <div className="flex justify-center sm:justify-start space-x-6 text-3xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
