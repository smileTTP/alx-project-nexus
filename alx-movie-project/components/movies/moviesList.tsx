import Link from "next/link";
import MovieCard from "./movieCard";
import { TMDBResponse } from "@/interfaces";

const MoviesList: React.FC<TMDBResponse> = ({results}) => {
    return (
        <div className="flex justify-center">
            <div className="w-full h-full">
                <div className="flex justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {results.map((movie) => (
                        <MovieCard key={movie.id} {...movie}/>
                    ))}
                </div>
                </div>
            <div className="flex justify-center items-center mb-8 mt-8">
                <button className="bg-[#8080FF] w-[174px] h-[50px] rounded-[10px] text-white text-[20px]">Show more</button>
            </div>
            </div>
        </div>
    )
}
export default MoviesList;