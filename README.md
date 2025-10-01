# 🚍 BUSTRACK

โปรแกรมจัดการตารางการเดินรถเมย์ (Bus Schedule Management) พัฒนาโดยใช้ **Next.js + React** และแนวคิด **OOP (Object-Oriented Programming)**  

---

## 📌 สิ่งที่โปรแกรมทำได้

- เพิ่มตารางการเดินรถเมย์ใหม่  
- แก้ไขตารางเวลาที่มีอยู่  
- ลบตารางเวลา  
- ค้นหาตารางเวลาจาก **ชื่อคนขับ, สถานีต้นทาง, สถานีปลายทาง, เวลาออก และเวลาถึง**  
- แสดงผลตารางเวลาทั้งหมดในรูปแบบตาราง  
- บันทึกข้อมูลไว้ใน **localStorage** เพื่อให้ข้อมูลยังคงอยู่แม้ Refresh หน้าเว็บ  

---

## 📌 Features / Functions

- **Add Schedule** → เพิ่มข้อมูลตารางใหม่ (หน้า `/showdetail`)  
- **Edit Schedule** → แก้ไขข้อมูลตารางที่มีอยู่ (หน้า `/edit`)  
- **Delete Schedule** → ลบตารางออกจากระบบ (หน้า `Home`)  
- **Search Schedule** → ค้นหาตารางด้วย keyword (หน้า `/look`)  
- **List All Schedules** → แสดงตารางเวลารถเมย์ทั้งหมด  

---

## 📌 โครงสร้างโปรเจกต์

- src/
- └── 📂 app/
- ├── 📂 edit/ # หน้าแก้ไขตารางเวลารถเมย์
- │ ├── 📄 EditForm.jsx
- │ └── 📄 page.jsx
- ├── 📂 look/ # หน้าแสดงและค้นหาตารางเวลา
- │ └── 📄 page.jsx
- ├── 📂 showdetail/ # หน้าเพิ่มตารางเวลาใหม่
- │ └── 📄 page.jsx
- ├── 📄 globals.css # global style
- ├── 📄 layout.js # layout หลักของ Next.js
- └── 📄 page.jsx # หน้า Home (แสดง, ลบ, เข้าสู่หน้าอื่น)

---

## 📌 หลักการ OOP ที่ใช้

### 1. Class  
- `Driver` → เก็บข้อมูลคนขับรถ (ชื่อ, เบอร์โทร, เลขใบขับขี่)  
- `BusSchedule` → เก็บข้อมูลตารางการเดินรถ (หมายเลขรถ, ทะเบียน, สถานี, เวลา ฯลฯ)  

### 2. Encapsulation  
- ตัวแปรในคลาสถูกกำหนดเป็น **private** เช่น `_name`, `_contact`, `_carNumber`  
- ใช้ **getter / setter** ในการเข้าถึงข้อมูล เช่น `get name()`, `get carNumber()`  

### 3. Inheritance  
- `BusSchedule` **extends** จาก `Driver` เพื่อใช้งานคุณสมบัติร่วมกัน  

### 4. Polymorphism  
- เมธอด `searchSchedule(field, value)` ถูก **override** เพื่อค้นหาจากหลาย field (ชื่อ, สถานี, เวลา ฯลฯ)  
- การ override `toString()` เพื่อแสดงผลตารางในรูปแบบข้อความ  

### 5. Abstraction  
- ออกแบบ **abstract class (base class)** ใน `lib/classes`  
- บังคับให้คลาสลูกต้อง implement เมธอด เช่น `getRole()` และ `searchSchedule()`  

---

## 📌 การทำงานของแต่ละหน้า

### Home (`page.jsx`)
- แสดงรายการตารางรถทั้งหมด  
- สามารถลบตารางได้  
- ปุ่มลิงก์ไปยังหน้าเพิ่ม (`/showdetail`) และค้นหา (`/look`)  

### Add Schedule (`/showdetail/page.jsx`)
- ฟอร์มเพิ่มตารางใหม่  
- ตรวจสอบความถูกต้อง (Validation) ก่อนบันทึก  
- บันทึกข้อมูลลง **localStorage**  

### Edit Schedule (`/edit/EditForm.jsx`)
- ฟอร์มแก้ไขตาราง (แก้ตาม index)  
- โหลดข้อมูลจาก **localStorage**  
- ตรวจสอบความถูกต้องก่อนบันทึกกลับ  

### Look Schedules (`/look/page.jsx`)
- แสดงตารางทั้งหมดในรูปแบบ **table**  
- ค้นหาตารางตาม keyword (ชื่อ, สถานี, เวลาออก/ถึง)  

---

## 📌 UML Class Diagram

<img src="/public/552968735_4032723166977269_531263957304230902_n.png" alt="UML Class Diagram" width="500"/>

---

## 📌 คำอธิบายคลาส

- **Person (abstract class)**  
  - เป็นคลาส นามธรรม (abstract class) → ไม่สามารถสร้างอ็อบเจกต์โดยตรงได้
  - เก็บ `name`, `contact`  
  - เมธอด: `getRole()` → เป็น abstract method ต้องถูก override ในคลาสลูก

- **Driver (extends Person)**  
  - สืบทอดมาจาก `Person`  
  - เพิ่มฟิลด์ `licensePlate`  
  - Override เมธอด `getRole()` → คืนค่า `"Driver"`  

- **Bus (extends Driver)**
  - สืบทอดจาก `Driver` → ตารางเดินรถผูกกับข้อมูลคนขับ
  - เพิ่มฟิลด์ `carNumber`
  - เมธอด: `displayBusInfo()` → แสดงข้อมูลรถพร้อมคนขับ
  - สามารถเข้าถึง carNumber ผ่าน getter

- **BusSchedule (extends Bus)**  
  - สืบทอดจาก Bus → ขยายความสามารถไปยังตารางเดินรถ
  - เพิ่มฟิลด์ : `startStation`, `endStation`, `departTime`, `arriveTime`, `shift`, `trip`  
  - เมธอด:  
    -  Override `displayBusInfo()` →แสดงรายละเอียดรถพร้อมตารางเดินรถ
    - `searchSchedule(field, value)` → ใช้ค้นหาตารางเดินรถตามฟิลด์ที่กำหนด

---

## 📌 เทคโนโลยีที่ใช้
- **Next.js 13+ (App Router)**  
- **React**  
- **localStorage** สำหรับเก็บข้อมูล  

---