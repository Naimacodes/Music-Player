import React, {
  Fragment,
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
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
  const { duration, currentTime } = audio;
  //calculate the played percentage of the song.
  const progressPercent = (currentTime / duration) * 100;

  // let songIndex = 2;
  const [songIndex, setSongIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0 });
  let [audio] = useState(new Audio(songs[songIndex]));
  const [playing, setPlaying] = useState(false);
  const [cover, setCover] = useState(pics[songIndex]);
  const [title, setTitle] = useState(titles[songIndex]);
  const [progress, setProgress] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0)

  const toggle = () => setPlaying(!playing);
  const updateProgress = (useCallback(
    () => {
      const { duration, currentTime } = audio;
      //calculate the played percentage of the song.
      const progressPercent = (currentTime / duration) * 100;
      setProgressWidth = `${progressPercent}%`
    },
    [],
  )) 



  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    audio.addEventListener('timeupdate', () => updateProgress())
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio, updateProgress]);

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  }, []);

  // useEffect(() => {
  //   audio.addEventListener('timeupdate', () => {let width = dimensions.width;

  //   const { duration, currentTime } = audio.src;
  //   //calculate the played percentage of the song.
  //   const progressPercent = (currentTime / duration) * 100;

  //   width = `${progressPercent}%`;
  //   setProgress(true)});
  // });

//   <audio id="aud" controls
// preload="metadata" onloadedmetadata="mDur()" ontimeupdate="mPlay()">
// 	<source src="http://calvarybucyrus.org/sermons/2016/2016-05-01-PM-Ken_Lance-Look_on_the_Fields.mp3" type="audio/mpeg">
// </audio><br><br>
// <input id="dur" type="range" name="rng" min="0" step="0.25" value="0" onchange="mSet()" style="width: 248px">
// <script>
// var aud= document.getElementById('aud')
// var dur= document.getElementById('dur')
// const mDur = () =>{dur.max= aud.duration}
// const mPlay = () => {dur.value=audio.currentTime}
// const mSet = () => {aud.currentTime=dur.value}

// update progress bar


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
          <div className='progress-container'>
            {/* onClick={setProgress} */}
            <div className='progress' ref={targetRef}></div>
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
