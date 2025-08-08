import { useQuery } from '@tanstack/react-query';
import { fetchFilmTMDbById } from '../api/fetchFilms';


export const useMovieDataId = (id: number) => {
    const { data: movie, isLoading: moviesLoading, isError: moviesError } = useQuery({
        queryKey: ["movieDataId", id],
        queryFn: () => fetchFilmTMDbById(id)
    });

    return { movie, moviesLoading, moviesError }
}