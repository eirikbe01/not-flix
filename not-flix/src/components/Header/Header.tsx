
import { SearchBar } from '../SearchBar/SearchBar.tsx';
import styles from './Header.module.css';

export const Header = () => {
    return(
        <header className={styles.mainContainer}>
            <div className={styles.headerLeft}>
                <SearchBar />
            </div>

            <div className={styles.headerCenter}
            >
                <h1 className={styles.title}>NotFlix</h1>
            </div>

            <div className={styles.headerRight}>
                <button className={styles.menuBtn}>
                    ☰
                </button>
            </div>
        </header>
    );
}