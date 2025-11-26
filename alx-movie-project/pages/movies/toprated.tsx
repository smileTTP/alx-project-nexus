import { useState, useEffect, useCallback } from 'react';
import MovieCard from "@/components/movies/movieCard";
import { Genre, MovieProps } from "@/interfaces";
import Loading from '@/components/common/loading';
import Button from '@/components/common/button';
import { Black_Han_Sans } from 'next/font/google';
import MoviesList from '@/components/movies/moviesList';

const blackhansans = Black_Han_Sans({
        weight: ['400']
    });

const TopRated: React.FC = () => {
        const [movies, setMovies] = useState<MovieProps[]>([]);
        const [pages, setPages] = useState<number>(0);
        const [totalResults, setResults] = useState<number>(0);
        const [isLoading, setIsLoading] = useState<boolean>(true);

        const fetchTopRatedMovies = async () => {
            try{
            const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
            const data = await response.json();
            setMovies(data.results);
            setPages(data.total_pages);
            setResults(data.total_results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
            setIsLoading(false); 
            }
        }
    
        useEffect(() => {
            fetchTopRatedMovies();
        }, []);    
    
        if (isLoading) {
        return <Loading />; 
        }

        return(
    
        <div className="w-full h-full p-4">
            <h1 className={`${blackhansans.className} text-white underline text-5xl px-4 mt-4 mb-4`}>Top Rated Movies</h1>
            <MoviesList page={1} results={movies} total_pages={pages} total_results={totalResults}/>
        </div>
        )
}
export default TopRated;