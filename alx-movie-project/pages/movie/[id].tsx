import { useRouter } from 'next/router';
import Loading from '@/components/common/loading';
import ErrorComponent from '@/components/common/error';
import { useMovieDetails } from '@/hooks/useMovieDetails';
import Movie from '@/components/movies/movieDetails';

const MovieDetailsPage: React.FC = () => {
    const router = useRouter();
    
    const movieId = typeof router.query.id === 'string' ? router.query.id : undefined;

    const { movie, trailerKey, isLoading } = useMovieDetails(movieId); 

    if (isLoading || router.isFallback) {
        return <Loading />;
    }
    
    if (!movie) {
        return <ErrorComponent />; 
    }

    return <Movie movie={movie} trailerKey={trailerKey} />;
};

export default MovieDetailsPage;