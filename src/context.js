import React, {useState, useContext, useEffect, useCallback} from 'react'
export const API_ENDPOINT = "https://www.omdbapi.com/?s="
export const API_SINGLE_MOVIE = "https://www.omdbapi.com/?i="
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [searchWord, setSearchWord] = useState('batman');
    const [movies, setMovies] = useState([]);
    const [favoriteList, setFavoriteList] = useState(JSON.parse(window.localStorage.getItem('list')) || []);
    const [error, setError] = useState({ show: false, msg: '' })
    const [page, setPage] = useState(1);
    const [totalMovies, setTotalMovies] = useState(0)
    const [type, setType] = useState("")
    const [year, setYear] = useState("")


    const fetchMovies = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_ENDPOINT}${searchWord}&plot=full&page=${page}&type=${type === "all"? "" : type}&y=${year}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`);
            const data = await response.json();

            if (data.Response === 'True') {
                setMovies(data.Search || data)
                setTotalMovies(Number(data.totalResults));
                setError({ show: false, msg: '' })
            } else {
                setError({ show: true, msg: data.Error })
            }
            setLoading(false)
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }, [searchWord, page, type, year])

    useEffect(() => {
        fetchMovies();
    }, [searchWord, page, type, year, fetchMovies])

    useEffect(() => {
        window.localStorage.setItem('list', JSON.stringify(favoriteList));
    }, [favoriteList])

    const wrapperFunctionFavorite = (movie) => {
        if (isFav(movie)) {
            setFavoriteList(favoriteList.filter(function(item) {
                return item.imdbID !== movie.imdbID
            }))
        } else {
            if (!favoriteList.includes(movie)) {
                setFavoriteList([...favoriteList, movie]);
            }
        }
    }

    const isFav = (movie) => {
        let data = (favoriteList.filter(function(e) { return e.imdbID === movie.imdbID; }));
        return data.length !== 0;
    }

    return <AppContext.Provider
        value={{
            loading,
            movies,
            setSearchWord,
            searchWord,
            error,
            page,
            setPage,
            totalMovies,
            type,
            setType,
            year,
            setYear,
            favoriteList,
            setFavoriteList,
            wrapperFunctionFavorite,
            isFav,
        }}
    >
        {children}
    </AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }
