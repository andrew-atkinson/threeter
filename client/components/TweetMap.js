import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import axios from 'axios'
import { render } from 'react-dom'

class TweetMap extends Component {
  constructor() {
    super()
    this.state = {
      tweet: { name: null, text: null },
      worlddata: [],
      tweets: [],
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      clickedTweet: null
    }
    this.handleTweetClick = this.handleTweetClick.bind(this)
  }

  componentDidMount() {
    fetch('/world-50m.json')
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(worlddata => {
          this.setState({
            worlddata: feature(worlddata, worlddata.objects.countries).features,
          })
        })
      })

    axios.get('/api/')
      .then(res => {
        console.log(res.data)
        return this.setState({ tweets: res.data })
      })

    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  projection() {
    return geoMercator()
      .scale(100)
      .translate([800 / 2, 450 / 2])
  }

  handleTweetClick(i) {
    this.setState({ tweet: this.state.tweets[i] })
    console.log("Tweet: ", this.state.tweet)
  }

  updateDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    let windowWidth = this.state.windowWidth
    let windowHeight = this.state.windowHeight
    let currentTweet = this.state.tweet
    let tweets = this.state.tweets
    return (
      <div >
        <svg width={windowWidth} height={windowHeight} viewBox="0 0 800 450">
          <g className="countries">
            {
              this.state.worlddata.map((d, i) => (
                <path
                  key={`path-${i}`}
                  d={geoPath().projection(this.projection())(d)}
                  className="country"
                  fill={`rgba(50,${i},${i * 5},${i * 0.33})`}
                  stroke={`rgba(${50 + (i * 1.5)},${50 + (i * 0.3)},${i + 80},${i * 0.24})`}
                  strokeWidth={0.5}
                />
              ))
            }
          </g>
          <g className="markers">
            {
              tweets && tweets.map((tweet, i) => {
                var fillColor;
                (currentTweet.id_str === tweet.id_str) ? fillColor = "#FFFF00" : fillColor = "#BBBBBB";
                return (<circle
                  key={`marker-${i}`}
                  cx={this.projection()(tweet.place_bounding_box_coordinates[0][0])[0]}
                  cy={this.projection()(tweet.place_bounding_box_coordinates[0][0])[1]}
                  r={1.5}
                  fill={fillColor}
                  stroke="#444"
                  className="marker"
                  onClick={() => this.handleTweetClick(i)}
                />)
              })
            }
          </g>
          <text>{currentTweet.name} {currentTweet.text}</text>
        </svg>
      </div>
    )
  }
}

export default TweetMap
