import Link from "next/link";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { IoIosMenu, IoIosClose, IoIosArrowDown } from "react-icons/io";
import { FiLoader } from "react-icons/fi";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MovieProps, TMDBResponse } from "@/interfaces";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMoviesOpen, setIsMoviesOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<MovieProps[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [query, setQuery] = useState<string>("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const DEBOUNCE_DELAY = 500;

    const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
    };
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isMenuOpen) setIsMenuOpen(false);
        if (isMoviesOpen) setIsMoviesOpen(false);

        if (isSearchOpen) {
            setQuery("");
            setSuggestions([]);
        }
    }

    const movieOptions = [
        { name: "All", path: "/movies/allmovies" },
        { name: "Popular", path: "/movies/popular" },
        { name: "Upcoming", path: "/movies/upcoming" },
        { name: "Top Rated", path: "/movies/toprated" },
        { name: "Now Playing", path: "/movies/nowplaying" }
    ];
    const toggleMovies = () => {
        setIsMoviesOpen(!isMoviesOpen);
        if (isSearchOpen) setIsSearchOpen(false);
    };

    useEffect(() => {
        if(query.trim() === "") {
            setDebouncedQuery("");
            setSuggestions([]);
            return
        }
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, DEBOUNCE_DELAY);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    const fetchSuggestions = useCallback(async () => {

        if (!TMDB_API_KEY) {
            console.error("TMDB API Key is missing. Check your .env.local file or Next.js config.");
            setSuggestions([]);
            setLoading(false);
            return;
        }
        if (!debouncedQuery.trim()) {
            setSuggestions([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        try {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(
                debouncedQuery
            )}`;
            const response = await fetch(url, { cache: "no-store" });
        if(response.ok) {
            const data: TMDBResponse = await response.json(); 

            if (Array.isArray(data.results)) {
                console.log(data.results.length); 

                const filteredResults = data.results.slice(0, 5);
                setSuggestions(filteredResults);
                    
                if (filteredResults.length === 0) {
                    console.warn(`Search for "${debouncedQuery}" returned 0 visible results.`);
                }
            } else {
                console.error("API response succeeded (200 OK) but did not contain a valid 'results' array. Data:", data);
                setSuggestions([]);
            }
        }

        } catch (error) {
            console.log(error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    }, [debouncedQuery]);

    useEffect(() => {
        if (debouncedQuery) {
            fetchSuggestions();
        }
    }, [debouncedQuery, fetchSuggestions]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    const handleSuggestionClick = () => {
        setQuery("");
        setIsSearchOpen(false);
        setSuggestions([]);
        console.log("Navigating to movie details page...");
    }

    return (
        <header className="bg-[#96D9C0] p-4 sticky w-full top-0 z-50 shadow-lg">
            <nav className="flex justify-between items-center p-4 mx-auto">
            <div className="px-4"><Image src={'/assets/LOGO.svg'} alt="PELLICLA" height={50} width={200} className="w-[150px] md:w-[200px]"/></div>
            <div className="hidden md:flex space-x-10 items-center">
                <Link href="/" className="hover:text-[#591427]">
                <p className="text-[#4C3A51] text-[30px] hover:text-[#591427]">Home</p>
                </Link>
                <div className="relative">
                <button onClick={toggleMovies} className="text-[#4C3A51] text-[30px] hover:text-[#591427]">Movies</button>
                {isMoviesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#f1d7de] rounded-lg shadow-lg border-2 border-[#4C3A51] py-2 z-50">
                    {movieOptions.map((option) => (
                    <Link  key={option.name} href={option.path} onClick={() => setIsMoviesOpen(false)}>
                    <p className="block px-4 py-2 text-[#4C3A51] text-xl hover:bg-[#4C3A51] hover:text-[#f1d7de] transition-colors">
                    {option.name}
                    </p>
                    </Link> 
                    ))} 
                </div> 
                )}
                </div>
                <Link href="/">
                <p className="text-[#4C3A51] text-[30px] hover:text-[#591427]">Dashboard</p>
                </Link>
            </div>
            <div className="flex items-center space-x-10 px-4">
                <button onClick={toggleSearch} className="text-[#4C3A51]">
                {isSearchOpen ? (
                <IoIosClose className="text-[#4C3A51] text-5xl" />
                ) : (
                <CiSearch className="text-[#4C3A51] text-4xl" />
                )}
                </button>
                <button onClick={toggleMenu} className="md:hidden text-[#4C3A51] focus:outline-none">
                {isMenuOpen ? (
                <IoIosClose className="text-[#4C3A51] text-5xl" />
                ) : (
                <IoIosMenu className="text-[#4C3A51] text-4xl" />
                )}
                </button>
            </div>
            </nav>
            {isMenuOpen && (
            <div className="md:hidden bg-[#4C3A51] px-4 pb-4 pt-2 space-y-4 border-t border-[#4C3A51]/10 rounded-[10px]">
            <Link href="/">
                <p className="block text-[#D27C91] text-[24px] py-2 border-b border-[#96D9C0]/10 hover:text-[#8080FF] rounded px-2 cursor-pointer">
                Home</p>
            </Link>
            <div>
                <div onClick={toggleMovies} className="flex justify-between items-center text-[#D27C91] text-[24px] py-2 border-b border-[#96D9C0]/10 hover:text-[#8080FF] rounded px-2 cursor-pointer">
                Movies
                <IoIosArrowDown className={`transition-transform duration-200 ${isMoviesOpen ? 'rotate-180' : ''}`} />
                </div>
                {isMoviesOpen && (
                <div className="bg-[#3a2c3e] rounded-md mt-1 py-2 pl-6">
                    {movieOptions.map((option) => (
                    <Link key={option.name} href={option.path} onClick={() => { setIsMoviesOpen(false); setIsMenuOpen(false); }}>
                        <p className="text-[#f1d7de] text-[20px] py-1 hover:text-[#8080FF]">
                            {option.name}
                        </p>
                    </Link>
                    ))}
                </div>
                )}
                </div>
            <Link href="/">
            <p className="block text-[#D27C91] text-[24px] py-2 border-[#96D9C0]/10 hover:text-[#8080FF] rounded px-2 cursor-pointer">
            Dashboard</p>
            </Link>
            </div>
            )}

            {isSearchOpen && (
            <div className="top-full left-0 w-full p-4 flex justify-center items-center">
            <div className="relative w-full max-w-3xl">
            <input type="text" placeholder="Search for a movie" className="w-full p-3 pl-4 rounded-full border-2 border-[#4C3A51] bg-[#f1d7de] text-[#4C3A51] text-xl" value={query} onChange={handleChange} autoFocus/>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4C3A51] text-3xl">
                {isLoading ? <FiLoader className="w-6 h-6 animate-spin" /> : <CiSearch className="w-6 h-6" />}
            </div>

            {/* Link href={`/movie/${movie.id}`} */}
            {suggestions.length > 0 && (
            <div className="absolute top-full w-full mt-2 bg-[#f1d7de] rounded-xl shadow-2xl border-2 border-[#4C3A51] py-2 z-40">
                {suggestions.map((movie) => (
                <a target="_blank" key={movie.id} href={`https://www.themoviedb.org/movie/${movie.id}`} onClick={handleSuggestionClick} className="block px-4 py-3 text-[#4C3A51] hover:bg-[#4C3A51] hover:text-[#f1d7de] transition-colors cursor-pointer">
                <div className="flex justify-start gap-4">
                <Image unoptimized={true} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/30x40/4C3A51/f1d7de?text=No+Img'} alt="movie suggestion"  width={30} height={40} />
                <div>
                <p className="font-semibold">{movie.title}</p>
                <p className="text-sm opacity-80">
                {movie.release_date ? `(${new Date(movie.release_date).getFullYear()})` : 'Release date unknown'}
                </p>
                </div>
                </div>
                </a>
                ))}
                <div className="border-t border-[#4C3A51]/20 mt-1 pt-1">
                    <p className="text-sm px-4 text-[#4C3A51] opacity-70">Showing top {suggestions.length} results.</p>
                </div>
            </div>
            )}

            {query.trim() !== "" && !isLoading && suggestions.length === 0 && debouncedQuery && (
            <div className="absolute top-full w-full mt-2 bg-[#f1d7de] rounded-xl shadow-2xl border-2 border-[#4C3A51] py-3 px-4 z-40">
                <p className="text-[#591427] text-lg">No results found for &quot;{query}&quot;.</p>
            </div>
            )}
            </div>
            </div>
        )}
        </header>
    )
}
export default Header;
