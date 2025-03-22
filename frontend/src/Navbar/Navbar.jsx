import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { TiThMenu } from 'react-icons/ti';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleMobileDropdown = () => setIsMobileDropdownOpen((prev) => !prev);
  const closeAllMenus = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileDropdownOpen(false);
  };

  return (
    <nav className="bg-[#003366] text-white p-5 shadow-md flex justify-between items-center relative">
      {/* Mobile Menu Button */}
      <div className="sm:hidden">
        <button onClick={toggleMobileMenu} className="text-white">
          <TiThMenu className="text-3xl" />
        </button>
      </div>

      {/* Logo */}
      <div className="text-2xl sm:text-3xl font-bold">
        <Link to="/" className="text-white hover:text-yellow-300 transition">
          BBrownie Logistic
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex space-x-30  font-medium items-center text-xl">
        <li><Link to="/" className="hover:text-yellow-300 transition">Home</Link></li>
        
        <li className="relative">
          <button onClick={toggleDropdown} className="flex items-center space-x-2 hover:text-yellow-300 transition">
            <span>Services</span>
            {isDropdownOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </button>
          {isDropdownOpen && (
            <ul className="absolute left-0 bg-[#003366] text-white w-52 mt-2 py-3 px-4 rounded-lg shadow-lg text-lg font-medium z-50">
              <li><Link to="/register" className="block py-2 hover:text-[#FFAB00]" onClick={closeAllMenus}>Transportation</Link></li>
             
              <li><Link to="/packaging" className="block py-2 hover:text-[#FFAB00]" onClick={closeAllMenus}>Packaging</Link></li>
              <li><Link to="/consulting" className="block py-2 hover:text-[#FFAB00]" onClick={closeAllMenus}>Consulting</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link></li>
      </ul>

      {/* Auth Buttons for Desktop */}
      <div className="hidden sm:flex space-x-2">
       
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#003366] text-white shadow-lg rounded-lg sm:hidden z-50">
          <ul className="flex flex-col py-2">
            <li><Link to="/" className="block px-4 py-2 hover:text-yellow-300" onClick={closeAllMenus}>Home</Link></li>
            
            <li className="relative">
              <button onClick={toggleMobileDropdown} className=" px-4 py-2 flex justify-between w-full hover:text-yellow-300">
                <span>Services</span>
                {isMobileDropdownOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </button>
              {isMobileDropdownOpen && (
                <ul className="bg-[#002244] text-white text-lg font-medium px-4 py-2">
                  <li><Link to="/register" className="block py-2 hover:text-[#FFAB00]" onClick={closeAllMenus}>Transportation</Link></li>
                 
                  <li><Link to="/packaging" className="block py-2 hover:text-[#FFAB00]" onClick={closeAllMenus}>Packaging</Link></li>
                  <li><Link to="/consulting" className="block py-2 hover:text-[#FFAB00]" onClick={closeAllMenus}>Consulting</Link></li>
                </ul>
              )}
            </li>
            <li><Link to="/contact" className="block px-4 py-2 hover:text-yellow-300" onClick={closeAllMenus}>Contact</Link></li>
            
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
