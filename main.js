// media controllers
const playPause = document.querySelector("#play-stop");
const backward = document.querySelector("#backward");
const forward = document.querySelector("#forward");

// record player animation
const circleBig = document.querySelector("#circle-bg");
const circleSm = document.querySelector("#circle-sm");

// playing song
const songName = document.querySelector("#song-name");
const audio = document.querySelector("#audio");
const coverArt = document.querySelector("#cover");
const musicbox = document.querySelector("#musicbox");

// control button images
let playImg = "./assets/images/play.png";
let pauseImg = "./assets/images/pause.png";

// default controls
playPause.src = playImg;
let isPlaying = true;

const songList = [
    {
        name: "Golom Golom_Erfan Tahmasbi",
        source: "./assets/music/Golom_Golom.mp3",
        cover: "./assets/images/Golom_Golom.jpg"
    },
    {
        name: "Mahboube Ziba_Taher Ghoreyshi",
        source: "./assets/music/Mahboube_Ziba.mp3",
        cover: "./assets/images/Mahboube_Ziba.jpg"
    },
    {
        name: "Matarsak_Erfan Tahmasbi",
        source: "./assets/music/Matarsak.mp3",
        cover: "./assets/images/Matarsak.jpg"
    },
    {
        name: "Mongeha_Heydoo Hedayati",
        source: "./assets/music/Mongeha.mp3",
        cover: "./assets/images/Mongeha.jpg"
    },
    {
        name: "Tardid_Erfan tahmasbi",
        source: "./assets/music/Tardid.mp3",
        cover: "./assets/images/Tardid.jpg"
    }
];
// helper function
function createEle(ele) {
    return document.createElement(ele);
}
function append(parent, child) {
    return parent.append(child);
}


let songIndex = 0;
// preloaded song
loadMusic(songList[songIndex]);

function loadMusic() {
    coverArt.src = songList[songIndex].cover;
    songName.innerText = songList[songIndex].name;
    audio.src = songList[songIndex].source;
}

function playSong() {
    playPause.src = pauseImg;
    circleBig.classList.add("animate");
    circleSm.classList.add("animate");

    audio.play();
}

function pauseSong() {
    playPause.src = playImg;
    circleBig.classList.remove("animate");
    circleSm.classList.remove("animate");

    audio.pause();
}

function nextPlay() {
    songIndex++;
    if(songIndex > songList.length - 1) {
        songIndex = 0;
    }
    loadMusic(songList[songIndex]);
    playSong()
}

function backPlay() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songList.length - 1;
    }
    loadMusic(songList[songIndex]);
    playSong()
}
function playHandler() {
    isPlaying = !isPlaying;
    //console.log("Change: ",isPlaying)
    isPlaying ? pauseSong() : playSong();
}

// creating track list
const ul = createEle('ul')
function createPlayList() {
    songList.forEach((song) => {
        let a = createEle('a');
        let li = createEle('li');

        li.classList.add("track-item");
        a.innerText = song.name;
        append(li,a);
        append(ul,li)
    })
    append(musicbox, ul);

    const track_items = document.querySelectorAll(".track-item");
    track_items.forEach(track => {
        track.addEventListener('click', () => {
            songList.forEach((song, i) => {
                if(track.innerText == song.name) {
                    songIndex = i
                    loadMusic(songList[songIndex])
                    playSong()
                }
            })
        })
    })
}

// player event 
playPause.addEventListener("click", playHandler);
backward.addEventListener("click", backPlay);
forward.addEventListener("click", nextPlay);

createPlayList()