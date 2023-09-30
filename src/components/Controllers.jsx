import { useContext, useRef, useState } from 'react';
import { mediaPlayerContext } from '../App';
import mediaStates from '../mediaStatesValues';
import volumeKnob from '../volumeKnob.js';
import { trackList } from '../data.js';

export default function Controllers({ setTrackIndex, setTracks, currentTrack }) {
  const { current, navigate } = useContext(mediaPlayerContext);
  const calculateVolume = volumeKnob();
  const speakerRef = useRef(null);

  let volume = 0
  const playRef = useRef(null);

  if (
    current === mediaStates.next ||
    current == mediaStates.prev ||
    current == mediaStates.idle ||
    current === mediaStates.power
  ) {
    playRef.current = null;
  }

  function handleMenu() {
    const banner = document.querySelector('.banner');
    const tracks = document.querySelector('.tracks');

    if (banner.dataset.show !== 'show-menu') {
      banner.dataset.show = 'show-menu';
      tracks.dataset.show = 'show-menu';
      return;
    }

    banner.dataset.show = '';
    tracks.dataset.show = '';
  }

  function handlePlay(evt) {
    if (playRef.current) {
      playRef.current = null;
      navigate(mediaStates.pause);
    } else {
      playRef.current = true;
      navigate(mediaStates.play);
    }
  }

  function handleSpeaker(evt) {
    if (current === mediaStates.mute) {
      navigate(mediaStates.unmute);
      delete evt.currentTarget.dataset.muted;

      return;
    }

    evt.currentTarget.dataset.muted = 'muted';
    navigate(mediaStates.mute);
  }

  function handleNext() {
    setTrackIndex((currentIndex) => {
      if (currentIndex < trackList.length - 1) {
        navigate(mediaStates.next);
        return currentIndex + 1;
      }

      return currentIndex;
    });
  }

  function handlePrevious() {
    setTrackIndex((currentIndex) => {
      if (currentIndex > 0) {
        navigate(mediaStates.prev);
        return currentIndex - 1;
      }

      return currentIndex;
    });
  }

  function handleProgressBar(evt) {
    const audioEl = document.querySelector('audio');

    audioEl.play();
    audioEl.currentTime = evt.target.value;

    evt.target.style.setProperty('--progress-amount', audioEl.currentTime);
  }

  function handlePower(evt) {
    let elements = document.querySelectorAll("[data-power|='power']");
    const tracks = document.querySelector('.tracks');
    const banner = document.querySelector('.banner');
    delete speakerRef.current.dataset.muted;
    delete tracks.dataset.show;
    delete banner.dataset.show;

    const power = evt.target.dataset.power;

    if (power === 'power-ON') {
      navigate(mediaStates.power);
      
      elements.forEach((element) => (element.dataset.power = 'power-OFF'));
      evt.target.dataset.power = '';
    } else {
      elements.forEach((element) => (element.dataset.power = 'power-ON'));
      evt.target.dataset.power = 'power-ON';
      document.querySelector("audio").volume = 0.5
    }
  }

  function handleLikes() {
    // lookup the track index
    let index = trackList.findIndex((track) => {
      return track.title.toLowerCase().includes(currentTrack.title.toLowerCase());
    });

    // update track if found
    if (index >= 0) {
      const track = trackList[index];
      track.liked = !track.liked;
      navigate(mediaStates.liked);
    }
  }

  function changeVolume(evt) {
    volume = calculateVolume(evt) / 100;
   

    if (volume == 0) {
      speakerRef.current.dataset.muted = 'muted';
    } else {
      speakerRef.current.dataset.muted =""

    }
    document.querySelector('audio').volume = volume;
  }

  return (
    <div>
      <div className='progressbar-wrapper' data-power='power-OFF'>
        <input
          className='progressbar'
          min={0}
          onChange={(evt) => handleProgressBar(evt)}
          type='range'
          name=''
          id='range'
        />
        <p className='progressbar-timing'>
          <span className='progressbar-timing__start'>0:0</span>
          <span className='progressbar-timing__end'>0:0</span>
        </p>
      </div>

      <div className='controllers'>
        <button className='menu' data-power='power-OFF' onClick={handleMenu}>
          <i className='fa-solid fa-list-ul'></i>
        </button>
        <button
          className={currentTrack.liked ? 'like liked' : 'like'}
          data-power='power-OFF'
          onClick={handleLikes}
        >
          <i className='fa-solid fa-heart'></i>
        </button>
        <button className='prev' data-power='power-OFF' onClick={handlePrevious}>
          <i className='fa-solid fa-backward'></i>
        </button>
        <button className='next' data-power='power-OFF' onClick={handleNext}>
          <i className='fa-solid fa-forward'></i>
        </button>

        {playRef.current ? (
          <button className='play' data-power='power-OFF' onClick={handlePlay}>
            <i className='fa-solid fa-pause'></i>
          </button>
        ) : (
          <button className='play' data-power='power-OFF' onClick={handlePlay}>
            <i className='fa-solid fa-play'></i>
          </button>
        )}

        <button
          className='speaker'
          data-power='power-OFF'
          ref={speakerRef}
          onClick={(evt) => handleSpeaker(evt)}
        >
          <i className='fa-solid fa-volume-low'></i>
        </button>
      </div>

      <button
        data-power='power-OFF'
        className='volumeBtn'
        onTouchMove={(evt) => {
          changeVolume(evt);
        }}
        onMouseMove={(evt) => {
          changeVolume(evt);
        }}
      ></button>

      <button className='power power-button' onClick={(evt) => handlePower(evt)}>
        ON
      </button>
    </div>
  );
}
