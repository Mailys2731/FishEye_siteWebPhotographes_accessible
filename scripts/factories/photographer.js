function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const userCardBox = document.createElement( 'a' );
        const boxImg = document.createElement( 'div' )
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const location = document.createElement( 'p' )
        const taglineBox = document.createElement( 'p' )
        const priceBox = document.createElement( 'p' )
    
        img.setAttribute("src", picture)
        userCardBox.setAttribute("href", "photographer.html?id=" + id)

        h2.textContent = name;
        location.textContent = city+', '+ country;
        taglineBox.textContent = tagline;
        priceBox.textContent = price + '€/jour'

        article.appendChild(userCardBox)
        userCardBox.appendChild(boxImg);
        userCardBox.appendChild(h2);
        userCardBox.appendChild(location);
        userCardBox.appendChild(taglineBox);
        userCardBox.appendChild(priceBox);
        boxImg.appendChild(img)

        console.log(localStorage)

        return (article);
    }
    return { picture, getUserCardDOM }
}