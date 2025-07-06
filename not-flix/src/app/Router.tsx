
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomeLayout } from '../pages/HomeLayout';
import { Home } from '../pages/Home';
import { MoviePage } from '../pages/MoviePage';
import { GenrePage } from '../pages/GenrePage';
import { NotFound } from '../pages/NotFound/NotFound';


export const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path="movies/:movieId" element={<MoviePage />} />
                    <Route path="genres" element={<GenrePage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
