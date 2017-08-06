import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import ReactDOM, {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
// import store from './store'
import WorldMap from "./components/WorldMap"

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    // <Provider store={store}>
      // <Router history={browserHistory}>
        <WorldMap />
      // </Router>
    // </Provider>
    ,
    document.getElementById("app"))
})
