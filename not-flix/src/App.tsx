import './App.css';
import { fetchMovieDetailsByTitle } from './api/fetchTMBD';
function App() {

  return (
    <div>{fetchMovieDetailsByTitle("Harry Potter")}</div>
  );

}

export default App
