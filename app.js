// ---DropDown---
let createContent = document.getElementById('createVideo')
let createYoutubeApps = document.getElementById('youtubeApps')

let dropdowns = document.querySelectorAll('.dropdown-item');

function addRemoveActive(dropdown, f, s) {
    dropdown[f].classList.toggle('active')
    dropdown[s].classList.remove('active')
}
createContent.onclick = () => {
    addRemoveActive(dropdowns, 0, 1)
}
createYoutubeApps.onclick = () => {
    addRemoveActive(dropdowns, 1, 0)
}




// ---SideBar---

let showMorBtn = document.getElementById('showMoreButton');

let showmoreSubMenu = document.querySelector('.showMoreSubMenu');

let isOpen = true;
showMorBtn.onclick = () => {
    showmoreSubMenu.classList.toggle('active')
    showMorBtn.children[0].firstElementChild.classList.toggle('active')
    if (isOpen) {
        showMorBtn.children[0].lastElementChild.innerText = 'Show Fewer'
        isOpen = false
    } else {
        showMorBtn.children[0].lastElementChild.innerText = 'Show More'
        isOpen = true
    }

}


// ---Video Content---


let listForVideos = document.querySelector('.vidoesList');

// Rendering Added Videos From Local Storage
let getVideos = JSON.parse(window.localStorage.getItem('videos'))
if (getVideos != null) {
    for (let elems of getVideos) {
        let li = document.createElement('li');
        li.setAttribute('class', 'videoItem');

        let divVideo = document.createElement('div');

        divVideo.setAttribute('class', 'videoFrame')

        let frameBackDiv = document.createElement('div');
        frameBackDiv.setAttribute('class', 'iframeBackrgound');

        let img = document.createElement('img');
        img.setAttribute('src', `${elems.coverPhoto}`)
        img.src = elems.coverPhoto;

        let videoDuration = document.createElement('p');
        videoDuration.setAttribute('class', 'videoTime');
        videoDuration.innerText = '33:36';

        let wathLaterQueue=document.createElement('p')
        wathLaterQueue.setAttribute('class','watchLaterQueue')

        let span1=document.createElement('span')
        let span2=document.createElement('span')
        span1.setAttribute('class','material-icons')
        span1.innerText='watch_later'
        span2.setAttribute('class','material-icons');
        span2.innerText='playlist_add_check'
        wathLaterQueue.appendChild(span1)
        wathLaterQueue.appendChild(span2)

        frameBackDiv.appendChild(img);
        frameBackDiv.appendChild(videoDuration);
        frameBackDiv.appendChild(wathLaterQueue)

        let viedasdf = elems.iframe;
        divVideo.innerHTML = viedasdf;
        divVideo.appendChild(frameBackDiv)

        li.appendChild(divVideo)

        let createFrameTtitle = document.createElement('div')

        createFrameTtitle.setAttribute('class', 'frameTitle')

        let channelImgDiv = document.createElement('div')

        channelImgDiv.setAttribute('class', 'channelImg');

        let channelPrimaryImg = document.createElement('img');
        channelPrimaryImg.setAttribute('src',
            'https://yt3.ggpht.com/ytc/AAUvwnhIz_0Su6HhW6Ym50QCroJCAnF10X9xnnMDboN2=s68-c-k-c0x00ffffff-no-rj')

        channelImgDiv.appendChild(channelPrimaryImg)

        createFrameTtitle.appendChild(channelImgDiv)

        let videTitleInfo = document.createElement('div');

        videTitleInfo.setAttribute('class', 'videoTitle');
        let h3 = document.createElement('h3')
        h3.setAttribute('class', 'videoTitleInfo');
        h3.innerHTML = elems.title;

        let ptitle = document.createElement('p')
        ptitle.setAttribute('class', 'channelTittle');
        ptitle.innerHTML = 'Web dev Simplified'

        let pview = document.createElement('p')
        pview.setAttribute('class', 'channelView')

        pview.innerHTML = '32K views <sup>.</sup>\
        4 months ago';
        videTitleInfo.appendChild(h3)
        videTitleInfo.appendChild(ptitle)
        videTitleInfo.appendChild(pview)

        createFrameTtitle.appendChild(videTitleInfo);

        li.appendChild(createFrameTtitle)
        listForVideos.appendChild(li)

    }

}




let closeVideoShown = document.querySelector('.closeVideoItem');

let showVideoItemUser = document.querySelector('.showVideoToUser')

let videoFrame = document.querySelectorAll('.videoFrame');

let closeSidebar = document.querySelector('.sidebar-wrapper')

let menuButton = document.getElementById('menuBtn')

let videoContentWrapper = document.querySelector('.videoContent-wrapper');

// ResponsiveMenuBtn
menuButton.onclick = () => {
    closeSidebar.classList.toggle('active');
    videoContentWrapper.classList.toggle('active');

    for (let elems of videoFrame) {
        elems.classList.toggle('active')
    }
}


for (let elem of videoFrame) {
    elem.onclick = () => {
        showVideoItemUser.style.display = 'flex';
        let firstchildElem = elem.firstElementChild;
        let createFrame = document.createElement('iframe');
        createFrame.setAttribute('src', `${firstchildElem.src}`)
        createFrame.setAttribute('frameborder', `${firstchildElem.frameborder}`)
        createFrame.setAttribute('width', '750')
        createFrame.setAttribute('height', '450')
        showVideoItemUser.firstElementChild.appendChild(createFrame)
    }
}

closeVideoShown.onclick = () => {
    showVideoItemUser.style.display = 'none'
    showVideoItemUser.firstElementChild.innerHTML = null;
}






// ---SearchWithAudio---
let mic1 = document.getElementById('microphone');

let searchInput1 = document.getElementById('search');


let mic2 = document.getElementById('microphone2')

let searchInput2 = document.getElementById('search2')

let recognition = new webkitSpeechRecognition();
recognition.continuous = false;

recognition.lang = 'en-US';

function listeningUser(mic, searchInput) {
    mic.onclick = () => {
        recognition.start();
        searchInput.setAttribute('disabled', 'disabled')
        searchInput.setAttribute('placeholder', 'Listening....')
    }
    recognition.onresult = function (event) {
        let userInput = event.results[0][0].transcript;
        searchInput.removeAttribute('disabled', 'disabled')
        searchInput.setAttribute('placeholder', 'Search')
        searchInput.value = userInput
    }
    recognition.onspeechend = function () {
        recognition.stop();
    }
}



// ---Responsive header---

let searchIcon = document.getElementById('searchIcon');

function resHeaderContents(x) {
    let resSearchContent = document.querySelector('.searchInput');
    let returnBack = document.getElementById('back');
    if (x.matches) {
        searchIcon.onclick = () => {
            resSearchContent.style.display = 'flex';
        }
        returnBack.onclick = () => {
            resSearchContent.style.display = 'none';
        }
        listeningUser(mic2, searchInput2)
    }else{
        resSearchContent.style.display = 'none';
        searchIcon.onclick = () => {
            resSearchContent.style.display = 'none';
            for (let parents of videoFrame) {
                let titleOfVideos = parents.parentElement.lastElementChild.lastElementChild.firstElementChild.innerText.toLowerCase();
                if (titleOfVideos.indexOf(searchInput1.value.toLowerCase()) != -1) {
                    parents.parentElement.style.display = 'block'
                } else {
                    parents.parentElement.style.display = 'none'
                }
            }
        }
        listeningUser(mic1, searchInput1)
        searchInput1.onkeyup=(e)=>{
            if(e.target.value==""){
                for (let parents of videoFrame) {
                    let titleOfVideos = parents.parentElement
                    titleOfVideos.style.display = 'block';
                }
            }
        }

    }
}

let resMedeia = window.matchMedia("(max-width: 768px)")

resHeaderContents(resMedeia)
resMedeia.addListener(resHeaderContents)

