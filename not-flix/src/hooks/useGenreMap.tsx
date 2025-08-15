import {useQuery} from '@tanstack/react-query';
import {fetchGenreMap} from '../api/fetchGenres';

export const useGenreMap = () => {
    const { data: genres, isLoading: genresLoading, isError: genresError } = useQuery({
        queryKey: ["genres"],
        queryFn: fetchGenreMap
    });

    return { genres, genresLoading, genresError }
}