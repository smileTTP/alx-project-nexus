import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { MovieProps } from "@/interfaces";
import { getGenreNames } from "@/utils/genresUtils";

interface MovieCardProps {
    movie: MovieProps;
    genreMap: { [key: number]: string };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, genreMap }) => {

    const genreNames = getGenreNames(movie.genre_ids, genreMap);
    const genres = genreNames.join(', ');
    
    return (
        <div className="w-[168.5px] h-[302px] bg-[#4C3A51] rounded-[10px] mt-4 shadow-inner shadow-[#f1d7de]/15">
            <Link href={`/movie/${movie.id}`}>
            <div className="flex justify-center">                
            <Image unoptimized={true} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/30x40/4C3A51/f1d7de?text=No+Img'} alt="movie card" width={151} height={223} className="mt-4" />
            </div>
            <div className="px-2 mt-2">
            <p className="text-[#96D9C0] font-bold text-base overflow-hidden whitespace-nowrap text-ellipsis ">{movie.title}</p>
            <div className="flex justify-between pb-2">
            {genres && (
                <p className="text-[12px] text-[#D27C91] overflow-hidden whitespace-nowrap text-ellipsis max-w-[70%]">
                {genres}
                </p>
            )}
            <p className="text-orange-300 flex items-center gap-1 text-[12px]">{movie.vote_average} <FaStar /></p>
            </div>
            </div>
            </Link>
        </div>
    )
}
export default MovieCard;