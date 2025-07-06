import { useState } from 'react';
import styles from './SearchBar.module.css';
import searchIcon from '../../assets/react.svg';


export const SearchBar = () => {
    const [search, setSearch] = useState("");

    return(
        <div className={styles.mainContainer}>
            <div className={styles.searchContainer}>
                <img 
                    src={searchIcon} 
                    className={styles.icon} 
                    alt="Search Icon" 
                />
                <button className={styles.searchBtn}></button>
                <input 
                    className={styles.inputField}
                    type="text"
                    placeholder="Search..."
                >
                </input>
            </div>
        </div>
    );
}