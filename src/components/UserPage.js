import React, {useEffect, useState} from "react";
import MovieBox from "./movieBox"
import axios from "axios";  
import { debounce } from 'lodash';



const UserPage = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [movies,  setMovies] = useState([]);



  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try{
      const response = await axios.get("http://localhost:8080/api/movies");
      setMovies(response.data);
    } catch (error) {
      console.log("Error fetching movies.", error);
      }
  };


  const handleSearch = debounce(async () => {
    try{
      const response =  await axios.get(`http://localhost:8080/api/movies?search=${searchQuery}`);
      setMovies(response.data);
    } catch(error){
      console.log("Error searching movies.", error);
    }
  }, 500);


  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch();
  };

  return (
    <div >
      <h1>Movie Search</h1>
      <div className="searchContainer" >
        <input 
          type="text"
          placeholder="Search Movies..."
          value={searchQuery}
          onChange={handleChange} />
          <button onClick={handleSearch}>Search</button>
      </div>

      <div className="mainContainer">
      {movies.map((movie) => (
          <MovieBox key={movie._id} title={movie.Title} url={movie.URL} description={movie.Description} />
        ))}
      </div>

      

    </div>  
  );
};

export default UserPage;
