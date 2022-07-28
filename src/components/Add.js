import React, { useEffect, useState } from 'react'
import ResultCard from './ResultCard'

const Add = () => {
  
  const [query, setQuery]=useState("")
  const[results, setResults]=useState([])

  const onChange=(e)=>{
    e.preventDefault();
    setQuery(e.target.value)

  }
 
  
  const moviedetails= async()=>{
    
      const res= await fetch(`https://api.themoviedb.org/3/search/movie?api_key=87278017aef2c8a20f252457882adb59&language=en-US&page=1&include_adult=false&query=${query}`)
      const data=await res.json()
      
      if(!data.errors){
        setResults(data.results)
      }else{
        setResults([])
      }

    
  }
  
 

  useEffect(()=>{
    moviedetails()

  },[query])
  


  return (
    <div className='add-page'>
      <div className='container'>
        <div className='add-content'>
          <div className='input-wrapper'>
            <input type="text" placeholder="Search for movies" value={query} onChange={onChange}></input>
          </div>

          {results.length > 0 && (
            <ul className='results'>
              {results.map((movie)=>(
                <li key={movie.id}>
                  <ResultCard movie={movie}/>

                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Add