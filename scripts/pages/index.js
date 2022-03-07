    let rawPhotographers ;

    async function getPhotographers() {
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

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            //eslint-disable-next-line
            const photographerFactory = new PhotographerFactory(photographer);
            const displayPhotographer = photographerFactory.displayPhotographer();
            photographersSection.appendChild(displayPhotographer);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        await getPhotographers();
        const { photographers } = rawPhotographers
        
        displayData(photographers);
    }
    
    init();
    