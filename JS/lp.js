// HERO SLIDER
//========================================
// ELEMENTS
//========================================

const musicGrid = document.querySelector(".music-grid");

const songContainer = document.getElementById("songContainer");

const thisSong = document.getElementById("thisSong");

const similar = document.getElementById("similar");


//========================================
// STATE
//========================================

let currentSongIndex = 0;

// SLIDES
const slides =
document.querySelectorAll(".slide");


let current = 0;


setInterval(()=>{


slides[current]
.classList.remove("active");


current++;


if(current >= slides.length){

current = 0;

}


slides[current]
.classList.add("active");


},4000);





// MOBILE SIDEBAR

const menuBtn =
document.getElementById("menuBtn");


const sidebar =
document.querySelector(".sidebar");



menuBtn.onclick=function(){

sidebar.classList.toggle("show");

};


//=========================================
// RENDER MUSIC CARDS
//=========================================

function renderMusicCards() {
    
    musicGrid.innerHTML = "";

    songs.forEach((song, index) => {

        musicGrid.innerHTML += `

        <article
            class="music-card"
            data-index="${index}">

            <img
                src="${song.artWork}"
                alt="${song.songTitle}"
                loading="lazy" class="photo">

            <h3>${song.songTitle}</h3>

            <p>${song.artist}</p>

            <div
                class="button-container"
                style="border-top:solid #f0efef;">
                <div class="downloads" style="border-top:solid #f0efef;">

                    <span>Downloads</span>

                    <h3>

                        ${formatDownloads(song.downloads)}

                    </h3>

                </div>

            </div>

        </article>

        `;

    });

}

function formatDownloads(number){

    if(number >= 1000000){

        return (number/1000000).toFixed(1)+"M";

    }

    if(number >= 1000){

        return (number/1000).toFixed(1)+"K";

    }

    return number;

}


// CARD EVENTS//

musicGrid.addEventListener("click", function(e){

    const card = e.target.closest(".music-card");

    if(!card) return;

    const index = Number(card.dataset.index);

    loadSong(index);

});

// CARD GROWTH WHEN CLICKED//

function highlightCard(index){

    document
        .querySelectorAll(".music-card")
        .forEach(card=>{

            card.classList.remove("active");

        });

    const active=document.querySelector(

        `.music-card[data-index="${index}"]`

    );

    if(active){

        active.classList.add("active");

    }

}


//=========================================
// LOAD SONG
//=========================================

function loadSong(index){

    currentSongIndex = index;

    highlightCard(index);

    const song = songs[index];

    thisSong.innerHTML = `

        <div class="article-section">

            <h1><span>DOWNLOAD</span> ${song.songTitle} By ${song.artist}</h1>

            <p>${song.description}</p>

        </div>


        <div class="artwork">

            <img
                src="${song.artWork}"
                alt="${song.songTitle}"
                loading="lazy" width="700">

        </div>


        <div class="mp3section">

            <h2>${song.songTitle}</h2>

            <p>${song.artist}</p>

            ${song.featuring ?
            `<p>Featuring : ${song.featuring}</p>`
            : ""}

            <p>

                <strong>Released :</strong>

                ${song.releaseDate}

            </p>

            <audio
                id="audioPlayer"
                controls>

                <source
                    src="${song.audio}"
                    type="audio/mpeg" loop="true">

            </audio>

        </div>


        <div class="download-section">

            <button
                id="downloadBtn">

                DOWNLOAD

            </button>

        </div>

    `;

    document.title =
        `${song.songTitle} - ${song.artist} | Galaxy Music`;

    setupDownloadButton(song);

    //renderSimilarSongs(index);


    songContainer.scrollIntoView({

    behavior:"smooth",

    block:"start"

});
song.audio.loop=true;
song.audio.play();
}

function setupDownloadButton(song){

    const btn =
        document.getElementById("downloadBtn");

    btn.onclick = function(){

        const link =
            document.createElement("a");

        link.href = song.audio;

        link.download = "";

        link.click();

    };

}

function reload(){
    renderMusicCards();

loadSong(0);

//renderSimilarSongs(0);

//searchSongs();

//renderArtists();
}

reload();