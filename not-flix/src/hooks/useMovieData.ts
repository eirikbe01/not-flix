import { useState, useEffect } from 'react';
import { fetchImageConfig } from '../api/fetchConfig';
import { fetchFilmTMDbByTitle, type FilmTMDb } from '../api/fetchFilms';
import { fetchPosterUrl } from '../api/fetchPosters';
import type { ImagesConfig } from '../api/fetchConfig';


export const useMovieData = () => {
    const [movie, setMovie] = useState<FilmTMDb | null>(null);
    const [posterUrl, setPosterUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);


    async function loadConfigData(): Promise<ImagesConfig | null> {
        const config = await fetchImageConfig();
        return config ?? null;
    }

    async function loadMovies(title: string): Promise<FilmTMDb[] | null> {
        const movies = await fetchFilmTMDbByTitle(title)
        return movies ?? null;
    }

    async function loadPoster(
        config: ImagesConfig,
        movie: FilmTMDb,
        posterSize: string
    ): Promise<string | undefined> {
        return await fetchPosterUrl(
            config.secure_base_url,
            posterSize,
            movie.poster_path
        )
    }
    useEffect(() => {
        async function loadData() {
            try {
                // Run the two fetches concurrently
                const config = await loadConfigData();
                const movies = await loadMovies("Harry Potter");

                if (!movies) {
                    setMovie(null);
                    return;
                }
                const movie = movies[0]
                setMovie(movie)

                if (config) {
                    const poster = await loadPoster(config, movie, "w342");
                    setPosterUrl(poster ?? null);
                }
                console.log(config?.poster_sizes);
                
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);
    
    return { movie, posterUrl, loading, error };
};