import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

const App =() => {
  const [movies, setMovies] = useState ([]);
  const [favorites, setFavorites] = useState ([]);
  const [searchValue, setSearchValue] = useState('');

const getMovieRequest = async (searchValue) => {
  const url =`http://www.omdbapi.com/?s=${searchValue}&apikey=515176c`;

  const response =await fetch(url);
  const responseJson = await response.json();

  if (responseJson.Search) {
    setMovies(responseJson.Search);
  }
};

useEffect(() => {
  getMovieRequest(searchValue);
}, [searchValue]);

useEffect(() => {
  const movieFavorites =JSON.parse(localStorage.getItem('react-movie-app-favorites')
  );

  setFavorites(movieFavorites);
}, []);

const saveToLocalStorage = (items) => {
  localStorage.setItem('react-movie-app-favorites',JSON.stringify(items))
}; // created a storage area so favorites will save after closing browser.

const addFavoriteMovie = (movie) => {
  const newFavoriteList = [...favorites, movie];
  setFavorites(newFavoriteList);
  saveToLocalStorage(newFavoriteList); // will save your favorite list in local storage.
};

const removeFavoritesMovie = (movie) => {
  const newFavoriteList = favorites.filter(
    (favorite) => favorite.imdbID !== movie.imdbID
  );

  setFavorites(newFavoriteList);
  saveToLocalStorage(newFavoriteList);
};

 return (
  <div className='container-fluid movie-app'>
   <div className='row d-flex align-items-center mt-4 mb-4'>
     <MovieListHeading heading='Movie Binge'/>
     <SearchBox  searchValue={searchValue} setSearchValue={setSearchValue}/>
   </div>

   <div className='row'>
     <MovieList 
        movies={movies}
        handleFavoritesClick={addFavoriteMovie}
        favoriteComponent={AddFavorites}
      />
   </div>
   <div className='row d-flex align-items-center mt-4 mb-4'>
     <MovieListHeading heading='Favorites'/>
   </div>

   <div className='row d-flex align-items-center mt-2'>
   <MovieList 
      movies={favorites}
      handleFavoritesClick={removeFavoritesMovie}
      favoriteComponent={RemoveFavorites}
    />
 </div>
 </div>

  );
};

export default App;
