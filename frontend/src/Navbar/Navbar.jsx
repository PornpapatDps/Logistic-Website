import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from 'react-icons/io';
import { TiThMenu } from 'react-icons/ti';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeDropdown = () => setIsDropdownOpen(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-[#003366] text-white p-5 shadow-md flex justify-between items-center relative">
      {/* Mobile Menu Button */}
      <div className="sm:hidden ">
        <button onClick={toggleMobileMenu} className="text-white ">
          <TiThMenu className="text-3xl" />
        </button>
      </div>
      {/* Logo */}
      <div className="text-3xl font-bold pl-10">
        <Link to="/" className="text-white hover:text-yellow-300 transition">BBrownie Logistic</Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex space-x-8 text-lg font-medium">
        <li><Link to="/" className="hover:text-yellow-300 transition">Home</Link></li>
        <li><Link to="/about" className="hover:text-yellow-300 transition">About</Link></li>
        <li className="relative">
          <button onClick={toggleDropdown} className="flex items-center space-x-2 hover:text-yellow-300 transition">
            <span>Services</span>
            {isDropdownOpen ? <IoMdArrowDropupCircle /> : <IoMdArrowDropdownCircle />}
          </button>
          {isDropdownOpen && (
            <ul className="absolute left-0 bg-[#003366] text-white w-52 mt-2 py-3 px-4 rounded-lg shadow-lg text-lg font-medium">
              <li><Link to="/register" className="block py-2 hover:text-[#FFAB00]" onClick={closeDropdown}>Transportation</Link></li>
              <li><Link to="/warehousing" className="block py-2 hover:text-[#FFAB00]" onClick={closeDropdown}>Warehousing</Link></li>
              <li><Link to="/packaging" className="block py-2 hover:text-[#FFAB00]" onClick={closeDropdown}>Packaging</Link></li>
              <li><Link to="/consulting" className="block py-2 hover:text-[#FFAB00]" onClick={closeDropdown}>Consulting</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link></li>
      </ul>

      {/* Auth Buttons */}
      <div className="hidden sm:flex space-x-4 pr-10">
        <Link to="/login" className="bg-yellow-400 text-[#003366] font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition">Login</Link>
        <Link to="/signup" className="bg-white text-[#003366] font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition">Sign Up</Link>
      </div>

      

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-56 bg-[#003366] text-white shadow-lg rounded-lg overflow-hidden sm:hidden">
          <ul className="flex flex-col py-2">
            <li><Link to="/" className="block px-4 py-2 hover:text-yellow-300" onClick={closeMobileMenu}>Home</Link></li>
            <li><Link to="/about" className="block px-4 py-2 hover:text-yellow-300" onClick={closeMobileMenu}>About</Link></li>
            <li><Link to="/services" className="block px-4 py-2 hover:text-yellow-300" onClick={closeMobileMenu}>Services</Link></li>
            <li><Link to="/contact" className="block px-4 py-2 hover:text-yellow-300" onClick={closeMobileMenu}>Contact</Link></li>
            <li><Link to="/login" className="block px-4 py-2 hover:text-yellow-300" onClick={closeMobileMenu}>Login</Link></li>
            <li><Link to="/signup" className="block px-4 py-2 hover:text-yellow-300" onClick={closeMobileMenu}>Sign Up</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
