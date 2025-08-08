import { type ReactNode, useState} from 'react';
import { FavoritesContext, type FavoritesContextType } from './FavoritesContext';




export const FavoritesProvider = ({ children }: { children: ReactNode}) => {
    const [favorites, setFavorites] = useState<number[]>([]);

    const isFavorite = (id: number) => favorites.includes(id)

    const addFavorite = (id: number) => {
        setFavorites((prev) => (isFavorite(id) ? prev : [...prev, id]))
    }

    const removeFavorite = (id: number) => {
        setFavorites((prev) => prev.filter((fid) => fid !== id));
    }

    const contextValues: FavoritesContextType = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
    }

    return(
        <FavoritesContext.Provider value={contextValues}>
            {children}
        </FavoritesContext.Provider>
    );
}