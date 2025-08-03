import { useState, useEffect } from 'react';
import styles from './MovieCard.module.css';
import { useNavigate } from 'react-router-dom';



interface MovieCardProps {
    movieId: number;
    title: string;
    releaseDate: string;
    posterPath: string;
}
export const MovieCard = ({ movieId, title, releaseDate, posterPath } : MovieCardProps) => {

    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(`/movies/${movieId}`, 
            { state: { title, releaseDate, posterPath}
        });
    }

    useEffect(() => {
        setLoaded(false);
    }, [posterPath])


    return(
        <>
            <div 
                className={styles.movieCard}
                onClick={handleOnClick}
            >
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
                <div className={styles.movieInfo}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.releaseDate}>{releaseDate}</p>
                </div>
            </div>
        </>
    );
}