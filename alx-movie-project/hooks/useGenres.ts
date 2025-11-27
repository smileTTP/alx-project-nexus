import { Genre } from '@/interfaces';
import { useState, useEffect, useMemo } from 'react';

interface UseGenresResult {
    genreMap: { [key: number]: string };
    genreList: Genre[];
    isLoading: boolean;
}

const useGenres = (apiKey: string): UseGenresResult => {
    const [genreList, setGenreList] = useState<Genre[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setGenreList(data.genres || []);
            } catch (error) {
                console.error("Error fetching genres:", error);
                setGenreList([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGenres();
    }, [apiKey]);

    const genreMap = useMemo(() => {
        return genreList.reduce((acc, genre) => {
            acc[genre.id] = genre.name;
            return acc;
        }, {} as { [key: number]: string });
    }, [genreList]);

    return { genreMap, genreList, isLoading };
};

export default useGenres;