import React, {
  Fragment,
  useState,
  useRef,
  useLayoutEffect,
  useEffect
} from 'react';
import hey from './music/hey.mp3';
import ukulele from './music/ukulele.mp3';
import summer from './music/summer.mp3';
import ukulelePic from './images/ukulele.jpg';
import heyPic from './images/hey.jpg';
import summerPic from './images/summer.jpg';

const Container = props => {
  const songs = [summer, hey, ukulele];
  const titles = ['summer', 'hey', 'ukulele'];
  const pics = [summerPic, heyPic, ukulelePic];
  const targetRef = useRef();

  let songIndex = 0;
  const [dimensions, setDimensions] = useState({ width: 0 });
  let [audio] = useState(new Audio(songs[songIndex]));
  const [playing, setPlaying] = useState(false);
  const [cover, setCover] = useState(pics[songIndex]);
  const [title, setTitle] = useState(titles[songIndex]);
  const [progress, setProgress] = useState(false)
  

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


  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  }, []);

  useEffect(() => {
    audio.addEventListener('timeupdate', () => {let width = dimensions.width;
      console.log(width)
    const { duration, currentTime } = audio.src;
    //calculate the played percentage of the song.
    const progressPercent = (currentTime / duration) * 100;

    width = `${progressPercent}%`;
    setProgress(true)});
  });


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
      setTitle(titles[songIndex]);
    }
  };

  const prevSong = e => {
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
            <div
              className='progress'
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
