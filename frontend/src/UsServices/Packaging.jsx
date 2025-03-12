import React, { useState, useEffect } from 'react';
import axios from 'axios';
import thaiDistricts from '../Register/thaiDistricts';
import { useCallback } from 'react';


function Packaging() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
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


  useEffect(() => {
    axios
      .get("http://localhost:8000/Register")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/Register/${id}`);
      setEditingUser(id);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/Register/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/Register/${editingUser}`, formData);
      setUsers(
        users.map((user) =>
          user.id === editingUser ? { ...user, ...formData } : user
        )
      );
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="bg-gray-300 min-h-screen p-4 sm:p-10">
      <div className="bg-white overflow-x-auto shadow-md rounded-lg p-4 sm:p-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 sm:text-center">
          รายงานการจัดส่ง</h1>
        <table className="min-w-full bg-white border border-gray-100 rounded-3xl">
          <thead className="bg-gray-200 text-gray-900 border rounded-3xl">
            <tr className="text-lg sm:text-2xl">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">วันที่จัดส่ง</th>
              <th className="p-3 border">ชื่อจริง</th>
              <th className="p-3 border">นามสกุล</th>
              <th className="p-3 border">ประเภทขนส่ง</th>
              <th className="p-3 border">รหัสไปรษณีย์</th>
              <th className="p-3 border">จังหวัด</th>
              <th className="p-3 border">แขวง</th>
              <th className="p-3 border">เขต</th>
              <th className="p-3 border">ถนน</th>
              <th className="p-3 border">ซอย</th>
              <th className="p-3 border">ประเภทสินค้า</th>
              <th className="p-3 border">จำนวนสินค้า</th>
              <th className="p-3 border">ขนาดสินค้า</th>
              <th className="p-3 border">น้ำหนักสินค้า</th>
              <th className="p-3 border">หมายเหตุ</th>
              <th className="p-3 border">ลบ</th>
              <th className="p-3 border">แก้ไข</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition duration-200 text-gray-900 border-b border-gray-100 text-sm sm:text-lg"
                >
                  <td className="p-3 border text-center">{user.id}</td>
                  <td className="p-3 border text-center">{user.deliveryDate}</td>
                  <td className="p-3 border text-center">{user.firstname}</td>
                  <td className="p-3 border text-center">{user.lastname}</td>
                  <td className="p-3 border text-center">{user.transportType}</td>
                  <td className="p-3 border text-center">{user.zipcodes}</td>
                  <td className="p-3 border text-center">{user.thaiDistricts}</td>
                  <td className="p-3 border text-center">{user.subDistrict}</td>
                  <td className="p-3 border text-center">{user.districts}</td>
                  <td className="p-3 border text-center">{user.street}</td>
                  <td className="p-3 border text-center">{user.soi}</td>
                  <td className="p-3 border text-center">{user.productType}</td>
                  <td className="p-3 border text-center">{user.productQuantity}</td>
                  <td className="p-3 border text-center">{user.productSize}</td>
                  <td className="p-3 border text-center">{user.productWeight}</td>
                  <td className="p-3 border text-center">{user.productNote}</td>
                  <td className="p-3 border text-center">
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition duration-200"
                      onClick={() => handleDelete(user.id)}
                    >
                      ลบ
                    </button>
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      className="bg-yellow-400 text-white px-4 py-1 rounded hover:bg-yellow-500 transition duration-200"
                      onClick={() => handleEdit(user.id)}
                    >
                      แก้ไข
                    </button>
                    
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="18" className="text-center p-4 text-gray-500">
                  ไม่พบข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for editing user */}
      
      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
            <h2 className="text-lg font-bold mb-4">แก้ไขข้อมูล</h2>
            <div className="grid grid-cols-2 gap-2">
              <label className="text-sm font-semibold">ชื่อจริง</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="ชื่อจริง"
                className="border p-2 rounded w-full"
              />
              <label className="text-sm font-semibold">นามสกุล</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="นามสกุล"
                className="border p-2 rounded w-full"
              />
              {/* ฟอร์มประเภทขนส่ง */}
               <label className="mr-2">ประเภทขนส่ง:</label>
              <select
                    className="sm:p-2 border-2 border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="transportType"
                    value={formData.transportType}
                    onChange={handleChange} 
                  >
                      
                <option value="เลือกประเภทขนส่ง">เลือกประเภทขนส่ง</option>
                <option value="รถยนต์">รถยนต์</option>
                <option value="รถจักรยานยนต์">รถจักรยานยนต์</option>
                <option value="รถบรรทุก">รถบรรทุก</option>
              </select>
              {/* ถนน */}
              <label className="text-sm font-semibold">ถนน</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="ถนน"
                className="border p-2 rounded w-full"
              />
                {/* ซอย */}
              <label className="text-sm font-semibold">ซอย</label>
              <input
                type="text"
                name="soi"
                value={formData.soi}
                onChange={handleChange}
                placeholder="ซอย"
                className="border p-2 rounded w-full"
              />
        
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

              <label className="text-sm font-semibold">รหัสไปรษณีย์</label>
              <input
                type="text"
                name="zipcodes"
                value={formData.zipcodes}
                onChange={handleChange}
                placeholder="รหัสไปรษณีย์"
                className="border p-2 rounded w-full"
                readOnly
              />
              
              <label className="text-sm font-semibold">จำนวนสินค้า</label>
              <input
                type="number"
                name="productQuantity"
                value={formData.productQuantity}
                onChange={handleChange}
                placeholder="จำนวนสินค้า"
                className="border p-2 rounded w-full"
              />
              <label className="text-sm font-semibold">ขนาดสินค้า</label>
              <input
                type="text"
                name="productSize"
                value={formData.productSize}
                onChange={handleChange}
                placeholder="ขนาดสินค้า"
                className="border p-2 rounded w-full"
              />
              <label className="text-sm font-semibold">น้ำหนักสินค้า</label>
              <input
                type="number"
                name="productWeight"
                value={formData.productWeight}
                onChange={handleChange}
                placeholder="น้ำหนักสินค้า"
                className="border p-2 rounded w-full"
              />
              <label className="text-sm font-semibold">หมายเหตุ</label>
              <input
                type="text"
                name="productNote"
                value={formData.productNote}
                onChange={handleChange}
                placeholder="หมายเหตุ"
                className="border p-2 rounded w-full"
              />
              <label className="text-sm font-semibold">ประเภทสินค้า</label>
              <input  
                type="text"
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                placeholder="ประเภทสินค้า"
                className="border p-2 rounded w-full"
              />
              
              {/* Add other fields here */}
            </div>

            <div className="mt-4 flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
                onClick={() => setEditingUser(null)}
              >
                ยกเลิก
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                onClick={handleUpdate}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Packaging;
