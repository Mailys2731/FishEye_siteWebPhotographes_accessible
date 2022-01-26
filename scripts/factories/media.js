

function mediaFactory(data) {
    const { id, photographer, title, image, video, likes, date, price } = data;


    function getMediaCardDOM(mediaPictureLink, mediaVideoLink) {

        const article = document.createElement('article');

        const mediaCardBox = document.createElement('a');
        const boxMedia = document.createElement('div')
        const img = document.createElement('img');
        const video = document.createElement('video')
        const boxText = document.createElement('div')
        const titleBox = document.createElement('h3')
        const likesBox = document.createElement('div')
        const heartLikeLink = document.createElement('a')
        const heartLike = document.createElement('i')

        mediaCardBox.setAttribute("href", "#")
        boxText.setAttribute("class", "boxText")
        heartLikeLink.setAttribute("class", "heartLikeLink")
        heartLike.setAttribute("class", "fas fa-heart")
        video.setAttribute("controls", "controls")


        titleBox.textContent = title;
        likesBox.textContent = likes;

        article.appendChild(mediaCardBox)
        mediaCardBox.appendChild(boxMedia);
        mediaCardBox.appendChild(boxText);
        boxText.appendChild(titleBox);
        boxText.appendChild(likesBox);
        likesBox.appendChild(heartLikeLink)
        heartLikeLink.appendChild(heartLike)

        if (image) {
            boxMedia.appendChild(img)
            img.setAttribute("src", mediaPictureLink)
        } else if (video) {
            boxMedia.appendChild(video)
            video.setAttribute("src", mediaVideoLink)
        }




        return (article);
    }
    return { getMediaCardDOM }
}