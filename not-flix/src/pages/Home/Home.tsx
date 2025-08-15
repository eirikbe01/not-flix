import { MovieCard } from '../../components/MovieCard/MovieCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import styles from './Home.module.css';

import { useMovieData } from '../../hooks/useMovieData';
import { useConfig } from '../../hooks/useConfig';
import { useState, useEffect } from 'react';
import { useMovieDataTitle } from '../../hooks/useMovieDataTitle';
import { useSearchParams } from 'react-router-dom';
import { useGenreMap } from '../../hooks/useGenreMap';

export const Home = () => {

    // States
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") ?? "";
    const [searchTerm, setSearchTerm] = useState(query);
    // Hooks
    const { popularMovies, isLoading, isError } = useMovieData();
    const { movies, moviesLoading, moviesError } = useMovieDataTitle(query);
    const { config, configLoading, configError } = useConfig();
    const { genres, genresLoading, genresError } = useGenreMap();

;
    const handleSearch = (term: string) => {
        if (term.trim()) {
            setSearchParams({ query: term.trim()});
            setSearchTerm(term.trim());
        } else {
            setSearchParams({});
        }
    }


    const loading = isLoading || moviesLoading || configLoading || genresLoading;
    const error = isError || moviesError || configError || genresError;
    const moviesToShow = query ? movies ?? [] : popularMovies ?? [];

    useEffect(() => {
        setSearchTerm(query);
    }, [query]);

    const baseUrl = (config?.secure_base_url ?? "") + (config?.poster_sizes?.[3] ?? "");
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;

    return(
        <>
            <SearchBar value={searchTerm} onSearch={handleSearch}/>
            <div className={styles.mainContainer}>
                <div className={styles.moviesContainer}>
                    {moviesToShow?.map((movie) => {
                        return(
                            <MovieCard
                                key={movie.id}
                                movieId={movie.id}
                                title={movie.title}
                                releaseDate={movie.release_date}
                                posterPath={movie.poster_path ? baseUrl + movie.poster_path : ""}
                                genres={genres ? movie.genre_ids.map(id => genres[id]) : []}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}