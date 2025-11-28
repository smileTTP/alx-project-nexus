import { useState, useEffect } from 'react';
import { Cast, MovieDetails } from '@/interfaces';

interface TrailerResults {
    key: string;
    site: string;
    type: string;
}

interface MovieDetailsHook {
    movie: MovieDetails | null;
    trailerKey: string | null;
    cast: Cast[];
    isLoading: boolean;
}

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const useMovieDetails = (movieId: string | undefined): MovieDetailsHook => {
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cast, setCast] = useState<Cast[]>([]);

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
            setCast([]);

            const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`;
            const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`;
            const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`;

            try {
                const [detailsResponse, videosResponse, creditsResponse] = await Promise.all([
                    fetch(detailsUrl),
                    fetch(videosUrl),
                    fetch(creditsUrl)
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
                    console.log("Failed to fetch movie trailers.");
                }

                if (creditsResponse.ok) {
                    const creditsData: { cast: Cast[] } = await creditsResponse.json();
                    setCast(creditsData.cast); 
                } else {
                    console.log("Failed to fetch movie credits.");
                }

            } catch (error) {
                console.error("An error occurred while fetching data.", error);
                setMovie(null);
                setTrailerKey(null);
                setCast([]);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchMovieDetails();
    }, [movieId]);

    return { movie, trailerKey, cast, isLoading };
};