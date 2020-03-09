import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';

import nickdrake from './music/nick-drake-riverman.mp3';
import ryanashley from './music/toni-braxton-he-wasnt-man-enough-by-ryan-ashley-cover.mp3';
import holyoysters from './music/holy-oysters-take-me-for-a-ride-official.mp3';
import nickdrakepic from './images/nickdrakepic.jpg';
import heyPic from './images/ryanashleypic.png';
import holyoysterspic from './images/holyoysterspic.jpg';

const Container = props => {
  const songs = [holyoysters, ryanashley, nickdrake];
  const titles = [
    'Take me for a ride - Holy Oysters',
    'HWME - Ryan Ashley',
    'Riverman - Nick Drake'
  ];
  const pics = [holyoysterspic, heyPic, nickdrakepic];
  const targetRef = useRef();

  const [songIndex, setSongIndex] = useState(0);
  let [audio] = useState(new Audio(songs[songIndex]));
  const [playing, setPlaying] = useState(false);
  const [cover, setCover] = useState(pics[songIndex]);
  const [title, setTitle] = useState(titles[songIndex]);
  const [dimensions, setDimensions] = useState({ width: 0 });

  const [progressWidth, setProgressWidth] = useState(0);

  //toggle play pause
  const toggle = () => setPlaying(!playing);

  //update progress bar
  const updateProgress = useCallback(() => {
    const { duration, currentTime } = audio;
    //calculate the played percentage of the song.
    const progressPercent = (currentTime / duration) * 100;
    setProgressWidth(`${progressPercent}`);
  }, []);

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth
        // height: targetRef.current.offsetHeight
      });
    }
  }, []);

  const setProgress = e => {
    const width = dimensions.width;

    const clickX = e.nativeEvent.offsetX;
    console.log(width);
    console.log(clickX);
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    audio.addEventListener('timeupdate', () => updateProgress());
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio, updateProgress]);

  //////play next song
  if (songIndex > songs.length - 1) {
    setSongIndex(0);
  }

  const nextSong = () => {
    setSongIndex(prevsongIndex => prevsongIndex + 1);
    console.log(songIndex);
    audio.src = songs[songIndex];
    audio.play();
    if (audio.play()) {
      setPlaying(true);
      setCover(pics[songIndex]);
      setTitle(titles[songIndex]);
    }
  };

  //////play previous song

  if (songIndex < 0) {
    setSongIndex(songs.length - 1);
  }
  const prevSong = e => {
    setSongIndex(prevsongIndex => prevsongIndex - 1);

    console.log(songIndex);
    audio.src = songs[songIndex];

    audio.play();
    if (audio.play()) {
      setPlaying(true);
      setCover(pics[songIndex]);
      setTitle(titles[songIndex]);
    }
  };

  return (
    <Fragment>
      <h1 style={{ textAlign: 'center' }}>Music Player</h1>

      <div className={playing ? 'music-container play' : 'music-container'}>
        <div className='music-info'>
          <h4 className='title'>{title}</h4>
          <div
            className='progress-container'
            ref={targetRef}
            onClick={setProgress}
          >
            <div
              className='progress'
              style={{ width: `${progressWidth}%` }}
              ref={targetRef}
            ></div>
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
