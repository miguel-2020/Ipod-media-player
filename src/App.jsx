import { createContext, useCallback, useState } from "react";
import Screen from "./components/Screen";
import Controllers from "./components/Controllers";
import Thumbnail from "./components/Thumbnail";
import mediaStates from "./mediaStatesValues";
import MediaAudio from "./components/MediaAudio";
import { trackList } from "./data.js"

const mediaPlayerContext = createContext(null);

function App(){
 
  // manage the controllers of the application
  const navigate = useCallback((setTo)=>{
    setState({current: setTo,navigate})
  },[])

  //Changes the states of the media player
  const [state,setState] = useState({current:mediaStates.idle,navigate})
  // controls the currentTrack base on the index
  const [trackIndex,setTrackIndex] = useState(0)

  //tracks
  const [tracks,setTracks] = useState(trackList)

  const currentTrack = tracks[trackIndex]

  return (
    <div className="media-player">
      <mediaPlayerContext.Provider value={state}>
      <Screen currentTrack={currentTrack} setTrackIndex={setTrackIndex} tracks={tracks}/>
      <Thumbnail track={currentTrack}/>
      <Controllers setTrackIndex={setTrackIndex} setTracks={setTracks} currentTrack={currentTrack}/>
      <MediaAudio track={currentTrack.src}/>
      </mediaPlayerContext.Provider>
    </div>
     

  )
}

export {
  mediaPlayerContext,
  App
}
