import React from 'react';
import Image from 'next/image';
import { Black_Han_Sans } from 'next/font/google';
import { MdOutlineOndemandVideo } from "react-icons/md";
import { MovieDetails, Cast } from '@/interfaces'; 

const blackhansans = Black_Han_Sans({ 
    weight: ['400'] 
});

interface MovieDetailsProps {
    movie: MovieDetails;
    trailerKey: string | null;
    cast: Cast[]; 
}

const Movie: React.FC<MovieDetailsProps> = ({ movie, trailerKey, cast }) => {
    
    const runtimeMinutes = movie.runtime || 0;
    const hours = Math.floor(runtimeMinutes / 60);
    const minutes = runtimeMinutes % 60;
    const runtimeDisplay = runtimeMinutes > 0 ? `${hours}h ${minutes}m` : 'N/A';
    
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    
    const posterUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
        : 'https://placehold.co/30x40/4C3A51/f1d7de?text=No+Img';
    
    const backdropUrl = movie.backdrop_path 
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` 
        : 'bg-[#4C3A51]';

    const handleWatchTrailer = () => {
        if (trailerKey) {
            window.open(`https://www.youtube.com/watch?v=${trailerKey}`, '_blank');
        }
    };

    return (
    <div className="min-h-screen bg-[#4C3A51] text-[#f1d7de]">
        <div className="relative h-60 sm:h-9 md:h-[480px] w-full bg-cover bg-center" style={{ backgroundImage: `url(${backdropUrl})` }}>
            <div className="absolute inset-0 bg-linear-to-b from-[#4C3A51]/80 to-[#f1d7de]/50 opacity-70"></div>
        </div>
        <section className="container z-10 mx-auto px-6 sm:px-12 md:px-40 rounded-b-lg relative mt-[-88px] sm:mt-[-120px] md:-mt-40 mb-8">
            <div className="bg-transparent flex flex-col md:flex-row gap-6 sm:gap-8 pt-4 pb-6 sm:pt-6 sm:pb-8 rounded-b-lg ">
                <div className="flex-none w-full max-w-60 sm:max-w-[300px] mx-auto md:mx-0 flex flex-col items-center">
                    <Image src={posterUrl} alt={movie.title || 'Movie Poster'} width={300} height={450} className="w-full object-cover rounded-[10px]" unoptimized={posterUrl.includes('placeholder')}  quality={90}/>
                    {trailerKey && (
                        <button onClick={handleWatchTrailer} className="mt-4 flex items-center justify-center w-full py-3 px-6 bg-[#f1d7de] text-[#4C3A51] font-bold rounded-lg shadow-md hover:bg-[#e0c4ce] transition duration-300 transform hover:scale-105">
                        <span className="mr-2"><MdOutlineOndemandVideo className="text-xl" /></span> 
                        Watch Trailer
                        </button>
                    )}
                </div>
                <div className="flex-1">
                    <h2 className={`${blackhansans.className} text4xl sm:text-5xl md:text-6xl text-[#f1d7de] mb-2`}>
                        {movie.title}
                    </h2>
                    <div className="flex flex-col mt-2">
                    <p className="font-semibold text-xs sm:text-sm md:text-base text-[#D27C91] mb-4">
                    {movie.genres.map(g => g.name).join(', ')}
                    </p>
                    <p className="font-semibold text-xs sm:text-sm md:text-base text-[#f1d7de] mb-4">
                    {releaseYear} | {runtimeDisplay}
                    </p>
                    </div>  
                    <div className="flex items-center space-x-4 mb-6">
                    <span className="text-base font-bold text-[#96D9C0] border border-[#96D9C0] p-2 rounded-2xl px-2">
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                    </span>
                    <span className="text-sm text-gray-400">
                    ({movie.vote_count ? movie.vote_count.toLocaleString() : 0} votes)
                    </span>
                    </div>
                    <p className="text-[#f1d7de] text-xl leading-relaxed max-w-xl">
                    {movie.overview || "No description available"}
                    </p>
                </div>
            </div>

            <div className="max-w-full mx-auto py-8">
                <h2 className={`${blackhansans.className} text-2xl font-bold text-[#f1d7de] mb-4 border-b border-[#D27C91] pb-2`}>Cast Members</h2>
                {cast && cast.length > 0 ? (
                    <div className="flex flex-row overflow-x-auto space-x-4 pb-4 no-scrollbar">
                    {cast.map(member => (
                        <div key={member.credit_id} className="text-center w-[100px] shrink-0">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full overflow-hidden mb-2 shadow-lg border-2 border-[#D27C91]">
                                <Image src={ member.profile_path  ? `https://image.tmdb.org/t/p/w200${member.profile_path}` : `https://placehold.co/96x96/635C7A/f1d7de?text=${member.name.split(' ')[0]}` }
                                        alt={member.name} width={96} height={96} className="w-full h-full object-cover" />
                                </div>
                                <p className="text-sm font-semibold text-[#f1d7de] leading-tight pt-1">{member.name}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-[#f1d7de] opacity-70">Cast information not available.</p>
                )}
            </div>

            <div className="max-w-7xl mx-auto p-8 mb-8">
                <h2 className={`${blackhansans.className} text-2xl font-bold text-[#f1d7de] mb-4 border-b border-[#D27C91] pb-2`}>Production Companies</h2>
                {movie.production_companies && movie.production_companies.length > 0 ? (
                    <div className="flex flex-wrap gap-6 items-center">
                    {movie.production_companies.map(company => (
                        <div key={company.id} className="flex items-center space-x-2 text-gray-400">
                        {company.logo_path ? (
                            <Image src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} alt={company.name} width={100} height={50} className="h-12 w-auto object-contain bg-[#f1d7de] p-1 rounded" />
                            ) : (
                            <span className="text-lg text-gray-500">{company.name}</span>
                        )}
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="text-[#f1d7de] opacity-70">No production companies listed.</p>
                )}
            </div>
        </section>
    </div>
    );
};

export default Movie;