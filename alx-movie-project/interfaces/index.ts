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