
import { SearchBar } from '../SearchBar/SearchBar.tsx';
import styles from './Header.module.css';

export const Header = () => {
    return(
        <div className={styles.mainContainer}>
        <SearchBar />
        </div>
    );
}