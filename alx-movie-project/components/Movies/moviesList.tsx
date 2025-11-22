import Link from "next/link";
import MovieCard from "./movieCard";

const MoviesList: React.FC = () => {
    return (
        <div className="flex justify-center">
            <MovieCard/>
        </div>
    )
}
export default MoviesList;