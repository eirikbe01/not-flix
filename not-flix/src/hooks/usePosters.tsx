import { fetchPosterUrls } from "../api/fetchPosters";
import { useQuery } from "@tanstack/react-query";

interface PosterProps {
    poster: string[];
    posterLoading: boolean;
    posterError: boolean;
}

export const usePosters = (url: string, posterSize: string, paths: string[]): PosterProps => {
    // Fetch posters of all the given movies (given paths)
    const { data: poster = [], isLoading: posterLoading, isError: posterError} = useQuery({
        queryKey: ["posterUrls"],
        queryFn: () => fetchPosterUrls(url, posterSize, paths)
    });
    return { poster, posterLoading, posterError}
}