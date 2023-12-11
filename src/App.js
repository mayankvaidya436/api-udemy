import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMoives]=useState([])

   async function fetchMoivesHandler(){
   const response= await fetch('https://swapi.dev/api/films/')
       const data= await response.json();
  
      const transformedMoives=data.results.map(moiveData=>{
        return{
          id:moiveData.episode_id,
          title:moiveData.title,
          openingText:moiveData.opening_crawl,
          releaseDate:moiveData.release_date
        }
      })
      setMoives(transformedMoives)
  
  }
    

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoivesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
