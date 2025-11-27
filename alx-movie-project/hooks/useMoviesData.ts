import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { MovieProps, TMDBResponse } from "@/interfaces"; 

interface UseMoviesDataResults<T> {
    movies: T[];
    pages: number;
    totalResults: number;
    isLoading: boolean;
    currentPage: number;
    handlePageChange: (page: number) => void;
}

const useMoviesData = <T = MovieProps>(
    apiUrlPath: string,
    initialPage: number = 1
): UseMoviesDataResults<T> => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const currentPageFromUrl = searchParams.get("page");
    const currentPage = parseInt(currentPageFromUrl || initialPage.toString(), 10);

    const [movies, setMovies] = useState<T[]>([]);
    const [pages, setPages] = useState<number>(0);
    const [totalResults, setResults] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchData = useCallback(async (page: number) => {
        setIsLoading(true);
        const apiUrl = `https://api.themoviedb.org/3${apiUrlPath}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`;
        
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const apiData: TMDBResponse = await response.json();
            
            setMovies(apiData.results as T[]);
            setPages(Math.min(apiData.total_pages, 500)); 
            setResults(apiData.total_results);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error(`Error fetching data for ${apiUrlPath}:`, error);
            setMovies([]);
            setPages(0);
        } finally {
            setIsLoading(false); 
        }
    }, [apiUrlPath]); 

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, fetchData]);

    const handlePageChange = useCallback((page: number) => {
        if (page < 1 || page > pages || page === currentPage) return;
        
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        
        router.push(`${pathname}?${params.toString()}`);
    }, [router, pathname, searchParams, pages, currentPage]);

    return {
        movies,
        pages,
        totalResults,
        isLoading,
        currentPage,
        handlePageChange,
    };
};

export default useMoviesData;