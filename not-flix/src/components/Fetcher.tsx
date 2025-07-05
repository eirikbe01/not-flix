import { fetchMovieDetailsByTitle } from "../api/fetchTMBD";


export const fetchMovieDetails = () => {
    const result = fetchMovieDetailsByTitle("Harry Potter");

    return (
        <div>{result}</div>
    );
    return result;
}