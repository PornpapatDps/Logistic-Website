import React, { useState, useEffect, useCallback } from 'react';
import thaiDistricts from './thaiDistricts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function RegisterSent() {
  const [formData, setFormData] = useState({
    firstnameSent: '',
    lastnameSent: '',
    transportTypeSent: [],
    streetSent: '',
    soiSent: '',
    thaiDistricts: '',
    districts: '',
    subDistrict: '',
    zipcodes: '',
    deliveryDate: '',
    productQuantity: '',
    productSize: '',
    productWeight: '',
    productNote: '',
    productType: '',  // Initialized correctly here
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

  // ฟังก์ชันตรวจสอบวันที่
  const getTodayDate = () => {
    const today = new Date();
    const day = ("0" + today.getDate()).slice(-2);
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "firstnameSent" || name === "lastnameSent") {
      const namePattern = /^[A-Za-zก-๏\s]+$/;
      if (value === "" || namePattern.test(value)) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }  else if (name === "deliveryDate") {
      if (value === getTodayDate()) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        transportTypeSent: checked
          ? [...prevState.transportTypeSent, value]
          : prevState.transportTypeSent.filter((type) => type !== value),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstnameSent) {
      toast.error("กรุณากรอกชื่อจริง", { position: "top-right", autoClose: 3000 });
    } else if (!formData.lastnameSent) {
      toast.error("กรุณากรอกนามสกุล", { position: "top-right", autoClose: 3000 });
    
    } else if (formData.transportTypeSent.length === 0) {
      toast.error("กรุณาเลือกประเภทขนส่ง", { position: "top-right", autoClose: 3000 });
    } else if (!formData.thaiDistricts) {
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
    } else if (!formData.deliveryDate) {
      toast.error("กรุณากรอกวันที่จัดส่ง (ต้องเป็นวันนี้)", { position: "top-right", autoClose: 3000 });
    } else if (!formData.productType) {
      toast.error("กรุณาเลือกประเภทสินค้า", { position: "top-right", autoClose: 3000 });
    } else if (!formData.productQuantity) {
      toast.error("กรุณากรอกจำนวนสินค้า", { position: "top-right", autoClose: 3000 });
    }
    else if (!formData.productSize) {
      toast.error("กรุณากรอกขนาดสินค้า", { position: "top-right", autoClose: 3000 });
    }
    else if (!formData.productWeight) {
      toast.error("กรุณากรอกน้ำหนักสินค้า", { position: "top-right", autoClose: 3000 });
    }
    else if (!formData.productNote) {
      toast.error("กรุณากรอกหมายเหตุสินค้า", { position: "top-right", autoClose: 3000 });
    }else {
      console.log(formData);
      toast.success("✅ ข้อมูลถูกส่งแล้ว!", { position: "top-right", autoClose: 3000 });

            // นำทางไปยังหน้า Registerrecip.jsx
            navigate("/Registerrecip");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 bg-gray-100 rounded-lg shadow-lg">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">ลงทะเบียนผู้ส่งสินค้า</h2>
      <form onSubmit={handleSubmit} className=' grid grid-cols-1 gap-2 '>
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">ชื่อจริงผู้ส่งสินค้า</label>
          <input
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="firstnameSent"
            type="text"
            value={formData.firstnameSent}
            onChange={handleChange}
            placeholder="กรุณากรอกชื่อจริง"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">นามสกุลผู้ส่งสินค้า</label>
          <input
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="lastnameSent"
            type="text"
            value={formData.lastnameSent}
            onChange={handleChange}
            placeholder="กรุณากรอกนามสกุล"
          />
        </div>


        {/* ฟอร์มประเภทขนส่ง */}
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">ประเภทขนส่ง</label>
          <div className="flex space-x-6">
            <div className="flex items-center">
              <input
                name="transportTypeSent"
                type="radio"
                value="รถบรรทุก"
                checked={formData.transportTypeSent === 'รถบรรทุก'}
                onChange={handleChange}
              />
              <span className="ml-2">รถบรรทุก</span>
            </div>
            <div className="flex items-center">
              <input
                name="transportTypeSent"
                type="radio"
                value="รถยนต์"
                checked={formData.transportTypeSent === 'รถยนต์'}
                onChange={handleChange}
              />
              <span className="ml-2">รถยนต์</span>
            </div>
            <div className="flex items-center">
              <input
                name="transportTypeSent"
                type="radio"
                value="รถมอเตอร์ไซค์"
                checked={formData.transportTypeSent === 'รถมอเตอร์ไซค์'}
                onChange={handleChange}
              />
              <span className="ml-2">รถมอเตอร์ไซค์</span>
            </div>
          </div>
        </div>

        {/* ฟอร์มวันที่จัดส่ง */}
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">วันที่จัดส่ง</label>
          <input
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="deliveryDate"
            type="date"
            value={formData.deliveryDate}
            onChange={handleChange}
            min={getTodayDate()}
            max={getTodayDate()}
            required
          />
        </div>

        {/* ฟอร์มที่อยู่ */}
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">ที่อยู่</label>
          <input
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="streetSent"
            type="text"
            value={formData.streetSent}
            onChange={handleChange}
            placeholder="กรุณากรอกที่อยู่"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">ซอย</label>
          <input
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="soiSent"
            type="text"
            value={formData.soiSent}
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
        <div className="mb-4">
  <label className="block text-lg font-semibold text-gray-700">รายละเอียดสินค้า</label>
  <div className="flex items-center">
    <label className="mr-2">ระบุสินค้าข้างใน:</label>
    <select
      className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      name="productType"
      value={formData.productType}
      onChange={handleChange}
      required
    >
      <option value="">เลือกประเภทสินค้า</option>
      <option value="เอกสาร">เอกสาร</option>
      <option value="ของกิน">ของกิน</option>
      <option value="สินค้าทั่วไป">สินค้าทั่วไป</option>
    </select>
  </div>
</div>

<div className="mb-4">
  <label className="block text-lg font-semibold text-gray-700">จำนวนสินค้า</label>
  <input
    className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    name="productQuantity"
    type="number"
    value={formData.productQuantity}
    onChange={handleChange}
    placeholder="กรุณากรอกจำนวนสินค้า"
    required
  />
</div>

<div className="mb-4">
  <label className="block text-lg font-semibold text-gray-700">ขนาดสินค้า</label>
  <input
    className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    name="productSize"
    type="text"
    value={formData.productSize}
    onChange={handleChange}
    placeholder="กรุณากรอกขนาดสินค้า"
    required
  />
</div>

<div className="mb-4">
  <label className="block text-lg font-semibold text-gray-700">น้ำหนักสินค้า (กรัม)</label>
  <input
    className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    name="productWeight"
    type="number"
    value={formData.productWeight}
    onChange={handleChange}
    placeholder="กรุณากรอกน้ำหนักสินค้า (กรัม)"
    required
  />
</div>

<div className="mb-4">
  <label className="block text-lg font-semibold text-gray-700">หมายเหตุสินค้า</label>
  <input
    className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    name="productNote"
    type="text"
    value={formData.productNote}
    onChange={handleChange}
    placeholder="กรุณากรอกหมายเหตุ"
  />
</div>
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
      </form>
    </div>
  );
}

export default RegisterSent;
