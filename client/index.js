import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import ReactDOM, { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
// import store from './store'
import TweetMap from "./components/TweetMap"

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <div>
            <TweetMap />
        </div>,
        document.getElementById("app"))
})
