import { MovieProps } from "@/interfaces";
import Loading from '@/components/common/loading';
import { Black_Han_Sans } from 'next/font/google';
import MoviesList from '@/components/movies/moviesList';
import Pagination from '@/components/common/pagination';
import useMoviesData from '@/hooks/useMoviesData';
import useGenres from "@/hooks/useGenres";
import { API_KEY } from "@/constants";

const blackhansans = Black_Han_Sans({
        weight: ['400']
    });

const NowPlaying: React.FC = () => {

    const apiPath = "/movie/now_playing";
    const { genreMap, isLoading: genresLoading } = useGenres(API_KEY);

    const { 
        movies: movies, 
        pages, 
        totalResults, 
        isLoading: moviesLoading, 
        currentPage, 
        handlePageChange 
    } = useMoviesData<MovieProps>(apiPath);

    if (moviesLoading || genresLoading) {
        return <Loading />; 
    }

        return(
    
        <div className="w-full h-full p-4">
            <h1 className={`${blackhansans.className} text-white underline text-4xl px-4 mt-8 mb-4`}>Now Playing Movies</h1>
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
export default NowPlaying;