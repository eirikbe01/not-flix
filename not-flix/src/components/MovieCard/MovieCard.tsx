import styles from './MovieCard.module.css';



interface MovieCardProps {
    title: string;
    releaseDate: string;
    posterPath: string;
}
export const MovieCard = ({ title, releaseDate, posterPath} : MovieCardProps) => {

    return(
        <div className={styles.movieCard}>
            <div className={styles.poster}>
                <img src={posterPath} alt={`${title} poster`}></img>
            </div>
            <div className={styles.movieInfo}>
                {title}, {releaseDate}
            </div>
        </div>
    );
}