"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [schedules, setSchedules] = useState([]); 
  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("schedules") || "[]");
    setSchedules(stored);
  }, []);

  const handleDelete = (index) => {
    const updated = schedules.filter((_, i) => i !== index);
    setSchedules(updated);
    localStorage.setItem("schedules", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center min-w-screen">
        <Image
          src="/LOGO.png"
          alt="Logo"
          width={150}
          height={150}
          priority
        />
        <h1 className="text-center text-[50px] font-bold mx-auto text-[#FE5E25]">
          เพิ่มตารางเวลาการเดินรถเมย์
        </h1>
      </div>

      <div className="flex justify-end mr-[70px]">
        <Link href="/look">
          <button className="bg-[#5F4E48] w-[140px] h-[40px] rounded-2xl flex items-center p-2 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#FFFFFF"
            >
              <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
            </svg>
            <p className="text-white text-[18px] ml-1">ดูตารางรถ</p>
          </button>
        </Link>

        <Link href="/showdetails">
          <button className="bg-[#5F4E48] w-[160px] h-[40px] rounded-2xl flex items-center p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#FFFFFF"
            >
              <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
            <p className="text-white text-[17.2px] ml-2">เพิ่มตารางเวลา</p>
          </button>
        </Link>
      </div>

      {/* แสดงตารางเฉพาะตอนที่มีข้อมูล */}
      {schedules.length > 0 && (
        <div className="overflow-x-auto flex justify-center mt-5">
          <table className="border-collapse w-[95%] text-center text-black">
            <thead>
              <tr className="bg-[#073373] text-white text-[13.5px]">
                <th className="border border-white px-4 py-2">หมายเลขรถ</th>
                <th className="border border-white px-4 py-2">หมายเลขทะเบียนรถ</th>
                <th className="border border-white px-4 py-2">ชื่อคนขับรถ</th>
                <th className="border border-white px-4 py-2">กะทำงานของคนขับ</th>
                <th className="border border-white px-4 py-2">สถานีต้นทาง</th>
                <th className="border border-white px-4 py-2">เวลาออก</th>
                <th className="border border-white px-4 py-2">สถานนีปลายทาง</th>
                <th className="border border-white px-4 py-2">เวลาถึง</th>
                <th className="border border-white px-4 py-2">เที่ยวที่</th>
                <th className="border border-white px-4 py-2">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((item, idx) => (
                <tr key={idx} className="text-[13px] bg-white">
                  <td className="border border-black px-2 py-1">{item.carNumber}</td>
                  <td className="border border-black px-2 py-1">{item.licensePlate}</td>
                  <td className="border border-black px-2 py-1">{item.driverName}</td>
                  <td className="border border-black px-2 py-1">{item.shift}</td>
                  <td className="border border-black px-2 py-1">{item.startStation}</td>
                  <td className="border border-black px-2 py-1">{item.departTime}</td>
                  <td className="border border-black px-2 py-1">{item.endStation}</td>
                  <td className="border border-black px-2 py-1">{item.arriveTime}</td>
                  <td className="border border-black px-2 py-1">{item.trip}</td>
                  <td className="flex justify-center items-center border border-black px-2 py-1 cursor-pointer">
                    <Link href={`/edit?index=${idx}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B5B3B3">
                        <path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z"/>
                      </svg>
                    </Link>
                    <div className="px-2 py-1 cursor-pointer" onClick={() => handleDelete(idx)}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#de3c3c">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
