import MovieCard from "./movieCard";
import { TMDBResponse } from "@/interfaces";

interface MoviesListProps extends TMDBResponse {
    genreMap: { [key: number]: string }; 
}
const MoviesList: React.FC<MoviesListProps> = ({ results, genreMap }) => {
    return (
        <div className="flex justify-center">
            <div className="w-full h-full">
                <div className="flex justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {results.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} genreMap={genreMap}/>
                    ))}
                </div>
                </div>
            </div>
        </div>
    )
}
export default MoviesList;