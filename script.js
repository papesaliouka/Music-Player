const image = document.querySelector('img');
const title = document.getElementById('title');
const artiste = document.getElementById('artiste');
const music = document.querySelector('audio');
const durationMinutes = document.querySelector('.duration');
let timepass= document.getElementById('current-time')
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progressContainer= document.getElementById('progress-container');
const progress = document.getElementById('progress');

// Music

const songs= [
    {
        name:'jacinto-1',
        displayName: 'Electrical Chill Machine',
        artist: 'Pape'
    },
    {
        name:'jacinto-2',
        displayName: 'Woop',
        artist: 'Pape'
    },
    {
        name:'jacinto-3',
        displayName: 'Hello',
        artist: 'Pape'
    },
    {
        name:'metric-1',
        displayName: 'Invincible',
        artist: 'Pape'
    }
] 

// Check if playing
let isPlaying = false;
// Play
function playSong(){
    isPlaying=true;
    music.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause')
}

// Pause
function pauseSong(){
    isPlaying=false;
    music.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play')
}

function updateProgressBar(e){
    if (isPlaying){
        const { duration, currentTime } = e.srcElement
        // update progress bar width
        const progressPercent =( currentTime /duration)* 100;
        progress.style.width= `${progressPercent}%`;
        // calculate display for duration
        const minutes = Math.floor(duration/60);
        let second = Math.floor(duration%60)
        if (second<10){
           second= `0${second}` 
        }
        // Delay switching duration Element to avoid NaN
        if (second){
            durationMinutes.textContent= `${minutes}:${second}`;
        }
        // calculate display for duration
        const currentMinutes = Math.floor(currentTime/60);
        let currentSecond = Math.floor(currentTime%60);
        if (currentSecond<10){
            currentSecond= `0${currentSecond}` 
        }
        timepass.textContent = `${currentMinutes}:${currentSecond}`
    }
}

// Update Dom

function loadSong(song){
    title.textContent=song.displayName;
    artist.textContent= song.artist;
    music.src=`music/${song.name}.mp3`;
    image.src= `img/${song.name}.jpg`;
}

// Current Song 
let songIndex = 0;

function nextSong(){
    songIndex++;
    if (songIndex> songs.length-1){
        songIndex= 0
    }
    loadSong(songs[songIndex])
    playSong();
}

function prevSong(){
    songIndex--;
    if (songIndex<0){
        songIndex= songs.length-1
    }
    loadSong(songs[songIndex])
    playSong();
}

function setProgressBar(e){
    const clickX= e.offsetX;
    const width = e.srcElement.clientWidth
    const {duration}=music
    music.currentTime=(clickX/width)*duration;
}

// on Load -Select First Song

loadSong(songs[songIndex]);

// Even Listeners
playBtn.addEventListener('click', ()=> isPlaying ? pauseSong(): playSong());
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);