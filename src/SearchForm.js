import React from 'react'
import { useGlobalContext } from './context'
import {Link} from "react-router-dom";
const SearchForm = () => {

    const {searchWord ,setSearchWord, error, setType, setYear, favoriteList} = useGlobalContext();

    const types = ["all", "movie", "series", "episode"];

    const handleRadio = (e) => {
        setType(e.target.value);
    }

    const handleYear = (e) => {
        setYear(e.target.value);
    }

    return (
            <form className="search-form">
                <div>
                  <h2>Search Movies</h2>
                  <input
                      value={searchWord}
                      className="form-input"
                      type="text"
                      onChange={(e) => setSearchWord(e.target.value)}/>
                  {error.show && <div className='error'>{error.msg}</div>}
                    <div className="radio-type">
                        <div>
                            <label htmlFor="yearInp"><h3>Year:&nbsp;</h3></label>
                            <input maxLength="4" minLength="4"
                                   className="year-input" placeholder="e.g. 2010" id="yearInp"
                                   type="text"
                                   onChange={handleYear}
                            />
                        </div>
                        {types.map((typeItem, index) =>
                            <div key={index} className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id={`inlineRadio${index + 1}`}
                                       defaultChecked={index === 0}
                                       onChange={handleRadio}
                                       value={`${typeItem}`}/>
                                <label className="form-check-label" style={{textTransform: "capitalize"}} htmlFor={`inlineRadio${index+1}`}><h3>&nbsp;{typeItem}</h3></label>
                            </div>
                        )}
                    </div>
                </div>
            </form>

    )
}

export default SearchForm
