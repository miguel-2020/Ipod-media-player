import { useContext, useEffect, useRef } from "react";
import { mediaPlayerContext } from "../App";
import mediaStates from "../mediaStatesValues";

export default function MediaAudio({track}) {
    const {current,navigate} = useContext(mediaPlayerContext)
   
   
    
    const audioRef = useRef(null)
    

    useEffect(()=>{
        switch(current){
            case mediaStates.play:
              audioRef.current.play()
              audioRef.current.muted = false
              break;
            case mediaStates.pause:
              audioRef.current.pause()
              audioRef.current.muted = false
              break
            case mediaStates.mute:
                audioRef.current.muted = true
                break
            case mediaStates.unmute:
                audioRef.current.muted = false
                break;
            case mediaStates.power:
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
              break;
            default:
                audioRef.current.muted = false
              

            
          }
          const progressBar = document.querySelector(".progressbar")
          progressBar.style = ""

      
        
         
         

          const timeStart = document.querySelector(".progressbar-timing__start")
          const timeEnd = document.querySelector(".progressbar-timing__end")

         

          audioRef.current.addEventListener("loadeddata",()=>{
            audioRef.current.volume = 0.5
            progressBar.max = audioRef.current.duration
            progressBar.value = audioRef.currentTime   
           let audioDurationInMinutes = Math.trunc(Number.parseInt(audioRef.current.duration) / 60);
            let audioDurationInSeconds = Math.trunc(audioRef.current.duration % 60);

            timeEnd.innerHTML = `${audioDurationInMinutes}:${audioDurationInSeconds}`
          })

          

        

        //   timeEnd.innerHTML = `${audioDurationInMinutes}:${audioDurationInSeconds}`
          
          audioRef.current.addEventListener("timeupdate",()=>{
            const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100

            let audioCurrentTimeInMinutes = Math.trunc(audioRef.current.currentTime / 60);
            let audioCurrentTimeInSeconds = Math.trunc(audioRef.current.currentTime % 60);
  
            progressBar.style.backgroundSize = progress +"%"

            timeStart.innerHTML = `${audioCurrentTimeInMinutes}:${audioCurrentTimeInSeconds}`
          
          

          })


         
    },[current])
  return (
    <figure>
      <audio controls src={track} ref={audioRef}>
      </audio>
    </figure>
  );
}
