const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')
const cors = require('cors')
const app = express()

app.use(bodyparser.json())
app.use(cors())

const port = 8000

let conn = null

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb',
    port: 8840
  })
}

const validateData = (userData) => {
  let errors = []

  // ตรวจสอบชื่อ
  if (!userData.firstname) {
    errors.push('กรุณากรอกชื่อ')
  }

  // ตรวจสอบนามสกุล
  if (!userData.lastname) {
    errors.push('กรุณากรอกนามสกุล')
  }

  // ตรวจสอบประเภทของการเดินทาง
  if (!userData.transportType || userData.transportType.length === 0) {
    errors.push('กรุณาเลือกประเภทของการเดินทาง')
  }

  // ตรวจสอบชื่อถนน
  if (!userData.street) {
    errors.push('กรุณากรอกชื่อถนน')
  }

  // ตรวจสอบคำอธิบาย
  if (!userData.soi) {
    errors.push('กรุณากรอกคำอธิบาย')
  }

  // ตรวจสอบเขต/ตำบล
  if (!userData.thaiDistricts) {
    errors.push('กรุณากรอกเขต/ตำบล')
  }

  if (!userData.districts) {
    errors.push('กรุณากรอกอำเภอ')
  }

  if (!userData.subDistrict) {
    errors.push('กรุณากรอกตำบล')
  }

  if (!userData.zipcodes) {
    errors.push('กรุณากรอกรหัสไปรษณีย์')
  }

  // ตรวจสอบวันที่จัดส่ง
  if (!userData.deliveryDate) {
    errors.push('กรุณากรอกวันที่จัดส่ง')
  }

  // ตรวจสอบจำนวนสินค้า
  if (!userData.productQuantity || isNaN(userData.productQuantity) || userData.productQuantity <= 0) {
    errors.push('กรุณากรอกจำนวนสินค้าที่ถูกต้อง')
  }

  // ตรวจสอบขนาดสินค้า
  if (!userData.productSize) {
    errors.push('กรุณากรอกขนาดสินค้า')
  }

  // ตรวจสอบน้ำหนักสินค้า
  if (!userData.productWeight || isNaN(userData.productWeight) || userData.productWeight <= 0) {
    errors.push('กรุณากรอกน้ำหนักสินค้าที่ถูกต้อง')
  }

  // ตรวจสอบหมายเหตุสินค้า
  if (!userData.productNote) {
    errors.push('กรุณากรอกหมายเหตุสินค้า')
  }

  // ตรวจสอบประเภทสินค้า
  if (!userData.productType) {
    errors.push('กรุณากรอกประเภทสินค้า')
  }

  return errors
}

// path = GET /Register สำหรับ get Register ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/Register', async (req, res) => {
  const results = await conn.query('SELECT * FROM Register')
  res.json(results[0])
})

// path = POST /Register สำหรับการสร้าง Register ใหม่บันทึกเข้าไป
app.post('/Register', async (req, res) => {
  try {
      let user = req.body

      // ตรวจสอบและแปลงค่าของ deliveryDate ให้เป็น YYYY-MM-DD
      if (user.deliveryDate) {
          user.deliveryDate = user.deliveryDate.split("T")[0]  // แยกเฉพาะวันที่
      }

      const errors = validateData(user)
      if (errors.length > 0) {
        throw { 
          message: 'กรอกข้อมูลไม่ครบ',
          errors: errors }
      }

      const results = await conn.query('INSERT INTO Register SET ?', user)
      res.json({
        message: 'insert ok',
        data: results[0]
      })
  } catch (error) {
      const errorMessage = error.message || 'something wrong'
      const errors = error.errors || []
      console.error('error message', error.message)
      res.status(500).json({
        message: errorMessage,
        errors: errors
      })
  }
})


// GET /Register/:id สำหรับการดึง Register รายคนออกมา
app.get('/Register/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('SELECT * FROM Register WHERE id = ?', id)

    if (results[0].length == 0) {
      throw { statusCode: 404, message: 'หาไม่เจอ' }
    }
    res.json(results[0][0])
  } catch (error) {
    console.error('error message', error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: 'something wrong',
      errorMessage: error.message
    })
  }
})

// path = PUT /Register/:id สำหรับการแก้ไข Register รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/Register/:id', async (req, res) => {
  try {
    let id = req.params.id
    let updateUser = req.body
    const results = await conn.query(
      'UPDATE Register SET ? WHERE id = ?',
      [updateUser, id]
    )
    res.json({
      message: 'update ok',
      data: results[0]
    })
  } catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something wrong'
    })
  }
})

// path DELETE /Register/:id สำหรับการลบ Register รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/Register/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('DELETE from Register WHERE id = ?', parseInt(id))
    res.json({
      message: 'delete ok',
      data: results[0]
    })
  } catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something wrong'
    })
  }
})

app.listen(port, async (req, res) => {
  await initMySQL()
  console.log('http server run at ' + port)
})