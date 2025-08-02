import { fetchFilmTMDbByTitle } from "../api/fetchFilms"
import { useQuery } from "@tanstack/react-query";


export const useMovieDataTitle = (title: string) => {
    const { data: movies, isLoading: moviesLoading, isError: moviesError } = useQuery({
        queryKey: ["movies", title],
        enabled: Boolean(title),
        queryFn: () => fetchFilmTMDbByTitle(title),
    });
    return { movies, moviesLoading, moviesError };
}