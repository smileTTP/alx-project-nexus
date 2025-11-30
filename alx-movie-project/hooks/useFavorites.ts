import { useState, useEffect } from 'react';
import { API_KEY } from '@/constants';
import { MovieProps } from '@/interfaces'; 

interface FavoriteListHook {
    favorites: MovieProps[] | null;
    loading: boolean;
    error: string | null;
}

const useFavorites = (accountId: number | null, sessionId: string | null): FavoriteListHook => {
    const [favorites, setFavorites] = useState<MovieProps[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!sessionId || !accountId) {
            setFavorites(null);
            return;
        }

        const fetchFavorites = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?session_id=${sessionId}&api_key=${API_KEY}&language=en-US&sort_by=created_at.desc&page=1`;
                
                const response = await fetch(url);
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.status_message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setFavorites(data.results); 

            } catch (err) {
                console.error("Error fetching favorites:", err);
                setError("Failed to load your favorite movies.");
                setFavorites([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();

    }, [accountId, sessionId]);

    return { favorites, loading, error };
};

export default useFavorites;