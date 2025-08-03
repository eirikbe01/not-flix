import { fetchFilmOMDbByTitle } from "../api/fetchFilms"
import { useQuery } from "@tanstack/react-query";


export const useMovieDetails = (title: string, year?: string) => {
    const { data: movieDetails, isLoading: detailsLoading, isError: detailsError } = useQuery({
        queryKey: ["movieDetails", title, year],
        enabled: Boolean(title),
        queryFn: () => fetchFilmOMDbByTitle(title, year),
    });
    return { movieDetails, detailsLoading, detailsError };
}