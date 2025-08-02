import { MovieCard } from '../../components/MovieCard/MovieCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import styles from './Home.module.css';

import { useMovieData } from '../../hooks/useMovieData';
import { useConfig } from '../../hooks/useConfig';
import { usePosters } from '../../hooks/usePosters';
import type { FilmTMDb } from '../../api/fetchFilms';
import { useState, useEffect } from 'react';
import { useMovieDataTitle } from '../../hooks/useMovieDataTitle';

export const Home = () => {

    // States
    const [searchTerm, setSearchTerm] = useState("");
    const [movieList, setMovieList] = useState<FilmTMDb[]>([]);
    const [posterPaths, setPosterPaths] = useState<string[]>([]);

    // Hooks
    const { popularMovies, isLoading, isError } = useMovieData();
    const { movies, moviesLoading, moviesError } = useMovieDataTitle(searchTerm);
    const { config, configLoading, configError } = useConfig();
    const { poster, posterLoading, posterError } = usePosters(
        config?.secure_base_url ?? "", 
        config?.poster_sizes?.[3] ?? "", 
        posterPaths ?? []
    );


    const handleSearch = (term: string) => {
        setSearchTerm(term.trim());
        console.log(`${term} was searched`);
        console.log("Search term:", searchTerm);
    }

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setMovieList(popularMovies ?? []);
        } else {
            setMovieList(movies ?? [])
        }
        setPosterPaths(movieList?.map((movie: FilmTMDb) => movie.poster_path).filter((path): path is string => path !== null && path !== undefined));
    }, [searchTerm, popularMovies, movies, movieList]);

    const loading = isLoading || moviesLoading || configLoading || posterLoading;
    const error = isError || moviesError || configError || posterError;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;

    return(
        <>
            <SearchBar value={searchTerm} onSearch={handleSearch}/>
            <div className={styles.mainContainer}>
                <div className={styles.moviesContainer}>
                    {movieList?.map((movie, index) => {
                        return(
                            <div key={index}>
                                <MovieCard
                                    title={movie.title}
                                    releaseDate={movie.release_date}
                                    posterPath={posterLoading ? "Loading..." : poster[index] ?? null}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}