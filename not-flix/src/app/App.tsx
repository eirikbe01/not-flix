import '../App.css';
import { useEffect } from 'react';
import { fetchFilmOMDbByTitle, fetchFilmTMDbByTitle } from '../api/fetchFilms';
import { Router } from './Router';

function App() {


  useEffect(() => {
    fetchFilmTMDbByTitle("Harry Potter");
    fetchFilmOMDbByTitle("Harry Potter", "2001");
  }, []);

  return(
    <>
    <Router></Router>
    </>

  );
}

export default App
