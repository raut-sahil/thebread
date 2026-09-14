let scrollProgress = 0;
let targetProgress = 0;
let current_section = "home";
let rafId = null;

const SECTION_COUNT = 2;
const SCROLL_SENSITIVITY = 0.0022;
const EASE = 0.12; 

var audio_click = document.getElementById('click_player');
var text = document.getElementById('title');
var contentText = document.getElementById('content-text'); 

var linkHolder = document.getElementById('link-holder');

var player = document.getElementById('player');

var swapBtn = document.getElementById('swapBtn');

var linkHome = document.getElementById("linkHome");
var linkCredits = document.getElementById("linkCredits");
var linkProjects = document.getElementById("linkProjects");

var navBubble = document.getElementById("navBubble");

var playAudio = document.getElementById("playAudio");

var contentShift = false;
var q = 'GigaVideo';

var KafkaVideo   = "https://brown-major-ocelot-902.mypinata.cloud/ipfs/bafybeifalfho7ha6bumcy6dqhkhjyqbry7fn2og44owbfopipumokubqqq";
var SparkleVideo = "https://brown-major-ocelot-902.mypinata.cloud/ipfs/bafybeif2o67qkx4lhaxra6eckzj4rnszlkygdbadyf5cjuvdm67nb5vrvi";
var AcheronVideo = "https://brown-major-ocelot-902.mypinata.cloud/ipfs/bafybeigd324w2cm5gn6kh6zeydr7pxk26koykwmcuje2wzaxzc3msko2eu";
var BurniceVideo = "https://brown-major-ocelot-902.mypinata.cloud/ipfs/bafybeie3bl2hkq6tyx6uhpm5y42qnd24r5qy6efeuwcmfamxyg2zqf2ope";
var SparxieVideo = "https://brown-major-ocelot-902.mypinata.cloud/ipfs/bafybeifpebicafbghteuuvj7jeq5ktnpk4cverogezvugt27h3bvuhjgoy";
var HertaVideo   = "https://brown-major-ocelot-902.mypinata.cloud/ipfs/bafybeiavaori6hl7ew5aph76tc4c64u26ja54d3xjkmemh35nkkpiryeee";
var RobinVideo   = "https://brown-major-ocelot-902.mypinata.cloud/ipfs/bafybeiazqxyrpwul3sxgfly5lth3wfyfyf776cyqjideqi74h7jldckene";
var EverNVideo   = "https://brown-major-ocelot-902.mypinata.cloud/ipfs/bafybeif6cmn3ub7gn7kpi7xqphtq4sshjlo6ujme6igqfntcsle4krjxca";
// var MapHoyoVideo = "https://brown-major-ocelot-902.mypinata.cloud/ipfs/bafybeibk65jpbeoxttb2nmbikulabf6fd3nilkultzyhy7jfsudv2ypn7u";
//var AodzzzVideo  = "https://brown-major-ocelot-902.mypinata.cloud/ipfs/bafybeihgg53uykaawbkb3ghc2td2ubkv2ingxbqr3juekswujl5oqbohti";
var GigaVideo    = "https://brown-major-ocelot-902.mypinata.cloud/ipfs/bafybeiadfmxwzybolgcrhtourzmpxccb34yljc2hupocloqdhizx6nc5xa";

window.onload = function () {
    player.src = GigaVideo;
    current_section = "home";
    renderSectionContent("home");
    moveBubble(linkHome, false);
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
        videoSwap(() => {
            if (q == 'GigaVideo') {
                player.src = AodzzzVideo;
                q = 'EverNVideo';
            }
            /*
            else if (q == 'AodzzzVideo') {
                player.src = EverNVideo;
                q = 'EverNVideo';
            }
                */
            else if (q == 'EverNVideo') {
                player.src = RobinVideo;
                q = 'RobinVideo';
            }
            else if (q == 'RobinVideo') {
                player.src = KafkaVideo;
                q = 'KafkaVideo';
            }
            else if (q == 'KafkaVideo') {
                player.src = SparkleVideo;
                q = 'SparkleVideo';
            }
            else if (q == 'SparkleVideo') {
                player.src = BurniceVideo;
                q = 'BurniceVideo';
            }
            else if (q == 'BurniceVideo') {
                player.src = SparxieVideo;
                q = 'SparxieVideo';
            }
            else if (q == 'SparxieVideo') {
                player.src = HertaVideo;
                q = 'HertaVideo';
            }
            else if (q == 'HertaVideo') {
                player.src = AcheronVideo;
                q = 'AcheronVideo';
            }
            else
            {
                player.src = GigaVideo;
                q = 'GigaVideo';
            }
            if (current_section === "credits") {
                UpdateCredits();
            }
        });
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

window.addEventListener("wheel", onWheel, { passive: false });
startRenderLoop();

function onWheel(ev) {
    ev.preventDefault();
    targetProgress += ev.deltaY * SCROLL_SENSITIVITY;
    targetProgress = Math.max(0, Math.min(SECTION_COUNT, targetProgress));
}

function startRenderLoop() {
    function tick() {
        scrollProgress += (targetProgress - scrollProgress) * EASE;
        if (Math.abs(targetProgress - scrollProgress) < 0.001) {
            scrollProgress = targetProgress;
        }
        renderScroll(scrollProgress);
        rafId = requestAnimationFrame(tick);
    }
    tick();
}

function renderScroll(progress) {
    const homeAmt = clamp(1 - Math.abs(progress - 0));
    const projAmt = clamp(1 - Math.abs(progress - 1));
    const credAmt = clamp(1 - Math.abs(progress - 2));

    const dominant = progress < 0.5 ? "home" : progress < 1.5 ? "projects" : "credits";
    if (dominant !== current_section) {
        current_section = dominant;
        renderSectionContent(dominant);
        moveBubble(
            dominant === "home" ? linkHome : dominant === "projects" ? linkProjects : linkCredits
        );
    }

    const activeAmt = dominant === "home" ? homeAmt : dominant === "projects" ? projAmt : credAmt;
    const dir = progress - (dominant === "home" ? 0 : dominant === "projects" ? 1 : 2);
    contentText.style.opacity = activeAmt;
    contentText.style.transform = `translateY(${dir * 40}px)`;
}

function clamp(n) {
    return Math.max(0, Math.min(1, n));
}

function renderSectionContent(section) {
    audio_click.play();
    if (section === "home") {
        text.innerHTML = "Portfolio";
        contentText.innerHTML = `
        Hi, my name is, 
        <br /> <h1> Sahil Raut. <br /> 
        I build things for Web. </h1> <br /> 
        I'm a web developer specialized in UI/UX designs. <br /> 
        (with designing software as Figma or Adobe XD and also with HTML, CSS, JS) 
        <br /> I like to produce unique designs in every project.`;
    } else if (section === "projects") {
        text.innerHTML = "Projects";
        contentText.innerHTML = `
        <div class = "proj-link">
        - <b>Dashboard (frontend):</b> <a href="https://thebread.pages.dev/projects/dashboard">thebread.pages.dev/projects/dashboard</a>. <br />
        - <b>Audio Visualizer (3.js):</b> <a href="https://thebread.pages.dev/projects/visualizer">thebread.pages.dev/projects/visualizer</a>. <br />
        - <b>Photography Portfolio (frontend):</b> <a href="https://thebread.pages.dev/projects/photography">thebread.pages.dev/projects/photography</a>. <br />
        - <b>Portfolio (frontend):</b> <a href="https://thebread.pages.dev/projects/portfolio-v2">thebread.pages.dev/projects/portfolio-v2</a>. <br />
        - <b>Game-server using Nakama:</b> <a href="https://github.com/me-is-bread/Nakama-Server-Using-Docker">github.com/me-is-bread/Nakama-Server-Using-Docker</a>.
        </div>`;
    } else {
        UpdateCredits();
    }
}

function UpdateCredits() {
    if (q == 'KafkaVideo') {
        text.innerHTML = "Credits";
        contentText.innerHTML = `
        Kafka Trailer —  A Dramatic Irony  Honkai Star Rail. 
        <br/ > 
        Video and song by Honkai Star Rail.`;
    }
    else if (q == 'SparkleVideo') {
        text.innerHTML = "Credits";
        contentText.innerHTML = `
        Sparkle Trailer — "Monodrama" | Honkai: Star Rail.
        <br/ > 
        Video and song by Honkai Star Rail.`;
    }
    else if (q == 'BurniceVideo') {
        text.innerHTML = "Credits";
        contentText.innerHTML = `
        Burnice Character Demo —  A Burnice Special for the Brokenhearted. 
        <br/ > 
        Video and song by Zenless Zone Zero.`;
    }
    else if (q == 'SparxieVideo') {
        text.innerHTML = "Credits";
        contentText.innerHTML = `
        Sparxie Character Trailer — "Ravings".
        <br/ > 
        Video and song by Honkai Star Rail.`;
    }
    else if (q == 'HertaVideo') {
        text.innerHTML = "Credits";
        contentText.innerHTML = `
        The Herta Character Trailer "Geniuses in the Universe".
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
    else if (q == 'RobinVideo') {
        text.innerHTML = "Credits";
        contentText.innerHTML = `
        Robin Trailer — "Sway to My Beat".
        <br/ > 
        Video and song by Honkai Star Rail.`;
    }
    else if (q == 'EverNVideo') {
        text.innerHTML = "Credits";
        contentText.innerHTML = `
        Evernight Trailer — "Night Falls, Everyone, Close Your Eyes"
        <br/ > 
        Video and song by Honkai Star Rail.`;
    }
    /*
    else if (q == 'AodzzzVideo') {
        text.innerHTML = "Credits";
        contentText.innerHTML = `
        "ReDreaming Angel" - Angels of Delusion EP | Zenless Zone Zero.
        <br/ > 
        Video and song by Zenless Zone Zero.`;
    }
    */
    else if (q == 'GigaVideo') {
        text.innerHTML = "Credits";
        contentText.innerHTML = `
        Giga - 'Ready Steady' ft. Miku・Rin・Len【MV】.
        <br/ > 
        Video and song by Giga, featuring Hatsune Miku, Kagamine Rin, and Kagamine Len.`;
    }
}

function videoSwap(updateFn) {
    player.classList.add("video-swap");
    setTimeout(() => {
        updateFn();
        setTimeout(() => player.classList.remove("video-swap"), 30);
    }, 300);
}

function fadeSwap(updateFn) {
    contentText.classList.add("fade-out");
    setTimeout(() => {
        updateFn();
        contentText.classList.remove("fade-out");
        contentText.classList.add("fade-in");
        setTimeout(() => contentText.classList.remove("fade-in"), 450);
    }, 250);
}

function moveBubble(targetEl, animate = true) {
    document.querySelectorAll(".link-text").forEach(el => el.classList.remove("selected"));
    targetEl.classList.add("selected");

    const holderRect = linkHolder.getBoundingClientRect();
    const currentTop = parseFloat(navBubble.style.top) || 0;
    const currentHeight = parseFloat(navBubble.style.height) || 0;
    const targetRect = targetEl.getBoundingClientRect();
    const targetTop = targetRect.top - holderRect.top;
    const targetHeight = targetRect.height;

    navBubble.classList.add("active");

    if (!animate || currentHeight === 0) {
        navBubble.classList.remove("stretching", "settling");
        navBubble.style.top = targetTop + "px";
        navBubble.style.height = targetHeight + "px";
        return;
    }

    const stretchTop = Math.min(currentTop, targetTop);
    const stretchHeight = Math.abs(targetTop - currentTop) + Math.max(currentHeight, targetHeight);

    navBubble.classList.remove("settling");
    navBubble.classList.add("stretching");
    navBubble.style.top = stretchTop + "px";
    navBubble.style.height = stretchHeight + "px";

    setTimeout(() => {
        navBubble.classList.remove("stretching");
        navBubble.classList.add("settling");
        navBubble.style.top = targetTop + "px";
        navBubble.style.height = targetHeight + "px";
        setTimeout(() => navBubble.classList.remove("settling"), 220);
    }, 180);
}