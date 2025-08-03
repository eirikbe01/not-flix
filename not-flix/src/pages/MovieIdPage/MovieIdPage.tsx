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

    const { title, releaseDate, posterPath } = movieCardState ?? {};

    const year = releaseDate?.split("-")[0];

    const { 
        movieDetails, 
        detailsLoading, 
        detailsError 
    } = useMovieDetails(title ?? "", year);

    useEffect(() => {
        setLoaded(false);
    }, [posterPath])

    console.log(styles);
    if (detailsLoading) return <div>Loading movie details...</div>;
    if (detailsError) return <div>Error loading movie details.</div>;

    return(
        <div className={styles.mainContainer}>
            <div className={styles.detailsContainer}>
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
                <p>Actors: {movieDetails?.Actors}</p>
                <p>Awards: {movieDetails?.Awards}</p>
                <p>Box office: {movieDetails?.BoxOffice}</p>
                <p>Country: {movieDetails?.Country}</p>
                <p>DVD: {movieDetails?.DVD}</p>
                <p>Director(s): {movieDetails?.Director}</p>
                {movieDetails?.Error && <p>Error: {movieDetails?.Error}</p>}
                <p>Genre: {movieDetails?.Genre}</p>
                <p>Lanugage: {movieDetails?.Language}</p>
                <p>Metascore: {movieDetails?.Metascore}</p>
                <p>Plot: {movieDetails?.Plot}</p>
                <p>Production: {movieDetails?.Production}</p>
                <p>Rated: {movieDetails?.Rated}</p>
                <p>Ratings: </p>
                {movieDetails?.Ratings.map((rating, index) => (
                    <p key={index}>{rating.Value}</p>
                ))}
                <p>Release date: {movieDetails?.Released}</p>
                <p>Runtime: {movieDetails?.Runtime}</p>
                <p>Title: {movieDetails?.Title}</p>
                <p>Type: {movieDetails?.Type}</p>
                <p>Writer(s): {movieDetails?.Writer}</p>
                <p>Year: {movieDetails?.Year}</p>
                <p>IMDB id: {movieDetails?.imdbID}</p>
                <p>IMDB rating: {movieDetails?.imdbRating}</p>
                <p>IMDB votes: {movieDetails?.imdbVotes}</p>
                <p>{movieDetails?.Type != "movie" && movieDetails?.totalSeasons}</p>
            </div>
        </div>
    );
}