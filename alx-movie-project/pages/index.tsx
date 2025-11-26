import Image from "next/image";
import { Black_Han_Sans } from 'next/font/google';
import MovieCard from "@/components/movies/movieCard";
import { useEffect, useState } from "react";
import { MovieProps } from "@/interfaces";
import MoviesList from "@/components/movies/moviesList";

const blackhansans = Black_Han_Sans({
      weight: ['400']
    });
export default function Home() {

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [totalResults, setResults] = useState<number>(0);

      const fetchTrendingMovies = async () => {
          const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
          const data = await response.json();
          setMovies(data.results);
          setPages(data.total_pages);
          setResults(data.total_results);
      }
  
      useEffect(() => {
          fetchTrendingMovies();
      }, []);    

  
  return (
    <div className="flex items-center justify-center">
      <main className="flex w-full max-w-full flex-col">
        <div className="bg-[#96D9C0] w-full h-[560px] flex items-center justify-center">
        <p className={`${blackhansans.className} text-[95px] md:text-[150px] text-[#4C3A51] text-center `}>
          PICTURA MOVENS
        </p>
        </div>
        <div className="bg-white w-full h-[274px] flex items-center justify-center">
          <p className="text-[#591427] font-bold text-3xl md:text-[45px] text-center mt-4">“Oh how Shakespeare would have loved cinema!”</p>
        </div>
        <div>
            <p className={`${blackhansans.className} text-white underline text-5xl px-4 mt-4 mb-4`}>Trending Today</p>
            <MoviesList page={1} results={movies} total_pages={pages} total_results={totalResults}/>
        </div>
      </main>
    </div>
  );
}
