import { useState, useEffect } from 'react';
import styles from './MovieCard.module.css';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';



export interface MovieCardProps {
    movieId: number;
    title: string;
    releaseDate: string;
    posterPath: string;
}
export const MovieCard = ({ movieId, title, releaseDate, posterPath } : MovieCardProps) => {

    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    const posterPathRef = useRef<string | undefined>(undefined);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const handleOnClick = () => {
        navigate(`/movies/${movieId}`, 
            { state: {movieId, title, releaseDate, posterPath}
        });
    }

    useEffect(() => {
        if (posterPathRef.current !== posterPath) {
            setLoaded(false);
            posterPathRef.current = posterPath;
        }
        if (imgRef.current?.complete || imgRef.current?.naturalWidth ? imgRef.current.naturalWidth > 0 : false) {
            setLoaded(true);
        }
    }, [posterPath]);


    return(
        <>
            <div 
                className={styles.movieCard}
                onClick={handleOnClick}
            >
                {(!loaded && posterPath) && <div className={styles.posterSkeleton}></div>}
                {posterPath && (
                    <img 
                        key={posterPath}
                        className={styles.poster} 
                        src={posterPath} 
                        alt={`${title} poster`}
                        onLoad={() => setLoaded(true)}
                        onError={() => setLoaded(true)}
                        style={{ opacity: loaded ? 1 : 0}}
                        ref={imgRef}
                    />
                )}
                <div className={styles.movieInfo}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.releaseDate}>{releaseDate}</p>
                </div>
            </div>
        </>
    );
}