import React from 'react';
import image1 from '../assets/l1.jpg';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="w-full flex flex-col bg-white-200 
    shadow-lg  ">
      {/* Image Section */}
      <div className="w-full h-[500px]">
        <img src={image1} alt="Logistics" className="w-full h-full object-cover rounded-lg" />
      </div>

      <div className="bg-white text-[#333333] p-30 text-center space-y-4">
     {/* <!-- หัวข้อหลัก --> */}
  <h1 className="text-[#003366] text-4xl font-bold">BBrowine Logistics No.1</h1>
  
  {/* <!-- ข้อความต้อนรับ --> */}
  <p className="text-[#F7B500] text-2xl mt-4 font-semibold">Welcome to BBrowine Logistics</p>
  
  {/* <!-- ปุ่มลงทะเบียน --> */}
  <button className="bg-[#DC3545] text-white text-xl
   hover:bg-[#4e8d53] px-6 py-3 rounded-lg mt-4 transition-all">
    <Link to="/RegisterSent">ลงทะเบียนเข้าใช้งาน</Link>
    
  </button>
</div>


      </div>
    
  );
}

export default Home;
