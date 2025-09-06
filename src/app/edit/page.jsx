"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


export default function EditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const index = searchParams.get("index"); // index ของ item ที่จะถูกแก้ไข

  const [formData, setFormData] = useState({
    carNumber: "",
    driverName: "",
    startStation: "",
    endStation: "",
    contact: "",
    licensePlate: "",
    shift: "",
    departHour: "",
    departMin: "",
    arriveHour: "",
    arriveMin: "",
    trip: ""
  });

  const [errors, setErrors] = useState({}); // ✅ เพิ่ม state errors

  useEffect(() => {
    if (index !== null) {
      const schedules = JSON.parse(localStorage.getItem("schedules") || "[]");
      const item = schedules[parseInt(index)];
      if (item) {
        setFormData({
          carNumber: item.carNumber,
          driverName: item.driverName,
          startStation: item.startStation,
          endStation: item.endStation,
          contact: item.contact,
          licensePlate: item.licensePlate,
          shift: item.shift,
          departHour: item.departTime?.split(":")[0] || "",
          departMin: item.departTime?.split(":")[1] || "",
          arriveHour: item.arriveTime?.split(":")[0] || "",
          arriveMin: item.arriveTime?.split(":")[1] || "",
          trip: item.trip
        });
      }
    }
  }, [index]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ validate เบื้องต้น
    let newErrors = {};
    if (!formData.carNumber) newErrors.carNumber = "กรุณากรอกหมายเลขรถ";
    if (!formData.driverName) newErrors.driverName = "กรุณากรอกชื่อคนขับ";
    if (!formData.startStation) newErrors.startStation = "กรุณากรอกสถานีต้นทาง";
    if (!formData.endStation) newErrors.endStation = "กรุณากรอกสถานีปลายทาง";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const schedules = JSON.parse(localStorage.getItem("schedules") || "[]");
    schedules[parseInt(index)] = {
      ...formData,
      departTime: `${formData.departHour}:${formData.departMin}`,
      arriveTime: `${formData.arriveHour}:${formData.arriveMin}`
    };
    localStorage.setItem("schedules", JSON.stringify(schedules));
    alert("บันทึกข้อมูลเรียบร้อย!");
    router.push("/"); // กลับหน้าหลัก
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center min-w-screen">
        <Image src="/LOGO.png" alt="Logo" width={150} height={150} priority />
        <h1 className="text-center text-[50px] font-bold mx-auto text-[#FE5E25]">
          แก้ไขตารางเวลาการเดินรถเมย์
        </h1>
      </div>

      <div className="flex justify-center ml-[100px]">
        <form className="grid grid-cols-1 md:grid-cols-2 md:gap-5" onSubmit={handleSubmit}>
          {/* Left Column */}
          <div className="flex flex-col gap-3">
            {["carNumber", "driverName", "startStation", "endStation", "contact"].map((field) => (
              <div key={field}>
                <label className="block mb-1 text-xl font-semibold">
                  {field === "carNumber" && "หมายเลขรถ"}
                  {field === "driverName" && "ชื่อคนขับรถ"}
                  {field === "startStation" && "สถานีต้นทาง"}
                  {field === "endStation" && "สถานีปลายทาง"}
                  {field === "contact" && "ช่องทางติดต่อฉุกเฉิน (ถ้ามี)"}
                </label>
                <input
                  type="text"
                  className="w-full md:w-[300px] h-[40px] ml-[30px] bg-white border border-gray-400 rounded-md p-2"
                  placeholder={
                    field === "carNumber"
                      ? "B101-01"
                      : field === "driverName"
                      ? "นายสมชาย ใจดี"
                      : field === "startStation"
                      ? "มหาวิทยาลัย C"
                      : field === "endStation"
                      ? "สถานีรถไฟ B"
                      : "0123456789"
                  }
                  value={formData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                />
                {errors[field] && <p className="text-red-500">{errors[field]}</p>}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3 ml-[100px]">
            {/* License Plate */}
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

            {/* Shift */}
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

            {/* Depart & Arrive Time */}
            {[
              { label: "เวลาออก", hour: "departHour", min: "departMin" },
              { label: "เวลาถึง", hour: "arriveHour", min: "arriveMin" }
            ].map((time) => (
              <div key={time.label}>
                <label className="block text-xl font-semibold">{time.label}</label>
                <div className="flex items-center ml-[30px]">
                  <input
                    type="text"
                    className="w-[50px] h-[40px] border bg-white border-gray-300 rounded-md p-1 text-center text-2xl"
                    placeholder="08"
                    value={formData[time.hour]}
                    onChange={(e) => handleChange(time.hour, e.target.value)}
                  />
                  <div className="text-[40px] font-bold">:</div>
                  <input
                    type="text"
                    className="w-[50px] h-[40px] border bg-white border-gray-300 rounded-md p-1 text-center text-2xl"
                    placeholder="00"
                    value={formData[time.min]}
                    onChange={(e) => handleChange(time.min, e.target.value)}
                  />
                  <div className="text-[25px] font-bold">น.</div>
                </div>
                {(errors[time.hour] || errors[time.min]) && (
                  <p className="text-red-500">{errors[time.hour] || errors[time.min]}</p>
                )}
              </div>
            ))}

            {/* Trip */}
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

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-5">
            <Link href="/">
              <button className="w-[130px] bg-[#C5C5C5] text-white px-6 py-3 rounded-4xl hover:bg-gray-500 transition">
                ยกเลิก
              </button>
            </Link>
            <button
              type="submit"
              className="w-[130px] bg-[#073373] text-white px-6 py-3 rounded-4xl hover:bg-gray-500 transition"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
