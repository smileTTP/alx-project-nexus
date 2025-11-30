import Loading from '@/components/common/loading';
import { HeroPage } from '@/components/heropage';
import MoviesWidget from '@/components/movies/movieWidget'; 
import { TypingEffect } from '@/components/quote';
import useGenres from '@/hooks/useGenres';
import { API_KEY, POPULAR_API, POPULAR_PAGE, TRENDING_API, TRENDING_PAGE, UPCOMING_API, UPCOMING_PAGE } from '@/constants';
import { useAuth } from '@/context/AuthContext';
import useNewSession from '@/hooks/useNewSession';
import FavoriteMovies from '@/components/movies/favoritemovies';

export default function Home() {

    useNewSession();
    const { isAuthenticated, sessionId, accountId } = useAuth();

    const { genreMap, isLoading: genresLoading } = useGenres(API_KEY);

    if (genresLoading) return <Loading />; 

    return (
          <div className="flex items-center justify-center">
          <main className="flex w-full max-w-full flex-col">
            <HeroPage/>
            <div className="bg-white w-full h-[274px] flex items-center justify-center">
              <TypingEffect text={'“Oh how Shakespeare would have loved cinema!”'}/>
            </div>
            {isAuthenticated && (
                    <FavoriteMovies genreMap={genreMap} />
              )}
            <MoviesWidget apiUrlPath={TRENDING_API} path={TRENDING_PAGE} title="Trending Today" genreMap={genreMap} />
            <MoviesWidget apiUrlPath={POPULAR_API} path={POPULAR_PAGE} title="Recommendations" genreMap={genreMap}  />
            <MoviesWidget apiUrlPath={UPCOMING_API} path={UPCOMING_PAGE} title="Upcoming Movies" genreMap={genreMap} />
            <div className="py-12"></div>
            </main>
        </div>
    );
}