import React, {useState} from 'react'
import { useGlobalContext } from './context'
import Movie from "./Movie";


const Movies = () => {
    const {movies, loading, page, setPage, totalMovies} = useGlobalContext();

    // // const pages = [1, 2, 3, 4, 5];

    const [pageNumberLimit,] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const pages = Array.from({length: (Math.ceil(totalMovies / 10))}, (_, i) => i + 1);

    console.log(pages)

    if (loading) {
      return <div className="loading"/>
    }

    const getClass = (index) => {
        if (index + 1 === page)
            return "active"
    }

    const renderPages = pages.map((page, index) => {
            if (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) {
                return (
                    <li
                        key={index}
                        onClick={() => {setPage(index + 1)}}
                        className={getClass(index)}
                    >
                        <a href="#">{index + 1}</a></li>
                )
            } else {
                return null;
            }
        })

    const handleNextBtn = () => {
        if (page === pages[pages.length]) {
            return null;
        } else {
            setPage(page + 1);
            if (page + 1 > maxPageNumberLimit) {
                setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
                setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
            }
        }
    }

    const handlePrevBtn = () => {
        if (page === pages[0]) {
            return null;
        }
        else {
            setPage(page - 1);
            if ((page - 1) % pageNumberLimit === 0) {
                setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
                setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
            }
        }
    }

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextBtn}><a>&hellip;</a></li>
    }

    let pageDecrementBtn = null;
    if (pages.length + 1 > maxPageNumberLimit) {
        pageDecrementBtn = <li onClick={handlePrevBtn}><a>&hellip;</a></li>
    }

    return (
        <section className="section">
            <div className="movies">
              {movies.map(movie => {
                return (
                    <Movie key={movie.imdbID} movie={movie}/>
                )})}
            </div>
            <div className="pages">
            <ul className="pagination">
                <li ><a>
                        <button
                            disabled={page === 1}
                            onClick={handlePrevBtn}
                        >
                            prev</button>
                </a></li>
                {pageDecrementBtn}
                {renderPages}
                {pageIncrementBtn}
                <li><a>
                    <button
                        disabled={page === pages.length}
                        onClick={handleNextBtn}
                    >
                        next</button>
                </a></li>
            </ul>
            </div>
        </section>
    )
}

export default Movies
