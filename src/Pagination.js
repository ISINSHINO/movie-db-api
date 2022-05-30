import React, {useState} from 'react';
import {useGlobalContext} from "./context";

const Pagination = () => {

    const {page, setPage, totalMovies} = useGlobalContext();

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const pages = Array.from(Array(Math.ceil(totalMovies / 10)).keys());

    const getClass = (index) => {
        if (index === page) {
            return "active"
        }
        else {
            return ""
        }
    }

    const renderPages = pages.map((page, index) => {
        if (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) {
            return (
                <li
                    key={index}
                    onClick={() => {setPage(index)}}
                    className={getClass(index)}
                >
                    <a>{index}</a></li>
            )
        } else {
            return null;
        }
    })

    const handleNextBtn = () => {
        setPage(page + 1);
        if (page + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit( maxPageNumberLimit => maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit => minPageNumberLimit + pageNumberLimit);
        }
    }

    const handlePrevBtn = () => {
        setPage(page - 1);

        if ((page - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit => maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit => minPageNumberLimit - pageNumberLimit);
        }
    }

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextBtn}><a>&hellip;</a></li>
    }

    let pageDecrementBtn = null;
    if (pages.length >= maxPageNumberLimit) {
        pageDecrementBtn = <li onClick={handlePrevBtn}><a>&hellip;</a></li>
    }

    return (
        <div className="pages">
            <ul className="pagination">
                <li ><a>
                    <button
                        disabled={page === pages[1]}
                        onClick={handlePrevBtn}
                    >
                        prev</button>
                </a></li>
                {pageDecrementBtn}
                {renderPages}
                {pageIncrementBtn}
                <li><a>
                    <button
                        disabled={page === pages[pages.length - 1]}
                        onClick={handleNextBtn}
                    >next</button>
                </a></li>
            </ul>
        </div>
    );
};

export default Pagination;