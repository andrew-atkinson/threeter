import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import axios from 'axios'
import { render } from 'react-dom'

class WorldMap extends Component {
  constructor() {
    super()
    this.state = {
      worlddata: [],
      tweets: [],
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    }
    this.handleCountryClick = this.handleCountryClick.bind(this)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
  }

  componentDidMount() {
    fetch('/world-110m.json')
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

  handleCountryClick(countryIndex) {
    console.log("Clicked on country: ", this.state.worlddata[countryIndex])
  }

  handleMarkerClick(i) {
    console.log("Marker: ", this.state.cities[i])
  }

  updateDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    var windowWidth = this.state.windowWidth
    var windowHeight = this.state.windowHeight
    return (
      <div >
        <svg width={windowWidth} height={windowHeight} viewBox="0 0 800 450">
          <rect x={0} y={0} width={windowWidth} height={windowHeight} fill={`rgba(0,20,0,1)`} />
          <g className="countries">
            {
              this.state.worlddata.map((d, i) => (
                <path
                  key={`path-${i}`}
                  d={geoPath().projection(this.projection())(d)}
                  className="country"
                  fill={`rgba(50,${i},${i*5},${i*0.33})`}
                  stroke={`rgba(${50+(i*1.5)},${50+(i*0.3)},${i+80},${i*0.24})`}
                  strokeWidth={0.5}
                  onClick={() => this.handleCountryClick(i)}
                />
              ))
            }
          </g>
          <g className="markers">
            {
              this.state.tweets && this.state.tweets.map((tweet, i) => (
                <circle
                  key={`marker-${i}`}
                  cx={this.projection()(tweet.place_bounding_box_coordinates[0][0])[0]}
                  cy={this.projection()(tweet.place_bounding_box_coordinates[0][0])[1]}
                  r={2}
                  fill="#ffffff"
                  stroke="#444"
                  className="marker"
                  onClick={() => this.handleMarkerClick(i)}
                />
              ))
            }
          </g>
        </svg>
      </div>
    )
  }
}

export default WorldMap
