import { MovieCard } from '../../components/MovieCard/MovieCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import styles from './Home.module.css';

import { useMovieData } from '../../hooks/useMovieData';


export const Home = () => {

    const { movie, posterUrl, loading, error } = useMovieData();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>
    if (!movie) return <div>No movie found</div>
    /*
    const { data, isLoading, error} = useQuery({
        queryKey: ['films'],
        queryFn: fetchPopularFilms,
    });
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>
    */

    return(
        <>
            <SearchBar />
            <div className={styles.mainContainer}>
                <div className={styles.moviesContainer}>
                    <MovieCard 
                        title={movie.title} 
                        releaseDate={movie.release_date} 
                        posterPath={posterUrl ?? ''}
                    />
                </div>
            </div>
        </>
    );
}