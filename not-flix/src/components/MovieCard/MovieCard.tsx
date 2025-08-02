import styles from './MovieCard.module.css';



interface MovieCardProps {
    title: string;
    releaseDate: string;
    posterPath: string;
    genres: number[];
}
export const MovieCard = ({ title, releaseDate, posterPath } : MovieCardProps) => {

    return(
        <div className={styles.movieCard}>
            <img className={styles.poster} src={posterPath} alt={`${title} poster`}></img>
            <div className={styles.movieInfo}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.releaseDate}>{releaseDate}</p>
            </div>
        </div>
    );
}