import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {API_SINGLE_MOVIE, useGlobalContext} from './context'
const url =
    'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

const SingleMovie = () => {

    const {id} = useParams();
    const [loadingMovie, setLoadingMovie] = useState(false);
    const [movie, setMovie] = useState({});
    const {error} = useGlobalContext();
    const characteristic = ["Year", "Country", "Genre", "Writer", "Director", "BoxOffice", "Released", "Runtime"];

    useEffect(() => {
        setLoadingMovie(true);
      const getMovie = async () => {
          try {
              const response = await fetch(`${API_SINGLE_MOVIE}${id}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}&plot=full`)
              const data = await response.json()
              setMovie(data);
              setLoadingMovie(false);
          } catch (e) {
              console.log(e)
              setLoadingMovie(false);
          }
        }
        getMovie();
    },[id])

    if (loadingMovie) {
        return <div className='loading'/>
    }
    if (error.show) {
        return (
            <div className='page-error'>
                <h1>{error.msg}</h1>
                <Link to='/' className='btn'>
                    back to movies
                </Link>
            </div>
        )
    }

    const actors = movie.Actors?.split(',')
    const {Title, imdbRating, Genre, imdbVotes, Poster, Plot}
    = movie;

    return (
        <div className="card">
            <div className="card-title">
                <div className="title-top">
                    <h3 className="movie-title">{Title}</h3>
                    <p className="movie-rating"><span className="actual-rating">{imdbRating} </span>/ 10</p>
                </div>
                <div className="title-bottom">
                    <p className="movie-genre">{Genre}</p>
                    <p className="votes">Votes {imdbVotes}</p>
                </div>
            </div>
            <div className="card-body">
                <div className="left-part">
                    {Poster !== "N/A"?
                        <img src={Poster} alt={Title}/>
                        :
                        <img src={url} alt={"troubles with internet"} style={{width: 300, height: 400}}/>
                    }
                </div>
                <div className="middle-part">
                    <div className="about-part">
                        <h4>About the Movie</h4>
                        <p>{Plot}</p>
                    </div>
                    <div className="characteristics">
                        <div className="params">
                            <div className="film-info">
                                {characteristic.map(char =>
                                    <p key={char}>{char}:</p>
                                )}
                            </div>
                            <div className="film-get">
                                {characteristic.map(charGet =>
                                    <p>{movie[charGet]}</p>
                                )}
                            </div>
                        </div>
                        <div className="actors">
                            <h4>Actors</h4>
                            {actors?.map((actor, index) => <p key={index}>{actor}</p>)}
                        </div>
                    </div>
                </div>
            </div>
            <Link to='/' className='btn'>
            back to movies
            </Link>
        </div>
  )
}

export default SingleMovie
