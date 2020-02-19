import React, { Fragment, useState, useEffect } from 'react';
import hey from './music/hey.mp3';
import ukulele from './music/ukulele.mp3';
import summer from './music/summer.mp3';
import ukulelePic from './images/ukulele.jpg';
import heyPic from './images/hey.jpg';
import summerPic from './images/summer.jpg';

const Container = props => {
  const songs = [summer, hey, ukulele];
  const pics = [summerPic, heyPic, ukulelePic];
  let songIndex = 0;
  let [audio] = useState(new Audio(songs[songIndex]));
  const [playing, setPlaying] = useState(false);
  const [cover, setCover] = useState(pics[songIndex]);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  const nextSong = () => {
    songIndex++;
    console.log(songIndex);
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    audio.src = songs[songIndex];
    audio.play();
    if (audio.play()) {
      setPlaying(true);
      setCover(pics[songIndex]);
    }
  };

  const prevSong = () => {
    songIndex--;
    console.log(songIndex);
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    audio.src = songs[songIndex];
    audio.play();
    if (audio.play()) {
      setPlaying(true);
      setCover(pics[songIndex]);
    }
  };

  return (
    <Fragment>
      <h1>Music Player</h1>

      <div className='music-container '>
        <div className='music-info'>
          <h4 className='title'>ukulele</h4>
          <div className='progress-container'>
            <div className='progress'></div>
          </div>
        </div>

        <div className='img-container'>
          <img src={cover} alt='music-cover' id='cover' />
        </div>
        <div className='navigation'>
          <button id='prev' className='action-btn' onClick={prevSong}>
            <i className='fas fa-backward'></i>
          </button>

          <button
            id='play'
            className='action-btn action-btn-big'
            onClick={toggle}
          >
            {playing ? (
              <i className='fas fa-pause'></i>
            ) : (
              <i className='fas fa-play'></i>
            )}
          </button>
          <button id='next' className='action-btn' onClick={nextSong}>
            <i className='fas fa-forward'></i>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Container;
