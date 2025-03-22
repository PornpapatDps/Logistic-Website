//  แนะนำวิธีส่งที่คุ้มค่าที่สุด → ลูกค้าสามารถใส่ข้อมูลสินค้า
// แล้วระบบช่วยเลือกบริษัทขนส่งที่ถูกที่สุดและเร็วที่สุด
//✅ ให้คำปรึกษาเรื่องการเลือกบริษัทขนส่งที่เหมาะสม
import React, { useState } from 'react';

function Consulting() {
  const [formData, setFormData] = useState({
    weight: '',
    size: '',
    destination: '',
  });
  const [recommendation, setRecommendation] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConsult = () => {
    // สมมติฐานว่าระบบแนะนำขนส่งจากข้อมูลน้ำหนักและปลายทาง
    if (formData.weight && formData.destination) {
      if (parseFloat(formData.weight) < 2) {
        setRecommendation('🚀 ใช้ขนส่ง: Kerry Express (รวดเร็วและราคาประหยัด)');
      } else if (parseFloat(formData.weight) < 10) {
        setRecommendation('📦 ใช้ขนส่ง: Flash Express (เหมาะสำหรับสินค้าขนาดกลาง)');
      } else {
        setRecommendation('🚚 ใช้ขนส่ง: SCG Logistics หรือ J&T Cargo (เหมาะกับสินค้าหนัก)');
      }
    } else {
      setRecommendation('❌ โปรดกรอกข้อมูลให้ครบถ้วน');
    }
  };

  return (
    <div className="bg-white min-h-screen p-4 sm:p-10 text-gray-900">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">ให้คำปรึกษาเลือกบริษัทขนส่ง</h1>
        
        <div className="grid gap-4">
          <div>
            <label className="block text-gray-700">น้ำหนักสินค้า (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="กรอกน้ำหนักสินค้า"
            />
          </div>

          <div>
            <label className="block text-gray-700">ขนาดสินค้า (กว้างxยาวxสูง cm)</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="กรอกขนาดสินค้า"
            />
          </div>

          <div>
            <label className="block text-gray-700">ปลายทาง</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="กรอกปลายทางจัดส่ง"
            />
          </div>
        </div>

        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 w-full"
          onClick={handleConsult}
        >
          🔍 แนะนำขนส่งที่คุ้มค่าที่สุด
        </button>

        {recommendation && (
          <div className="mt-4 p-3 bg-gray-100 border-l-4 border-blue-500 text-gray-700">
            <strong>คำแนะนำ:</strong> {recommendation}
          </div>
        )}
      </div>
    </div>
  );
}

export default Consulting;

