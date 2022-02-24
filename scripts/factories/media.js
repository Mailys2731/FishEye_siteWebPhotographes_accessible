

function mediaFactory(data) {
    const { id, photographer, title, image, video, likes, date, price } = data;


    function getMediaCardDOM(mediaPictureLink, mediaVideoLink) {

        const article = document.createElement('article');
        const mediaCardBox = document.createElement('div');
        const linkMediaBox = document.createElement('a');
        const boxMedia = document.createElement('div')
        const img = document.createElement('img');
        const video = document.createElement('video')
        const boxText = document.createElement('div')
        const titleBox = document.createElement('h3')
        const likesBox = document.createElement('div')
        const heartLikeLink = document.createElement('a')
        const heartLike = document.createElement('i')
        const likesBoxText= document.createElement('p')

        mediaCardBox.setAttribute("class", "mediaCardBox")
        linkMediaBox.setAttribute("class", "linkMediaBox")
        linkMediaBox.setAttribute("tabindex", "7")
        boxText.setAttribute("class", "boxText")
        heartLikeLink.setAttribute("class", "heartLikeLink")
        heartLikeLink.setAttribute("tabindex", "8")
        heartLikeLink.style.cursor="pointer"
        linkMediaBox.style.cursor="pointer"

        heartLike.setAttribute("class", "fas fa-heart")
        img.alt = title

        titleBox.textContent = title;
        likesBoxText.textContent = likes;

        likesBoxText.id = "likeMedia"+id;
        heartLikeLink.id= "heartMedia"+id;

        article.appendChild(mediaCardBox)
        mediaCardBox.appendChild(linkMediaBox)
        linkMediaBox.appendChild(boxMedia);
        mediaCardBox.appendChild(boxText);
        boxText.appendChild(titleBox);
        boxText.appendChild(likesBox);
        likesBox.appendChild(likesBoxText)
        likesBox.appendChild(heartLikeLink)
        heartLikeLink.appendChild(heartLike)
        const videoIconBox = document.createElement("div")
        const videoIcon = document.createElement("i")
        videoIcon.setAttribute("class", "fas fa-video")
        videoIconBox.setAttribute("class", "videoIconBox")
        boxMedia.setAttribute("class", "boxMedia")

        if (image) {
            boxMedia.appendChild(img)
            img.setAttribute("src", mediaPictureLink)
        } else if (video) {
            boxMedia.appendChild(video)
            video.setAttribute("src", mediaVideoLink)
           videoIconBox.style.display="flex"
        }
        videoIconBox.appendChild(videoIcon)
        boxMedia.appendChild(videoIconBox)




        return (article);
    }
    return { getMediaCardDOM }
}


