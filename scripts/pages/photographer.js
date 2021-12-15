//Mettre le code JavaScript lié à la page photographer.html
//Récupération de l'id
async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    return fetch("../data/photographers.json")

    .then(function (httpBodyResponse) {
        return httpBodyResponse.json()
    })

    .then(function (photographers) {
        return photographers
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

async function getPhotographerSelected(photographers) {
const selectedPhotographerData = photographers.find(
    (photographer) => photographer.id == id
);
console.log(selectedPhotographerData)
}



async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    getPhotographerSelected(photographers);
};

init();