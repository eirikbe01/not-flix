import styles from './MovieCard.module.css';



interface MovieCardProps {
    title: string;
    releaseDate: string;
    posterPath: string;
}
export const MovieCard = ({ title, releaseDate, posterPath} : MovieCardProps) => {

    return(
        <div className={styles.movieCard}>
            <img src={posterPath} alt={`${title} poster`}></img>
            <div className={styles.movieInfo}>
                <p>{title}</p>
                <p>{releaseDate}</p>
            </div>
        </div>
    );
}