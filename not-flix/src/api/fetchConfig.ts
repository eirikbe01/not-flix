const TMDbKey = import.meta.env.VITE_TMDb_API_KEY;

export interface ImagesConfig {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
}

interface ConfigResponse {
    images: ImagesConfig;
    change_keys: string[]
}

export const fetchImageInfo = async (): Promise<ImagesConfig | undefined > => {
    const url = `https://api.themoviedb.org/3/configuration?api_key=${TMDbKey}`;

    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(`Error fetching config: ${response.status}`)
        }
        const data = await response.json() as ConfigResponse;

        return data ? data.images : undefined;

    } catch (err) {
        console.error(err);
    }
}