import { useState, useEffect } from 'react';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { fetchFilmTMDbByTitle, fetchPopularFilms, type FilmTMDb } from '../../api/fetchFilms';
import styles from './Home.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchImageInfo } from '../../api/fetchConfig';
import type { ImagesConfig } from '../../api/fetchConfig';

export const Home = () => {

    /*
    const { data, isLoading, error} = useQuery({
        queryKey: ['films'],
        queryFn: fetchPopularFilms,
    });
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>
    */



    const [movie, setMovie] = useState<FilmTMDb[]>();
    const [imageConfig, setImageConfig] = useState<ImagesConfig | null>(null);

    useEffect(() => {
        fetchImageInfo()
            .then((data) => {
                if(data) {setImageConfig(data)};
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);


    useEffect(() => {
        fetchFilmTMDbByTitle("Harry Potter")
        .then((data) => {
            setMovie(data);
        })
        .catch((err) => {
            console.error("Failed to load Harry Potter", err);
        });
    }, []);



    if (!imageConfig) return null;
    const url = imageConfig.secure_base_url ?? 'nothing';
    const posterSizes = imageConfig.poster_sizes ?? [];

    console.log(posterSizes);
    console.log(url);

    if(!movie) return;
    const harryPotter: FilmTMDb = movie[0];

    //console.log(harryPotter);

    return(
        <>
            <SearchBar />
            <div className={styles.mainContainer}>
                <div className={styles.moviesContainer}>
                    <MovieCard 
                        title={harryPotter.title} 
                        releaseDate={harryPotter.release_date} 
                        posterPath={harryPotter.poster_path ?? ''}
                    />
                </div>
            </div>
        </>
    );
}