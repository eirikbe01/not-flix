import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export const NotFound = () => {
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Not Found</h1>
            <Link to={"/"}>
                <button className={styles.goBackBtn}>Go back to Home page</button>
            </Link>
        </div>
    );
}