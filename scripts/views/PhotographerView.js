class PhotographerView {
  constructor (photographer, media) {
    // Initialisation de la gestion de la navigation du menu déroulant par la souris et le clavier
    this.navDropdownMouse(photographer, media)
    this.navDropdownKeyboard(photographer, media)
  }
  // Affichage des données et des médias du photographe
  async displayData (photographer, media) {
    const headerSection = document.querySelector('.photograph-header')
    const photographerHtml = this.displayPhotographer(photographer)
    headerSection.innerHTML = photographerHtml
    const mediaContainer = document.querySelector('.photograph-medias')
    mediaContainer.innerHTML = ''

    // Parcours de chaque média pour l'affichage
    media.forEach((item, refMedia) => {
      const mediaElement = document.createElement('figure')
      mediaElement.classList.add('media')

      // Génération du code HTML pour le média
      const mediaHtml = MediaFactory.createMediaElement(item, photographer.name)

      // Génération des éléments du média avec son contenu HTML
      mediaElement.innerHTML = `
      <button class="btn-lightbox" role="button">${mediaHtml} </button>
      <figcaption class="media-details">
        <h2 class="media-title">${item.title}</h2>
        <div class="media-likes" data-media-id="${refMedia}">
          <strong class="fas fa-heart btn-heart" aria-label="J'aime" tabindex="0"></strong>
          <span class="photographer-likes likes-account">${item.likes}</span>
        </div>
      </figcaption>
      `
      mediaContainer.appendChild(mediaElement)
    })

    // Initialisation de la fonctionnalité lightbox
    let lightbox = new Lightbox(media, photographer.name)
    lightbox.initEvents()

    // Calcul du nombre total de likes
    const totalLikes = media.reduce((total, media) => total + media.likes, 0)

    // Affichage des informations de l'encart avec le nombre total de likes
    this.displayInfoEncart(photographer, totalLikes)

    // Gestion des clics sur les icônes de like
    this.manageLike()

    // Initialisation du formulaire de contact
    let formContact = new FormContact()
    formContact.initFormContact(photographer.name)
  }

  // Gestion des clics sur les icônes de like
  manageLike () {
    const listHeart = document.querySelectorAll('.media-likes')
    const totalLikesElement = document.querySelector('#Encart-total-likes')
    let totalLikes = 0

    // Bascule de l'état de like pour un élément donné
    const toggleLikeState = currentHtmlElement => {
      // Récupèration du nombre de like actuel pour le média
      let likesAccount = parseInt(
        currentHtmlElement.querySelector('.photographer-likes').textContent
      )
      // Bascule la classe "liked" pour l'icône
      currentHtmlElement.classList.toggle('liked')
      // Mise à jour du compteur de "like" total en fonction de la classe "liked"
      if (currentHtmlElement.classList.contains('liked')) {
        likesAccount++
        totalLikes = +totalLikesElement.textContent + 1
      } else {
        likesAccount--
        totalLikes = +totalLikesElement.textContent - 1
      }
      // Mise à jour l'affichage du nombre de "like" pour le média et l'encart
      const likesAccountHtml =
        currentHtmlElement.querySelector('.likes-account')
      likesAccountHtml.textContent = `${likesAccount} `
      totalLikesElement.textContent = totalLikes
    }
    // Pour chaque icône de "like", ajout des événements de clic et de keydown
    for (let currentHtmlElement of listHeart) {
      // Événement de clic pour basculer l'état de like
      currentHtmlElement.addEventListener('click', () => {
        toggleLikeState(currentHtmlElement)
      })
      // Événement de touche Entrée pour basculer l'état de like
      currentHtmlElement.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          toggleLikeState(currentHtmlElement)
          event.preventDefault()
        }
      })
    }
  }
  // Affichage des informations du photographe
  displayPhotographer (photographer) {
    const html = `
      <figcaption>
        <h1>${photographer.name}</h1>
        <h2>${photographer.city}, ${photographer.country}</h2>
        <p>${photographer.tagline}</p>
      </figcaption>
      <button class="contact_button" aria-label="Contacter ${photographer.name}">Contactez-moi</button>
      <figure>
        <img src="Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="Portrait de ${photographer.name}">
      </figure>
    `
    return html
  }

  // Affichage de l'encart avec les informations du photographe et le nombre total
  displayInfoEncart (photographer, totalLikes) {
    const encartHtml = `
      <div class="photograph-encart">
        <button class="photographer-like" role="button">
          <span class="photographer-likes" id="Encart-total-likes">${totalLikes}</span>
          <strong class="fas fa-heart" aria-label="J'aime"></strong>
        </button>
        <span class="photographer-price">${photographer.price}€ / jour</span>
      </div>
    `
    const mediaContainer = document.querySelector('.photograph-medias')
    mediaContainer.insertAdjacentHTML('beforeend', encartHtml)
  }

  // Initialisation de la navigation dans le menu déroulant par la souris
  navDropdownMouse (photographer, media) {
    const menu = document.querySelector('#menuDrop')

    menu.addEventListener('click', e => {
      let listOption = e.target
      this.menuDropdown(listOption, photographer, media)
    })
  }

  // Initialisation de la navigation dans le menu déroulant par le clavier
  navDropdownKeyboard (photographer, media) {
    const menu = document.querySelector('#menuDrop')
    const options = menu.querySelectorAll('li')
    let selectedOptionIndex = 0

    menu.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault()
        const selectedOption = options[selectedOptionIndex]
        this.menuDropdown(selectedOption, photographer, media)

        // Maintien du focus dans le menu déroulant après la sélection
        menu.focus()
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()

        if (e.key === 'ArrowDown') {
          selectedOptionIndex = (selectedOptionIndex + 1) % options.length
        } else if (e.key === 'ArrowUp') {
          selectedOptionIndex =
            (selectedOptionIndex - 1 + options.length) % options.length
        }

        options[selectedOptionIndex].focus()
      }
    })
  }

  menuDropdown (listOption, photographer, media) {
    const menu = document.querySelector('#menuDrop')

    // Ouverture du menu
    if (menu.classList.contains('open') && listOption.nodeName == 'LI') {
      menu.prepend(listOption)
    }

    //Tri par critère de date, like, titre
    if (listOption.textContent === 'Date') {
      this.sortMediaByDate(media)
    } else if (listOption.textContent === 'Popularité') {
      this.sortMediaByPopularity(media)
    } else if (listOption.textContent === 'Titre') {
      this.sortMediaByTitle(media)
    }

    // Mise à jour de l'affichage pour toutes les options de tri
    this.displayData(photographer, media)

    // Fermeture du menu
    menu.classList.toggle('open')
  }

  // Tri par date des médias
  sortMediaByDate (media) {
    media.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  // Tri par popularité des médias
  sortMediaByPopularity (media) {
    media.sort((a, b) => b.likes - a.likes)
  }

  // Tri par titre des médias
  sortMediaByTitle (media) {
    media.sort((a, b) => a.title.localeCompare(b.title))
  }
}
