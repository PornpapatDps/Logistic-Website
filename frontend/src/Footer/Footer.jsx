import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#003366] text-white p-10 grid grid-cols-3 sm:grid-cols-3 gap-4">
      {/* Footer Content */}
      <div className="mb-6 space-y-4 sm:space-y-2">
        <h1 className="text-3xl font-bold hover:text-yellow-400">BBrownie Logistics</h1>
        <p className="text-lg font-semibold">&copy; 2024 BBrownie Logistics</p>
      </div>

      {/* Contact Information */}
      <div className="flex flex-col sm:flex-row justify-center space-x-6 sm:space-x-6 space-y-2 sm:space-y-1 grid grid-cols-3 sm:grid-cols-1 gap-4">
        <a href="tel:+2341234567890" className="hover:text-yellow-400">Contact: +234 123 456 7890</a>
        <a href="mailto:BBrownieLogistics@BBrowine.com" className="hover:text-yellow-400">
          Email: <span className="text-yellow-400">BBrownieLogistics@BBrowine.com</span>
        </a>
        <a href="https://www.google.com/maps?q=123+Fake+Street,+Lagos,+Nigeria" className="hover:text-yellow-400">
          Address: 123, Fake Street, Lagos, Nigeria
        </a>
      </div>

      {/* Social Media Links */}
      <div className="text-center sm:text-left space-y-4">
        <div className="text-xl font-semibold text-white">Follow Us:</div>
        <div className="text-2xl font-bold text-white">BBrownie Logistics</div>

        <div className="flex justify-center sm:justify-start space-x-6 text-3xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
