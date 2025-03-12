import React, { useState, useEffect, useCallback } from 'react';
import thaiDistricts from './thaiDistricts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    transportType: '',
    street: '',
    soi: '',
    thaiDistricts: '',
    districts: '',
    subDistrict: '',
    zipcodes: '',
    deliveryDate: '',
    productQuantity: '',
    productSize: '',
    productWeight: '',
    productNote: '',
    productType: '', 
    
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

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // เดือนต้องบวก 1 เพราะ getMonth() เริ่มจาก 0
    const day = String(today.getDate()).padStart(2, '0'); // เติม 0 หากวันเป็นเลขเดี่ยว
    return `${year}-${month}-${day}`;
  }

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "firstname" || name === "lastname") {
      const namePattern = /^[A-Za-zก-๏\s]+$/;
      if (value === "" || namePattern.test(value)) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
      
      
    }else if (name === "deliveryDate") {
       
      const formattedDate = getTodayDate() 
        setFormData((prevState) => ({
          ...prevState,
          [name]: formattedDate, // ใช้ค่าแบบ YYYY-MM-DD เท่านั้น
        }));
      }else if(type === "select-multiple") {
      const options = e.target.options;
      const value = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    
   } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading,setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  
  const submitData  = async  (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    setLoading(true);
    setErrors([]);

    try {
      const response = await fetch("http://localhost:8000/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
       
      })

      const result = await response.json();
    
      if (response.ok) {
        toast.success("✅ ข้อมูลถูกส่งแล้ว!", { position: "top-right", autoClose: 3000 });
        setFormData({
          firstname: '',
          lastname: '',
          transportType: '',
          street: '',
          soi: '',
          thaiDistricts: '',
          districts: '',
          subDistrict: '',
          zipcodes: '',
          deliveryDate: '',
          productQuantity: '',
          productSize: '',
          productWeight: '',
          productNote: '',
          productType: '',
          
        });
        navigate("/Packaging");
    } else  if (!formData.firstname) {
      toast.error("กรุณากรอกชื่อจริง", { position: "top-right", autoClose: 3000 });
    } else if (!formData.lastname) {
      toast.error("กรุณากรอกนามสกุล", { position: "top-right", autoClose: 3000 });
    } else if (formData.transportType.length === 0) {
      toast.error("กรุณาเลือกประเภทขนส่ง", { position: "top-right", autoClose: 3000 });
    } else if (!formData.thaiDistricts) {
      toast.error("กรุณาเลือกจังหวัด", { position: "top-right", autoClose: 3000 });
    } else if (!formData.districts) {
      toast.error("กรุณาเลือกเขต", { position: "top-right", autoClose: 3000 });
    } else if (!formData.subDistrict) {
      toast.error("กรุณากรอกแขวง", { position: "top-right", autoClose: 3000 });
    } else if (!formData.zipcodes) {
      toast.error("กรุณากรอกรหัสไปรษณีย์", { position: "top-right", autoClose: 3000 });
    } else if (!formData.street) {
      toast.error("กรุณากรอกถนน", { position: "top-right", autoClose: 3000 });
    } else if (!formData.soi) {
      toast.error("กรุณากรอกซอย", { position: "top-right", autoClose: 3000 });
    } else if (!formData.deliveryDate) {
      toast.error("กรุณากรอกวันที่จัดส่ง (ต้องเป็นวันนี้)", { position: "top-right", autoClose: 3000 });
    } else if (!formData.productType) {
      toast.error("กรุณาเลือกประเภทสินค้า", { position: "top-right", autoClose: 3000 });
    } else if (!formData.productQuantity) {
      toast.error("กรุณากรอกจำนวนสินค้า", { position: "top-right", autoClose: 3000 });
    }else if (!formData.productSize) {
      toast.error("กรุณากรอกขนาดสินค้า", { position: "top-right", autoClose: 3000 });
    }else if (!formData.productWeight) {
      toast.error("กรุณากรอกน้ำหนักสินค้า", { position: "top-right", autoClose: 3000 });
    }else if (!formData.productNote) {
      toast.error("กรุณากรอกหมายเหตุสินค้า", { position: "top-right", autoClose: 3000 });

    }else {
      setErrors(result.errors || ["เกิดข้อผิดพลาดที่ไม่รู้จัก"]);
      
    }
   
  } catch (error) {
    console.error("Error:", error);
    setErrors(["เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์"]);
    
  }
  setLoading(false);
  
};
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 bg-gray-100 rounded-lg shadow-lg">
      <ToastContainer />
     
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">ลงทะเบียนผู้รับสินค้า</h2>
      <form onSubmit={submitData } className=' grid grid-cols-2 gap-2 '>
          

            {/* แสดงข้อผิดพลาด */}
        {errors.length > 0 && (
          <div className="bg-red-100 min-h-screen text-red-700 p-4 rounded-lg mb-6">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>- {error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">ชื่อจริงผู้รับสินค้า</label>
          <input
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="firstname"
            type="text"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="กรุณากรอกชื่อจริง"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">นามสกุลผู้รับสินค้า</label>
          <input
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="lastname"
            type="text"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="กรุณากรอกนามสกุล"
          />
        </div>

        {/* ฟอร์มประเภทขนส่ง */}
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">ประเภทขนส่ง</label>
          <div className="flex space-x-6">
            <div className="flex items-center">
              <label className="mr-2">ประเภทขนส่ง:</label>
              <select
                    className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="transportType"
                    value={formData.transportType}
                    onChange={handleChange}
                    
                  >
                      
                <option value="เลือกประเภทขนส่ง">เลือกประเภทขนส่ง</option>
                <option value="รถยนต์">รถยนต์</option>
                <option value="รถจักรยานยนต์">รถจักรยานยนต์</option>
                <option value="รถบรรทุก">รถบรรทุก</option>
              </select>
             
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

        {/* ฟอร์มถนน */}
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">ถนน</label>
          <input
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="street"
            type="text"
            value={formData.street}
            onChange={handleChange}
            placeholder="กรุณากรอกถนน"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">ซอย</label>
          <input
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="soi"
            type="text"
            value={formData.soi}
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
            
          >
            <option value="กรุณาเลือกจังหวัด">กรุณาเลือกจังหวัด</option>
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
            
          >
            <option value="กรุณาเลือกเขต">กรุณาเลือกเขต</option>
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
            
          >
            <option value="กรุณาเลือกแขวง">กรุณาเลือกแขวง</option>
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
          <label className="mr-2">ประเภทสินค้า:</label>
          <select
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            
          >
            <option value="เลือกประเภทสินค้า">เลือกประเภทสินค้า</option>
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
        <label className="block text-lg font-semibold text-gray-700">น้ำหนักสินค้า</label>
        <input
          className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="productWeight"
          type="number"
          value={formData.productWeight}
          onChange={handleChange}
          placeholder="กรุณากรอกน้ำหนักสินค้า"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">หมายเหตุสินค้า</label>
        <textarea
          className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="productNote"
          value={formData.productNote}
          onChange={handleChange}
          placeholder="กรุณากรอกหมายเหตุสินค้า"
          required
        />
      </div>

    </form>
   {/* Submit Button */}
<div className="flex justify-center">
  <button
    onClick={submitData} // ใช้ React syntax ที่ถูกต้อง
    type="submit"
    className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md mt-4 hover:bg-blue-600"
    disabled={isSubmitting || loading}
  >
    {loading ? 'กำลังส่งข้อมูล...' : 'ลงทะเบียน'}
  </button>
</div>

  </div>
);
}
export default Register;
