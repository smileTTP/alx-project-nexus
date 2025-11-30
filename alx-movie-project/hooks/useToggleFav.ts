import { useState, useEffect, useCallback } from 'react';
import { API_KEY } from '@/constants';

interface ToggleFavoriteHook {
    isFavorite: boolean;
    loading: boolean;
    statusLoading: boolean;
    toggleStatus: (currentStatus: boolean) => Promise<void>;
    error: string | null;
}

const useToggleFavorite = (
    movieId: number, 
    accountId: number | null, 
    sessionId: string | null
): ToggleFavoriteHook => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [statusLoading, setStatusLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchStatus = useCallback(async () => {
        if (!accountId || !sessionId) {
            setIsFavorite(false);
            setStatusLoading(false);
            return;
        }

        setStatusLoading(true);
        setError(null);

        try {
            const url = `https://api.themoviedb.org/3/movie/${movieId}/account_states?session_id=${sessionId}&api_key=${API_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                console.error("Failed to fetch account states:", await response.json());
                setIsFavorite(false);
                return;
            }

            const data = await response.json();
            setIsFavorite(data.favorite || false);
        } catch (err) {
            console.error("Error fetching account states:", err);
            setError("Could not check favorite status.");
            setIsFavorite(false); 
        } finally {
            setStatusLoading(false);
        }
    }, [movieId, accountId, sessionId]);

    useEffect(() => {
        fetchStatus();
    }, [fetchStatus]);

    const toggleStatus = useCallback(async (currentStatus: boolean) => {
        if (!accountId || !sessionId) {
            setError("Authentication required to change favorite status.");
            return;
        }

        setLoading(true);
        setError(null);

        const newFavoriteStatus = !currentStatus;

        try {
            const url = `https://api.themoviedb.org/3/account/${accountId}/favorite?session_id=${sessionId}&api_key=${API_KEY}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    media_type: "movie",
                    media_id: movieId,
                    favorite: newFavoriteStatus,
                }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.status_message || `HTTP error! status: ${response.status}`);
            }

            setIsFavorite(newFavoriteStatus);

        } catch (err) {
            console.error("Error toggling favorite:", err);
            setError("Failed to update favorite status. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [movieId, accountId, sessionId]);

    return { 
        isFavorite, 
        loading, 
        statusLoading,
        toggleStatus,
        error
    };
};

export default useToggleFavorite;