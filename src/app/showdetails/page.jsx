"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BusSchedule, Driver } from "../../lib/classes";
import Swal from "sweetalert2";

export default function ShowDetailsPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    carNumber: "",
    licensePlate: "",
    driverName: "",
    contact: "",
    startStation: "",
    endStation: "",
    departTime: "",
    arriveTime: "",
    shift: "",
    trip: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.carNumber) newErrors.carNumber = "กรุณากรอกหมายเลขรถ";
    if (!formData.driverName) newErrors.driverName = "กรุณากรอกชื่อคนขับ";
    if (!formData.startStation) newErrors.startStation = "กรุณากรอกสถานีต้นทาง";
    if (!formData.endStation) newErrors.endStation = "กรุณากรอกสถานีปลายทาง";
    if (!formData.shift) newErrors.shift = "กรุณาเลือกกะทำงาน";
    if (!formData.departTime) newErrors.departTime = "กรุณาเลือกเวลาออก";
    if (!formData.arriveTime) newErrors.arriveTime = "กรุณาเลือกเวลาถึง";
    if (!formData.trip) newErrors.trip = "กรุณากรอกเที่ยวที่";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Swal.fire({ title: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง", icon: "error", draggable: true });
      return;
    }
    const schedules = JSON.parse(localStorage.getItem("busSchedules")) || [];
    schedules.push({ ...formData });
    localStorage.setItem("busSchedules", JSON.stringify(schedules));
    Swal.fire({
      title: "บันทึกข้อมูลเรียบร้อย!",
      icon: "success",
      draggable: true
    }).then(() => router.push("/"));
    setFormData({
      carNumber: "",
      licensePlate: "",
      driverName: "",
      contact: "",
      startStation: "",
      endStation: "",
      departTime: "",
      arriveTime: "",
      shift: "",
      trip: ""
    });
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

      <div className="flex justify-center ml-[100px]">
        <form className="grid grid-cols-1 md:grid-cols-2 md:gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
            <div>
                <label className="block mb-1 text-xl font-semibold">หมายเลขรถ</label>
                <input
                type="text"
                className="w-full md:w-[300px] h-[40px] ml-[30px] bg-white border border-gray-400 rounded-md p-2"
                placeholder="B101-01"
                value={formData.carNumber}
                onChange={(e) => handleChange("carNumber", e.target.value)}
                />
                {errors.carNumber && <p className="text-red-500">{errors.carNumber}</p>}
            </div>

            <div>
                <label className="block mb-1 text-xl font-semibold">ชื่อคนขับรถ</label>
                <input
                type="text"
                className="w-full md:w-[300px] h-[40px] ml-[30px] bg-white border border-gray-400 rounded-md p-2"
                placeholder="นายสมชาย ใจดี"
                value={formData.driverName}
                onChange={(e) => handleChange("driverName", e.target.value)}
                />
                {errors.driverName && <p className="text-red-500">{errors.driverName}</p>}
            </div>

            <div>
                <label className="block mb-1 text-xl font-semibold">สถานีต้นทาง</label>
                <input
                type="text"
                className="w-full md:w-[300px] h-[40px] ml-[30px] bg-white border border-gray-400 rounded-md p-2"
                placeholder="มหาวิทยาลัย C"
                value={formData.startStation}
                onChange={(e) => handleChange("startStation", e.target.value)}
                />
                {errors.startStation && <p className="text-red-500">{errors.startStation}</p>}
            </div>

            <div>
                <label className="block mb-1 text-xl font-semibold">สถานีปลายทาง</label>
                <input
                type="text"
                className="w-full md:w-[300px] h-[40px] ml-[30px] bg-white border border-gray-400 rounded-md p-2"
                placeholder="สถานีรถไฟ B"
                value={formData.endStation}
                onChange={(e) => handleChange("endStation", e.target.value)}
                />
                {errors.endStation && <p className="text-red-500">{errors.endStation}</p>}
            </div>

            <div>
                <label className="block mb-1 text-xl font-semibold">ช่องทางติดต่อฉุกเฉิน (ถ้ามี)</label>
                <input
                type="text"
                className="w-full md:w-[300px] h-[40px] ml-[30px] bg-white border border-gray-400 rounded-md p-2"
                placeholder="0123456789"
                value={formData.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                />
                {errors.contact && <p className="text-red-500">{errors.contact}</p>}
            </div>
            </div>

            <div className="flex flex-col gap-3 ml-[100px]">
            <div>
                <label className="block text-xl font-semibold">หมายเลขทะเบียนรถ</label>
                <input
                type="text"
                className="w-full md:w-[300px] h-[40px] ml-[30px] bg-white border border-gray-400 rounded-md p-2"
                placeholder="1กข 1234"
                value={formData.licensePlate}
                onChange={(e) => handleChange("licensePlate", e.target.value)}
                />
                {errors.licensePlate && <p className="text-red-500">{errors.licensePlate}</p>}
            </div>

            <div>
                <label className="block text-xl font-semibold">กะทำงานของคนขับ</label>
                <div className="flex items-center gap-4 mt-1">
                {["เช้า", "บ่าย", "ดึก"].map((shift) => (
                    <label key={shift} className="flex items-center gap-2 ml-[30px]">
                    <input
                        type="radio"
                        name="shift"
                        checked={formData.shift === shift}
                        onChange={() => handleChange("shift", shift)}
                    />
                    {shift}
                    </label>
                ))}
                </div>
                {errors.shift && <p className="text-red-500">{errors.shift}</p>}
            </div>

            <div>
              <label className="block text-xl font-semibold">เวลาออก</label>
              <div className="flex items-center ml-[30px]">
              <input
                type="time"
                className="w-[150px] h-[40px] border bg-white border-gray-300 rounded-md p-2 text-2xl"
                value={formData.departTime || ""}
                onChange={(e) => handleChange("departTime", e.target.value)}
              />
                <div className="text-[25px] font-bold ml-2">น.</div>
              </div>
              {errors.depart && <p className="text-red-500">{errors.depart}</p>}
            </div>

            <div>
              <label className="block text-xl font-semibold">เวลาถึง</label>
              <div className="flex items-center ml-[30px]">
              <input
                type="time"
                className="w-[150px] h-[40px] border bg-white border-gray-300 rounded-md p-2 text-2xl"
                value={formData.arriveTime || ""}
                onChange={(e) => handleChange("arriveTime", e.target.value)}
              />
                <div className="text-[25px] font-bold ml-2">น.</div>
              </div>
              {errors.arrive && <p className="text-red-500">{errors.arrive}</p>}
            </div>

                <div>
                    <label className="block text-xl font-semibold">เที่ยวที่</label>
                    <input
                        type="text"
                        className="w-full md:w-[300px] h-[40px] ml-[30px] bg-white border border-gray-400 rounded-md p-2"
                        placeholder="1"
                        value={formData.trip}
                        onChange={(e) => handleChange("trip", e.target.value)}
                        />
                        {errors.trip && <p className="text-red-500">{errors.trip}</p>}
                </div>
            </div>

            <div className="md:col-span-2 flex justify-end gap-5">
                <Link href="/">
                    <button
                        className="w-[130px] bg-[#C5C5C5] text-white px-6 py-3 rounded-4xl hover:bg-gray-500 transition"
                    >
                    ยกเลิก
                    </button>
                </Link>

                <button
                    type="submit"
                    className="w-[130px] bg-[#073373] text-white px-6 py-3 rounded-4xl hover:bg-gray-500 transition"
                >
                    เพิ่มตาราง
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
