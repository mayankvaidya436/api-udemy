import React,{useEffect, useState,useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies,setMoives]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [error, setError]=useState(null)
    
   const fetchMoivesHandler=useCallback(async()=>{
    setIsLoading(false)
    setError(null)
    try{

    
   const response= await fetch('https://react-http-18035-default-rtdb.firebaseio.com/moives.json')
       
    if(!response.ok)
    {
      throw new Error('Something went wrong ....Retrying');
      
      
    }
    const data= await response.json()
    console.log(data)
    const loadedMoives=[];
    for(const key in data)
    {
      loadedMoives.push({
        id:key,
        title:data[key].title,
        openingText:data[key].openingText,
        releaseDate:data[key].releaseDate
      })
    }
    
      setMoives(loadedMoives)
    
    } catch(error){
        setError(error.message);
        
        
    }
    setIsLoading(false)
  })
  useEffect(()=>{
    fetchMoivesHandler()
  },[fetchMoivesHandler])

    async function addMovieHandler(movie){
     const response= await fetch('https://react-http-18035-default-rtdb.firebaseio.com/moives.json',{
      method:'POST',
      body:JSON.stringify(movie),
      headers:{
        'Content-Type': 'application/Json'
      }
    })
 
   }
   async function deleteMoiveshandler(movie){
    const response= await fetch('https://react-http-18035-default-rtdb.firebaseio.com/moives.json',{
      method:'DELETE',
      body:JSON.stringify(movie),
      headers:{
        'Content-Type': 'application/Json'
      }
    })
   }

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
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMoivesHandler}>Fetch Movies</button>
        <button onClick={deleteMoiveshandler}>delete</button>
      </section>
      <section>
       {content}
      </section>
    </React.Fragment>
  );
}

export default App;
