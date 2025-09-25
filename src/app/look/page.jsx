"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { BusSchedule, Driver } from "../../lib/classes";

export default function LookSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("busSchedules")) || [];
    const busSchedules = data.map(
      (item) =>
        new BusSchedule(
          item.carNumber,
          item.licensePlate,
          new Driver(item.driverName, item.contact, item.licensePlate),
          item.startStation,
          item.endStation,
          item.departTime,
          item.arriveTime,
          item.shift,
          item.trip
        )
    );
    setSchedules(busSchedules);
  }, []);

  const filteredSchedules = schedules.filter((bus) => {
      return (
          bus.searchSchedule("name", search).toLowerCase().includes(search.toLowerCase()) ||
          bus.searchSchedule("startStation", search).toLowerCase().includes(search.toLowerCase()) ||
          bus.searchSchedule("endStation", search).toLowerCase().includes(search.toLowerCase()) ||
          bus.searchSchedule("departTime", search).toLowerCase().includes(search.toLowerCase()) ||
          bus.searchSchedule("arriveTime", search).toLowerCase().includes(search.toLowerCase())
      );
  });

  return (
    <div className="min-h-screen">
      <div className="flex items-center min-w-screen">
        <Image src="/LOGO.png" alt="Logo" width={150} height={150} priority />
        <h1 className="text-center text-[50px] font-bold mx-auto text-[#FE5E25]">
          ตารางเวลาการเดินรถเมย์
        </h1>
      </div>

      <div className="flex justify-end mt-5 mr-[70px]">
        <div className="relative flex justify-end mr-[70px]">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาตารางเวลาการเดินรถเมย์"
            className="block w-[450px] h-[50px] rounded-4xl px-[30px] pr-10 text-sm bg-white text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="22px"
              viewBox="0 -960 960 960"
              width="22px"
              fill="#000000"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
            </svg>
          </div>
        </div>
      </div>

      {filteredSchedules.length > 0 ? (
        <div className="overflow-x-auto flex justify-center mt-5">
          <table className="border-collapse w-[95%] text-center text-black">
            <thead>
              <tr className="bg-[#073373] text-white text-[13.5px]">
                <th className="border border-white px-4 py-2">หมายเลขรถ</th>
                <th className="border border-white px-4 py-2">หมายเลขทะเบียนรถ</th>
                <th className="border border-white px-4 py-2">ชื่อคนขับรถ</th>
                <th className="border border-white px-4 py-2">กะทำงาน</th>
                <th className="border border-white px-4 py-2">สถานีต้นทาง</th>
                <th className="border border-white px-4 py-2">เวลาออก</th>
                <th className="border border-white px-4 py-2">สถานีปลายทาง</th>
                <th className="border border-white px-4 py-2">เวลาถึง</th>
                <th className="border border-white px-4 py-2">เที่ยวที่</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedules.map((item, idx) => (
                <tr key={idx} className="text-[13px] bg-white">
                  <td className="border border-black px-2 py-1">{item.carNumber}</td>
                  <td className="border border-black px-2 py-1">{item.licensePlate}</td>
                  <td className="border border-black px-2 py-1">{item.driver.name}</td>
                  <td className="border border-black px-2 py-1">{item.shift}</td>
                  <td className="border border-black px-2 py-1">{item.startStation}</td>
                  <td className="border border-black px-2 py-1">{item.departTime}</td>
                  <td className="border border-black px-2 py-1">{item.endStation}</td>
                  <td className="border border-black px-2 py-1">{item.arriveTime}</td>
                  <td className="border border-black px-2 py-1">{item.trip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-10 text-gray-500 text-lg">ยังไม่มีตารางรถเมย์</p>
      )}
    </div>
  );
}
