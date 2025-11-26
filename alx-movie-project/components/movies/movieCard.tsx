import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { MovieProps } from "@/interfaces";

const MovieCard: React.FC<MovieProps> = ({ id, title, poster_path, vote_average }) => {
    return (
        <div className="w-[168.5px] h-[302px] bg-[#4C3A51] rounded-[10px] mt-4 shadow-inner shadow-[#f1d7de]/15">
            <a href={`https://www.themoviedb.org/movie/${id}`} target="_blank">
            <div className="flex justify-center">
            <Image src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="movie card" width={151} height={223} className="mt-4"/>
            </div>
            <div className="px-2 mt-2">
            <p className="text-[#96D9C0] font-bold text-base overflow-hidden whitespace-nowrap text-ellipsis">{title}</p>
            <div className="flex justify-between pb-2">
            <p className="text-[#D27C91] text-sm">horror</p>
            <p className="text-orange-300 flex items-center gap-1 text-sm">{vote_average} <FaStar /></p>
            </div>
            </div>
            </a>
        </div>
    )
}
export default MovieCard;