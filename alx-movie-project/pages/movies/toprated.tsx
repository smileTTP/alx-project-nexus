import { MovieProps } from "@/interfaces";
import Loading from '@/components/common/loading';
import { Black_Han_Sans } from 'next/font/google';
import MoviesList from '@/components/movies/moviesList';
import Pagination from '@/components/common/pagination';
import useMoviesData from '@/hooks/useMoviesData';

const blackhansans = Black_Han_Sans({
        weight: ['400']
    });

const TopRated: React.FC = () => {

const apiPath = "/movie/top_rated";
    
    const { 
        movies: movies, 
        pages, 
        totalResults, 
        isLoading, 
        currentPage, 
        handlePageChange 
    } = useMoviesData<MovieProps>(apiPath);
    
    if (isLoading) {
        return <Loading />; 
    }

        return(
    
        <div className="w-full h-full p-4">
            <h1 className={`${blackhansans.className} text-white underline text-4xl px-4 mt-4 mb-4`}>Top Rated Movies</h1>
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
export default TopRated;