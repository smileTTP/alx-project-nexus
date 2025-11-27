import { Black_Han_Sans } from 'next/font/google';
import { MovieProps } from "@/interfaces";
import MoviesList from "@/components/movies/moviesList";
import Loading from "@/components/common/loading";
import Pagination from "@/components/common/pagination";
import useMoviesData from '@/hooks/useMoviesData';

const blackhansans = Black_Han_Sans({
      weight: ['400']
    });
export default function Home() {

const apiPath = "/trending/movie";
    
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
