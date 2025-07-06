import { useState, useEffect } from 'react';
import { FilmTMDb } from '../../api/fetchFilms';
import { fetchFilmTMDbByTitle } from '../../api/fetchFilms';
import { title } from 'process';

export const MovieCard = (titleSearch: string) => {

    const [film, setFilm] = useState<FilmTMDb | undefined>(undefined);

    return(
        <div>movie :D</div>
    );
}