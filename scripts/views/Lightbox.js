class Lightbox {
  constructor(listMedia, photographerName) {
    // Initialisation des propriétés de la classe
    this.listMedia = listMedia;
    this.indexMedia = 0;
    this.item = null;
    this.photographerName = photographerName;
    this.mediaHtml = "";

    // Sélection des éléments du DOM
    this.links = document.querySelectorAll(".btn-lightbox");
    this.modale = document.querySelector(".modal-lightbox");
    this.modale2 = document.querySelector(".modal-content");
    this.close = this.modale.querySelector(".close");
    this.mediaContainer = this.modale.querySelector(".lightbox-media");
    this.modalMedia = this.mediaContainer.querySelector(".lightbox-media img .lightbox-media video");
    this.btnNext = this.modale.querySelector(".next");
    this.btnPreview = this.modale.querySelector(".preview");
  }

  // Initialisation des écouteurs d'événements pour la souris et le clavier
  initEvents() {
    this.initLightboxMouse();
    this.initKeyboardEvents();
  }

  // Ajout d'un gestionnaire d'événements clavier
  initKeyboardEvents() {
    document.addEventListener("keydown", (e) => {
      // Vérification si la lightbox est ouverte avant de gérer les événements clavier
      if (this.isLightboxOpen()) {
        this.handleKeyboardEvents(e);
      }
    });
  }

  // Vérifiecation si la lightbox est ouverte
  isLightboxOpen() {
    return this.modale.style.display === "block";
  }

  // Ouverture et mise à jour de la lightbox pour le média sélectionné
  openLightBox(index) {
    this.modale.style.display = "block";
    this.close.style.display = "block";

    // Définition de l'index de l'élément média sélectionné
    this.indexMedia = index;
    this.updateMedia();
  }

  // Fermeture de la lightBox
  closeLightBox() {
    this.close.style.display = "none";
    this.modale.style.display = "none";
  }
  // Gestion des événements clavier (Esc, flèche gauche et droite)
  handleKeyboardEvents(e) {
    if (e.key === "Escape") {
      this.closeLightBox();
    } else if (e.key === "ArrowLeft") {
      this.preview();
    } else if (e.key === "ArrowRight") {
      this.next();
    }
  }

  // Initialisation des écouteurs d'événements liés à la souris
  initLightboxMouse() {
    // Parcours des liens dans la liste des médias
    for (let link of this.links) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        // Indice de ce lien dans la liste des médias
        const index = Array.from(this.links).indexOf(link);

        this.openLightBox(index);
      });
    }
    // Ajout d'un événement clic au bouton de fermeture
    this.close.addEventListener("click", () => {
      this.closeLightBox();
    });
    // Ajout d'un gestionnaire d'événements pour le bouton "Next"
    this.btnNext.addEventListener("click", () => {
      this.next();
    });

    // Ajout d'un gestionnaire d'événements pour le bouton "Preview"
    this.btnPreview.addEventListener("click", () => {
      this.preview();
    });
  }

  // Affichage du média précédent
  next() {
    this.indexMedia =
      (this.indexMedia - 1 + this.listMedia.length) % this.listMedia.length;
    this.updateMedia();
  }

  // // Affichage du média suivant
  preview() {
    this.indexMedia = (this.indexMedia + 1) % this.listMedia.length;
    this.updateMedia();
  }

  // Mise à jour du contenu de la lightbox avec le média correspondant à l'index actuel
  updateMedia() {
    // Sélection de l'élément média actuel dans la liste
    const media = this.listMedia[this.indexMedia];
    // Création des éléments HTML du média
    const mediaHtml = MediaFactory.createMediaElement(media,this.photographerName);

    // Création du titre
    let createTitle = `<h2>${media.title}</h2>`;

    // Mise à jour du contenu HTML
    this.mediaContainer.innerHTML = mediaHtml + createTitle;

    // Ajout d'un focus si le média est une vidéo
    const videoTag = this.mediaContainer.querySelector("video");
    if (videoTag) {
      videoTag.setAttribute("controls", "");
      videoTag.focus();
    }
  }
}
