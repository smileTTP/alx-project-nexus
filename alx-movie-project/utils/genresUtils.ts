
export const getGenreNames = (ids: number[], genreMap: { [key: number]: string }): string[] => {
    if (!ids || ids.length === 0 || Object.keys(genreMap).length === 0) {
        return [];
    }
    return ids.map(id => genreMap[id]).filter(name => name);
};