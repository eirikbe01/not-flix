
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomeLayout } from '../pages/HomeLayout';
import { Home } from '../pages/Home/Home';
import { MovieIdPage } from '../pages/MovieIdPage';
import { NotFound } from '../pages/NotFound/NotFound';


export const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path="movies/:movieId" element={<MovieIdPage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
