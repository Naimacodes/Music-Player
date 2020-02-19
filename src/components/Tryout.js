const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//song titles
const songs = ['hey', 'summer', 'ukulele'];

//keep track of song
let songIndex = 2;

//update song details
const loadSong = song => {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
};

//load song details into DOM
loadSong(songs[songIndex]);

// //play the song
// const playSong = () => {
//   musicContainer.classList.add('play');
//   playBtn.querySelector('i.fas').classList.remove('fa-play');
//   playBtn.querySelector('i.fas').classList.add('fa-pause');
//   audio.play();
// };

//pause song

// const pauseSong = () => {
//   musicContainer.classList.remove('play');
//   playBtn.querySelector('i.fas').classList.remove('fa-pause');
//   playBtn.querySelector('i.fas').classList.add('fa-play');
//   audio.pause();
// };

//previous song
const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

//next song
const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

// update progress bar
const updateProgress = e => {
  const { duration, currentTime } = e.srcElement;
  //calculate the played percentage of the song.
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`
};

//set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  console.log(width);

  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}


//play song pause song event listeners

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//change the song event listeners

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// time song update
audio.addEventListener('timeupdate', updateProgress);

// click on progress bar
progressContainer.addEventListener('click', setProgress)

//go to the next song when the song ends
audio.addEventListener('ended', nextSong)