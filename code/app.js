let progress = document.getElementById("progess");
let song = document.getElementById("songs");
let ctrlIcon = document.getElementById("ctrlIcon");

//for payment and music data
let currentMusic = 0;
let fbTimes = 0;
let payment=false;

//importing or connecting the html ids and class to using it in the code
const music = document.querySelector('#songs');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name');
const currentTime = document.querySelector('.current-time');
const musicduration = document.querySelector('.song-duration');
const forwardBtn = document.querySelector('.forward-btn');
const playbtn = document.querySelector('.btn');
const backwardBtn = document.querySelector('.backward-btn');
const disk = document.querySelector('.disk');
const paymentModal = document.getElementById("paymentModal");
const closeBtn = document.getElementById("closeBtn");
const confirmPaymentBtn = document.getElementById("confirmPaymentBtn");

//for current music and duration
song.onloadedmetadata = function(){
    seekBar.max = song.duration;
    progress.value = song.currentTime;
}

//for play and pause
playbtn.addEventListener('click', () => {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    } else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
})

//set the song data
const setMusic = (i) => {
    seekBar.value = 0;
    let songData = songs[i];
    currentMusic = i;
    music.src = songData.path;
    songName.innerHTML = songData.name;
    artistName.innerHTML = songData.artist;
    disk.style.backgroundImage = `url('${songData.cover}')`;
    
    currentTime.innerHTML = '00:00';
    //just like delay for song
    setTimeout(() => {
        seekBar.max = music.duration;
        musicduration.innerHTML = formatTime(music.duration);
    }, 300)
}

//for min:sec fromate of the current time and duration
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}

//delay to find the duration and current time properly
setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
}, 800)

//updating the pointer position of seekbar
seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

//to play the song and change the icon
const playMusic = () => {
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
}

//to pause the song and change the icon
const pauseMusic = () => {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
}

//for forward button
forwardBtn.addEventListener('click', () => {
    if (fbTimes >= 2 && !payment) {
        pauseMusicForPayment();
        confirmPaymentBtn();
    } else {
        currentMusic++;
        if (currentMusic >= songs.length) {
            currentMusic = 0;
        }
        fbTimes++;
        setMusic(currentMusic);
        playMusic();
    }
})

//for backward button
backwardBtn.addEventListener('click', () => {
    if (fbTimes >= 2 && !payment) {
        pauseMusicForPayment();
        confirmPaymentBtn();
    } else {
        currentMusic--;
        if (currentMusic < 0) {
            currentMusic = songs.length - 1;
        }
        fbTimes++;
        setMusic(currentMusic);
        playMusic();
    }
})

//when the song is end next song is play
song.addEventListener('ended', () => {
    if (fbTimes >= 2 && !payment) {
        pauseMusicForPayment();
        confirmPaymentBtn();
    } else {
        currentMusic++;
        if (currentMusic >= songs.length) {
            currentMusic = 0;
        }
        fbTimes++;
        setMusic(currentMusic);
        playMusic();
    }
})

//pause the song untile payment was done
const pauseMusicForPayment = () => {
    pauseMusic();
    paymentModal.style.display = "block";
}

//hide th payment popup
closeBtn.onclick = () => {
    paymentModal.style.display = "none";
}

//if the payment was done reset the variable and popup doesn't appear again
confirmPaymentBtn.onclick = () => {
    paymentModal.style.display = "none";
    fbTimes = 0;
    payment=true;
    playMusic();
}

//when user click outside the popup window the window was hide or close
window.onclick = (event) => {
    if (event.target == paymentModal) {
        paymentModal.style.display = "none";
    }
}
// initialize the first song
setMusic(0);
