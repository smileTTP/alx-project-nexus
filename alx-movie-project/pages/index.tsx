import Loading from '@/components/common/loading';
import { HeroPage } from '@/components/heropage';
import MoviesWidget from '@/components/movies/movieWidget'; 
import { TypingEffect } from '@/components/quote';
import useGenres from '@/hooks/useGenres';
import { NOWPLAYING_API, NOWPLAYING_PAGE, POPULAR_API, POPULAR_PAGE, TOP_RATED_API, TOP_RATED_PAGE, TRENDING_API, TRENDING_PAGE, UPCOMING_API, UPCOMING_PAGE } from '@/constants';

export default function Home() {
    const { genreMap, isLoading: genresLoading } = useGenres(process.env.NEXT_PUBLIC_TMDB_API_KEY || "");
    
    if (genresLoading) return <Loading />; 

    return (
          <div className="flex items-center justify-center">
          <main className="flex w-full max-w-full flex-col">
            <HeroPage/>
            <div className="bg-white w-full h-[274px] flex items-center justify-center">
              <TypingEffect text={'“Oh how Shakespeare would have loved cinema!”'}/>
            </div>
            <MoviesWidget apiUrlPath={TRENDING_API} path={TRENDING_PAGE} title="Trending Today" genreMap={genreMap} />
            <MoviesWidget apiUrlPath={POPULAR_API} path={POPULAR_PAGE} title="Popular Movies" genreMap={genreMap}  />
            <MoviesWidget apiUrlPath={TOP_RATED_API} path={TOP_RATED_PAGE} title="Top Rated" genreMap={genreMap} />
            <MoviesWidget apiUrlPath={UPCOMING_API} path={UPCOMING_PAGE} title="Upcoming Movies" genreMap={genreMap} />
            <MoviesWidget apiUrlPath={NOWPLAYING_API} path={NOWPLAYING_PAGE} title="Now Playing" genreMap={genreMap} />
            <div className="py-12"></div>
            </main>
        </div>
    );
}