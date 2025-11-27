import { ReactNode } from "react";

export interface ComponentProps {
    children: ReactNode
}

export interface MovieProps {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;    
    backdrop_path: string; 
    genre_ids: number[]; 
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    adult: boolean;
    video: boolean;
    original_language: string;
}

export interface TMDBResponse {
    page: number;
    results: MovieProps[];
    total_pages: number; 
    total_results: number;
}

export interface MovieCardProps extends MovieProps {
    genre_names: string[]; 
}

export interface Genre {
    id: number; 
    name: string; 
}

export interface CurrentFilters {
    with_genres?: string;
    primary_release_year?: string;
    'vote_average.gte'?: string;
}

export interface MovieDetails extends MovieProps {
    genres: Genre[];
    budget: number;
    homepage: string | null;
    imdb_id: string | null;
    runtime: number | null;
    status: string;
    tagline: string | null;
    production_companies: ProductionCompany[];
}

export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}