# 🚍 BUSTRACK

โปรแกรมจัดการตารางการเดินรถเมย์ (Bus Schedule Management) พัฒนาโดยใช้ **Next.js + React** และแนวคิด **OOP (Object-Oriented Programming)**  

---

## Table of Contents
- [สิ่งที่โปรแกรมทำได้](#สิ่งที่โปรแกรมทำได้)
- [Features / Functions](#features--functions)
- [โครงสร้างโปรเจกต์](#โครงสร้างโปรเจกต์)
- [หลักการ OOP ที่ใช้](#หลักการ-oop-ที่ใช้)
- [การทำงานของแต่ละหน้า](#การทำงานของแต่ละหน้า)
- [UML Class Diagram](#uml-class-diagram)
- [คำอธิบายคลาส](#คำอธิบายคลาส)
- [Team Job position](#team-job-position)
- [เทคโนโลยีที่ใช้](#เทคโนโลยีที่ใช้)
- [Demo](#demo)
- [Contact](#contact)

---
## สิ่งที่โปรแกรมทำได้

- เพิ่มตารางการเดินรถเมย์ใหม่  
- แก้ไขตารางเวลาที่มีอยู่  
- ลบตารางเวลา  
- ค้นหาตารางเวลาจาก **ชื่อคนขับ, สถานีต้นทาง, สถานีปลายทาง, เวลาออก และเวลาถึง**  
- แสดงผลตารางเวลาทั้งหมดในรูปแบบตาราง  
- บันทึกข้อมูลไว้ใน **localStorage** เพื่อให้ข้อมูลยังคงอยู่แม้ Refresh หน้าเว็บ  

---

## Features / Functions

- **Add Schedule** → เพิ่มข้อมูลตารางใหม่ (หน้า `/showdetail`)  
- **Edit Schedule** → แก้ไขข้อมูลตารางที่มีอยู่ (หน้า `/edit`)  
- **Delete Schedule** → ลบตารางออกจากระบบ (หน้า `Home`)  
- **Search Schedule** → ค้นหาตารางด้วย keyword (หน้า `/look`)  
- **List All Schedules** → แสดงตารางเวลารถเมย์ทั้งหมด  

---

## โครงสร้างโปรเจกต์

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

## หลักการ OOP ที่ใช้

### 1. Class  
- `Person (abstract class)`→ คลาสฐานเก็บข้อมูลทั่วไปของบุคคล (`name`, `contact`)
- `Driver (extends Person)`→ เก็บข้อมูลคนขับรถ (`name`, `contact`, `licensePlate`) 
- `Bus (extends Driver)` → เพิ่มข้อมูลรถ (`carNumber`) และเมธอด `displayBusInfo()`
- `BusSchedule (extends Bus)` → เก็บข้อมูลตารางเดินรถ (`startStation`, `endStation`, `departTime`, `arriveTime`, `shift`, `trip`)  

### 2. Encapsulation  
- ฟิลด์บางตัวถูกกำหนดเป็น **private** เช่น `#carNumber` ในคลาส `Bus` และ `_name`, `_contact` ในคลาส `Person`
- ใช้ **getter / setter** เพื่อเข้าถึงข้อมูลโดยไม่เปิดเผยตัวแปรโดยตรง เช่น `get name()`, `get carNumber()`  

### 3. Inheritance  
- `Driver` **extends** จาก `Person`
-  `Bus` **extends** จาก `Driver`
- `BusSchedule` **extends** จาก `Bus`
- การสืบทอดช่วยให้คลาสลูกสามารถใช้คุณสมบัติและเมธอดของคลาสพ่อแม่ได้

### 4. Polymorphism  
- **Override**: 
  - `displayBusInfo()` ใน `BusSchedule` → แสดงผลแบบรวมข้อมูลรถและตารางเดินรถ
  - `getRole()` ใน `Driver` → กำหนดบทบาท `"Driver"`
- **Overloading (จำลองด้วย optional parameters)**:
  - `searchSchedule(field, value)` → ค้นหาตารางโดยระบุฟิลด์และค่าที่ต้องการ

### 5. Abstraction  
-  `Person` เป็น abstract class → ไม่สามารถสร้างอ็อบเจกต์โดยตรง
- บังคับให้คลาสลูกต้อง implement เมธอดสำคัญ เช่น `getRole() `และ `searchSchedule()`

---

## การทำงานของแต่ละหน้า

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

## UML Class Diagram

<img src="/public/552968735_4032723166977269_531263957304230902_n.png" alt="UML Class Diagram" width="500"/>

---

## คำอธิบายคลาส

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
  - สามารถเข้าถึง `carNumber` ผ่าน getter

- **BusSchedule (extends Bus)**  
  - สืบทอดจาก Bus → ขยายความสามารถไปยังตารางเดินรถ
  - เพิ่มฟิลด์ : `startStation`, `endStation`, `departTime`, `arriveTime`, `shift`, `trip`  
  - เมธอด:  
    -  Override `displayBusInfo()` →แสดงรายละเอียดรถพร้อมตารางเดินรถ
    - `searchSchedule(field, value)` → ใช้ค้นหาตารางเดินรถตามฟิลด์ที่กำหนด

---

## Team Job position
| **Student ID** | **Name**                  | **Position**                          |
|-----------------|---------------------------|---------------------------------------|
| 67023008        | APINYA SANGHONG           | UX/UI Design                             |
| 67023109        | INTHITANAN PANKAEW        | Front-End Developer                             |
| 67026449        | MUTSAYA HWANGJI         | Functional Test                           |
| 67026427        | Pattarawin Rungpanarat      | Front-End Developer |

---

## เทคโนโลยีที่ใช้
- **Next.js 13+ (App Router)**  
- **React**  
- **localStorage** สำหรับเก็บข้อมูล  

---

## Demo
https://mini-project-oop.vercel.app/

---

## Contact
### หากมีคำถาม สามารถติดต่อผู้ดูแลโปรเจคคนที่1ได้ที่:
  -  อีเมล: naysasatadur5555@gmail.com
  -  GitHub: [https://github.com/pxttxrxwxn](https://github.com/pxttxrxwxn)
### หากมีคำถาม สามารถติดต่อผู้ดูแลโปรเจคคนที่2ได้ที่:
  -  อีเมล: 67023008@up.ac.th
  -  GitHub: [https://github.com/Pookpikkkkk](https://github.com/Pookpikkkkk)