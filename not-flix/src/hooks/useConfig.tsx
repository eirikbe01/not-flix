import { fetchImageConfig } from "../api/fetchConfig";
import { useQuery } from "@tanstack/react-query";


export const useConfig = () => {
    // Fetch image config
    const { data: config, isLoading: configLoading, isError: configError } = useQuery({
        queryKey: ["config"],
        queryFn: fetchImageConfig
    });
    return { config, configLoading, configError}
}