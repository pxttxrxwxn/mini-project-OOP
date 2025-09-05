import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="flex items-center min-w-screen">
        <Image
          src="/LOGO.png"
          alt="Logo"
          className=""
          width={150}
          height={150}
          priority
        />
        <h1 className="text-center text-[50px] font-bold mx-auto text-[#FE5E25]">ตารางเวลาการเดินรถเมย์</h1>
      </div>

        <div className="flex justify-center">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-[150px]">
                {/* Left column */}
                <div className="flex flex-col gap-4 ml-[100px]">
                    <div>
                        <label className="block mb-1 text-xl font-semibold">หมายเลขรถ</label>
                        <input
                        type="text"
                        className="ml-7 w-[350px] h-[48px] border bg-white border-gray-300 rounded-md p-2"
                        placeholder="B101-01"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-xl font-semibold">ชื่อคนขับรถ</label>
                        <input
                        type="text"
                        className="ml-7 w-[350px] h-[48px] border bg-white border-gray-300 rounded-md p-2"
                        placeholder="นายสมชาย ใจดี"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-xl font-semibold">สถานีต้นทาง</label>
                        <input
                        type="text"
                        className="ml-7 w-[350px] h-[48px] border bg-white border-gray-300 rounded-md p-2"
                        placeholder="มหาวิทยาลัย C"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-xl font-semibold">สถานีปลายทาง</label>
                        <input
                        type="text"
                        className="ml-7 w-[350px] h-[48px] border bg-white border-gray-300 rounded-md p-2"
                        placeholder="สถานีรถไฟ B"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-xl font-semibold">
                        ช่องทางติดต่อฉุกเฉิน (ถ้ามี)
                        </label>
                        <input
                        type="text"
                        className="ml-7 w-[350px] h-[48px] border bg-white border-gray-300 rounded-md p-2"
                        placeholder="0123456789"
                        />
                    </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-4 ml-[60px]">
                    <div>
                        <label className="block mb-1 text-xl font-semibold">หมายเลขทะเบียนรถ</label>
                        <input
                        type="text"
                        className="ml-7 w-[350px] h-[48px] border bg-white border-gray-300 rounded-md p-2"
                        placeholder="1กข 1234"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-xl font-semibold">กะทำงานของคนขับ</label>
                        <div className="flex  items-center gap-[50px] ml-7">
                            <label className="flex items-center gap-2">
                                <input type="radio" className="scale-135" name="shift" /> เช้า
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" className="scale-135" name="shift" /> บ่าย
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" className="scale-135" name="shift" /> ดึก
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 text-xl font-semibold">เวลาออก</label>
                        <div className="flex items-center gap-2 ml-7">
                            <input
                                type="number"
                                className="w-[55px] h-[50px] border bg-white border-gray-300 rounded-md p-1 text-center text-2xl"
                                defaultValue="08"
                            />
                            <div className="text-[40px] font-bold text-black">
                                :
                            </div>
                            <input
                                type="number"
                                className="w-[55px] h-[50px] border bg-white border-gray-300 rounded-md p-1 text-center text-2xl"
                                defaultValue="00"
                            />
                            <div className="text-[30px] font-bold text-black">
                                น.
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 text-xl font-semibold">เวลาถึง</label>
                        <div className="flex items-center gap-2 ml-7">
                            <input
                                type="number"
                                className="w-[55px] h-[50px] border bg-white border-gray-300 rounded-md p-1 text-center text-2xl"
                                defaultValue="09"
                            />
                            <div className="text-[40px] font-bold text-black">
                                :
                            </div>
                            <input
                                type="number"
                                className="w-[55px] h-[50px] border bg-white border-gray-300 rounded-md p-1 text-center text-2xl"
                                defaultValue="30"
                            />
                            <div className="text-[30px] font-bold text-black">
                                น.
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">เที่ยวที่</label>
                        <input
                        type="text"
                        className="ml-7 w-[350px] h-[48px] border bg-white border-gray-300 rounded-md p-2"
                        placeholder="1"
                        />
                    </div>
                </div>
            </form>

            <div>
                <buttom >

                </buttom>
            </div>
        </div>
      
    </div>

    


    );
}