var audio_click = document.getElementById('click_player');
var text = document.getElementById('title');
var contentText = document.getElementById('content-text'); 

var linkHolder = document.getElementById('link-holder');
var linkBackText = document.getElementById('link-text-back');

var player = document.getElementById('player');

var swapBtn = document.getElementById('swapBtn');

var linkAbout = document.getElementById("linkAbout");
var linkCredits = document.getElementById("linkCredits");
var linkProjects = document.getElementById("linkProjects");
var linkBack = document.getElementById("linkBack");

var playAudio = document.getElementById("playAudio");

var contentShift = false;
var q = 'AcheronVideo';

var KafkaVideo = "./media/KafkaTrailer_Trim.mp4";
var SparkleVideo = "./media/SparkleTrailer_Trim.mp4";
var AcheronVideo = "./media/AcheronTrailer_Trim.mp4";
var yukopiVideo = "";

window.onload = function () {
    player.src = AcheronVideo;
    /*
    if (screen.width > 768) {
        player.src = AcheronVideo;
    }
    else {
        player.src = yukopiVideo;
    }
    */
}

swapBtn.onclick = function () {
    if (window.navigator.userAgent.indexOf("Android") == -1) {
        if (q == 'KafkaVideo') {
            player.src = SparkleVideo;
            q = 'SparkleVideo';
        }
        else if (q == 'AcheronVideo') {
            player.src = KafkaVideo;
            q = 'KafkaVideo';
        }
        else {
            player.src = AcheronVideo;
            q = 'AcheronVideo';
        }
    }
}

playAudio.onclick = function () {
    var status = document.getElementById('status');

    if (player.muted == true) {
        player.muted = false;
        status.innerText = 'music_note'
    }
    else {
        player.muted = true;
        status.innerText = 'music_off'
    }
}

window.onclick = function() {
    audio_click.play();
}

linkProjects.onclick = function () {
    contentShift = true;
    audio_click.play();
    linkHolder.hidden = true;
    linkBackText.hidden = false;
    
    text.innerHTML = "Projects";
    contentText.innerHTML = `
    <div class = "proj-link">
    - <b>Dashboard (frontend):</b> <a href="https://thebread.pages.dev/projects/dashboard">thebread.pages.dev/projects/dashboard</a>. <br />
    - <b>Audio Visualizer (3.js):</b> <a href="https://thebread.pages.dev/projects/visualizer">thebread.pages.dev/projects/visualizer</a>. <br />
    - <b>Photography Portfolio (frontend):</b> <a href="https://thebread.pages.dev/projects/photography">thebread.pages.dev/projects/photography</a>. <br />
    - <b>Portfolio (frontend):</b> <a href="https://thebread.pages.dev/projects/portfolio-v1">thebread.pages.dev/projects/portfolio-v1</a>. <br />
    - <b>Game-server using Nakama:</b> <a href="https://github.com/me-is-bread/Nakama-Server-Using-Docker">github.com/me-is-bread/Nakama-Server-Using-Docker</a>.
    </div>`
}

linkAbout.onclick = function () {
    contentShift = true;
    audio_click.play();
    text.innerHTML = "About Me";
    linkHolder.hidden = true;
    linkBackText.hidden = false;
}

linkCredits.onclick = function () {
    swapBtn.style.display = "none";
    if (screen.width > 768) {
        contentShift = true;
        audio_click.play();
        linkHolder.hidden = true;
        linkBackText.hidden = false;

        if (q == 'KafkaVideo') {
            text.innerHTML = "Credits";
            contentText.innerHTML = `
            Kafka Trailer —  A Dramatic Irony  Honkai Star Rail. 
            <br/ > 
            Video and song by Honkai Star Rail.`;
        }

        else if (q == 'AcheronVideo') {
            text.innerHTML = "Credits";
            contentText.innerHTML = `
            Acheron Trailer —  Your Color  Honkai Star Rail. 
            <br/ > 
            Video and song by Honkai Star Rail.`;
        }

        else {
            text.innerHTML = "Credits";
            contentText.innerHTML = `
            Sparkle Trailer — "Monodrama" | Honkai: Star Rail.
            <br/ > 
            Video and song by Honkai Star Rail.`;
        }
    }
    else {
        contentShift = true;
        audio_click.play();
        text.innerHTML = "Credits";
        contentText.innerHTML = `
        Yukopi - 寝起きヤシの木 (feat.歌愛ユキ) 
        <br/ >
        Video and song by Yukopi.`;
        linkHolder.hidden = true;
        linkBackText.hidden = false;
    }
}

linkBackText.onclick = function () {
    swapBtn.style.display = "block";
    if (contentShift == true) {
        contentShift = false;
        audio_click.play();
        text.innerHTML = "Portfolio";
        contentText.innerHTML = `
        Hi, my name is, 
        <br /> <h1> Sahil Raut. <br /> 
        I build things for Web. </h1> <br /> 
        I'm a web developer specialized in UI/UX designs. <br /> 
        (with designing software as Figma or Adobe XD and also with HTML, CSS, JS) 
        <br /> I like to produce unique designs in every project.`;
        linkHolder.hidden = false;
        linkBackText.hidden = true;
    }

    else {
        return
    }
}
