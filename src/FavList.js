import React, {useEffect, useState} from 'react';
import {API_SINGLE_MOVIE, useGlobalContext} from "./context";
import {Link} from "react-router-dom";
import sadJohny from './assets/johnny-depp-tears.gif'
import heartFill from "./assets/heart-fill.png";
import heartEmpty from "./assets/like.png";
const url =
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"

const FavList = () => {

    const {favoriteList, setFavoriteList, wrapperFunctionFavorite, isFav } = useGlobalContext();
    const [favToShow, setFavToShow] = useState([]);


    useEffect(() => {
        const getMovie = async (id) => {
            try {
                const response = await fetch(`${API_SINGLE_MOVIE}${id}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}&plot=full`)
                const data = await response.json()
                setFavToShow((favToShow) => [...favToShow, data])
            } catch (e) {
                console.log(e)
            }
        }

        favoriteList.map(movie => {
            getMovie(movie.imdbID);
        })
    }, [])

    const clearList = () => setFavoriteList([]);

    return (
        <>
            {favoriteList.length > 0 ?
                <div className="wrapper">
                    <h2 className="main-title">Your favorite movies list:</h2>
                        {favToShow.map(movie => {
                            let {imdbID, Poster, Title, Released, Country, Genre} = movie;
                            return (
                                <div key={imdbID}>
                                    <div className="row-body">
                                        <div className="info-img">
                                            <Link to={`/movie/${imdbID}`}>
                                                <img className="main-img" src={Poster} alt={Title}/>
                                            </Link>
                                            <div className="info">
                                                <Link to={`/movie/${imdbID}`}>
                                                    <h2 className="title">
                                                        {Title}
                                                    </h2>
                                                </Link>
                                                <p className="date-release">
                                                    {Released} ({Country})
                                                </p>
                                                <p className="genre">
                                                    {Genre}
                                                </p>
                                            </div>
                                        </div>
                                        <img
                                            src={isFav(movie)? heartFill: heartEmpty} alt={isFav(movie)? "added to fav" : "add to fav"}
                                            className="heart"
                                            onClick={() => {wrapperFunctionFavorite(movie)}}
                                        />
                                    </div>
                                </div>

                            )}
                        )}
                    <div className="buttons-section">
                    <Link className="btn" to="/movie-db-api">add more movies</Link>
                    <button onClick={clearList}
                            style={{marginLeft: 10, backgroundColor: "red"}}
                            className="btn">clear all</button>
                    </div>
                </div>
                :
                <div className="no-favorite-section">
                    <h2>Please, add some movies and come back!</h2>
                    <img src={sadJohny} alt={url}/>
                    <Link className="btn" to="/movie-db-api">go back</Link>
                </div>
            }

        </>
    );
};

export default FavList;