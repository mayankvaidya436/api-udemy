import React,{useEffect, useState,useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMoives]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [error, setError]=useState(null)
    
   const fetchMoivesHandler=useCallback(async()=>{
    setIsLoading(false)
    setError(null)
    try{

    
   const response= await fetch('https://swapi.dev/api/films/')
       
    if(!response.ok)
    {
      throw new Error('Something went wrong ....Retrying');
      
      
    }
    
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
    
    } catch(error){
        setError(error.message);
        
        
    }
    setIsLoading(false)
  })
  useEffect(()=>{
    fetchMoivesHandler()
  },[fetchMoivesHandler])

    let content=<p>Found no moives.</p>
    if(movies.length>0)
    {
      content=<MoviesList movies={movies} />
    }
    if(error){
     content=<p>{error}</p>;
      
    }
    if(isLoading){
      content=<p>Loading....</p>
    }
    

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoivesHandler}>Fetch Movies</button>
      </section>
      <section>
       {content}
      </section>
    </React.Fragment>
  );
}

export default App;
