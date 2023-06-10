import React, {useEffect, useState} from "react";
import MovieBoxAdmin from "./movieBoxAdmin"
import axios from "axios";  
import { debounce } from 'lodash';

const AdminPage = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    try{
        setLoading(true);
        const excludedMovies = movies.map(movie => movie._id);

    //   const response = await axios.get("http://localhost:8080/api/movies");
    const response = await axios.get(`http://localhost:8080/api/movies?page=${page}&search=${searchQuery}&excludedMovies=${excludedMovies}`);
    //   setMovies(response.data);
    setMovies((prevMovies) => [...prevMovies, ...response.data]);
    setLoading(false);
    } catch (error) {
      console.log("Error fetching movies.", error);
      }
  };


//   const handleSearch = debounce(() => {
//     try{
//       const response =  await axios.get(`http://localhost:8080/api/movies?search=${searchQuery}`);
//       setMovies(response.data);
//     } catch(error){
//       console.log("Error searching movies.", error);
//     }
//   }, 500);

const handleSearch = debounce(() => {
    setPage(1);
    setMovies([]);
    fetchMovies();
  }, 500);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch();
  };

//   const handleDeleteMovie = async (movieId) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/movies/${movieId}`);
//       fetchMovies();
//     } catch (error) {
//       console.log("Error deleting movie.", error);
//     }
//   };
const handleDeleteMovie = async (movieId) => {
    try {
      await axios.delete(`http://localhost:8080/api/movies/${movieId}`);
      setMovies((prevMovies) => prevMovies.filter(movie => movie._id !== movieId));
    } catch (error) {
      console.log("Error deleting movie.", error);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        await axios.post("http://localhost:8080/api/movies", {
            Title: title,
            URL: url, 
            Description: description
        });
        setTitle("");
        setUrl("");
        setDescription("");
        fetchMovies();
    } catch(error){
        console.log("Error Adding the movie ", error);
    }
  };


  return (
    <div >
      <h1>Movie Search</h1>
      <div className="searchContainer" >
        <input 
          type="text"
          placeholder="Search Movies..."
          value={searchQuery}
          onChange={handleChange}
        />
          <button onClick={handleSearch}>Search</button>
      </div>

      <div className="addEntry">
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
        <input
            type="text"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            />
        <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />

        <button type="submit">Add</button>

      </form>
      </div>

      <div className="mainContainer">
      {movies.map((movie) => (
          <MovieBoxAdmin key={movie._id} id={movie._id} title={movie.Title} url={movie.URL} description={movie.Description} onDelete={handleDeleteMovie}/>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      

    </div>  
  );
};

export default AdminPage;
