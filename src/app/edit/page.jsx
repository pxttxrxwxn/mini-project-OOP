"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


export default function EditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const index = searchParams.get("index");

  const [formData, setFormData] = useState({
    carNumber: "",
    driverName: "",
    startStation: "",
    endStation: "",
    contact: "",
    licensePlate: "",
    shift: "",
    departTime: "",
    arriveTime: "",
    trip: ""
  });


  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (index !== null) {
      fetch("/api/bus")
        .then((res) => res.json())
        .then((data) => {
          const item = data[parseInt(index)];
          if (item) {
            setFormData({
              carNumber: item.carNumber,
              driverName: item.driverName,
              startStation: item.startStation,
              endStation: item.endStation,
              contact: item.contact,
              licensePlate: item.licensePlate,
              shift: item.shift,
              departTime: item.departTime || "",
              arriveTime: item.arriveTime || "",
              trip: item.trip,
            });
          }
        });
    }
  }, [index]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.carNumber) newErrors.carNumber = "กรุณากรอกหมายเลขรถ";
    if (!formData.driverName) newErrors.driverName = "กรุณากรอกชื่อคนขับ";
    if (!formData.startStation) newErrors.startStation = "กรุณากรอกสถานีต้นทาง";
    if (!formData.endStation) newErrors.endStation = "กรุณากรอกสถานีปลายทาง";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedData = { ...formData };
    await fetch("/api/bus", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index: parseInt(index), updatedData }),
    });


    await fetch("/api/bus", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index: parseInt(index), updatedData }),
    });

    alert("บันทึกข้อมูลเรียบร้อย!");
    router.push("/");
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
              {errors.departTime && <p className="text-red-500">{errors.departTime}</p>}
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
              {errors.arriveTime && <p className="text-red-500">{errors.arriveTime}</p>}
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
