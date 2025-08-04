import { fetchFilmOMDbById } from "../api/fetchFilms"
import { useQuery } from "@tanstack/react-query";


/* export const useMovieDetails = (title: string, year?: string) => {
    const { data: movieDetails, isLoading: detailsLoading, isError: detailsError } = useQuery({
        queryKey: ["movieDetails", title, year],
        enabled: Boolean(title),
        queryFn: () => fetchFilmOMDbByTitle(title, year),
    });
    return { movieDetails, detailsLoading, detailsError };
} */


export const useMovieDetails = (imdb_id: string) => {
    const { data: movieDetails, isLoading: detailsLoading, isError: detailsError } = useQuery({
        queryKey: ["movieDetails", imdb_id],
        enabled: Boolean(imdb_id),
        queryFn: () => fetchFilmOMDbById(imdb_id),
    });
    return { movieDetails, detailsLoading, detailsError };
}