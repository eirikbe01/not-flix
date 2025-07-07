import { useState } from 'react';
import { MovieCard } from '../components/MovieCard/MovieCard';
import { SearchBar } from '../components/SearchBar/SearchBar';
import type { TmdbResponse } from '../api/fetchFilms';
import type { FilmTMDb } from '../api/fetchFilms';


export const Home = () => {


    return(
        <div>
            <SearchBar />
            <MovieCard />
            <MovieCard />
            <MovieCard />
        </div>
    );
}