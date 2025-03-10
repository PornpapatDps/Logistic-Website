import React, { useState, useEffect, useCallback } from 'react';
import thaiDistricts from './thaiDistricts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Registerrecip() {
  const [formData, setFormData] = useState({
    firstnamerecip: '',
    lastnamerecip: '',
    streetrecip: '',
    soirecip: '',
    thaiDistricts: '',
    districts: '',
    subDistrict: '',
    zipcodes: '',
    
  });

  // ฟังก์ชันสำหรับดึงข้อมูลเขตและแขวงตามจังหวัดที่เลือก
  const getDistrictsData = useCallback(() => {
    return thaiDistricts[formData.thaiDistricts]?.districts || [];
  }, [formData.thaiDistricts]);

  const getSubDistrictsData = useCallback(() => {
    return thaiDistricts[formData.thaiDistricts]?.subdistricts?.[formData.districts] || [];
  }, [formData.thaiDistricts, formData.districts]);

  const getzipcodes = useCallback(() => {
    if (formData.districts && thaiDistricts[formData.thaiDistricts]?.zipcodes) {
      return thaiDistricts[formData.thaiDistricts].zipcodes[formData.districts] || "";
    }
    return "";
  }, [formData.thaiDistricts, formData.districts]);

  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      zipcodes: getzipcodes(),
    }));
  }, [formData.districts, getzipcodes]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstnamerecip" || name === "lastnamerecip"   ) {
      const namePattern = /^[A-Za-zก-๏\s]+$/;
      if (value === "" || namePattern.test(value)) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }    else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.firstnamerecip) {
      toast.error("กรุณากรอกชื่อจริง", { position: "top-right", autoClose: 3000 });
    } else if (!formData.lastnameSent) {
      toast.error("กรุณากรอกนามสกุล", { position: "top-right", autoClose: 3000 });
    }  else if (!formData.thaiDistricts) {
      toast.error("กรุณาเลือกจังหวัด", { position: "top-right", autoClose: 3000 });
    } else if (!formData.districts) {
      toast.error("กรุณาเลือกเขต", { position: "top-right", autoClose: 3000 });
    } else if (!formData.subDistrict) {
      toast.error("กรุณากรอกแขวง", { position: "top-right", autoClose: 3000 });
    } else if (!formData.zipcodes) {
      toast.error("กรุณากรอกรหัสไปรษณีย์", { position: "top-right", autoClose: 3000 });
    } else if (!formData.streetSent) {
      toast.error("กรุณากรอกถนน", { position: "top-right", autoClose: 3000 });
    } else if (!formData.soiSent) {
      toast.error("กรุณากรอกซอย", { position: "top-right", autoClose: 3000 });
    } else {
      console.log(formData);
      toast.success("✅ ข้อมูลถูกส่งแล้ว!", { position: "top-right", autoClose: 3000 });
  
      // นำทางไปยังหน้า Registerrecip.jsx
      navigate("/Packaging");
    }
  };
  

  return (
    <div className="max-w-full mx-auto py-8 px-4 bg-gray-100 rounded-lg shadow-lg  
    items-center">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">ลงทะเบียนผู้รับสินค้า</h2>
      <form onSubmit={handleSubmit} className=' grid grid-cols-2 gap-6 '>
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">ชื่อจริงผู้รับสินค้า</label>
          <input
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="firstnamerecip"
            type="text"
            value={formData.firstnamerecip}
            onChange={handleChange}
            placeholder="กรุณากรอกชื่อจริง"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">นามสกุลผู้ส่งสินค้า</label>
          <input
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="lastnamerecip"
            type="text"
            value={formData.lastnamerecip}
            onChange={handleChange}
            placeholder="กรุณากรอกนามสกุล"
          />
        </div>  

        {/* ฟอร์มที่อยู่ */}
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">ถนน</label>
          <input
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="streetrecip"
            type="text"
            value={formData.streetrecip}
            onChange={handleChange}
            placeholder="กรุณากรอกถนน"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">ซอย</label>
          <input
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="soirecip"
            type="text"
            value={formData.soirecip}
            onChange={handleChange}
            placeholder="กรุณากรอกซอย"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">จังหวัด</label>
          <select
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="thaiDistricts"
            value={formData.thaiDistricts}
            onChange={handleChange}
            required
          >
            <option value="">กรุณาเลือกจังหวัด</option>
            {Object.keys(thaiDistricts).map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">เขต</label>
          <select
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="districts"
            value={formData.districts}
            onChange={handleChange}
            required
          >
            <option value="">กรุณาเลือกเขต</option>
            {getDistrictsData().map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">แขวง</label>
          <select
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="subDistrict"
            value={formData.subDistrict}
            onChange={handleChange}
            required
          >
            <option value="">กรุณาเลือกแขวง</option>
            {getSubDistrictsData().map((subDistrict, index) => (
              <option key={index} value={subDistrict}>
                {subDistrict}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">รหัสไปรษณีย์</label>
          <input
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="zipcodes"
            type="text"
            value={formData.zipcodes}
            onChange={handleChange}
            placeholder="กรุณากรอกรหัสไปรษณีย์"
            disabled
          />
        </div>
        </form>
        <div className='flex justify-center'>
        <button
          type="submit"
          className=" w-auto bg-green-500 text-white p-3 mt-4 rounded-md
           hover:bg-green-600 "
          onClick={handleSubmit} 
        >
          ลงทะเบียนผู้รับสินค้า
        </button>
      </div>
    </div>
  );
}

export default Registerrecip;
