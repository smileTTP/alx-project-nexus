import { useState, useRef, useEffect, useCallback } from 'react';
import { Genre } from "@/interfaces";
import Dropdown from "@/components/common/dropdown"; 

interface FilterProps {
    genres: Genre[];
    currentFilters: { with_genres?: string; primary_release_year?: string; 'vote_average.gte'?: string };
    onFilterChange: (filters: { with_genres?: string; primary_release_year?: string; 'vote_average.gte'?: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ genres, currentFilters, onFilterChange }) => {
    
    const years = Array.from({ length: 70 }, (_, i) => (new Date().getFullYear() - i).toString());
    const ratings = [9.5, 9, 8.5, 8.0, 7.5, 7.0, 6.5, 6.0, 5.0];

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    const updateFilter = useCallback((key: keyof typeof currentFilters, value: string | undefined) => {
        const newFilters = { ...currentFilters };
        if (value) {
            newFilters[key] = value as string;
        } else {
            delete newFilters[key];
        }
        onFilterChange(newFilters);
    }, [currentFilters, onFilterChange]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    const yearOptions = [
        { value: undefined, label: 'Any Year' },
        ...years.map(y => ({ value: y, label: y }))
    ];

    const ratingOptions = [
        { value: undefined, label: 'Any Rating' },
        ...ratings.map(r => ({ value: r.toString(), label: `${r}+` }))
    ];

    const genreOptions = [
        { value: undefined, label: 'All Genres' },
        ...genres.map(g => ({ value: g.id.toString(), label: g.name }))
    ];

    return (
        <div className="flex flex-wrap gap-4 p-4" ref={filterRef}>
            
            <Dropdown
                label="Year"
                options={yearOptions}
                filterKey="primary_release_year"
                selectedValue={currentFilters.primary_release_year}
                isOpen={openDropdown === 'primary_release_year'}
                setOpenDropdown={setOpenDropdown}
                updateFilter={updateFilter as (key: string, value: string | undefined) => void}
            />
            
            <Dropdown
                label="Min Rating"
                options={ratingOptions}
                filterKey="vote_average.gte"
                selectedValue={currentFilters['vote_average.gte']}
                isOpen={openDropdown === 'vote_average.gte'}
                setOpenDropdown={setOpenDropdown}
                updateFilter={updateFilter as (key: string, value: string | undefined) => void}
            />
            
            <Dropdown
                label="Genre"
                options={genreOptions}
                filterKey="with_genres"
                selectedValue={currentFilters.with_genres}
                isOpen={openDropdown === 'with_genres'}
                setOpenDropdown={setOpenDropdown}
                updateFilter={updateFilter as (key: string, value: string | undefined) => void}
            />
            
        </div>
    );
};

export default Filter;