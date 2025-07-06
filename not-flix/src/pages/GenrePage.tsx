import { useSearchParams } from 'react-router-dom';


export const GenrePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const selected: string[] = searchParams.getAll('genre');


    return(
        <div>GenrePage</div>
    );
}