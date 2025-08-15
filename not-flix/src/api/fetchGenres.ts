const TMDbKey = import.meta.env.VITE_TMDb_API_KEY;


interface TMDbGenreList {
    genres: {id: number, name: string}[]
}

let genreMapCache: Record<number, string> | null = null;

export const fetchGenreMap = async (): Promise<Record<number, string>> => {
    if (genreMapCache) return genreMapCache;
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDbKey}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error fetching genres ${response.status}`)
        }
        const data = await response.json() as TMDbGenreList;
        genreMapCache = Object.fromEntries(data.genres.map((g) => [g.id, g.name]));
        return genreMapCache;
    } catch (err) {
        console.error(`Error fetching error with error code: `, err)
    }
    return {};
}