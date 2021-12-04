// https://developers.google.com/youtube/iframe_api_reference#Getting_Started
// https://developers.google.com/youtube/v3


async function getPlayListsYoutube(){
    const apiKey = "AIzaSyBeEO3M1L-Ysd4mtYlfiCJI-6AK0jjSpeY"
    const url_base = "https://www.googleapis.com/youtube/v3/playlists"
    const part = "snippet"
    const idChannel = "UC3mr0xeHCdD5KKR7NDvw3jg"
    const typeResources = "playlist"
    let url = `${url_base}?part=${part}&channelId=${idChannel}&key=${apiKey}`
    const myPromiseYoutube = await fetch(url)
    const dataJson = await myPromiseYoutube.json();
    return dataJson.items;
}

async function getVideosFromPlayList(){
    const playListsId = await getPlayListsYoutube();
    const apiKey = "AIzaSyBeEO3M1L-Ysd4mtYlfiCJI-6AK0jjSpeY"
    const url_base = "https://www.googleapis.com/youtube/v3/playlistItems"
    const part = "snippet"
    const maxResults = 3;
    const divParentVideos = document.getElementsByClassName("videos-playLists-main")[0];
    var url = "";

    for await (let playlistId  of playListsId) {
        const h2Element = document.createElement("h2");
        const textTitleNode = document.createTextNode(playlistId.snippet.title);

        h2Element.appendChild(textTitleNode);
        h2Element.setAttribute("class","videos-playLists-main-content-title");
        divParentVideos.appendChild(h2Element);

        // divChildElement = document.createElement("div");
        // divChildElement.setAttribute("class","videos-playLists-main-content");


        //console.log(divChildElement.outerHTML);

        url = `${url_base}?part=${part}&playlistId=${playlistId.id}&maxResults=${maxResults}&key=${apiKey}`
        let myPromiseYoutube = await fetch(url)
        let dataJsonVideos = await myPromiseYoutube.json();
        console.log(dataJsonVideos.items, " : valor de items");
        dataJsonVideos.items.forEach(obj =>{
            onYouTubeIframeAPIReady(obj.snippet.resourceId.videoId);
        });
        // getVideosFromEachPlayList(url_base,part,playListsId[index].id,apiKey);
    
    }
    divParentVideos.removeChild(document.getElementsByClassName("videos-playLists")[0]);
}

async function getVideosFromEachPlayList(baseUrl,part,videoId,apiKey){
    var stopped = false;
    var pageToken = "";
    var i = 1;
    while(!stopped){
            if(pageToken == undefined) stopped == true;
            i++;
            if (i == 1){
                url = `${baseUrl}?part=${part}&playlistId=${videoId}&key=${apiKey}`
            }else{
                url = `${baseUrl}?part=${part}&playlistId=${videoId}&pageToken=${pageToken}&key=${apiKey}`
            }
            let myPromiseYoutube = await fetch(url)
            let dataJsonVideos = await myPromiseYoutube.json();
            dataJsonVideos.items.forEach(obj =>{
                onYouTubeIframeAPIReady(obj.snippet.resourceId.videoId);
            });
            pageToken = dataJsonVideos.nextPageToken;
        }
}

function onYouTubeIframeAPIReady(videoId) {

    const videoIdValue = videoId + Math.random()*100;
    const divElement = document.createElement("div");
    divElement.setAttribute("id",videoIdValue);
    divElement.setAttribute("class","videos-playLists");
    const divParentVideos = document.getElementsByClassName("videos-playLists-main")[0];

    divParentVideos.appendChild(divElement);
    player = new YT.Player(divElement.id, {
        height: '90',
        width: '160',
        videoId
        // events: {
        // 'onReady': onPlayerReady,
        // 'onStateChange': onPlayerStateChange
        // }
    });
}


getVideosFromPlayList();
//getPlayListsYoutube();