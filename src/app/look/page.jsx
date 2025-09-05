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
            <div className="relative flex justify-end mr-[70px]">
                <input
                    type="search"
                    id="default-search"
                    className="block w-[450px] h-[50px] rounded-4xl px-[30px] pr-10 text-sm bg-white text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ค้นหาตารางเวลาการเดินรถเมย์"
                    required
                />

                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="22px"
                        viewBox="0 -960 960 960"
                        width="22px"
                        fill="#000000">
                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                    </svg>
                </div>
            </div>
        </div>

        
    </div>
  );
}
