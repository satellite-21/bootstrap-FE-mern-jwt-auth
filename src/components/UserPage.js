import React, {useEffect, useState} from "react";
import MovieBox from "./movieBox"
import axios from "axios";  


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

  const handleSearch = () =>{
    console.log("Searching for...", searchQuery);
    // here the state will be upadted 
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <div>
        <input 
          type="text"
          placeholder="Search Movies..."
          value={searchQuery}
          onChange={handleChange} />
          <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        {movies.map((movie) => (
          <MovieBox key={movie._id} title={movie.Title} url={movie.URL} />
        ))}
      </div>

    </div>  
  );
};

export default UserPage;
