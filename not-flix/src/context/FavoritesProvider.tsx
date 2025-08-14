import { type ReactNode, useState, useEffect } from 'react';
import { FavoritesContext, type FavoritesContextType } from './FavoritesContext';


const storageKey = "notflix:favorites";

export const FavoritesProvider = ({ children }: { children: ReactNode}) => {
    const [favorites, setFavorites] = useState<number[]>(() => {
        try {
            const storedFavorites = localStorage.getItem(storageKey);
            return storedFavorites ? JSON.parse(storedFavorites) : [];
        } catch (err){
            console.error(`Error getting local storage key ${storageKey}:`, err);
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(favorites))
        } catch(err) {
            console.error(`Error setting local storage key ${storageKey}:`, err);
        }
    }, [favorites]);

    const isFavorite = (id: number) => favorites.includes(id)

    const addFavorite = (id: number) => {
        setFavorites((prev) => (isFavorite(id) ? prev : [...prev, id]))
    }

    const removeFavorite = (id: number) => {
        setFavorites((prev) => prev.filter((fid) => fid !== id));
    }

    const clearFavorites = () => {
        setFavorites([]);
    }

    const contextValues: FavoritesContextType = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites
    }

    return(
        <FavoritesContext.Provider value={contextValues}>
            {children}
        </FavoritesContext.Provider>
    );
}