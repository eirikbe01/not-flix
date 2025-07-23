

export const fetchPosterUrls = async (
    base_url: string, 
    size: string, 
    paths: string[]
): Promise<string[]>  => {
    if (!paths) throw new Error("The list of poster paths is empty")
    
    const posterPromises = paths.map((path) => {

        if (!path) return Promise.resolve(undefined);
        const posterUrl = `${base_url}${size}${path}`;
        return fetch(posterUrl)
            .then((response) => {
                if (!response.ok) throw new Error(`Error fetching poster: ${response.status}`);
                return response.blob();
            })
            .then((blob) => URL.createObjectURL(blob))
            .catch((err) => {
                console.error(err);
                return undefined;
            });
    });
    const results = await Promise.all(posterPromises);
    return results.filter((url): url is string => typeof url === "string");
}