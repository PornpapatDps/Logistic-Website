import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from 'react-icons/io';
import { TiThMenu } from 'react-icons/ti';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="flex justify-between items-center bg-[#003366] text-white p-5">
      {/* Logo */}
      <div className="navbar-brand text-3xl font-bold pl-10 py-2">
        <a href="/" className="text-white">BBrownie Logistic</a>
      </div>

      {/* Navbar Links */}
      <ul className="flex space-x-8 text-xl font-semibold sm:flex ">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white hover:text-yellow-300 px-4">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/About" className="nav-link text-white hover:text-yellow-300 px-4">About</Link>
        </li>
        
        {/* Services Dropdown */}
        <li className="nav-item relative">
          <Link 
            to="/Services" 
            className="nav-link text-white hover:text-yellow-300 px-4 flex items-center"
            onClick={() => setIsDropdownOpen(false)} // close dropdown if services link is clicked
          >
            Services 
          </Link>

          {/* Dropdown Button */}
          <button 
            onClick={toggleDropdown} 
            className="absolute right-0 top-0 text-white hover:text-yellow-300 focus:outline-none transition-all"
          >
            {isDropdownOpen ? (
              <IoMdArrowDropupCircle className="mt-5" />
            ) : (
              <IoMdArrowDropdownCircle className="mt-5" />
            )}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <ul className="absolute left-0 bg-[#003366] text-white w-48 mt-2 space-y-2 py-4 px-6 rounded-lg shadow-lg text-xl font-semibold">
              <li>
                <Link to="/Transportation" className="hover:text-[#FFAB00]" onClick={() => setIsDropdownOpen(false)}>
                  Transportation
                </Link>
              </li>
              <li>
                <Link to="/Warehousing" className="hover:text-[#FFAB00]" onClick={() => setIsDropdownOpen(false)}>
                  Warehousing
                </Link>
              </li>
              <li>
                <Link to="/Packaging" className="hover:text-[#FFAB00]" onClick={() => setIsDropdownOpen(false)}>
                  Packaging
                </Link>
              </li>
              <li>
                <Link to="/Consulting" className="hover:text-[#FFAB00]" onClick={() => setIsDropdownOpen(false)}>
                  Consulting
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item">
          <Link to="/contact" className="nav-link text-white hover:text-yellow-300 px-4">Contact</Link>
        </li>
      </ul>

      {/* Login and Sign Up buttons */}
      <div className="flex space-x-6 pr-10 text-xl sm:flex ">
        <button className="bg-yellow-400 text-[#003366] font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 hover:text-white transition-all">
          <Link to="/login">Login</Link>
        </button>

        <button className="bg-white text-[#003366] font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 hover:text-white transition-all">
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>

      {/* Mobile Dropdown Menu for small screens */}
      <div className="sm:hidden">
        <button onClick={toggleMobileMenu} className="text-white">
          <TiThMenu className="text-3xl" />
        </button>

        {isMobileMenuOpen && (
          <div className="absolute right-0 top-16 bg-[#003366] text-white w-48 mt-2 space-y-2 py-2 rounded-lg shadow-lg">
            <Link to="/" className="block px-4 py-2 hover:text-yellow-300">Home</Link>
            <Link to="/about" className="block px-4 py-2 hover:text-yellow-300">About</Link>
            <Link to="/Services" className="block px-4 py-2 hover:text-yellow-300">Services</Link>
            <Link to="/contact" className="block px-4 py-2 hover:text-yellow-300">Contact</Link>
            <Link to="/login" className="block px-4 py-2 hover:text-yellow-300">Login</Link>
            <Link to="/signup" className="block px-4 py-2 hover:text-yellow-300">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
