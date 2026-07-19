/* ======================================
   MOBILE MENU
====================================== */

const menuBtn =
document.querySelector(".menu-btn");

const navLinks =
document.querySelector(".nav-links");

if(menuBtn){

menuBtn.addEventListener("click", () => {

navLinks.classList.toggle("show");

});

}

/* ======================================
   MUSIC DATA
====================================== */

const songs = [
{
title:"Kabuku",
artist:"BMC",
producer:"Galaxy Music - Jkabs",
cover:"images/kabuku.jpg",
audio:"music/BMC_Ka_Buku-prod-by-DJ kabs.mp3"
},

{
title:"Ija Nkani | that Story",
artist:"BMC",
producer:"Galaxy Music - Jkabs",
cover:"images/ijankani.jpeg",
audio:"music/ijankani.mp3"
},

{
title:"Ku Wire",
artist:"BMC",
producer:"DMP",
cover:"images/kuwire.jpg",
audio:"music/Ku_wire_By_BMC.mp3"
},

{
title:"Try Me",
artist:"BMC",
producer:"Big Bines",
cover:"images/tryme.jpg",
audio:"music/B.M.C - Try Me.mp3.mp3"
}

];

/* ======================================
   PLAYER ELEMENTS
====================================== */

const cover =
document.getElementById("activeCover");

const title =
document.getElementById("activeTitle");

const artist =
document.getElementById("activeArtist");

const producer =
document.getElementById("activeProducer");

const playBtn =
document.getElementById("mainPlay");

const downloadBtn =
document.getElementById("downloadSong");

const songElements =
document.querySelectorAll(".song");

const featuredPlay =
document.getElementById("playBtn");

const audio =
new Audio();

/* ======================================
   PROGRESS BAR CREATION
====================================== */

const controls =
document.querySelector(".controls");

const progressContainer =
document.createElement("div");

progressContainer.className =
"progress-container";

const progress =
document.createElement("div");

progress.className =
"progress";

progressContainer.appendChild(progress);

controls.insertAdjacentElement(
"beforebegin",
progressContainer
);

const timeDisplay =
document.createElement("div");

timeDisplay.className =
"time-display";

timeDisplay.innerHTML =
"<span id='currentTime'>0:00</span><span id='duration'>0:00</span>";

progressContainer.insertAdjacentElement(
"afterend",
timeDisplay
);

const currentTimeText =
document.getElementById("currentTime");

const durationText =
document.getElementById("duration");

/* ======================================
   CURRENT SONG
====================================== */

let currentSong = 0;

function loadSong(index){

const song =
songs[index];

cover.src =
song.cover;

title.textContent =
song.title;

artist.textContent =
song.artist;

producer.textContent =
`Produced by ${song.producer}`;

audio.src =
song.audio;

downloadBtn.href =
song.audio;

songElements.forEach(item =>
item.classList.remove("active")
);

if(songElements[index]){
songElements[index]
.classList.add("active");
}

}

loadSong(currentSong);

/* ======================================
   PLAY / PAUSE
====================================== */

let isPlaying = false;

function playSong(){

audio.play();

playBtn.innerHTML =
"❚❚ Pause";

isPlaying = true;

}

function pauseSong(){

audio.pause();

playBtn.innerHTML =
"▶ Play";

isPlaying = false;

}

playBtn?.addEventListener("click", () => {

if(isPlaying){

pauseSong();

}else{

playSong();

}

});

/* ======================================
   FEATURED PLAY
====================================== */

featuredPlay?.addEventListener("click", () => {

currentSong = 0;

loadSong(currentSong);

playSong();

});

/* ======================================
   SONG SELECTION
====================================== */

songElements.forEach((song,index)=>{

song.addEventListener("click",()=>{

currentSong = index;

loadSong(currentSong);

playSong();

});

});

/* ======================================
   AUTO NEXT SONG
====================================== */

audio.addEventListener("ended",()=>{

currentSong++;

if(currentSong >= songs.length){

currentSong = 0;

}

loadSong(currentSong);

playSong();

});

/* ======================================
   PROGRESS UPDATE
====================================== */

audio.addEventListener("timeupdate",()=>{

const {duration,currentTime} = audio;

if(duration){

const percent =
(currentTime / duration) * 100;

progress.style.width =
`${percent}%`;

currentTimeText.textContent =
formatTime(currentTime);

durationText.textContent =
formatTime(duration);

}

});

/* ======================================
   SEEK FUNCTION
====================================== */

progressContainer.addEventListener("click",(e)=>{

const width =
progressContainer.clientWidth;

const clickX =
e.offsetX;

const duration =
audio.duration;

audio.currentTime =
(clickX / width) * duration;

});

/* ======================================
   FORMAT TIME
====================================== */

function formatTime(seconds){

const mins =
Math.floor(seconds / 60);

const secs =
Math.floor(seconds % 60);

return `${mins}:${secs < 10 ? "0"+secs : secs}`;

}

/* ======================================
   COUNTER ANIMATION
====================================== */

const counters =
document.querySelectorAll(".stats h3");

const animateCounter = (counter)=>{

const target =
parseInt(counter.textContent);

let count = 0;

const speed = target / 120;

const update = ()=>{

count += speed;

if(count < target){

counter.textContent =
Math.floor(count)+"+";

requestAnimationFrame(update);

}else{

counter.textContent =
target+"+";

}

};

update();

};

const observer =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

animateCounter(
entry.target
);

observer.unobserve(
entry.target
);

}

});

});

counters.forEach(counter=>{

observer.observe(counter);

});

/* ======================================
   SCROLL REVEAL
====================================== */

const reveals =
document.querySelectorAll(
".featured-card,.player-panel,.video-card,.about,.booking"
);

const revealObserver =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(
"visible"
);

}

});

},{
threshold:.15
});

reveals.forEach(item=>{

item.classList.add("hidden");

revealObserver.observe(item);

});

/* ======================================
   CLOSE MOBILE MENU
====================================== */

document
.querySelectorAll(".nav-links a")
.forEach(link=>{

link.addEventListener("click",()=>{

navLinks.classList.remove("show");

});

});

/* ======================================
   SMOOTH ACTIVE PLAYER GLOW
====================================== */

audio.addEventListener("play",()=>{

document
.querySelector(".player-panel")
.classList.add("playing");

});

audio.addEventListener("pause",()=>{

document
.querySelector(".player-panel")
.classList.remove("playing");

});