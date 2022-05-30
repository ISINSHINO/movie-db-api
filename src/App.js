import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './Home'
import Movie from './SingleMovie'
import Error from "./Error";
import FavList from "./FavList";
import NavBar from "./NavBar";

function App() {
    return (
    <div>
        <NavBar/>
            <Switch>
              <Route exact path="/movie-db-api">
                  <Home/>
              </Route>
              <Route path="/movie/:id">
                <Movie/>
              </Route>
              <Route path="/list">
                  <FavList/>
              </Route>
              <Route path="*">
                  <Error/>
              </Route>
            </Switch>
    </div>
    )
}

export default App
