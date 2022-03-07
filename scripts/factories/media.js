
class MediaFactory {
    constructor(data, namePhotograph) {
        if (!data.video) {
            return new ImgMedia(data, namePhotograph)

        } else if (!data.image) {
            return new VideoMedia(data, namePhotograph)
        } else {
            throw 'Unknown type format'
        }
    }
}

class Media {
    constructor(data) {

    }
    displayMediaGeneral(visuelTpl) {
        const mediasSection = document.querySelector(".mediaBox");
        mediasSection.innerHTML +=
        `
        <article>
            <div class="mediaCardBox">
                <div class="boxMedia">
                    <a class="linkMediaBox" tabindex="7">
                        ${visuelTpl}
                    </a>
                    <div class="boxText">
                        <h3>${this._title}</h3>
                        <div>
                            <p id=${"likeMedia" + this._id}>${this._likes}</p>
                            <a class="heartLikeLink" tabIndex="7" id="${"heartMedia" + this._id}"><i class="fas fa-heart"></i></a>
                        </div>
                    </div>
                </div>
                
                <div class="videoIconBox>
                    <i class="fas fa-video"></i>
                </div>
            </div>
        </article>
        `

    }


}


class ImgMedia extends Media {
    constructor(data, namePhotograph) {
        super()
        this._id = data.id
        this._title = data.title
        this._image = data.image
        this._video = data.video
        this._likes = data.likes
        this._namePhotograph = namePhotograph
    }

    displayMedia() {
        const mediaPictureLink = `assets/media/${this._namePhotograph}/${this._image}`
        const html = `<img src="${mediaPictureLink}" alt="${this._title}">`
        this.displayMediaGeneral(html)
    }

    addLike() {
        
        let likeLinks = document.querySelectorAll(".heartLikeLink")
        // let addLikeHere = document.getElementById("likeMedia"+this._id)
        let thisLikes = this._likes
        console.log(thisLikes)
        likeLinks.forEach((link) => {
            link.addEventListener("click", function () {

                let linkIdNumbers = link.id.slice(10)
                let addLinkHere = dataMediaPhotographer.find(
                    (media) => (media.id == linkIdNumbers)
                )
                if (like == 0) {
                    addLinkHere.likes = addLinkHere.likes += 1
                    displayAllMedia()
                    LikesPriceAside()
                    return like = 1
                }
                else if (like == 1) {
                    addLinkHere.likes = addLinkHere.likes -= 1
                    displayAllMedia()
                    LikesPriceAside()
                    
                    return like = 0
                }
               
            })
        })
        /*linkMedia.addEventListener("keydown", function (event) {
            if (event.key == "Enter") {
                let linkIdNumbers = link.id.slice(10)
            let addLinkHere = dataMediaPhotographer.find(
                (media) => (media.id == linkIdNumbers)
            )
            if (like == 0) {
                addLinkHere.likes = addLinkHere.likes += 1
                displayMedia()
                LikesPriceAside()
                return like = 1
            }
            else if (like == 1) {
                addLinkHere.likes = addLinkHere.likes -= 1
                displayMedia()
                LikesPriceAside()
                return like = 0
            }
            }
        })*/
    
    }
}

 class VideoMedia extends Media {
    constructor(data, namePhotograph) {
        super()
        this._id = data.id
        this._title = data.title
        this._image = data.image
        this._video = data.video
        this._likes = data.likes
        this._namePhotograph = namePhotograph
    }

    displayMedia() {
        const mediaVideoLink = `assets/media/${this._namePhotograph}/${this._video}`
        const html = `<video src="${mediaVideoLink}" alt="${this._title}">`
        this.displayMediaGeneral(html)
    }

    addLike() {

    }
}