
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomeLayout } from '../pages/HomeLayout';
import { Home } from '../pages/Home/Home';
import { MovieIdPage } from '../pages/MovieIdPage';
import { MoviesPage } from '../pages/MoviesPage';
import { GenrePage } from '../pages/GenrePage';
import { NotFound } from '../pages/NotFound/NotFound';


export const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path="movies" element={<MoviesPage />}/>
                    <Route path="movies/:movieId" element={<MovieIdPage />} />
                    <Route path="genres" element={<GenrePage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
