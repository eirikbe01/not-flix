import { useMovieDetails } from "../../hooks/useMovieDetails";
import { useParams, useLocation } from 'react-router-dom';
import styles from './MovieIdPage.module.css';
import { useState, useEffect } from 'react';

interface MovieCardState {
    movieId: number,
    title: string,
    releaseDate: string,
    posterPath: string
}

export const MovieIdPage = () => {

    const { id } = useParams<{id: string}>();
    const [loaded, setLoaded] = useState(false);
    console.log(`Movie ID from params: ${id}`);
    const location = useLocation();
    const movieCardState = location.state as MovieCardState | undefined;

    const { movieId, title, releaseDate, posterPath } = movieCardState ?? {};

    const year = releaseDate?.split("-")[0];

    const { 
        movieDetails, 
        detailsLoading, 
        detailsError 
    } = useMovieDetails(title ?? "", year);

    useEffect(() => {
        setLoaded(false);
    }, [posterPath])


    if (detailsLoading) return <div>Loading movie details...</div>;
    if (detailsError) return <div>Error loading movie details.</div>;

    return(
        <div className={styles.mainContainer}>
            {!loaded && <div className={styles.posterSkeleton}></div>}
            {posterPath && (
                <img 
                    key={posterPath}
                    className={styles.poster} 
                    src={posterPath} 
                    alt={`${title} poster`}
                    onLoad={() => setLoaded(true)}
                    onError={() => setLoaded(true)}
                    style={{ opacity: loaded ? 1 : 0}}
                    loading="lazy"
                />
            )}
        </div>
    );
}