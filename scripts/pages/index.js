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

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        await getPhotographers();
        const { photographers } = rawPhotographers
        displayData(photographers);
    };
    
    init();
    