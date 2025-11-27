import { useState, useEffect, useCallback } from 'react';
import { Genre, MovieProps } from "@/interfaces";
import Loading from '@/components/common/loading';
import { Black_Han_Sans } from 'next/font/google';
import MoviesList from '@/components/movies/moviesList';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Pagination from '@/components/common/pagination';

const blackhansans = Black_Han_Sans({
        weight: ['400']
    });

const AllMovies: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPageFromUrl = searchParams.get("page");
    const currentPage = parseInt(currentPageFromUrl || "1", 10);

    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [pages, setPages] = useState<number>(0);
    const [totalResults, setResults] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchMovies = useCallback (async (page: number) => {
        setIsLoading(true);
        try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`);
            
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
        fetchMovies(currentPage);
    }, [currentPage, fetchMovies]);
    
    if (isLoading) {
        return <Loading />; 
    }

        return(
    
        <div className="w-full h-full p-4">
            <h1 className={`${blackhansans.className} text-white underline text-4xl px-4 mt-4 mb-4`}>All</h1>
            <MoviesList page={currentPage} results={movies} total_pages={pages} total_results={totalResults}/>
            {pages > 1 && (
                <Pagination 
                    currentPage={currentPage}
                    totalPages={pages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
        )
}
export default AllMovies;