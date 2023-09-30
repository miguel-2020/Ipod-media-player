import { useEffect, useRef, useContext } from 'react';
import Banner from './Banner';
import { mediaPlayerContext } from '../App';

import mediaStates from '../mediaStatesValues';

export default function Screen({currentTrack,setTrackIndex,tracks}) {
  const { current,navigate } = useContext(mediaPlayerContext);


  function changeTrack(evt){
    
   const songTitle = evt.target.innerHTML;
   let index = tracks.findIndex((track)=> {
    return songTitle.toLowerCase().includes(track.title.toLowerCase())
   })


  
   if(index >= 0){
    setTrackIndex(index)
    navigate(mediaStates.idle)

   }
  }
  return (
    <>
      <div className='screen'>
          <ul className='tracks' data-power='power-OFF'>
            {tracks.map((track, i) => (
              <li className={currentTrack.title === track.title ? "current-track" : ""} key={i} onClick={(evt)=> changeTrack(evt)}>{`${track.title} ${track.liked ? "❣️" : ""}`}</li>
            ))}
          </ul>
        
          <Banner />
         
      

      </div>
    </>
  );
}
