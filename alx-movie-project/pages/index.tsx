import Image from "next/image";
import { Black_Han_Sans } from 'next/font/google';

const blackhansans = Black_Han_Sans({
      weight: ['400']
    });
export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <main className="flex w-full max-w-full bg-[#591427] flex-col">
        <div className="bg-[#96D9C0] w-full h-[560px] flex items-center justify-center">
        <p className={`${blackhansans.className} text-[95px] md:text-[150px] text-[#4C3A51] text-center `}>
          PICTURA MOVENS
        </p>
        </div>
        <div className="bg-white w-full h-[274px] flex items-center justify-center">
          <p className="text-[#591427] font-bold text-3xl md:text-[45px] text-center mt-4">“Oh how Shakespeare would have loved cinema!”</p>
        </div>
      </main>
    </div>
  );
}
