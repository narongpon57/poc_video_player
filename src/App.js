import React from "react"
import "./App.css"
import ReactPlayer from "react-player"
import Duration from "./Duration"

class App extends React.Component {
  state = {
    duration: 0,
    played: 0,
    loaded: 0,
    loop: false,
    playing: true,
  }

  handleProgress = (state) => {
    // console.log("onProgress", state)
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleDuration = (duration) => {
    console.log("onDuration", duration)
    this.setState({ duration })
  }

  handleSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  handleEnded = () => {
    console.log("onEnded")
    this.setState({ playing: this.state.loop })
  }

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }

  handlePause = () => {
    console.log("onPause")
    this.setState({ playing: false })
  }

  handlePlay = () => {
    console.log("onPlay")
    this.setState({ playing: true })
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  render() {
    const { duration, played, loaded, loop, playing } = this.state

    return (
      <div className="columns">
        <div className="column">
          <ReactPlayer
            url="http://media.w3.org/2010/05/bunny/movie.mp4"
            className="react-player"
            playing={playing}
            loop={loop}
            controls={true}
            onProgress={this.handleProgress}
            onDuration={this.handleDuration}
            onEnded={this.handleEnded}
            onPause={this.handlePause}
            onPlay={this.handlePlay}
            onReady={() => console.log("onReady")}
            onStart={() => console.log("onStart")}
          />
        </div>
        <div className="column">
          <div>
            duration: <Duration seconds={duration} />
          </div>
          <div>
            elapsed: <Duration seconds={duration * played} />
          </div>
          <div>
            remaining: <Duration seconds={duration * (1 - played)} />
          </div>
          <div>loaded: {loaded.toFixed(3)}</div>
          <div>playing: {playing ? "true" : "false"}</div>
        </div>
      </div>
    )
  }
}

export default App
