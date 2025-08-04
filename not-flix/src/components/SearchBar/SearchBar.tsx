import { useState, type ChangeEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    value: string;
    onSearch: (searchTerm: string) => void;
}

export const SearchBar = (props: SearchBarProps) => {

    const [inputValue, setInputValue] = useState("");

    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            props.onSearch(inputValue);
        }
    }

    return(
        <div className={styles.mainContainer}>
            <div className={styles.searchContainer}>
                <input
                    className={styles.inputField}
                    type="text"
                    value={inputValue}
                    placeholder="Search for movies..."
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)}
                    onKeyDown={(event) => handleOnKeyDown(event)}
                >
                </input>
                <button
                    className={styles.searchBtn}
                    type="button"
                    onClick={() => {
                        props.onSearch(inputValue);
                    }}
                >
                    Search
                </button>
            </div>
        </div>
    );
}