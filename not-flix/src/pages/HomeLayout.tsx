import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';

export const HomeLayout = () => {
    return(
        <>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
}