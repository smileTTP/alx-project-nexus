import { useState, useEffect } from 'react';
import { MovieDetails } from '@/interfaces';

interface TrailerResults {
    key: string;
    site: string;
    type: string;
}

interface MovieDetailsHook {
    movie: MovieDetails | null;
    trailerKey: string | null;
    isLoading: boolean;
}

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const useMovieDetails = (movieId: string | undefined): MovieDetailsHook => {
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!movieId || !TMDB_API_KEY) {
            console.log("Movie ID or API Key is missing.");
            setIsLoading(false);
            return;
        }

        const fetchMovieDetails = async () => {
            setIsLoading(true);
            setMovie(null);
            setTrailerKey(null);

            const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`;
            const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`;

            try {
                const [detailsResponse, videosResponse] = await Promise.all([
                    fetch(detailsUrl),
                    fetch(videosUrl)
                ]);

                if (!detailsResponse.ok) {
                    throw new Error(`Failed to fetch movie details (Status: ${detailsResponse.status})`);
                }
                
                const movieData: MovieDetails = await detailsResponse.json();
                setMovie(movieData);

                if (videosResponse.ok) {
                    const videoData = await videosResponse.json();
                    
                    const trailer = videoData.results.find(
                        (vid: TrailerResults) => vid.site === 'YouTube' && vid.type === 'Trailer'
                    );
                    
                    if (trailer) {
                        setTrailerKey(trailer.key);
                    }
                } else {
                    console.log("Failed to fetch movie videos.");
                }

            } catch (error) {
                console.error("An error occurred while fetching data.", error);
                setMovie(null);
                setTrailerKey(null);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchMovieDetails();
    }, [movieId]);

    return { movie, trailerKey, isLoading };
};