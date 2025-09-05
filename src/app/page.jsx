import Image from "next/image";
import Link from "next/link"

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
        <h1 className="text-center text-[50px] font-bold mx-auto text-[#FE5E25]">เพิ่มตารางเวลาการเดินรถเมย์</h1>
      </div>
      <div className="flex justify-end mr-[70px]">
        <Link href="/look">
          <buttom className='bg-[#5F4E48] w-[140px] h-[40px] rounded-2xl flex items-center p-2 mr-4'>
            <svg xmlns="http://www.w3.org/2000/svg" 
            height="30px" 
            viewBox="0 -960 960 960" 
            width="30px" 
            fill="#FFFFFF">
            <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
            </svg>
            <p className="text-white text-[18px] ml-1">ดูตารางรถ</p>
          </buttom>
        </Link>

        <Link href="/showdetails">
          <buttom className='bg-[#5F4E48] w-[160px] h-[40px] rounded-2xl flex items-center p-2'>
            <svg xmlns="http://www.w3.org/2000/svg" 
            height="30px" 
            viewBox="0 -960 960 960" 
            width="30px" 
            fill="#FFFFFF">
            <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
            </svg>
            <p className="text-white text-[17.2px] ml-2">เพิ่มตารางเวลา</p>
          </buttom>
        </Link>
      </div>
    </div>
    
  );
}
