import React from 'react';
import {Link} from "react-router-dom";
import heartEmpty from "./assets/like.png";
import heartFill from "./assets/heart-fill.png";
import {useGlobalContext} from "./context";
const url =
    'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

const Movie = ({movie}) => {

    const {wrapperFunctionFavorite, isFav} = useGlobalContext();

    const {imdbID, Poster, Title, Year} = movie;

    console.log(movie)

    return (
        <div key={imdbID} className="movie">
            <Link to={`/movie/${imdbID}`}>
                <img src={Poster !== "N/A"? Poster : url} alt={url}/>
            </Link>
                <div className="movie-info">
                    <h4>{Title}</h4>
                    <p>{Year}</p>
                    <img
                        src={isFav(movie)? heartFill: heartEmpty} alt={isFav(movie)? "added to fav" : "add to fav"}
                        className="favorite-icon"
                        onClick={() => {wrapperFunctionFavorite(movie)}}
                    />
                </div>
        </div>
    );
};

export default Movie;