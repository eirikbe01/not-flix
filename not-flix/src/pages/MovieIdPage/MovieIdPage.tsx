import { useMovieDetails } from "../../hooks/useMovieDetails";
import { useParams, useLocation } from 'react-router-dom';
import styles from './MovieIdPage.module.css';
import { useState, useEffect } from 'react';
import { fetchIMDbId } from "../../api/fetchConfig";
import { useQuery } from '@tanstack/react-query';

interface MovieCardState {
    movieId: number,
    title: string,
    releaseDate: string,
    posterPath: string
}

export const MovieIdPage = () => {

    const { id } = useParams<{id: string}>();
    const { data: imdb_id } = useQuery({
        queryKey: ['imdb_id', id],
        queryFn: () => fetchIMDbId(Number(id))
    })
    const [loaded, setLoaded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const location = useLocation();
    const movieCardState = location.state as MovieCardState | undefined;
    const { title, posterPath } = movieCardState ?? {};

    const { 
        movieDetails, 
        detailsLoading, 
        detailsError 
    } = useMovieDetails(imdb_id ?? "");

    useEffect(() => {
        setLoaded(false);
    }, [posterPath])

    if (detailsLoading) return <div>Loading movie details...</div>;
    if (detailsError) return <div>Error loading movie details.</div>;

    return(
        <div className={styles.mainContainer}>
            <div className={styles.detailsContainer}>
                <div className={styles.posterContainer}>
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
                    <div className={styles.posterText}>
                        <p>{movieDetails?.Title}</p>
                        <p>{movieDetails?.Released}</p>
                        <p>{movieDetails?.Genre}</p>
                        <p style={{lineHeight: "80%"}}>Ratings: </p>
                        {movieDetails?.Ratings ? movieDetails?.Ratings.map((rating, index) => (
                            <p key={index}>👉 {rating.Value}</p>
                        )) : <p>No ratings available</p>}
                        <input 
                            type="checkbox" 
                            id="favorite" 
                            name="favorite"
                            onChange={(e) => setIsFavorite(e.target.checked)}
                        >
                        </input>
                        <label htmlFor="favorite">Mark as favorite</label>
                    </div>
                </div>
                <div className={styles.detailsText}>
                    <p>Actors: {movieDetails?.Actors}</p>
                    <p>Awards: {movieDetails?.Awards}</p>
                    <p>Box office: {movieDetails?.BoxOffice}</p>
                    <p>Country: {movieDetails?.Country}</p>
                    <p>DVD: {movieDetails?.DVD}</p>
                    <p>Director(s): {movieDetails?.Director}</p>
                    {movieDetails?.Error && <p>Error: {movieDetails?.Error}</p>}
                    <p>Lanugage: {movieDetails?.Language}</p>
                    <p>Metascore: {movieDetails?.Metascore}</p>
                    <p>Plot: {movieDetails?.Plot}</p>
                    <p>Production: {movieDetails?.Production}</p>
                    <p>Rated: {movieDetails?.Rated}</p>
                    <p>Runtime: {movieDetails?.Runtime}</p>
                    <p>Type: {movieDetails?.Type}</p>
                    <p>Writer(s): {movieDetails?.Writer}</p>
                    <p>Year: {movieDetails?.Year}</p>
                    <p>IMDB id: {movieDetails?.imdbID}</p>
                    <p>IMDB rating: {movieDetails?.imdbRating}</p>
                    <p>IMDB votes: {movieDetails?.imdbVotes}</p>
                    {movieDetails?.Type === "series" && (
                        <p>Total seasons: {movieDetails?.totalSeasons}</p>
                    )}
                </div>
            </div>
        </div>
    );
}