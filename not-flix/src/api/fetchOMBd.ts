import { TMDb_API_KEY, OMDb_API_KEY } from "./config";


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
}

interface FilmTMDb {
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
    const apiKey = TMDb_API_KEY;
    const title = encodeURIComponent(movieTitle);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`OMDB request failed: ${response.status}`);
        }
        const data: TmdbResponse = await response.json();

        console.log(`Result: ${data.results}`)
        return data.results.length ? data.results : undefined;
    } catch (error) {
        console.error(error);
    }
}

export const fetchFilmOMDbByTitle = async (movieTitle: string, year: string) : Promise<FilmOMDb | undefined> => {
        const apiKey = OMDb_API_KEY;
    const title = encodeURIComponent(movieTitle);
    const url = year ? 
    `http://www.omdbapi.com/?apikey=${apiKey}&t=${title}&y=${year}` 
    : `http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`TMDB request failed: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        return result;

    } catch (error) {
        console.error(error);
    }
    return;
}


