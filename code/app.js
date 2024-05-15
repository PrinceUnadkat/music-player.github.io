let progess = document.getElementById("progess");
let song = document.getElementById("songs");
let ctrlIcon = document.getElementById("ctrlIcon");

let currentMusic = 0;

//fbtimes to count the song (how many times song was changed)
let fbTimes = 0;

//variable to get the song detail from 'data.js'
const music = document.querySelector('#songs');

//make the variable to use the html content
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name');
const currentTime = document.querySelector('.current-time');
const musicduration = document.querySelector('.song-duration');
const forwardBtn = document.querySelector('.forward-btn');
const playbtn = document.querySelector('.btn');
const backwardBtn = document.querySelector('.backward-btn');

//disk variable is use to change the cover (song image)
const disk = document.querySelector('.disk');

//this function is use to get and store the total and current time of the song
song.onloadedmetadata = function(){
    progess.max=song.duration;
    progess.value=song.currentTime;
}

//in this function when the 'playbtn' is clicked the button icon change and the song was play and pause
playbtn.addEventListener('click',()=>{
    if(ctrlIcon.classList.contains("fa-pause")){      //for pause the song
            song.pause();
            ctrlIcon.classList.remove("fa-pause");
            ctrlIcon.classList.add("fa-play");
        }
        else{                                          //for play the song
            song.play();
            ctrlIcon.classList.add("fa-pause");
            ctrlIcon.classList.remove("fa-play");
        }
})

//setup the music
const setMusic = (i)=>{
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src=song.path;

    //display the contents
    songName.innerHTML=song.name;
    artistName.innerHTML=song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    
    //add some delay to find the duration
    setTimeout(() =>{
        seekBar.max=music.duration;
        musicduration.innerHTML=formateTime(music.duration);
    },400);
}

//call this fuction with default value is 0 (to play the first song from ths 'data.js')
setMusic(0);

// formate the time for duration of the song
//because time is in another formate
const formateTime =(time) =>{
    //roundof the min and sec
    let min = Math.floor(time/60);
    if(min<10){
        min = `0${min}`;
    }
    let sec = Math.floor(time%60);
    if(sec<10){
        sec= `0${sec}`;
    }
    //return with min:sec fromat
    return `${min} : ${sec}`;
}

//for seekbar
setInterval(() => {
    seekBar.value=music.currentTime;
    currentTime.innerHTML = formateTime(music.currentTime);

}, 500);

//use it to change the duration of the song using seekbar
seekBar.addEventListener('change',()=>{
    music.currentTime = seekBar.value;
});

//this function is use to change the song with condion while click on the button
forwardBtn.addEventListener('click', () => {
    if (fbTimes > 2) {          //when the button is clicked more than 3 times than show the popup for payment
        const confirmation = confirm("Please pay to play the next song.");
        if (confirmation) {
            currentMusic = 3;
            fbTimes=0;
        } else {
            currentMusic = 0;
        }
    } else if (fbTimes >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
        fbTimes++;
    }

    //call the function
    setMusic(currentMusic);
    
    //This condiotion is to confirm that the play and pause icone the working (for ui bug)
    if (song.paused) {      // If the music is paused, play it and change the icon to pause
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    } else {                 // If the music is playing, pause it and change the icon to play
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
});

// Event listener for the audio element ended event
song.addEventListener('ended', () => {
    if (currentMusic < songs.length - 1) { //when the current song is over then play next until the condition is true
        currentMusic++;
        fbTimes++;
        if (fbTimes > 2) {//when the song is change more than 3 times than show the popup for payment
            const confirmation = confirm("Please pay to play the next song.");
            if (confirmation) {
                currentMusic = 3;
                fbTimes=0;
            } else {
                currentMusic = 0;
            }
        }

        //call the function
        setMusic(currentMusic);
        song.play();

        //change the play/pause icone
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }
});

//this function is use to change the song with condion while click on the button
backwardBtn.addEventListener('click', () => {
    if (fbTimes > 2) {              //when the button is clicked more than 3 times than show the popup for payment
        const confirmation = confirm("Please pay to play the previous song.");
        if (confirmation) {
            currentMusic = songs.length - 4;         
            fbTimes=0;
        } else {
            currentMusic = 0;                      
        }
    } else if (currentMusic === 0) {
        currentMusic = songs.length - 1;           
    } else {
        currentMusic--;                             
        fbTimes++;
    }

    //call the function
    setMusic(currentMusic);
    
    //This condiotion is to confirm that the play and pause icone the working (for ui bug)
    if (song.paused) {               // If the music is paused, play it and change the icon to pause
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    } else {                         // If the music is playing, pause it and change the icon to play
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
});
