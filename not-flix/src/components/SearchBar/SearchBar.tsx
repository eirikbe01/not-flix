import { useState } from 'react';
import styles from './SearchBar.module.css';
import searchIcon from '../../assets/search.svg';


export const SearchBar = () => {
    const [search, setSearch] = useState("");

    return(
        <div className={styles.searchContainer}>
            <button className={styles.searchBtn}>🔎</button>
            <input
                className={styles.inputField}
                type="text"
                placeholder="Search..."
            >
            </input>
        </div>
    );
}