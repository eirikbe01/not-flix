import { Header } from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer/Footer';

export const HomeLayout = () => {
    return(
        <>
            <Header />
            <Outlet />
        </>
    );
}