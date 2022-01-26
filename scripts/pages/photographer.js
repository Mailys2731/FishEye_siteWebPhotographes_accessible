//Mettre le code JavaScript lié à la page photographer.html
//Récupération de l'id
let rawPhotographers ;
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

const getId = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    console.log(id);
    return id;
}

const id = getId();

/*const getName = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const name = urlParams.get('name');
    return name;
}*/

//const name = getName();
var selectedName
var dataPhotographerSelected

async function getPhotographerSelected() {

    const dataPhotographers = rawPhotographers.photographers;

    dataPhotographerSelected = dataPhotographers.find(
        (photographer) => photographer.id == id
    )

    var namePhotographer = document.getElementById('namePhotographer')
    namePhotographer.textContent = dataPhotographerSelected.name
        selectedName=dataPhotographerSelected.name
    var locationPhotographer = document.getElementById('locationPhotographer')
    locationPhotographer.textContent = dataPhotographerSelected.city

    var citationPhotographer = document.getElementById('citationPhotographer')
    citationPhotographer.textContent = dataPhotographerSelected.tagline
        const portrait = dataPhotographerSelected.portrait
        const picture = `assets/photographers/${portrait}`;

    var picturePhotographer = document.getElementById('picturePhotographer')
    picturePhotographer.src = picture

   console.log(selectedName)
}

var dataToFilter
var dataSlider = []

async function displayMedia(dataMediaPhotographer) {
    const mediasPhotographers = rawPhotographers.media;
    var dataMediaPhotographer = mediasPhotographers.filter(
        (media) => media.photographerId == id
    )
    if (!dataToFilter){
        dataToFilter = dataMediaPhotographer
    }
    var nameMediaFile = selectedName.split(' ')
    nameMediaFile[0] = nameMediaFile[0].replace('-', ' ')
    console.log(nameMediaFile[0])
    const mediasSection = document.querySelector(".mediaBox");
        mediasSection.innerHTML= "";
    dataToFilter.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaPictureLink = `assets/media/${nameMediaFile[0]}/${media.image}`
        const mediaVideoLink = `assets/media/${nameMediaFile[0]}/${media.video}`
            if (media.image){
                dataSlider.push(mediaPictureLink)
    
            }
            else {
                dataSlider.push(mediaVideoLink)
            }
        
           
        const mediaCardDOM = mediaModel.getMediaCardDOM(mediaPictureLink, mediaVideoLink, likeMedia());
        mediasSection.appendChild(mediaCardDOM);

    });
    console.log(dataSlider)
}

///////////////////FILTRES////////////////

function displayFilter() {
    boxDisplayFilter = document.getElementById("displayFilter")
    iconFilter = document.getElementById("iconFilter")
    console.log(boxDisplayFilter.style.display)
    if (boxDisplayFilter.style.display == "none" || boxDisplayFilter.style.display == "" ){
        boxDisplayFilter.style.display = "block"
        console.log('ouvert')
        iconFilter.style.transform = "rotate(180deg)"
    }
    else{
        boxDisplayFilter.style.display = "none"
        console.log('fermer')
        if(iconFilter.style.transform == "rotate(180deg)"){
            iconFilter.style.transform = "rotate(0deg)"
        }

    }
}

document.getElementById("popularityFilter").addEventListener("click", popularityFilterAction)

function popularityFilterAction() {
    dataToFilter = popularyFilter()
   displayMedia()
}


document.getElementById("dateFilter").addEventListener("click", dateFilterAction)

function dateFilterAction() {
     dataToFilter = dateFilter()
    displayMedia()
}

document.getElementById("titleFilter").addEventListener("click", titleFilterAction)

function titleFilterAction() {
    dataToFilter = titleFilter()
    displayMedia()
}



function popularyFilter(){
    return dataToFilter.sort(function(a,b) {
        return b.likes - a.likes
    })
   
}

function dateFilter() {
    return dataToFilter.sort(function(a,b) {
        return new Date(b.date) - new Date(a.date);
    })

}

function titleFilter() {
    return dataToFilter.sort(function(a,b) {
        if(a.title < b.title) { return -1; }
        if(a.title > b.title) { return 1; }
        return 0;
    })
    
}

///////LIKES AND PRICE ASIDE/////////////////////

let sum = 0

function likesSum () {
    dataToFilter.forEach(data => {
        sum += data.likes
    });
}



function LikesPriceAside() {
    boxAside = document.getElementById("likesPriceBox")
    likesBox = document.createElement("div")
    likesBox.setAttribute("id", "likesBox")
    likes = document.createElement("p")
    price = document.createElement("p")
    iconHeart = document.createElement("i")
    iconHeart.setAttribute("class", "fas fa-heart")
    price.textContent = dataPhotographerSelected.price + "€ / jour"
    likes.textContent = sum
    boxAside.appendChild(likesBox)
    likesBox.appendChild(likes)
    likesBox.appendChild(iconHeart)
    boxAside.appendChild(price)

}

//////////////LIKE MEDIA/////////////


function likeMedia() {

    like = 0

    if (like == "" || like == 0) {
        like += 1;

    }

    else {
        like = 0;
    }

}

////////SLIDER///////////////////////////////////

function displaySlider() {
    modalMedia = document.getElementById("modalMedia")
    mediaContainer = document.createElement("div")
    mediaContainer.setAttribute("id", "mediaContainer")
    mediaContainer.style.width = `${dataSlider.length * 100}%`
    console.log(`${dataSlider.length * 100}%`)
    dataSlider.forEach((data) => {
        if((data.charAt(data.length-3)) == "m"){
            slideMedia = document.createElement("video")
            slideMedia.src= data
            slideMedia.setAttribute("controls", "controls")
        }
        else{
            slideMedia = document.createElement("img")
            slideMedia.src= data
        }
        slideMedia.setAttribute("class", "slideMedia")
        modalMedia.appendChild(mediaContainer)
        mediaContainer.appendChild(slideMedia)
    })
}

document.getElementById("rightModalChange").addEventListener("click", changeToRight)

function changeToRight() {
    calcTransform = 100/dataSlider.length
    document.getElementById("mediaContainer").style.transform=`translateX(-100%)`
}


////////////////////////////////////////////
async function init() {
    // Récupère les datas des photographes
    await getPhotographers();
    const mediasPhotographers = rawPhotographers.media;

    const { photographers } = rawPhotographers.photographers
    const { media } =  mediasPhotographers.filter(
        (media) => media.photographerId == id
    )
    getPhotographerSelected(photographers);
    displayMedia(media)
    displaySlider()
    likesSum()
    LikesPriceAside(dataPhotographerSelected)


};


init();

//mettre un z index pour l'ouverture des filtres et le filtre popularité?