import { useState, useCallback } from 'react';
import { API_KEY } from '@/constants';

export const useFavorite = (
    movieId: number, 
    sessionId: string | null,
    accountId: number | null
) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false); 
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const toggleFavorite = useCallback(async () => {
        if (!sessionId || !accountId || loading) {
            setError("You must be logged in to TMDb to favorite a movie.");
            return;
        }
        
        setLoading(true);
        setError(null);

        const newFavoriteStatus = !isFavorite;

        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/account/${accountId}/favorite?session_id=${sessionId}&api_key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        media_type: 'movie',
                        media_id: movieId,
                        favorite: newFavoriteStatus,
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.status_message || `HTTP error! status: ${response.status}`);
            }

            setIsFavorite(newFavoriteStatus);

        } catch (error) {
            console.error("Error toggling favorite status:", error);
        } finally {
            setLoading(false);
        }
    }, [movieId, sessionId, accountId, loading, isFavorite]);

    return { isFavorite, loading, error, toggleFavorite };
};