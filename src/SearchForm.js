import React, {useRef} from 'react'
import { useGlobalContext } from './context'
import debounce from 'lodash.debounce'
const SearchForm = () => {

    const {searchWord ,setSearchWord, error, setType, setYear, favoriteList} = useGlobalContext();

    const types = ["all", "movie", "series", "episode"];

    const handleRadio = (e) => {
        setType(e.target.value);
    }

    // const handleWord = (e) => {
    //     setSearchWord(e?.target?.value);
    // }

    const handleYear = (e) => {
        setYear(e.target.value);
    }

    const searchValue = useRef('');
    function searchFilm() {
        setSearchWord(searchValue?.current?.value)
    }

    const debounceOnChange = debounce(searchFilm, 500);

    return (
            <form className="search-form">
                <div>
                  <h2>Search Movies</h2>
                  <input
                      placeholder="batman"
                      ref={searchValue}
                      className="form-input"
                      type="text"
                      onChange={debounceOnChange}/>
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
