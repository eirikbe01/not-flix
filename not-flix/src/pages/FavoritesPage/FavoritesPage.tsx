import {useFavorites} from "../../context/FavoritesContext";
import styles from "./FavoritesPage.module.css";
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { useConfig } from '../../hooks/useConfig';
import { useQueries } from "@tanstack/react-query";
import { fetchFilmTMDbById } from "../../api/fetchFilms";

export const FavoritesPage = () => {

    const { favorites } = useFavorites();
    const { config } = useConfig();
    
    const queries = useQueries({
        queries: favorites.map((movieId) => ({
            queryKey: ["movieDataId", movieId],
            queryFn: () => fetchFilmTMDbById(movieId),
            staleTime: 1000*60*5, // cache for 5 min
        })),
    });

    const isAnyLoading = queries.some((query) => query.isLoading);
    const isAnyError = queries.some((query) => query.isError);

    const moviesToShow = queries.map((query) => query.data).filter((movie): movie is NonNullable<typeof movie> => Boolean(movie));

    if (favorites.length === 0) {
        return <div className={styles.noFavorites}>No favorites added yet.</div>;
    }
    if (isAnyLoading) {
        return <div className={styles.loading}>Loading favorites…</div>;
    }
    if (isAnyError) {
        return <div className={styles.error}>Some favorites failed to load.</div>;
    }

    const baseUrl = (config?.secure_base_url ?? "") + (config?.poster_sizes?.[3] ?? "");


    return(
        <div className={styles.mainContainer}>
            <div className={styles.headingContainer}>
                <h1 className={styles.heading}>Your Favorites</h1>
            </div>
            <div className={styles.moviesContainer}>
                {moviesToShow?.map((movie) => {
                    return(
                        <MovieCard
                            key={movie.id}
                            movieId={movie.id}
                            title={movie.original_title}
                            releaseDate={movie.release_date}
                            posterPath={movie.poster_path ? baseUrl + movie.poster_path : ""}
                            genres={movie.genres.map((genre) => genre.name)}
                        />
                    );
                })}
            </div>
        </div>
    );
}