import { useState, useEffect, useCallback } from 'react';
import MovieCard from "@/components/movies/movieCard";
import { Genre, MovieProps } from "@/interfaces";
import Loading from '@/components/common/loading';
import Button from '@/components/common/button';


const Popular: React.FC = () => {

    const [movies, setMovies] = useState<MovieProps[]>([])
    const fetchPopularMovies = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
        const data = await response.json();
        setMovies(data.results)
    }

    useEffect(() => {
        fetchPopularMovies();

    }, []);    

    return(

        <div className="w-full h-full p-4">
            <h1 className="text-3xl font-bold mb-6 text-white">Popular Movies</h1>
            <div className="w-full h-full">
            <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie}/>
            ))}
            </div>
            </div>
            </div>
    </div>
    )
}
export default Popular;