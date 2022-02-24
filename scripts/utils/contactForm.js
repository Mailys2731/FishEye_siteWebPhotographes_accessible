function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}



function closeModal() {
    const modal = document.getElementById("contact_modal");
    var form = document.getElementById("form")
    form.reset()

    const datasDiv = document.querySelectorAll(".formData")
    datasDiv.forEach(dataDiv => {
        dataDiv.setAttribute("data-error-visible", "false")
    })

    const successMessage = document.getElementById("successMessage")
    if (successMessage) { successMessage.remove() }

    const successBtn = document.getElementById("btn-successId")
    if (successBtn) { successBtn.remove() }

    modal.style.display = "none";

}
let first = document.getElementById("first");


function firstValidate() {

    var regFirst = new RegExp(/[a-zA-Z]{2,}/);
    if (!(regFirst.test(document.getElementById("first").value))) {
        first.parentNode.setAttribute("data-error-visible", "true");
        first.parentNode.setAttribute("data-error", "*Veuillez saisir 2 caractères minimum.");
        return false;
    }
    else {
        first.parentNode.setAttribute("data-error-visible", "false");
        return true;
    }
};
document.getElementById("first").addEventListener("keyup", firstValidate);

let last = document.getElementById("last");

const lastValidate = () => {
    var regLast = new RegExp(/[a-zA-Z]{2,}/);
    if (!(regLast.test(document.getElementById("last").value))) {
        last.parentNode.setAttribute("data-error-visible", "true");
        last.parentNode.setAttribute("data-error", "*Veuillez saisir 2 caractères minimum.");
        return false;
    }
    else {
        last.parentNode.setAttribute("data-error-visible", "false");
        return true
    }
}
document.getElementById("last").addEventListener("keyup", lastValidate);
let email = document.getElementById("email");

//Validation de l'email (idem)
const emailValidate = () => {
    var regEmail = new RegExp(/^[0-9a-z\._\-]+@[0-9a-z\.\-]{2,}\.[a-z]{2,3}$/, 'i');
    if (!(regEmail.test(document.getElementById("email").value))) {
        email.parentNode.setAttribute("data-error-visible", "true");
        email.parentNode.setAttribute("data-error", "*Veuillez entrer une adresse mail valide.");
        return false;
    }
    else {
        email.parentNode.setAttribute("data-error-visible", "false");
        return true
    }
}
document.getElementById("email").addEventListener("keyup", emailValidate);

const validate = (event) => {
    //on empêche le comportement par défault du bouton submit
    event.preventDefault();

    let validFirst = firstValidate();
    let validLast = lastValidate();
    let validEmail = emailValidate();

    //si l'un des champs retourne false, la variable formValid retourne false
    let formValid = validFirst && validLast && validEmail;
    //si tous les inputs sont correctement renseignés:
    if (formValid) {

        

        const modal = document.getElementById("contact_modal");

        // Création du success message
       
        var firstname = first.value
        var lastname = last.value
        var email = document.getElementById('email').value
        var message = document.getElementById('message').value
       

        console.log("Le formulaire est correctement renseigné:" + " prénom: " + firstname + " Nom: " + lastname + " email: " + email + " message: " + message);
        closeModal()
        return true;
    }

    console.log("Il y a une erreur dans le formulaire");
    return false;

}