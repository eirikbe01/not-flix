
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomeLayout } from '../pages/HomeLayout';
import { Home } from '../pages/Home/Home';
import { MovieIdPage } from '../pages/MovieIdPage/MovieIdPage';
import { NotFound } from '../pages/NotFound/NotFound';
import {Favorites } from '../pages/Favorites';


export const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/search" element={<Home />} />
                    <Route path="/movies/:id" element={<MovieIdPage />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
