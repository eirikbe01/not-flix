import { TMBD_API_KEY } from "./config";

interface MovieTMBD {
    id: number;
    title: string;
    releaseDate: string;
    genreIds: number[];
    description: string;
    isAdult: boolean;
    posterPath: string;
}


export const fetchMovieDetailsByTitle = async (movieTitle: string): Promise<MovieTMBD[] | undefined> => {
    const apiKey = TMBD_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie
    ?api_key=${apiKey}&query=${movieTitle}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status ${response.status}`);
        }

        const result = await response.json();
        console.log(`Result: ${result}`)
        return result;
    } catch (error) {
        console.error(error);
    }
}

/*
async function fetchMovieDetailsByTitle(movieTitle: string) : Promise<JSON> {
    const apiKey = process.env.TMBD_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie
    api_key=${apiKey}?`
}
*/

