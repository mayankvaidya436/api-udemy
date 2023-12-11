import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMoives]=useState([])
  const [isLoading,setIsLoading]=useState(false)

   async function fetchMoivesHandler(){
    setIsLoading(false)
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
      setIsLoading(false)
  
  }
    

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoivesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length===0 && <p>found no moives.</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
