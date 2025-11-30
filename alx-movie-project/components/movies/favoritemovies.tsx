import React from 'react';
import { Black_Han_Sans } from 'next/font/google';
import useFavorites from '@/hooks/useFavorites';
import Loading from '@/components/common/loading';
import MovieCard from './movieCard';
import { useAuth } from '@/context/AuthContext'; 

const blackhansans = Black_Han_Sans({ weight: ['400'] });

interface FavoriteMoviesProps {
    genreMap: { [key: number]: string };
}

const FavoriteMovies: React.FC<FavoriteMoviesProps> = ({ genreMap }) => {
    
    const { isAuthenticated, sessionId, accountId } = useAuth();
    
    const { 
    favorites: movies, 
    loading: favoritesLoading, 
    error: favoritesError 
    } = useFavorites(accountId, sessionId);
    
    if (!isAuthenticated || !sessionId || !accountId) {
        return null;
    }

    if (favoritesLoading) {
        return <div className="p-8 text-center"><Loading /></div>;
    }
    
    if (favoritesError) {
        return <p className="text-center text-[#D27C91] py-8">Error loading favorites: {favoritesError}</p>;
    }
    
    const displayedMovies = (movies || []).slice(0, 15);

    if (displayedMovies.length === 0) {
        return (
            <div className="mt-8 text-center text-gray-400 py-8">
                <h2 className={`${blackhansans.className} text-3xl mb-4 text-[#f1d7de]`}>My Favorites</h2> 
                <p>You haven&apos;t favorited any movies yet!</p>
            </div>
        );
    }
    
    return (
        <div className="mt-8">
            <div className="flex justify-between items-baseline px-4 mt-4 mb-4">
                <p className={`${blackhansans.className} text-white underline text-2xl md:text-4xl`}>My Favorites</p>
            </div>
            <div className="flex overflow-x-auto flex-nowrap space-x-4 px-4 pb-4 no-scrollbar"> 
                {displayedMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} genreMap={genreMap} className="shrink-0 w-44 h-80"/>
                ))}
                <div className="shrink-0 w-44 h-80 flex items-center justify-center bg-[#591427] text-white rounded-lg shadow-lg">
                    <span className="text-center font-bold text-xl p-4">View All<br />Favorites</span>
                </div>
            </div>
        </div>
    );
};

export default FavoriteMovies;