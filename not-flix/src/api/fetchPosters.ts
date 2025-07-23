

export const fetchPosterUrl = async (
    base_url: string, 
    size: string, 
    path: string | null
): Promise<string | undefined>  => {

    if (!path) throw new Error("Poster path does not exist / is null.")
    const posterUrl = `${base_url}${size}${path}`;

    try {
        const response = await fetch(posterUrl);

        if (!response.ok) 
            throw new Error(`Error fetching poster: ${response.status}`);

        // Validate image url using blob
        // image is fetched as a blob (binary) data
        // then converted to a URL object
        const blob = await response.blob()
        return URL.createObjectURL(blob);
    } catch (err) {
        console.error(err);
        return;
    }
}