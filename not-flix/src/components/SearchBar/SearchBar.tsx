import { useState } from 'react';
import styles from './SearchBar.module.css';


export const SearchBar = () => {
    const [search, setSearch] = useState("");

    return(
        <div className={styles.mainContainer}>
            <div className={styles.searchContainer}>
                <input
                    className={styles.inputField}
                    type="text"
                    placeholder="Search for movies..."
                >
                </input>
                <button className={styles.searchBtn}>Search</button>
            </div>
        </div>
    );
}