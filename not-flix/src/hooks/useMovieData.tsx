
import { fetchPopularFilms } from '../api/fetchFilms';
import { useQuery } from '@tanstack/react-query';


export const useMovieData = () => {

    // Fetch popular movies
    const { data: popularMovies, isLoading, isError } = useQuery({
        queryKey: ["popularMovies"],
        queryFn: fetchPopularFilms
    });

    // Fetch all movies...
    return { popularMovies, isLoading, isError };
};