import { MovieCard } from '../../components/MovieCard/MovieCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import styles from './Home.module.css';

import { useMovieData } from '../../hooks/useMovieData';
import { useConfig } from '../../hooks/useConfig';
import { usePosters } from '../../hooks/usePosters';
import type { FilmTMDb } from '../../api/fetchFilms';


export const Home = () => {

    const { popularMovies, isLoading, isError } = useMovieData();
    const posterPaths = popularMovies?.map((movie: FilmTMDb) => movie.poster_path).filter((path): path is string => path !== null && path !== undefined);
    const { config, configLoading, configError } = useConfig();

    const { poster, posterLoading, posterError } = usePosters(
        config?.secure_base_url ?? "", 
        config?.poster_sizes?.[3] ?? "", 
        posterPaths ?? []
    );

    const loading = configLoading || isLoading || posterLoading;
    const error = configError || isError || posterError;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>

    return(
        <>
            <SearchBar />
            <div className={styles.mainContainer}>
                <div className={styles.moviesContainer}>
                    {popularMovies?.map((movie, index) => {
                        return(
                            <div key={index}>
                                <MovieCard
                                    title={movie.title}
                                    releaseDate={movie.release_date}
                                    posterPath={posterLoading ? "Loading..." : poster[index] ?? ""}
                                    genres={movie.genre_ids}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}