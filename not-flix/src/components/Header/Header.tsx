
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

export const Header = () => {

    const navigate = useNavigate();

    return(
        <div className={styles.headerContainer}>
            <h1 onClick={() => navigate("/")}className={styles.title}>NotFlix</h1>
            <button>
                Favorites
            </button>
        </div>
    );
}