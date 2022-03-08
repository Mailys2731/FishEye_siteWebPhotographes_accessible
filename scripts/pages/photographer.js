//Mettre le code JavaScript lié à la page photographer.html
let rawPhotographers;
async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    return fetch("../data/photographers.json")

        .then(function (httpBodyResponse) {
            return httpBodyResponse.json()
        })

        .then(function (photographers) {
            rawPhotographers = photographers
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
    return id;
}

const id = getId();

let selectedName
let dataPhotographerSelected


//Récupère les données concernant le photographe concerné et affiche la section concernant les infos du photographe
async function getPhotographerSelected() {

    const dataPhotographers = rawPhotographers.photographers;

    dataPhotographerSelected = dataPhotographers.find(
        (photographer) => photographer.id == id
    )

    let namePhotographer = document.getElementById('namePhotographer')
    namePhotographer.textContent = dataPhotographerSelected.name
    selectedName = dataPhotographerSelected.name
    let locationPhotographer = document.getElementById('locationPhotographer')
    locationPhotographer.textContent = dataPhotographerSelected.city

    let citationPhotographer = document.getElementById('citationPhotographer')
    citationPhotographer.textContent = dataPhotographerSelected.tagline
    const portrait = dataPhotographerSelected.portrait
    const picture = `assets/photographers/${portrait}`;

    let picturePhotographer = document.getElementById('picturePhotographer')
    picturePhotographer.src = picture
    picturePhotographer.alt = dataPhotographerSelected.name

}


//Tableau de données utiliser lors de l'application des filtres (popularité, date, titre)
let dataToFilter

//Tableau de données relatif à l'affichage du carousel

let idMedia = []

let dataMediaPhotographer = []

//////////////////////////DISPLAY MEDIA////////////////////////////////////////////////////////////

let mediaSlider = []
//Affichage des médias du photographe
async function displayAllMedia() {
    let dataSlider = []
    const mediasPhotographers = rawPhotographers.media;
    //Récupération des médias dont l'id est celui du photographe
    dataMediaPhotographer = mediasPhotographers.filter(
        (media) => media.photographerId == id
    )

    if (!dataToFilter) {
        dataToFilter = dataMediaPhotographer
    }
    //Récupération du prénom pour générer les url des médias
    let nameMediaFile = selectedName.split(' ')
    nameMediaFile[0] = nameMediaFile[0].replace('-', ' ')

    //Attribution des données au mediaFactory avec une boucle forEach
    const mediasSection = document.querySelector(".mediaBox");
    mediasSection.innerHTML = "";
    dataToFilter.forEach((media, index) => {
        //eslint-disable-next-line
        const mediaModel = new MediaFactory(media, nameMediaFile[0]);
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
        let like =0

        mediaModel.displayMedia()
        mediaModel.addLike()
       

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
        iconFilter.style.transform = "rotate(180deg)"
    }
    else {
        boxDisplayFilter.style.display = "none"
        if (iconFilter.style.transform == "rotate(180deg)") {
            iconFilter.style.transform = "rotate(0deg)"
        }
    }
}

function launchFilter() {
    let filterItems = ""
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
    displayAllMedia()
    boxDisplayFilter.style.display = "none"
    iconFilter.style.transform = "rotate(0deg)"
    filterItem1.textContent = "Popularité"
    filterItem2.textContent = "Date"
    filterItem3.textContent = "Titre"
}

function dateFilterAction() {
    dataToFilter = dateFilter()
    displayAllMedia()
    boxDisplayFilter.style.display = "none"
    iconFilter.style.transform = "rotate(0deg)"
    filterItem1.textContent = "Date"
    filterItem2.textContent = "Popularité"
    filterItem3.textContent = "Titre"
}

function titleFilterAction() {
    dataToFilter = titleFilter()
    displayAllMedia()
    boxDisplayFilter.style.display = "none"
    iconFilter.style.transform = "rotate(0deg)"
    filterItem1.textContent = "Titre"
    filterItem2.textContent = "Popularité"
    filterItem3.textContent = "Date"
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



////////////////////////////SLIDER////////////////////////////////////////

function displayMediaSlider(dataSlider) {
    let mediaContainer = document.getElementById("slideshow-container")
    mediaContainer.innerHTML = ""
    dataSlider.forEach((media) => {
        let url = media.url
        let alt = media.title
        let mediaTitleBox = document.createElement("div")
        mediaTitleBox.setAttribute("class", "mediaTitleBox")
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
    
}

function globalLinkSlider() {
    const linkSlider = document.getElementsByClassName("linkMediaBox")
    console.log(linkSlider)
    for (let i = 0; i < linkSlider.length; i++) {
        linkSlider[i].addEventListener("click", function () {
            document.getElementById("backgroundSlideshow").style.display = "flex"
            mediaQueriesWidth()
            initial = i * multiplier
            document.getElementById("slideshow-container").style.transform = "translateX(-" + initial + "rem)"

        }, false);
        linkSlider[i].addEventListener("keydown", function (event) {
            if (event.key == "Enter") {
                document.getElementById("backgroundSlideshow").style.display = "flex"
                mediaQueriesWidth()
                initial = i * multiplier
                document.getElementById("slideshow-container").style.transform = "translateX(-" + initial + "rem)"

            }
        })
    }

}

let amount = ""
let multiplier = ""

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




let initial = 0;


document.getElementById("moveRight").addEventListener("click", moveSliderRight)

function moveSliderRight() {
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
    if ((event.key == "ArrowRight") && (document.getElementById("backgroundSlideshow").style.display == "flex")) {
        moveSliderRight()
    } else if (event.key == "ArrowLeft" && (document.getElementById("backgroundSlideshow").style.display == "flex")) {
        moveSliderLeft()
    } else if (event.key == "Escape" && (document.getElementById("backgroundSlideshow").style.display == "flex")) {
        closeSlider()
    } else if (event.key == "Escape" && (document.getElementById("contact_modal").style.display == "block")) {
        closeModal()
    } else if (event.key == "Enter" && (document.getElementById("contact_modal").style.display == "block")) {
        validate(event)
    }


});





document.getElementById("closeSlider").addEventListener("click", closeSlider)

function closeSlider() {
    document.getElementById("backgroundSlideshow").style.display = "none"
}



////////////////////////////////////////////
async function init() {
    // Récupère les datas des photographes
    await getPhotographers()
    getPhotographerSelected()
    displayAllMedia()
    popularityFilterAction()
    LikesPriceAside()
    launchFilter()
    namePhotographerContact = document.getElementById("namePhotographerContact")
    namePhotographerContact.textContent = selectedName
}


init();
