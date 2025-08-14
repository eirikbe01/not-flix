import {createContext, useContext} from 'react';

export type FavoritesContextType = {
    favorites: number[],
    addFavorite: (id: number) => void,
    removeFavorite: (id: number) => void,
    isFavorite: (id: number) => boolean;
    clearFavorites: () => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = (): FavoritesContextType => {
    const ctx = useContext(FavoritesContext)
    if (!ctx) {
        throw new Error("useFavorites must be used within a FavoritesProvider")
    }
    return ctx;
}