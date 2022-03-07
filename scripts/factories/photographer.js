class PhotographerFactory {
    constructor(data) {
        this._name = data.name
        this._city = data.city
        this._country = data.country
        this._tagline = data.tagline
        this._price = data.price
        this._portrait = data.portrait
        this._id = data.id
        this._picture = `assets/photographers/${data.portrait}`;
    }

    displayPhotographer() {
        const article = document.createElement( 'article' );
        const userCardBox = document.createElement( 'a' );
        const boxImg = document.createElement( 'div' )
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const location = document.createElement( 'p' )
        const taglineBox = document.createElement( 'p' )
        const priceBox = document.createElement( 'p' )
    
        img.setAttribute("src", this._picture)
        img.setAttribute("alt", "")
        userCardBox.setAttribute("aria-label", this._name)
        userCardBox.setAttribute("href", "photographer.html?id=" + this._id)

        h2.textContent = this._name;
        location.textContent = this._city+', '+ this._country;
        taglineBox.textContent = this._tagline;
        priceBox.textContent = this._price + '€/jour'

        userCardBox.appendChild(article)
        article.appendChild(boxImg);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(taglineBox);
        article.appendChild(priceBox);
        boxImg.appendChild(img)

        return (userCardBox);
    }
}
