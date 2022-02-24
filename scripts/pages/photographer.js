//Mettre le code JavaScript lié à la page photographer.html
let rawPhotographers;
async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    return fetch("../data/photographers.json")

        .then(function (httpBodyResponse) {
            return httpBodyResponse.json()
        })

        .then(function (photographers) {
            console.log(photographers)
            rawPhotographers = photographers
            console.log(rawPhotographers)
        })

        //gestion des erreurs
        .catch(function (error) {
            console.log(error)
            return []
        })
}

//Récupération de l'id
const getId = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    console.log(id);
    return id;
}

const id = getId();

var selectedName
var dataPhotographerSelected


//Récupère les données concernant le photographe concerné et affiche la section concernant les infos du photographe
async function getPhotographerSelected() {

    const dataPhotographers = rawPhotographers.photographers;

    dataPhotographerSelected = dataPhotographers.find(
        (photographer) => photographer.id == id
    )

    var namePhotographer = document.getElementById('namePhotographer')
    namePhotographer.textContent = dataPhotographerSelected.name
    selectedName = dataPhotographerSelected.name
    var locationPhotographer = document.getElementById('locationPhotographer')
    locationPhotographer.textContent = dataPhotographerSelected.city

    var citationPhotographer = document.getElementById('citationPhotographer')
    citationPhotographer.textContent = dataPhotographerSelected.tagline
    const portrait = dataPhotographerSelected.portrait
    const picture = `assets/photographers/${portrait}`;

    var picturePhotographer = document.getElementById('picturePhotographer')
    picturePhotographer.src = picture
    picturePhotographer.alt = "Photo de profil du photographe"

    console.log(selectedName)
}


//Tableau de données utiliser lors de l'application des filtres (popularité, date, titre)
var dataToFilter

//Tableau de données relatif à l'affichage du carousel

var idMedia = []

var dataMediaPhotographer = []

//////////////////////////DISPLAY MEDIA////////////////////////////////////////////////////////////

var mediaSlider = []
//Affichage des médias du photographe
async function displayMedia() {
    var dataSlider = []
    const mediasPhotographers = rawPhotographers.media;
    //Récupération des médias dont l'id est celui du photographe
    dataMediaPhotographer = mediasPhotographers.filter(
        (media) => media.photographerId == id
    )

    if (!dataToFilter) {
        dataToFilter = dataMediaPhotographer
    }
    //Récupération du prénom pour générer les url des médias
    var nameMediaFile = selectedName.split(' ')
    nameMediaFile[0] = nameMediaFile[0].replace('-', ' ')
    console.log(nameMediaFile[0])

    //Attribution des données au mediaFactory avec une boucle forEach
    const mediasSection = document.querySelector(".mediaBox");
    mediasSection.innerHTML = "";
    dataToFilter.forEach((media, index) => {
        //eslint-disable-next-line
        const mediaModel = mediaFactory(media);
        idMedia.push(media.id)
        const mediaPictureLink = `assets/media/${nameMediaFile[0]}/${media.image}`
        const mediaVideoLink = `assets/media/${nameMediaFile[0]}/${media.video}`

        //Ajouts des données au tableau dataSlider
        if (media.image) {
            dataSlider.push({ url: mediaPictureLink, title: media.title, type: "image", index: index, id: media.id })

        }
        else {
            dataSlider.push({ url: mediaVideoLink, title: media.title, type: "video", index: index, id: media.id })
        }
        mediaSlider = dataSlider

        const mediaCardDOM = mediaModel.getMediaCardDOM(mediaPictureLink, mediaVideoLink);
        mediasSection.appendChild(mediaCardDOM);

    })

    displayMediaSlider(dataSlider)
    //Fonction évènement click qui lance le slider

}


///////////////////FILTRES/////////////////////////////////////////////////////////////////////////


const filterItem1 = document.getElementById("filterItem1")
const filterItem2 = document.getElementById("filterItem2")
const filterItem3 = document.getElementById("filterItem3")

document.getElementById("displayFilterBox").addEventListener("click", displayFilter)

let boxDisplayFilter = document.getElementById("displayFilter")
let iconFilter = document.getElementById("iconFilter")

function displayFilter() {
    if (boxDisplayFilter.style.display == "none" || boxDisplayFilter.style.display == "") {
        boxDisplayFilter.style.display = "block"
        console.log('ouvert')
        iconFilter.style.transform = "rotate(180deg)"
    }
    else {
        boxDisplayFilter.style.display = "none"
        console.log('fermer')
        if (iconFilter.style.transform == "rotate(180deg)") {
            iconFilter.style.transform = "rotate(0deg)"
        }
    }
}

function launchFilter() {
    console.log("je lance launchFilter")
    var filterItems = ""
    filterItems = document.querySelectorAll(".filterItem")
    filterItems.forEach((filterItem) => {
        filterItem.addEventListener("click", function () {

            if (filterItem.textContent == "Date") {
                dateFilterAction()
            }

            else if (filterItem.textContent == "Titre") {
                titleFilterAction()
            }

            else {
                popularityFilterAction()
            }

        })
        filterItem.addEventListener("keydown", function (event) {
            if ((event.key == "Enter" && filterItem.textContent == "Date")) {
                dateFilterAction()
            }
            else if ((event.key == "Enter" && filterItem.textContent == "Titre")) {
                titleFilterAction()
            }
            else if ((event.key == "Enter" && filterItem.textContent == "Popularité")) {
                popularityFilterAction()
            }
        })
    })
}

function popularityFilterAction() {
    dataToFilter = popularyFilter()
    displayMedia()
    boxDisplayFilter.style.display = "none"
    iconFilter.style.transform = "rotate(0deg)"
    filterItem1.textContent = "Popularité"
    filterItem2.textContent = "Date"
    filterItem3.textContent = "Titre"
    console.log("fonction popularity")
}

function dateFilterAction() {
    dataToFilter = dateFilter()
    displayMedia()
    boxDisplayFilter.style.display = "none"
    iconFilter.style.transform = "rotate(0deg)"
    filterItem1.textContent = "Date"
    filterItem2.textContent = "Popularité"
    filterItem3.textContent = "Titre"
    console.log("fonction date")
}

function titleFilterAction() {
    dataToFilter = titleFilter()
    displayMedia()
    boxDisplayFilter.style.display = "none"
    iconFilter.style.transform = "rotate(0deg)"
    filterItem1.textContent = "Titre"
    filterItem2.textContent = "Popularité"
    filterItem3.textContent = "Date"
    console.log("fonction titre")
}

function popularyFilter() {
    return dataToFilter.sort(function (a, b) {
        return b.likes - a.likes
    })
}

function dateFilter() {
    return dataToFilter.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    })
}

function titleFilter() {
    return dataToFilter.sort(function (a, b) {
        if (a.title < b.title) { return -1; }
        if (a.title > b.title) { return 1; }
        return 0;
    })
}

document.getElementById("displayFilterBox").addEventListener("keydown", function (event) {
    if ((event.key == "Enter")) {
        displayFilter()
    }
})


///////LIKES AND PRICE ASIDE///////////////////////////////////////////////////////////////////

let sum = 0

function likesSum() {
    sum = 0
    dataToFilter.forEach(data => {
        sum += data.likes
    });
}

function LikesPriceAside() {
    likesSum()
    let boxAside = document.getElementById("likesPriceBox")
    boxAside.innerHTML = ""
    let likesBox = document.createElement("div")
    likesBox.setAttribute("id", "likesBox")
    let likes = document.createElement("p")
    likes.setAttribute("id", "likesAsideSum")
    let price = document.createElement("p")
    let iconHeart = document.createElement("i")
    iconHeart.style.paddingLeft = "0.2rem"
    iconHeart.setAttribute("class", "fas fa-heart")
    price.textContent = dataPhotographerSelected.price + "€ / jour"
    likes.textContent = sum
    boxAside.appendChild(likesBox)
    likesBox.appendChild(likes)
    likesBox.appendChild(iconHeart)
    boxAside.appendChild(price)
}

//////////////LIKE MEDIA/////////////////////////////////////////////////////////////////////


document.getElementById(`heartMedia ${idMedia}`)
var like = 0

function likeMedia() {
    var likeLinks = document.querySelectorAll(".heartLikeLink")
    likeLinks.forEach((link) => {
        link.addEventListener("click", function () {

            var linkIdNumbers = link.id.slice(10)
            var addLinkHere = dataMediaPhotographer.find(
                (media) => (media.id == linkIdNumbers)
            )
            console.log(addLinkHere.likes)
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
            
            console.log(addLinkHere.likes)  

        })
       
    })
}

////////////////////////////SLIDER////////////////////////////////////////

function displayMediaSlider(dataSlider) {
    console.log("hey slider")
    let mediaContainer = document.getElementById("slideshow-container")
    console.log(dataSlider)
    mediaContainer.innerHTML = ""
    dataSlider.forEach((media) => {
        let url = media.url
        let alt = media.title
        let mediaTitleBox = document.createElement("div")
        mediaTitleBox.setAttribute("id", "mediaTitleBox")
        mediaContainer.appendChild(mediaTitleBox)
        let mediaBox
        if (media.type == "image") {
            mediaBox = document.createElement("img")
            let titleBox = document.createElement("p")
            mediaTitleBox.appendChild(mediaBox)
            mediaTitleBox.appendChild(titleBox)
            mediaBox.src = url
            titleBox.textContent = alt
            mediaBox.setAttribute("class", "mySlides fade")
        }
        else {
            mediaBox = document.createElement("video")
            let titleBox = document.createElement("p")
            mediaBox.setAttribute("controls", "auto")
            mediaTitleBox.appendChild(mediaBox)
            mediaTitleBox.appendChild(titleBox)
            mediaBox.src = url
            titleBox.textContent = alt

            mediaBox.setAttribute("class", "mySlides fade")
        }
        mediaBox.setAttribute("alt", alt)
    })
    globalLinkSlider()
    likeMedia()
}

function globalLinkSlider() {
    const linkSlider = document.getElementsByClassName("linkMediaBox")
    console.log(linkSlider)
    for (let i = 0; i < linkSlider.length; i++) {
        linkSlider[i].addEventListener("click", function () {
            console.log(i)
            document.getElementById("slideshow").style.display = "flex"
            mediaQueriesWidth()
            console.log(i * multiplier)
            initial = i * multiplier
            document.getElementById("slideshow-container").style.transform = "translateX(-" + initial + "rem)"

        }, false);
        linkSlider[i].addEventListener("keydown", function (event) {
            if (event.key == "Enter") {
                document.getElementById("slideshow").style.display = "flex"
                mediaQueriesWidth()
                console.log(i * multiplier)
                initial = i * multiplier
                document.getElementById("slideshow-container").style.transform = "translateX(-" + initial + "rem)"

            }
        })
    }
}

var amount = ""
var multiplier = ""

function mediaQueriesWidth() {
    if (window.matchMedia("(max-width: 765px)").matches) {
        multiplier = 16
        amount = 16
    } else {
        multiplier = 50
        amount = 50
    }

    return amount
}




var initial = 0;


document.getElementById("moveRight").addEventListener("click", moveSliderRight)

function moveSliderRight() {
    console.log(initial)
    mediaQueriesWidth()
    if (initial < (mediaSlider.length - 1) * multiplier) {
        initial += amount;
    }
    else {
        initial = 0
    }
    if (initial < mediaSlider.length * multiplier) {
        document.getElementById("slideshow-container").style.transform = "translateX(-" + initial + "rem)"

    }
}


document.getElementById("moveLeft").addEventListener("click", moveSliderLeft)

function moveSliderLeft() {
    console.log(initial)
    mediaQueriesWidth()
    if (initial > 0) {
        initial -= amount;
    }
    else {
        initial = (mediaSlider.length - 1) * multiplier
    }
    if (initial >= 0) {
        document.getElementById("slideshow-container").style.transform = "translateX(-" + initial + "rem)"
    }
}

window.addEventListener("keydown", function (event) {
    if ((event.key == "ArrowRight") && (document.getElementById("slideshow").style.display == "flex")) {
        moveSliderRight()
    } else if (event.key == "ArrowLeft" && (document.getElementById("slideshow").style.display == "flex")) {
        moveSliderLeft()
    } else if (event.key == "Escape" && (document.getElementById("slideshow").style.display == "flex")) {
        closeSlider()
    } else if (event.key == "Escape" && (document.getElementById("contact_modal").style.display == "block")) {
        closeModal()
    } else if (event.key == "Enter" && (document.getElementById("contact_modal").style.display == "block")) {
        validate(event)
    }


});





document.getElementById("closeSlider").addEventListener("click", closeSlider)

function closeSlider() {
    document.getElementById("slideshow").style.display = "none"
}



////////////////////////////////////////////
async function init() {
    // Récupère les datas des photographes
    await getPhotographers()
    getPhotographerSelected()
    displayMedia()
    popularityFilterAction()
    LikesPriceAside()
    launchFilter()
    namePhotographerContact = document.getElementById("namePhotographerContact")
    namePhotographerContact.textContent = selectedName
}


init();
