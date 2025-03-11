import React from 'react'
import { FaPlaneDeparture, FaShip, FaTruck } from 'react-icons/fa'
import { MdEmojiTransportation, MdWarehouse } from 'react-icons/md'
import { FaWarehouse } from 'react-icons/fa'
import { FiPackage } from 'react-icons/fi'
import { MdPerson } from 'react-icons/md'
import { Link } from 'react-router-dom'

function Services() {
  return (
    <div className=" bg-[#F3F4F6] w-full  py-50 ">
{/* <!-- ส่วนบริการ --> */}
<div className="py-6 bg-[#F3F4F6] w-full p-20">
  <h2 className="text-center text-[#003366] text-3xl font-bold">Our Services</h2>
  <p className="text-center text-[#4A4A4A] text-xl mt-4">We provide the best transportation services</p>

  <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-8 mt-6 p-4">
  {/* Transportation */}
  <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg shadow-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out">
    <div className="text-5xl flex justify-center items-center">
      <Link to="/Register" className="nav-link text-white hover:text-yellow-300 px-4 transition-colors duration-200">
        <MdEmojiTransportation className="animate-bounce" />
      </Link>
    </div>
    <p className="text-2xl text-center mt-4">Transportation</p>
  </div>

  {/* Packaging */}
  <div className="bg-gradient-to-r from-green-700 to-green-900 text-white rounded-lg shadow-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out">
    <div className="text-5xl flex justify-center items-center">
      <Link to="/Packaging" className="nav-link text-white hover:text-yellow-300 px-4 transition-colors duration-200">
        <FiPackage className="animate-bounce" />
      </Link>
    </div>
    <p className="text-2xl text-center mt-4">Packaging</p>
  </div>

  {/* Consulting */}
  <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-lg shadow-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out">
    <div className="text-5xl flex justify-center items-center">
      <Link to="/Consulting" className="nav-link text-white hover:text-yellow-300 px-4 transition-colors duration-200">
        <MdPerson className="animate-bounce" />
      </Link>
    </div>
    <p className="text-2xl text-center mt-4">Consulting</p>
  </div>

  {/* Warehousing */}
  <div className="bg-gradient-to-r from-orange-700 to-orange-900 text-white rounded-lg shadow-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out">
    <div className="text-5xl flex justify-center items-center">
      <Link to="/Warehousing" className="nav-link text-white hover:text-yellow-300 px-4 transition-colors duration-200">
        <MdWarehouse className="animate-bounce" />
      </Link>
    </div>
    <p className="text-2xl text-center mt-4">Warehousing</p>
  </div>
</div>
</div>
</div>
  )
}

export default Services
