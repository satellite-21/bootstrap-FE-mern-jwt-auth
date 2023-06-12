import React, {useEffect, useState} from "react";
import MovieBox from "./movieBox"
import axios from "axios";  
import { debounce } from 'lodash';



const UserPage = () => {


  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchMovies(searchQuery);
  }, [page]);

  const fetchMovies = async (query) => {
    try{
        setLoading(true);
        const excludedMovies = JSON.stringify(movies.map(movie => movie._id));
    //   const response = await axios.get("http://localhost:8080/api/movies");
    const response = await axios.get(`http://localhost:8080/api/movies?page=${page}&search=${query}&excludedMovies=${excludedMovies}`);
    if (query) {
        setMovies(response.data);
      } else {
        setMovies((prevMovies) => {
          const movieIds = prevMovies.map((movie) => movie._id);
          const newMovies = response.data.filter(
            (movie) => !movieIds.includes(movie._id)
          );
          return [...prevMovies, ...newMovies];
        });
      }
  
      setLoading(false);
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


  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight &&
      !loading
    ) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
      fetchMovies(searchQuery); // Call fetchMovies with searchQuery parameter
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

      {loading && <p>Loading...</p>}

    </div>  
  );
};

export default UserPage;
