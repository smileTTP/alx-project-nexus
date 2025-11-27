import { Black_Han_Sans } from 'next/font/google';
import { useCallback, useEffect, useState } from "react";
import { MovieProps } from "@/interfaces";
import MoviesList from "@/components/movies/moviesList";
import Loading from "@/components/common/loading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/common/pagination";

const blackhansans = Black_Han_Sans({
      weight: ['400']
    });
export default function Home() {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPageFromUrl = searchParams.get("page");
  const currentPage = parseInt(currentPageFromUrl || "1", 10);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [totalResults, setResults] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchTrendingMovies = useCallback (async (page: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`);
                
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        setMovies(data.results);
        setPages(Math.min(data.total_pages, 500));
        setResults(data.total_results);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error("Error fetching movies:", error);
            setMovies([]);
            setPages(0);
        } finally {
            setIsLoading(false); 
        }
    }, []);
    
    const handlePageChange = useCallback((page: number) => {
    if (page < 1 || page > pages || page === currentPage) return;
            
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
            
    router.push(`${pathname}?${params.toString()}`);
    }, [router, pathname, searchParams, pages, currentPage]);
        
    useEffect(() => {
        fetchTrendingMovies(currentPage);
    }, [currentPage, fetchTrendingMovies]);
        
    if (isLoading) {
        return <Loading />; 
    }


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
            <p className={`${blackhansans.className} text-white underline text-4xl px-4 mt-8 mb-4`}>Trending Today</p>
            <MoviesList page={1} results={movies} total_pages={pages} total_results={totalResults}/>
            {pages > 1 && (
                <Pagination 
                    currentPage={currentPage}
                    totalPages={pages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
      </main>
    </div>
  );
}
