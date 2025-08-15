
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import favoritesIcon from '../../assets/favoritesIcon.svg';

export const Header = () => {

    const navigate = useNavigate();

    return(
        <div className={styles.headerContainer}>
            <h1 
                onClick={() => navigate("/")}
                className={styles.title}
            >
                NotFlix
            </h1>
            <button
                type="button" 
                onClick={() => navigate("/favorites")}
                className={styles.favoritesBtn}
                aria-label="Favorites"
            >
                <img className={styles.favoritesIcon} src={favoritesIcon}></img>
            </button>
        </div>
    );
}