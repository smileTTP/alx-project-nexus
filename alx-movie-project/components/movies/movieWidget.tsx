import Link from 'next/link';
import { Black_Han_Sans } from 'next/font/google';
import { MovieProps } from "@/interfaces";
import useMoviesData from '@/hooks/useMoviesData';
import Loading from '@/components/common/loading';
import MovieCard from './movieCard';
import { FaArrowRight } from "react-icons/fa";

const blackhansans = Black_Han_Sans({
    weight: ['400']
});

interface MoviesWidgetProps {
    title: string;
    path: string;
    apiUrlPath: string;
    genreMap: { [key: number]: string };
}

const MoviesWidget: React.FC<MoviesWidgetProps> = ({ title, path, apiUrlPath, genreMap }) => {
    
    const { movies, isLoading } = useMoviesData<MovieProps>(apiUrlPath, 1);

    if (isLoading) {
        return <Loading />; 
    }

    const displayedMovies = movies.slice(0, 15);

    if (displayedMovies.length === 0) return null;

    return (
        <div className="mt-8">
            <div className="flex justify-between items-baseline px-4 mb-4">
                <p className={`${blackhansans.className} text-white underline text-2xl md:text-4xl`}>{title}</p>
                <Link href={path} className="text-[#96D9C0] hover:text-[#f1d7de] text-xl font-bold transition-colors flex justify-between items-center gap-4">
                    <p>View All</p>
                    <FaArrowRight />
                </Link>
            </div>
            
            <div className="flex overflow-x-auto flex-nowrap space-x-4 px-4 pb-4 no-scrollbar"> 
                {displayedMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} genreMap={genreMap} className="shrink-0 w-44 h-80"/>
                ))}
                <Link href={path} className="shrink-0 w-44 h-80 flex items-center justify-center bg-[#591427] text-white rounded-lg shadow-lg hover:bg-[#D27C91] transition-colors">
                    <span className="text-center font-bold text-xl p-4">View All<br />{title}</span>
                </Link>
            </div>
        </div>
    );
};

export default MoviesWidget;