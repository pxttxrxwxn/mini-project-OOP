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
      <div className="flex justify-end">
        <label 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5" 
          htmlFor="default-search">
          <input 
            type="search" 
            id="default-search" 
            className="block w-full p-2" 
            placeholder="ค้นหาตารางเวลาการเดินรถเมย์" 
            required 
          />
        </label>

      </div>
    </div>
  );
}
