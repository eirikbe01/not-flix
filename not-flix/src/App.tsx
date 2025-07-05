import './App.css';
import { useEffect } from 'react';
import { fetchFilmOMDbByTitle, fetchFilmTMDbByTitle } from './api/fetchFilms';
function App() {


  useEffect(() => {
    fetchFilmTMDbByTitle("Harry Potter");
    fetchFilmOMDbByTitle("Harry Potter");
  }, []);

  return(
    <div>Hello World !!! </div>
  );
}

export default App
