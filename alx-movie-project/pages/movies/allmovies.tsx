import { CurrentFilters, MovieProps } from "@/interfaces";
import Loading from '@/components/common/loading';
import { Black_Han_Sans } from 'next/font/google';
import MoviesList from '@/components/movies/moviesList';
import Pagination from '@/components/common/pagination';
import useAllMoviesData from '@/hooks/useAllMovies';
import useGenres from "@/hooks/useGenres";
import { useCallback, useState } from "react";
import Filter from "@/components/movies/filter";

const blackhansans = Black_Han_Sans({
        weight: ['400']
    });


const AllMovies: React.FC = () => {
    const apiPath = "/discover/movie";
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
    const { genreMap, genreList, isLoading: genresLoading } = useGenres(apiKey);

    const [filters, setFilters] = useState<CurrentFilters>({});
    
    const handleFilterChange = useCallback((newFilters: CurrentFilters) => {
        setFilters(newFilters);
    }, []);

    const { 
        movies: movies, 
        pages, 
        totalResults, 
        isLoading: moviesLoading, 
        currentPage, 
        handlePageChange 
    } = useAllMoviesData<MovieProps>(apiPath, filters);

    if (moviesLoading || genresLoading) {
        return <Loading />; 
    }

        return(
    
        <div className="w-full h-full p-4">
            <div className="flex justify-between items-center mb-4">
            <h1 className={`${blackhansans.className} text-white underline text-4xl px-4 mt-4 mb-4`}>All Movies</h1>
            <div className="p-4">
            <Filter
                genres={genreList} 
                onFilterChange={handleFilterChange} 
                currentFilters={filters} 
            />
            </div>
            </div>
            <MoviesList page={currentPage} results={movies} total_pages={pages} total_results={totalResults} genreMap={genreMap}/>
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