import { MovieCard } from '../../components/MovieCard/MovieCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import styles from './Home.module.css';

import { useMovieData } from '../../hooks/useMovieData';
import { useConfig } from '../../hooks/useConfig';
import type { FilmTMDb } from '../../api/fetchFilms';
import { useState, useEffect } from 'react';
import { useMovieDataTitle } from '../../hooks/useMovieDataTitle';

export const Home = () => {

    // States
    const [searchTerm, setSearchTerm] = useState("");
    const [movieList, setMovieList] = useState<FilmTMDb[]>([]);

    // Hooks
    const { popularMovies, isLoading, isError } = useMovieData();
    const { movies, moviesLoading, moviesError } = useMovieDataTitle(searchTerm);
    const { config, configLoading, configError } = useConfig();

    


    const handleSearch = (term: string) => {
        setSearchTerm(term.trim());
        console.log(`${term} was searched`);
        console.log("Search term:", searchTerm);
    }

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setMovieList(popularMovies ?? []);
        } else {
            setMovieList(movies ?? []);
        }
    }, [searchTerm, popularMovies, movies]);



    const loading = isLoading || moviesLoading || configLoading;
    const error = isError || moviesError || configError;

    const baseUrl = (config?.secure_base_url ?? "") + (config?.poster_sizes?.[3] ?? "");
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;

    return(
        <>
            <SearchBar value={searchTerm} onSearch={handleSearch}/>
            <div className={styles.mainContainer}>
                <div className={styles.moviesContainer}>
                    {movieList?.map((movie) => {
                        return(
                            <MovieCard
                                key={movie.id}
                                title={movie.title}
                                releaseDate={movie.release_date}
                                posterPath={movie.poster_path ? baseUrl + movie.poster_path : ""}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}