const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";

const TRENDING_API = "/trending/movie/day";
const POPULAR_API = "/movie/popular";
const TOP_RATED_API = "/movie/top_rated";
const UPCOMING_API = "/movie/upcoming";
const NOWPLAYING_API = "/movie/now_playing";

const TRENDING_PAGE = "/movies/trendingtoday";
const POPULAR_PAGE = "/movies/popular";
const TOP_RATED_PAGE = "/movies/toprated";
const UPCOMING_PAGE = "/movies/upcoming";
const NOWPLAYING_PAGE = "/movies/nowplaying";

export { API_KEY, TRENDING_API, POPULAR_API, TOP_RATED_API, UPCOMING_API, NOWPLAYING_API, TRENDING_PAGE, POPULAR_PAGE, TOP_RATED_PAGE, UPCOMING_PAGE, NOWPLAYING_PAGE}