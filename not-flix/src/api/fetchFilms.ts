const OMDbKey = import.meta.env.VITE_OMDb_API_KEY;
const TMDbKey = import.meta.env.VITE_TMDb_API_KEY;


interface FilmOMDb {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Ratings: { Source: string, Value: string}[]
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    totalSeasons?: string;
    Response: string;
    Error?: string;
}

export interface FilmTMDb {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string | null;
    genre_ids: number[];
}

interface TmdbResponse {
    results: FilmTMDb[];
}

export const fetchFilmTMDbByTitle = async (movieTitle: string) : Promise<FilmTMDb[] | undefined> => {
    const title = encodeURIComponent(movieTitle);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDbKey}&query=${title}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`TMDB request failed: ${response.status}`);
        }
        const data = await response.json() as TmdbResponse;

        console.log("Result TMDb ", data.results);
        return data.results.length ? data.results : undefined;
    } catch (error) {
        console.error(error);
    }
}

export const fetchFilmOMDbByTitle = async (movieTitle: string, year?: string) : Promise<FilmOMDb | undefined> => {
    const title = encodeURIComponent(movieTitle);
    const url = year ? 
    `http://www.omdbapi.com/?apikey=${OMDbKey}&t=${title}&y=${year}` 
    : `http://www.omdbapi.com/?apikey=${OMDbKey}&t=${title}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`OMDb request failed: ${response.status}`);
        }

        const result = await response.json();

        if (result.Response === "False") {
            throw new Error(result.Error || 'Movie not found');
        }
        console.log("Result OMDb", result);
        return result;

    } catch (error) {
        console.error(error);
    }
    return;
}

// TMDb
export const fetchPopularMovies = async (): Promise<FilmTMDb[] | undefined> => {
    // Get three pages worth of content
    for (let i = 1; i <= 3; i++) {
        var url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${i}`;
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`TMDB request failed: ${response.status}`);
            }
            const data = await response.json() as TmdbResponse;

            console.log("Result TMDb ", data.results);
            return data.results.length ? data.results : undefined;

        } catch(error) {
            console.error(error);
        }
    }
}


