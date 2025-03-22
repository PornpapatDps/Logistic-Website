# Logistic Website 

## **โปรเจกต์นี้เป็นโปรเจกต์สำหรับวิชา 02739241 วิชา Internet Programming**  
เว็บไซต์นี้ถูกพัฒนาเพื่อจัดการข้อมูลของระบบขนส่งสินค้า โดยใช้ **React.js** ในการพัฒนาเว็บไซต์ จากเดิมที่ใช้ **HTML, CSS, JS** และ **MySQL** ผ่าน **phpMyAdmin** ในการจัดการข้อมูล SQL

## **ฟีเจอร์หลัก**
- **การลงทะเบียนผู้ใช้และเข้าสู่ระบบ**: ระบบการลงทะเบียน
- **การติดตามการขนส่งสินค้า**: ผู้ใช้สามารถติดตามสถานะของการขนส่งสินค้า
- **การจัดการข้อมูลการขนส่ง**: ระบบช่วยให้ผู้ดูแลสามารถจัดการข้อมูลการขนส่งและผู้ใช้ได้
- **Responsive Design**: เว็บไซต์รองรับการแสดงผลทั้งบนคอมพิวเตอร์และมือถือ


## **เทคโนโลยีที่ใช้**
- **Frontend:**
  - **React.js**: ใช้ในการพัฒนาเว็บไซต์และจัดการส่วนติดต่อผู้ใช้ (UI)
  - **HTML5, CSS3, JavaScript**: ใช้สำหรับโครงสร้างและรูปแบบเว็บไซต์


- **Backend:**
  - **Node.js & Express.js**: สำหรับการจัดการ API และเชื่อมต่อกับฐานข้อมูล
  - **MySQL**: ใช้ในการจัดเก็บข้อมูลระบบขนส่งสินค้า
  - **phpMyAdmin**: ใช้ในการจัดการฐานข้อมูล MySQL

## **ขั้นตอนการติดตั้ง**

### **ข้อกำหนดเบื้องต้น**
- **Node.js**: ดาวน์โหลดและติดตั้งจาก [Node.js](https://nodejs.org/)
- **npm**: ใช้สำหรับติดตั้ง dependencies

### **วิธีการติดตั้งและรันโปรเจกต์**

1. **คัดลอกโปรเจกต์จาก GitHub**:
   ```bash
   git clone https://github.com/PornpapatDps/Logistic-Website.git

**ติดตั้ง dependencies: ไปที่โฟลเดอร์ของ frontend และ backend จากนั้นติดตั้ง dependencies**

**สำหรับ Frontend (React.js)**
 ```bash
cd frontend
npm install
```
**สำหรับ Backend (Node.js + MySQL):**
 ```bash
cd backend
npm install
 ```
**รัน Backend:**
 ```bash
cd backend
npm start
 ```
เซิร์ฟเวอร์ของ Backend จะรันที่ 
http://localhost:8840

รัน Frontend:
 ```bash
cd frontend
npm start
 ```
เซิร์ฟเวอร์ของ Frontend จะรันที่ 
 ```bash
http://localhost:3000
 ```

เปิดเบราว์เซอร์และไปที่ http://localhost:5174 เพื่อดูเว็บไซต์



!

