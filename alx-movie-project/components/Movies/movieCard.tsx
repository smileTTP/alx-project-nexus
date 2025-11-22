import Link from "next/link";
import Image from "next/image";

const MovieCard: React.FC = () => {
    return (
        <div className="w-[168.5px] h-[302px] bg-[#4C3A51] rounded-[10px] mt-4 shadow-inner shadow-[#f1d7de]/15">
            <div className="flex justify-center">
            <Image src={"/assets/pearl.jpg"} alt="movie card" width={151} height={223} className="mt-4"/>
            </div>
            <div className="px-2 mt-2">
            <p className="text-[#96D9C0] font-bold text-base">Pearl (2022)</p>
            <p className="text-[#D27C91] text-sm">Horror, Triller</p>
            </div>
        </div>
    )
}
export default MovieCard;