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


export interface FilmTMDbById {
    id: number,
    imdb_id: string,
    original_title: string,
    overview: string,
    poster_path: string,
    release_date: string,
    runtime: number,
    genres: {id: number, name: string}[]
}

export interface TmdbResponse {
    results: FilmTMDb[];
}

export const fetchFilmTMDbByTitle = async (movieTitle: string) : Promise<FilmTMDb[]> => {
    const title = encodeURIComponent(movieTitle);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDbKey}&query=${title}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`TMDB request failed: ${response.status}`);
        }
        const data = await response.json() as TmdbResponse;
        return data.results.length ? data.results : [];
    } catch (err) {
        console.error(err);
    }
    return [];
}


export const fetchFilmTMDbById = async (id: number) : Promise<FilmTMDbById> => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDbKey}`

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`TMDb request failed: ${response.status}`)
        }
        const data = await response.json() as FilmTMDbById

        return data;
    } catch (err) {
        console.error(err);
    }
    return {} as FilmTMDbById;
}

export const fetchFilmOMDbByTitle = async (movieTitle: string, year?: string) : Promise<FilmOMDb> => {
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
    return {} as FilmOMDb;
}


export const fetchFilmOMDbById = async (id: string) : Promise<FilmOMDb> => {
    const url = `http://www.omdbapi.com/?apikey=${OMDbKey}&i=${id}`;

    try {
        const response = await fetch(url);
        const text = await response.text();
        if (!response.ok) {
            throw new Error(`OMDb request failed: ${response.status}`);
        }

        const result = JSON.parse(text) as FilmOMDb;

        if (result.Response === "False") {
            throw new Error(result.Error || 'Movie not found');
        }
        return result;

    } catch (error) {
        console.error(error);
    }
    return {} as FilmOMDb;
}

// TMDb
export const fetchPopularFilms = async (): Promise<FilmTMDb[]> => {
    // Get three pages worth of content
    const allPopularFilms: FilmTMDb[] = [];
    for (let page = 1; page <= 1; page++) {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDbKey}&language=en-US&page=${page}`;
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`TMDB request failed: ${response.status}`);
            }
            const data = await response.json() as TmdbResponse;
            if(data.results.length) allPopularFilms.push(...data.results);

        } catch(error) {
            console.error(error);
        }
    }
    return allPopularFilms;
}


